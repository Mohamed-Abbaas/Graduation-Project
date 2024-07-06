import { useEffect, useRef, useState } from "react";
import "./dashUser.css";
import Cookies from "js-cookie";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
function DashUser({ user, onShowToast, onToastWord, rule = false }) {
  const [error, setError] = useState("");
  const excludeElementRef = useRef(null);
  const excludeElementRef3 = useRef(null);
  const excludeElementRef2 = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { name, email, photo, role, _id: id, file } = user;
  const [showPopup, setShowPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const token = Cookies.get("jwt");
  console.log(id);
  console.log(file);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  function onClose() {
    setShowForm(false);
  }
  function onEditValue(newWord) {
    setEditValue(newWord);
  }
  function handleShowPopup() {
    setShowPopup((showPopup) => !showPopup);
  }
  function handleEditClick() {
    setShowForm((showForm) => !showForm);
  }
  function handleClickNavigation() {
    window.open(file, "_blank");
  }
  function handleVerifySuccess() {
    setVerifySuccess(true);
    setTimeout(() => {
      setSuccess(true);
    }, 3000);
  }
  async function handleVerifyClick() {
    setVerifyLoading(true);
    try {
      // const response = await axios.patch(
      //   `https://knowledge-sharing-1.onrender.com/api/v1/users/verifyExpert/${id}`,
      //   { headers }
      // );
      const response = await fetch(
        `https://knowledge-sharing-1.onrender.com/api/v1/users/verifyExpert/${id}`,
        {
          method: "PATCH",
          headers: headers,
        }
      );
      onToastWord("verified");
      onShowToast();
      handleVerifySuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setVerifyLoading(false);
    }
  }
  async function handleDelete() {
    setIsLoading(true);
    try {
      var response = await fetch(
        `https://knowledge-sharing-1.onrender.com/api/v1/users/${id}`,
        { headers: headers, method: "DELETE" }
      );
      console.log(response);
      setSuccess(true);
      onToastWord("Deleted");
      onShowToast();
      if (response.data.status == "success") setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(true);
    }
  }
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        excludeElementRef &&
        excludeElementRef2 &&
        !excludeElementRef.current.contains(e.target) &&
        !excludeElementRef2.current.contains(e.target) &&
        showPopup
      ) {
        setShowPopup(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showPopup]);
  return (
    <>
      {!success && (
        <tr
          style={{
            opacity: verifyLoading ? "0.7" : "",
            pointerEvents: verifyLoading ? "none" : "",
          }}
          className="the-user"
        >
          <td className="user-container">
            <img src={photo} />
            <p>{name}</p>
          </td>
          <td
            onClick={rule && handleClickNavigation}
            className={`${rule ? "role-raw" : ""}`}
          >
            {rule ? file : editValue ? editValue : email}
          </td>
          <td>{role}</td>
          <td className="buttons">
            {rule ? (
              <div
                onClick={handleVerifyClick}
                className={`toggle-switch ${
                  verifySuccess ? "clicked success" : ""
                } ${verifyLoading ? "clicked" : ""}`}
              >
                <div className="icon">
                  {verifyLoading || verifySuccess ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    "X"
                  )}
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={handleShowPopup}
                  style={{ pointerEvents: isLoading ? "none" : "" }}
                  className="label btn-shape fs-13 bg-red c-white"
                  ref={excludeElementRef2}
                >
                  Delete
                  {showPopup && (
                    <div className="delete-popup" ref={excludeElementRef}>
                      <p>Are you sure you wanna Delete it?</p>
                      <div className="yes-no">
                        <button
                          className="confirm-delete"
                          onClick={handleDelete}
                        >
                          Yes
                        </button>
                        <button
                          className="cancel-delete"
                          onClick={() => {
                            setShowPopup((showPopUp) => !showPopUp);
                          }}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </button>
                <button
                  ref={excludeElementRef3}
                  style={{ pointerEvents: isLoading ? "none" : "" }}
                  className="label btn-shape fs-13 bg-blue c-white"
                  onClick={handleEditClick}
                >
                  Update
                </button>
              </>
            )}
            {showForm && (
              <UpdateForm
                onClose={onClose}
                onShowToast={onShowToast}
                onToastWord={onToastWord}
                isShowed={showForm}
                ref2={excludeElementRef3}
                onEditValue={onEditValue}
                id={user._id}
                user={user}
              />
            )}
          </td>
        </tr>
      )}
    </>
  );
}

export default DashUser;
