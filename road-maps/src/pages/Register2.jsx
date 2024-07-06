import ValidImage from "../components/ValidImage";
import Input from "../components/Input";
import Button from "../components/Button";
import Error from "../components/Error";
import "./register2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { emailHasBeenUsed } from "../services/verifciations";
import { Form } from "react-router-dom";
import { createUser } from "../services/userApi";
function Register2() {
  // "name":"ali",
  //   "email":"ali@gmail.com",
  //   "password":"test1234",
  //   "passwordConfirm":"test1234",
  //   "photo":"default.jpg",
  //   "role":"Beginner"
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    photo: "",
    role: "",
  });
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const [selectedOption, setSelectedOption] = useState("");
  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://knowledge-sharing-1.onrender.com/api/v1/users/signup",
        formData
      );
      console.log("registered successfully", response.data);
    } catch (err) {
      setError(err);
    }
  }
  return (
    <div className="register container">
      <Form method="POST">
        <h2>Sign Up</h2>
        <Input label="Name" id="Name">
          <input
            id={"Name"}
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Enter Your Name"
            value={formData.name}
            className="regular-input"
          />
        </Input>
        {/* {emailHasBeenUsed(error.response.data.message) ? (
          <Error err={"This Email Has Been Used Before"} />
        ) : (
          <></>
        )} */}
        <Input label="Email Address" id="email">
          <input
            id={"email"}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="You @example.com"
            value={formData.email}
            className="regular-input"
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
            value="Expert"
            checked={formData.role === "Expert"}
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
        <label
          htmlFor="file"
          className={`${
            selectedOption == "doctor" || selectedOption == "expert"
              ? "visible"
              : ""
          }`}
        >
          Upload Image
        </label>
        <input
          type="file"
          placeholder="Upload File"
          id="file"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
        />
        <Button
          type="blue"
          link="have an account ? login"
          to="/login"
          typo="submit"
        >
          Sign Up
        </Button>
      </Form>
      <ValidImage src="../../public/login.jpg" />
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const res = await createUser(data);
  console.log(res);
  return null;
}
export default Register2;
