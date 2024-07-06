import { useEffect, useRef, useState } from "react";
import "./updateForm.css";
import Spinner from "../Spinner";
import Error from "../Error";
import Cookies from "js-cookie";
import axios from "axios";
function UpdateForm({
  ref2,
  isShowed,
  onClose,
  onShowToast,
  onToastWord,
  id,
  user,
  onEditValue,
}) {
  console.log(user);
  const excludeElementRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const token = Cookies.get("jwt");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Are We Here", id);
      const response = await axios.patch(
        `https://knowledge-sharing-1.onrender.com/api/v1/users/${id}`,
        formData,
        { headers }
      );
      onEditValue(formData.email);
      console.log(response);
      onToastWord("Edited");
      onShowToast();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  useEffect(
    function () {
      let timer;
      console.log(ref2, excludeElementRef);
      function handleClickOutside(e) {
        if (
          ref2.current &&
          !ref2.current.contains(e.target) &&
          excludeElementRef.current &&
          !excludeElementRef.current.contains(e.target) &&
          isShowed
        ) {
          onClose();
        }
      }
      if (isShowed) {
        timer = setTimeout(() => {
          setShouldRender(true);
        }, 10);
        document.addEventListener("click", handleClickOutside);
      } else {
        setShouldRender(false);
        clearTimeout(timer);
        return () => document.removeEventListener("click", handleClickOutside);
      }
    },
    [isShowed]
  );
  return (
    <div className="update-form-background">
      <div
        className={`post-form ${shouldRender ? "activated" : ""}`}
        ref={excludeElementRef}
      >
        <form className="actual-form" onSubmit={handleSubmit}>
          {error && <Error err={error} />}
          <label className="post-label">Enter the new Email</label>
          <input
            className="post-input"
            placeholder="Write the email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <button style={{ pointerEvents: isLoading ? "none" : "auto" }}>
            {isLoading ? <Spinner /> : "Edit"}
          </button>
          <span className="close-butt" onClick={onClose}>
            &times;
          </span>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
