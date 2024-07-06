import { useSelector } from "react-redux";
import Article from "../Articles/Article";
import Post from "../posts/Post";
import "./dashBox.css";
import { useEffect, useRef, useState } from "react";
import { isFulfilled } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import CreatePost from "../posts/CreatePost";
import Toast from "../Toast";
function DashBox({ article, post }) {
  var postBox, articleBox;
  if (post) postBox = post;
  if (article) articleBox = article;
  const excludeElementRef = useRef(null);
  const excludeElementRef2 = useRef(null);
  const excludeElementRef3 = useRef(null);
  const excludeElementRef4 = useRef(null);
  const excludeElementRef5 = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showEditArticleForm, setShowEditArticleForm] = useState(false);
  const [showEditPostForm, setShowEditPostForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastWord, SetToastWord] = useState("");
  const [editValue, setEditValue] = useState("");
  const token = Cookies.get("jwt");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { role, name } = useSelector((store) => store.user);
  function onShowToast() {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 500);
  }
  function onToastWord(newWord) {
    SetToastWord(newWord);
  }
  function onEdited(newBody) {
    setEditValue(newBody);
  }
  async function handleDeletePost() {
    const id = postBox._id;
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://knowledge-sharing-git-master-mustafa-s-projects-4eb52aa8.vercel.app/api/v1/posts/${id}`,
        { headers }
      );
      if (response.data.status == "success") setDeleteSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleDeleteArticle() {
    const id = articleBox._id;
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://knowledge-sharing-git-master-mustafa-s-projects-4eb52aa8.vercel.app/api/v1/articles/${id}`,
        { headers }
      );
      if (response.data.status == "success") setDeleteSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  function handleEditArticleClick() {
    setShowEditArticleForm((showEditArticleForm) => !showEditArticleForm);
  }
  function handleEditPostClick() {
    setShowEditPostForm((showEditPostForm) => !showEditPostForm);
  }
  function handleShowPopup() {
    setShowPopup((showPopup) => !showPopup);
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
      } else if (excludeElementRef5.current.contains(e.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showPopup]);
  return (
    <>
      {!deleteSuccess && (
        <div className="dash-box">
          <Toast toastWord={toastWord} showToast={showToast} />
          {articleBox && <Article article={articleBox}> </Article>}
          {postBox && (
            <Post dash={true} post={postBox}>
              {" "}
            </Post>
          )}
          <div className="dash-footer">
            <div className="buttons">
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
                        onClick={
                          articleBox ? handleDeleteArticle : handleDeletePost
                        }
                      >
                        Yes
                      </button>
                      <button
                        className="cancel-delete"
                        onClick={() => {
                          setShowPopup((showPopUp) => !showPopUp);
                        }}
                        ref={excludeElementRef5}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </button>
              {/* <button
                ref={excludeElementRef3}
                style={{ pointerEvents: isLoading ? "none" : "" }}
                className="label btn-shape fs-13 bg-blue c-white"
                onClick={
                  articleBox ? handleEditArticleClick : handleEditPostClick
                }
              >
                Update
              </button> */}
            </div>
          </div>
          {showEditPostForm && (
            <CreatePost
              onClose={handleEditPostClick}
              isShowed={showEditPostForm}
              ref2={excludeElementRef4}
              onShowToast={onShowToast}
              process={"Edited"}
              onToastWord={onToastWord}
              id={postBox._id}
              edit={true}
              body={post.body}
              //   onEdited={onEdited}
            />
          )}
        </div>
      )}
    </>
  );
}

export default DashBox;
