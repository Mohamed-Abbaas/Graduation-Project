import "./login.css";
import Input from "../components/Input";
import Form from "../components/Form";
import ValidImage from "../components/ValidImage";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Error from "../components/Error";

import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";
function Login() {
  // const jwt_decode require( "jwt-decode");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState();
  const [loginStatus, setLoginStatus] = useState(false);
  const flag = location.state;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function onShowToast() {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }

  function handleForgetClick() {
    navigate("/forget_password");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://knowledge-sharing-git-master-mustafa-s-projects-4eb52aa8.vercel.app/api/v1/users/login",
        formData
      );
      console.log("Login successfully", response.data.token);
      setLoginStatus(true);
      Cookies.set("jwt", response.data.token, { expires: 90 });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    function showToast() {
      if (!flag) return;
      onShowToast();
    }
    showToast();
  }, []);
  return (
    <div className="login container">
      <Toast toastWord={"Reset"} showToast={showToast} />
      <Form h2="login" onSubmit={handleSubmit}>
        {error && <Error err={error} />}
        <Input label="Email Address" id="email">
          <input
            id={"email"}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="You @example.com"
            value={formData.email}
            className="regular-input"
            required
          />
        </Input>
        <Input id={"password"} label="Password">
          <input
            id={"password"}
            className="regular-input"
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Enter 6 characters or more"
            value={formData.password}
            required
          />
        </Input>
        <span className="forget" onClick={handleForgetClick}>
          Forget password
        </span>
        <Button
          type="blue"
          link="doesn't have an account yet ? sign up"
          to="/register"
          className={isLoading && "disabled"}
        >
          {isLoading ? <Spinner /> : "Login"}
        </Button>
      </Form>
      <ValidImage src="../../public/login.jpg" />
    </div>
  );
}

export default Login;
