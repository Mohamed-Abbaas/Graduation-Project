import { useSelector } from "react-redux";
import "./comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
function Comment({ comment, fresh, dash = false }) {
  const excludeElementRef = useRef(null);
  const excludeElementRef2 = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [commentFormData, setCommentFormData] = useState({
    body: comment.body,
  });
  const token = Cookies.get("jwt");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [error, setError] = useState("");
  const {
    role,
    name: userName,
    imageUrl: userImageUrl,
    id: myId,
  } = useSelector((store) => store.user);
  const commentId = comment.user._id;
  var imageUrl;
  imageUrl = comment.user.photo;
  const id = comment._id;
  var name = comment.user.name;
  var body = comment.body;
  function handleChange(e) {
    setCommentFormData({ ...commentFormData, [e.target.name]: e.target.value });
  }
  async function handleCommentSubmit(e) {
    e.preventDefault();
    setCommentLoading(true);
    var response;
    try {
      response = await axios.patch(
        `https://knowledge-sharing-1.onrender.com/api/v1/comments/${id}`,
        commentFormData,
        { headers }
      );
      // fetch(
      //   `https://knowledge-sharing-1.onrender.com/api/v1/comments/${id}`,
      //   { method: "PATCH", headers: headers, body: JSON.stringify(formData) }
      // );
    } catch (err) {
      setError(err.message);
    } finally {
      setCommentLoading(false);
      setEditClicked(false);
      setEditValue(response.data.data.comment.body);
    }
  }
  function handleKeyDown(e) {
    if (e.keyCode == 13) {
      handleCommentSubmit();
    }
  }
  async function handleDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://knowledge-sharing-1.onrender.com/api/v1/comments/${id}`,
        { headers }
      );
      if (response.data.status == "success") setDeleteSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  function handleClickThree() {
    setIsClicked((isClicked) => !isClicked);
  }
  function handleEditClick() {
    setEditClicked((editClicked) => !editClicked);
  }
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        excludeElementRef.current &&
        excludeElementRef2.current &&
        !excludeElementRef.current.contains(e.target) &&
        !excludeElementRef2.current.contains(e.target) &&
        isClicked
      ) {
        setIsClicked(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isClicked]);
  return (
    <>
      {!deleteSuccess && (
        <div className="the-comment">
          <img
            src={fresh ? userImageUrl : imageUrl}
            className="comment-image"
          />
          <div className="text">
            <h1 className="comment-name">{fresh ? userName : name}</h1>
            <>
              {editClicked ? (
                <form
                  style={{
                    pointerEvents: commentLoading ? "none" : "auto",
                    opacity: commentLoading ? "0.8" : "",
                  }}
                  className="comment-form"
                  onSubmit={handleCommentSubmit}
                >
                  <input
                    onChange={handleChange}
                    value={commentFormData.body}
                    placeholder="Write a comment..."
                    className="comment-input"
                    name="body"
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    className={`${
                      commentFormData.body && !commentLoading ? "active" : ""
                    }`}
                  >
                    <FontAwesomeIcon
                      className="submit-icon"
                      icon={faArrowAltCircleRight}
                    />
                  </button>
                </form>
              ) : (
                <p className="comment-content">
                  {editValue ? editValue : body}
                </p>
              )}
            </>
            {(myId == commentId || fresh || dash) && (
              <>
                <FontAwesomeIcon
                  ref={excludeElementRef2}
                  icon={faEllipsisV}
                  className="three-icon"
                  onClick={handleClickThree}
                />
                <ul
                  className={`${isClicked ? "clicked" : ""}`}
                  ref={excludeElementRef}
                  style={{
                    pointerEvents: isLoading || !isClicked ? "none" : "auto",
                  }}
                >
                  <li onClick={handleEditClick}>Edit</li>
                  <li
                    style={{
                      pointerEvents: isLoading || !isClicked ? "none" : "auto",
                    }}
                    onClick={handleDelete}
                  >
                    Delete
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Comment;
