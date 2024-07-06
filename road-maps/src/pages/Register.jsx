import Form from "../components/Form";
import ValidImage from "../components/ValidImage";
import Input from "../components/Input";
import Button from "../components/Button";
import Error from "../components/Error";
import "./register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { emailHasBeenUsed } from "../services/verifciations";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
function Register() {
  // "name":"ali",
  //   "email":"ali@gmail.com",
  //   "password":"test1234",
  //   "passwordConfirm":"test1234",
  //   "photo":"default.jpg",
  //   "role":"Beginner"
  const [error, setError] = useState({});
  const [fileValue, setFileValue] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [fileError, setFileError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    photo: "",
    role: "",
    file: "",
  });
  function handleClickFile() {
    if (showFile && !fileValue) {
      setFileError("The File is Required");
    }
  }
  function handleChange(e) {
    if (e.target.name == "file") setFileValue(e.target.files[0].name);
    if (e.target.name == "file") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  }
  const [selectedOption, setSelectedOption] = useState("");
  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
    if (
      event.target.value == "Doctor" ||
      event.target.value == "Software-engineer"
    )
      setShowFile(true);
    else setShowFile(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(formData);
      const response = await axios.post(
        "https://knowledge-sharing-1.onrender.com/api/v1/users/signup",
        formData
      );
      console.log("registered successfully", response.data);
      navigate("/verify");
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(error);
  return (
    <div className="register container">
      <Form
        h2="Sign Up"
        onSubmit={handleSubmit}
        onClick={handleClickFile}
        enctype="multipart/form-data"
      >
        {error && <Error err={error.message} />}
        <Input label="Name" id="Name">
          <input
            id={"Name"}
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Enter Your Name"
            value={formData.name}
            className="regular-input"
            required
          />
        </Input>
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
        <Input id={"pass-confirm"} label="Confirm Password">
          <input
            id={"pass-confirm"}
            name="passwordConfirm"
            onChange={handleChange}
            type="password"
            placeholder="Enter 6 characters or more"
            value={formData.passwordConfirm}
            className="regular-input"
            required
          />
        </Input>
        <div className="radio-container">
          <input
            type="radio"
            name="role"
            id="doctor"
            value="Doctor"
            onClick={handleOptionChange}
            onChange={handleChange}
            checked={formData.role === "Doctor"}
          />
          <label htmlFor="doctor">
            Doctor <FontAwesomeIcon className="icon" icon={faCheck} />
          </label>
          <input
            type="radio"
            name="role"
            id="expert"
            value="Software-engineer"
            checked={formData.role === "Software-engineer"}
            onChange={handleChange}
            onClick={handleOptionChange}
          />
          <label htmlFor="expert">
            Expert <FontAwesomeIcon className="icon" icon={faCheck} />
          </label>
          <input
            type="radio"
            name="role"
            id="beginner"
            value="Beginner"
            onClick={handleOptionChange}
            checked={formData.role === "Beginner"}
            onChange={handleChange}
          />
          <label htmlFor="beginner">
            Beginner <FontAwesomeIcon className="icon" icon={faCheck} />
          </label>
        </div>
        <div className="file-container">
          <div className="first-file">
            <label htmlFor="file" className={showFile && "visible"}>
              Upload File
            </label>
            <input
              type="file"
              placeholder="Upload File"
              id="file"
              name="file"
              onChange={handleChange}
              required={showFile}
            />
          </div>
          <div className="second-file">
            {fileValue ? fileValue : <p className="file-error">{fileError}</p>}
          </div>
        </div>
        <Button
          type="blue"
          link="have an account ? login"
          to="/login"
          typo="submit"
          onClick={handleClickFile}
          className={isLoading && "disabled"}
        >
          {isLoading ? <Spinner /> : "Sign Up"}
        </Button>
      </Form>
      <ValidImage src="../../public/login.jpg" />
    </div>
  );
}

export default Register;
