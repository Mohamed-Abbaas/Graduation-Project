import { useState } from "react";
import Spinner from "../components/Spinner";
import "./resetPassword.css";
import { useNavigate, useParams } from "react-router";
import Error from "../components/Error";
import axios from "axios";
function ResetPassword() {
  const params = useParams();
  const [error, setError] = useState("");
  const { id } = params;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const passwordPlaceholder = "**********";
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);
    try {
      const response = await fetch(
        `https://knowledge-sharing-1.onrender.com/api/v1/users/resetPassword/${id}`,
        { method: "PATCH", body: JSON.stringify(formData) }
      );
      navigate("/login", { state: true });
    } catch (err) {
      setError(err.message);
      console.log("we are here");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="reset-password">
      <div className="reset-container container">
        <h1 className="reset-header">Reset Your Password</h1>
        <p>
          Please Enter the new password if you'd like to reset the old password
          below
        </p>
        <form className="reset-form" onSubmit={handleSubmit}>
          {error && <Error err={error} />}
          <label className="reset-label">Password</label>
          <input
            className="reset-input"
            onChange={handleChange}
            name="password"
            type="password"
            placeholder={passwordPlaceholder}
            value={formData.password}
            required
          />
          <label className="reset-label">Confirm Password</label>
          <input
            className="reset-input"
            onChange={handleChange}
            name="passwordConfirm"
            type="password"
            placeholder={passwordPlaceholder}
            value={formData.passwordConfirm}
            required
          />
          <button className={`${isLoading && "disabled"}`}>
            {isLoading ? <Spinner /> : "Request Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
