import axios from "axios";
import Header from "../components/Header";
import "./forgetPassword.css";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router";
import Toast from "../components/Toast";
function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  function handleBackClick() {
    navigate("/login");
  }
  function onShowToast() {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);
      setIsLoading(true);
      const response = await axios.post(
        `https://knowledge-sharing-1.onrender.com/api/v1/users/forgetPassword`,
        formData
      );
      if (response.ok) onShowToast();
      console.log("successed", response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <>
      <div className="forget-password">
        <Toast toastWord={"Sent"} showToast={showToast} />
        <div className="forget-container container">
          <h1 className="forget-header">Forget Your Password</h1>
          <p>
            Please Enter the Email Address of the email you'd like to reset its
            password below
          </p>
          <form className="forget-form" onSubmit={handleSubmit}>
            <label className="forget-label">Enter Email Address</label>
            <input
              className="forget-input"
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="admin@gmail.com"
              value={formData.email}
              required
            />
            <button className={`${isLoading && "disabled"}`}>
              {isLoading ? <Spinner /> : "Request Reset Link"}
            </button>
            <span onClick={handleBackClick} className="back">
              Back To Login
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
