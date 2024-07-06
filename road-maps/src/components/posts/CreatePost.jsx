import { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";
import Error from "../Error";
import Cookies from "js-cookie";
import "./createPost.css";
import axios from "axios";
function CreatePost({
  ref2,
  onClose,
  isShowed,
  edit = false,
  id,
  onFreshPosts,
  onShowToast,
  onEdited,
  onToastWord,
  body = "",
}) {
  const excludeElementRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("jwt");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [formData, setFormData] = useState({
    body: body,
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      var response;
      if (edit) {
        // response = await axios.patch(
        //   `https://knowledge-sharing-1.onrender.com/api/v1/articles/${id}`,
        //   formData,
        //   { headers }
        // );
        response = await fetch(
          `https://knowledge-sharing-1.onrender.com/api/v1/posts/${id}`,
          { method: "PATCH", headers: headers, body: JSON.stringify(formData) }
        );
        // response = await axios.patch(
        //   `https://knowledge-sharing-1.onrender.com/api/v1/posts/${id}`,
        //   { headers }
        // );
        // response = await axios.patch(
        //   `https://knowledge-sharing-git-master-mustafa-s-projects-4eb52aa8.vercel.app/api/v1/posts/${id}`,
        //   { headers }
        // );
      } else {
        response = await axios.post(
          `https://knowledge-sharing-git-master-mustafa-s-projects-4eb52aa8.vercel.app/api/v1/posts`,
          formData,
          {
            headers,
          }
        );
      }
      if (edit) {
        onToastWord("Edited");
        onEdited(formData.body);
      } else {
        onFreshPosts(response.data.data.post);
      }
      onShowToast();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(
    function () {
      let timer;
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
    <div className="create-post-background">
      <div
        className={`post-form ${shouldRender ? "activated" : ""}`}
        ref={excludeElementRef}
      >
        {error && <Error err={error} />}
        <form className="actual-form" onSubmit={handleSubmit}>
          <textarea
            className="post-input text-area"
            placeholder="Write What You think"
            required
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
          <button style={{ pointerEvents: isLoading ? "none" : "auto" }}>
            {isLoading ? <Spinner /> : edit ? "Edit" : "publish"}
          </button>
          <span className="close-butt" onClick={onClose}>
            &times;
          </span>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
