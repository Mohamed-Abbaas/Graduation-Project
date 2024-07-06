import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./post.css";
import {
  faArrowAltCircleRight,
  faComment,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import CreatePost from "./CreatePost";
import Comment from "./Comment";
import PopupComments from "../dashboard/PopupComments";
function Post({
  post,
  fresh = false,
  key,
  onShowToast,
  onToastWord,
  dash = false,
}) {
  const {
    name: userName,
    imageUrl: userImageUrl,
    id: myId,
  } = useSelector((store) => store.user);
  const token = Cookies.get("jwt");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPopupComments, setShowPopupComments] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [commentFormData, setCommentFormData] = useState({
    body: "",
  });
  const [showPostForm, setShowPostForm] = useState(false);
  const [edited, setEdited] = useState("");
  const excludeElementRef = useRef(null);
  const excludeElementRef2 = useRef(null);
  const excludeElementRef3 = useRef(null);
  const excludeElementRef4 = useRef(null);
  const body = post.body;
  const comments = post.comments;
  const postId = post.user._id;
  const id = post._id;
  const [freshComments, setFreshComments] = useState([]);
  const reversedFreshComment = freshComments.slice().reverse();
  function onFreshComments(newComment) {
    setFreshComments([...freshComments, newComment]);
  }
  function handleChange(e) {
    setCommentFormData({ ...commentFormData, [e.target.name]: e.target.value });
  }
  var name, imageUrl;
  if (fresh) {
    name = userName;
    imageUrl = userImageUrl;
  } else {
    name = post.user.name;
    imageUrl = post.user.photo;
  }
  function onShowPopupComments() {
    setShowPopupComments((showPopupComments) => !showPopupComments);
  }
  function onPostForm() {
    setShowPostForm((showPostForm) => !showPostForm);
  }
  function onEdited(newBody) {
    setEdited(newBody);
  }
  function handleClickThree() {
    setIsClicked((isClicked) => !isClicked);
  }
  function handleEditClick() {
    setShowPostForm(true);
  }
  async function handleCommentSubmit(e) {
    e.preventDefault();
    setCommentLoading(true);
    try {
      const response = await axios.post(
        `https://knowledge-sharing-1.onrender.com/api/v1/posts/${id}/comments`,
        commentFormData,
        { headers }
      );
      onFreshComments(response.data.data.comment);
    } catch (err) {
      setCommentError(err.message);
    } finally {
      setCommentLoading(false);
      setCommentFormData({
        body: "",
      });
    }
  }
  function handleKeyDown(event) {
    if (event.keyCode == 13) handleCommentSubmit();
  }
  async function handleDelete() {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `https://knowledge-sharing-1.onrender.com/api/v1/posts/${id}`,
        { headers }
      );
      if (response.data.status == "success") {
        setSuccess(true);
        onToastWord("Deleted");
        onShowToast();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
      {!success && (
        <div className="post">
          {showPostForm && (
            <CreatePost
              onClose={onPostForm}
              isShowed={showPostForm}
              ref2={excludeElementRef3}
              onShowToast={onShowToast}
              process={"Edited"}
              onToastWord={onToastWord}
              id={id}
              edit={true}
              body={post.body}
              onEdited={onEdited}
            />
          )}
          <div className="user">
            {" "}
            <img
              src={fresh ? userImageUrl : imageUrl}
              className="post-image"
            />{" "}
            <p className="post-name">{!fresh ? name : userName}</p>
          </div>
          <div className="post-body">{edited ? edited : body}</div>
          {(myId == postId || fresh) && (
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
                style={{ pointerEvents: isLoading ? "none" : "auto" }}
              >
                <li ref={excludeElementRef3} onClick={handleEditClick}>
                  Edit
                </li>
                <li
                  style={{ pointerEvents: isLoading ? "none" : "auto" }}
                  onClick={handleDelete}
                >
                  Delete
                </li>
              </ul>
            </>
          )}
          <div className="post-footer">
            <div
              ref={excludeElementRef4}
              onClick={onShowPopupComments}
              style={{ cursor: dash ? "pointer" : "" }}
            >
              <FontAwesomeIcon
                className={`comments-icon ${dash ? "dash" : ""}`}
                icon={faComment}
              />
              <span>{fresh ? freshComments.length : comments.length}</span>
            </div>
          </div>
          {!dash && (
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
          )}
          {!dash && (
            <div className="comments">
              <>
                {reversedFreshComment.map((comment, index) => (
                  <Comment comment={comment} key={index + 1} fresh={true} />
                ))}
                {!fresh &&
                  comments.map((comment, index) => (
                    <Comment comment={comment} key={index + 1} />
                  ))}
              </>
            </div>
          )}
          {dash && showPopupComments && (
            <PopupComments
              onClose={onShowPopupComments}
              ref2={excludeElementRef4}
              isShowed={showPopupComments}
            >
              <div className="comments">
                <>
                  {reversedFreshComment.map((comment, index) => (
                    <Comment comment={comment} key={index + 1} fresh={true} />
                  ))}
                  {!fresh &&
                    comments.map((comment, index) => (
                      <Comment dash={true} comment={comment} key={index + 1} />
                    ))}
                </>
              </div>
            </PopupComments>
          )}
        </div>
      )}
    </>
  );
}

export default Post;
