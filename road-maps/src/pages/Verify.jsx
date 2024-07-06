import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./verify.css";
import { useRef, useState } from "react";
import axios from "axios";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Verify() {
  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate("");
  const [isLoading, setIsLoading] = useState(false);
  const ApiURL = "https://knowledge-sharing-1.onrender.com/api";
  const [error, setError] = useState("");
  const handleChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !inputValues[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    var code = inputValues.join("");
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `https://knowledge-sharing-1.onrender.com/api/v1/users/verify-email/${code}`
      );
      console.log("We are here");
      console.log("verified successfully", res.data);
      Cookies.set("jwt", res.data.token, { expires: 90 });
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
      console.log(err.response);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="verify">
      <div className="container">
        <img src="../../public/email.jpg" />
        <h1>Verify Your Account</h1>
        <p>Please Enter The Five Digits Code That Was Sent To Your Email</p>
        <form onSubmit={handleSubmit}>
          <div className="digits-container">
            {inputValues.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs[index]}
              />
            ))}
          </div>
          {error && <Error err={error} />}
          <button
            disabled={isLoading}
            className={`${isLoading ? "dis" : ""} confirm`}
          >
            {isLoading ? (
              <>
                {" "}
                <Spinner />{" "}
              </>
            ) : (
              "Confirm"
            )}
          </button>
          <span>Didn't Receive Code ? Resend it</span>
        </form>
      </div>
    </div>
  );
}

export default Verify;
