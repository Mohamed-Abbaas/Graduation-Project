import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./article.css";
import { faEllipsisV, faTurkishLira } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../../services/ArticlesApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Error from "../Error";
import Cookies from "js-cookie";
import CreateArticle from "./CreateArticle";
function Article({
  article,
  theArticle = false,
  slug = "",
  process,
  onShowToast,
  onToastWord,
  user = false,
  fresh = false,
  onTest,
}) {
  // title, date, description, imgSrc
  var imgSrc = article.user.photo;
  var title = article.title;
  var date = formatDate(article.publishedAt);
  var description;
  var id = article._id;
  var flag = article.body.length < 600;
  var name = article.user.name;
  var role = article.user.role;
  var result5;
  if (role == "Doctor") result5 = "Dr:";
  else {
    result5 = "Eng:";
  }
  const [duplicated, setDuplicated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showArticleForm, setShowArticleForm] = useState(false);
  const { id: myId } = useSelector((store) => store.user);
  const articleId = article.user._id;
  if (flag || theArticle) description = article.body;
  else description = article.body.substr(0, 600);
  console.log(date);
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState("");
  const excludeElementRef = useRef(null);
  const excludeElementRef3 = useRef(null);
  const excludeElementRef2 = useRef(null);
  const [success, setSuccess] = useState(false);
  const token = Cookies.get("jwt");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  function extractDuplicatedSubstring(string, duplicatedSubstring) {
    if (string.startsWith(duplicatedSubstring + duplicatedSubstring)) {
      return duplicatedSubstring;
    }
    return null;
  }
  function extractNonDuplicatedPart(string, duplicatedSubstring) {
    if (string.startsWith(duplicatedSubstring + duplicatedSubstring)) {
      return string.substring(duplicatedSubstring.length * 2);
    }
    return string;
  }
  // var otherPart = extractNonDuplicatedPart(mainString, duplicatedSubstring);
  // var mainString = imgSrc;
  var duplicatedSubstring =
    "http://knowledge-sharing-1.onrender.com/img/users/";
  const result = extractDuplicatedSubstring(imgSrc, duplicatedSubstring);
  console.log(result);
  const result2 = extractNonDuplicatedPart(imgSrc, duplicatedSubstring);
  console.log(result2);
  var result3 = result + result2;
  if (result == null) result3 = imgSrc;
  // var extractedString = extractDuplicatedSubstring(
  //   mainString,
  //   duplicatedSubstring
  // );

  // if (extractedString) {
  //   console.log("Duplicated substring found:", extractedString);
  //   setDuplicated(true);
  // } else {
  //   console.log("Duplicated substring not found.");
  // }
  function handleImageClick() {
    if (user) return;
    navigate(`/user/${articleId}`);
  }
  // var res;
  // res = extractedString + otherPart;

  function handleClickThree() {
    setIsClicked((isClicked) => !isClicked);
  }
  function onArticleForm() {
    setShowArticleForm((showArticleForm) => !showArticleForm);
  }
  function handleEditClick() {
    setShowArticleForm(true);
  }
  async function handleDelete() {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `https://knowledge-sharing-1.onrender.com/api/v1/articles/${id}`,
        { headers }
      );
      console.log(response.data);
      if (response.data.status == "success") {
        if (theArticle) window.history.back();
        else {
          setSuccess(true);
          onToastWord(process);
          onShowToast();
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       excludeElementRef.current &&
  //       excludeElementRef2.current &&
  //       !excludeElementRef.current.contains(event.target) &&
  //       !excludeElementRef2.current.contains(event.target) &&
  //       isClicked
  //     ) {
  //       setIsClicked(false);
  //     }
  //   }
  //   document.addEventListener("click", handleClickOutside);
  //   return () => document.removeEventListener("click", handleClickOutside);
  // }, [isClicked]);
  return (
    <>
      {!success && (
        <div class="article-box">
          {showArticleForm && (
            <CreateArticle
              onClose={onArticleForm}
              isShowed={showArticleForm}
              ref2={excludeElementRef3}
              slug={slug}
              onShowToast={onShowToast}
              process={"Edited"}
              onToastWord={onToastWord}
              id={id}
              edit={true}
              body={article.body}
              onTest={onTest}
              title={article.title}
            />
          )}
          {error && <Error err={error} />}
          {myId == articleId && (
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
              >
                <li ref={excludeElementRef3} onClick={handleEditClick}>
                  Edit
                </li>
                <li onClick={handleDelete}>Delete</li>
              </ul>
            </>
          )}
          <img
            decoding="async"
            src={result3.startsWith("null") ? result3.substr("null") : result3}
            onClick={handleImageClick}
          />
          <h3 className="name">{`${result5} ${name}`}</h3>
          <h1 className="title">{title}</h1>
          <p>
            {description}{" "}
            {!flag && !theArticle && (
              <Link
                className="more"
                to={{ pathname: `/article/${id}`, state: { slug: slug } }}
              >
                Show More...
              </Link>
            )}
          </p>
          <span className="date">{date}</span>
        </div>
      )}
    </>
  );
}

export default Article;
