// {{URL}}api/v1/tracks/front-end/articles
import { useEffect, useRef } from "react";
import { useState } from "react";
import "./createArticle.css";
import axios from "axios";
import Spinner from "../Spinner";
import Error from "../Error";
import Cookies from "js-cookie";
function CreateArticle({
  onClose,
  isShowed,
  ref2,
  slug,
  onShowToast,
  process,
  onToastWord,
  edit = false,
  id,
  title = "",
  body = "",
  onFreshArticles,
  onTest,
}) {
  const excludeElementRef = useRef(null);
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const token = Cookies.get("jwt");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [formData, setFormData] = useState({
    title: title,
    body: body,
  });
  const [shouldRender, setShouldRender] = useState(false);
  console.log(ref2.current);
  useEffect(
    function () {
      let timer;
      console.log(excludeElementRef);
      function handleClickOutside(e) {
        if (
          ref2.current &&
          !ref2.current.contains(e.target) &&
          excludeElementRef.current &&
          !excludeElementRef.current.contains(e.target) &&
          isShowed
        ) {
          console.log("Are we even here");
          onClose();
        }
      }
      if (isShowed) {
        timer = setTimeout(() => {
          setShouldRender(true);
        }, 10);
        document.addEventListener("click", handleClickOutside);
      } else {
        setShouldRender(false);
        clearTimeout(timer);
        return () => document.removeEventListener("click", handleClickOutside);
      }
    },
    [isShowed]
  );
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name == "body") adjustTextareaHeight();
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log({ title: formData.title });
      var response;
      if (edit) {
        response = await fetch(
          `https://knowledge-sharing-1.onrender.com/api/v1/articles/${id}`,
          { method: "PATCH", headers: headers, body: JSON.stringify(formData) }
        );
      } else {
        response = await axios.post(
          `https://knowledge-sharing-git-master-mustafa-s-projects-4eb52aa8.vercel.app/api/v1/tracks/${slug}/articles`,
          formData,
          {
            headers,
          }
        );
      }
      onShowToast();
      onToastWord(process);
      onTest();
      console.log("aren we here ya");
      onClose();
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.height = "auto";
    textarea.height = `${textarea.scrollHeight}px`;
  };
  return (
    <>
      {" "}
      <div className="create-article-background">
        <div
          className={`article-form ${shouldRender ? "activated" : ""}`}
          ref={excludeElementRef}
        >
          {error && <Error err={error} />}
          <form className="actual-form" onSubmit={handleSubmit}>
            <label className="article-label">Title</label>
            <input
              className="article-input"
              placeholder="Enter the title"
              required
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
            <label className="article-label">Body</label>
            <textarea
              className="article-input text-area"
              placeholder="Enter the body"
              required
              name="body"
              value={formData.body}
              ref={textareaRef}
              onChange={handleChange}
            />
            <button style={{ pointerEvents: isLoading && "none" }}>
              {isLoading ? <Spinner /> : edit ? "Edit" : "publish"}
            </button>
            <span className="close-butt" onClick={onClose}>
              &times;
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateArticle;
