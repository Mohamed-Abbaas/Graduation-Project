import Input from "../components/Input";
import SettingsForm from "../components/SettingsForm";
import DashboardHeader from "../components/DashboardHeader";
import "./accountInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import Toast from "../components/Toast";
import { updateUser } from "../Features/userSlice";
import Error from "../components/Error";

function AccountInfo() {
  const passwordPlaceholder = "**********";
  const token = Cookies.get("jwt");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const { email, name } = useSelector((store) => store.user);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [formData1, setFormData1] = useState({
    name: name,
    email: email,
    photo: "",
  });
  const [formData2, setFormData2] = useState({
    currentPassword: "",
    password: "",
    passwordConfirm: "",
  });
  function handleChange1(e) {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  }
  function handleChange2(e) {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  }
  function onShowToast() {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }
  async function handleSubmit1(e) {
    e.preventDefault();
    setIsLoading1(true);
    try {
      const response = await axios.patch(
        `https://knowledge-sharing-1.onrender.com/api/v1/users/updateMe`,
        formData1,
        { headers }
      );
      onShowToast();
      dispatch(updateUser(formData1.name, formData1.email));
    } catch (err) {
      setError1(err.message);
    } finally {
      setIsLoading1(false);
    }
  }
  async function handleSubmit2(e) {
    e.preventDefault();
    setIsLoading2(true);
    try {
      const response = await fetch(
        `https://knowledge-sharing-1.onrender.com/api/v1/users/updatePassword`,
        formData2,
        { headers: headers, method: "PATCH" }
      );
      onShowToast();
    } catch (err) {
      console.log(err);
      setError2(err.message);
    } finally {
      setIsLoading2(false);
    }
  }
  return (
    <>
      <Header />
      <Toast toastWord={"Edited"} showToast={showToast} />
      <div className="account-info">
        {/* <div className="left-form">
        <button>Save</button>
        <button>My Articles</button>
      </div> */}
        <div className="forms-container container">
          <DashboardHeader title="Account Info" />
          <SettingsForm noButton={true} onSubmit={handleSubmit1}>
            {error1 && <Error err={error1} />}
            <label htmlFor="image">
              <FontAwesomeIcon icon={faUser} className="image-icon" />{" "}
            </label>
            <input id="image" type="file" name="photo" />
            <Input id="name" label="Name">
              <input
                id={"name"}
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={formData1.name}
                onChange={handleChange1}
                className="regular-input"
                required
              />
            </Input>
            <Input id={"email"} label="Email">
              <input
                id={"email"}
                name="email"
                type="email"
                value={formData1.email}
                placeholder="Enter Your Email"
                onChange={handleChange1}
                className="regular-input"
                required
              />
            </Input>
            <button
              className={`first-button ${
                isLoading1 || isLoading2 ? "disabled" : ""
              }`}
            >
              {isLoading1 ? <Spinner /> : "Save Settings"}
            </button>
          </SettingsForm>
          <hr className="my-hr" />
          <SettingsForm onSubmit={handleSubmit2}>
            {error2 && <Error err={error2} />}
            <Input id={"curr-pass"} label="Current Pass">
              <input
                placeholder={passwordPlaceholder}
                id={"curr-pass"}
                onChange={handleChange2}
                name="currentPassword"
                type="password"
                className="regular-input"
                value={formData2.currentPassword}
                required
              />
            </Input>
            <Input id={"new-pass"} label="New Pass">
              <input
                placeholder={passwordPlaceholder}
                id={"new-pass"}
                name="password"
                value={formData2.password}
                type="password"
                className="regular-input"
                onChange={handleChange2}
                required
              />
            </Input>
            <Input
              id={"confirm-pass"}
              label="Confirm Pass"
              type="password"
              placeholder={passwordPlaceholder}
            >
              <input
                placeholder={passwordPlaceholder}
                id={"confirm-pass"}
                name="passwordConfirm"
                value={formData2.passwordConfirm}
                type="password"
                className="regular-input"
                onChange={handleChange2}
                required
              />
            </Input>
            <button className={`${isLoading1 || isLoading2 ? "disabled" : ""}`}>
              {isLoading2 ? <Spinner /> : "Save Settings"}
            </button>
          </SettingsForm>
        </div>
      </div>
    </>
  );
}

export default AccountInfo;
