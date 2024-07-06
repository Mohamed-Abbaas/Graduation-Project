import {
  faArrowLeft,
  faCheckCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./user.css";
import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import Article from "../components/Articles/Article";
import Spikes from "../components/Spikes";
import { getUser } from "../services/userApi";
import { useLoaderData, useNavigation } from "react-router";
import Loader from "../components/Loader";
function User() {
  const data = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  console.log(data);
  const lorem =
    " Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero numquam deleniti aspernatur aperiam magni beatae quod rerum consequuntur, cupiditate perferendis explicabo illum, asperiores quas veniam omnis facilis hic necessitatibus enim.";
  const imageUrl = data.data.imageUrl;
  console.log(imageUrl);
  const name = data.data.user.name;
  const role = data.data.user.role;
  const articles = data.data.user.articles;
  const [showToast, setShowToast] = useState(false);
  const [toastWord, SetToastWord] = useState("");
  function onToastWord(word) {
    SetToastWord(word);
  }
  function onShowToast() {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }
  function handleClick() {
    window.history.back();
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="user">
          <FontAwesomeIcon
            className="back-icon"
            icon={faArrowLeft}
            onClick={handleClick}
          />
          <div className="articles">
            <div className={`toastify ${showToast ? "active" : ""}`}>
              <FontAwesomeIcon className="success-icon" icon={faCheckCircle} />
              <p>{toastWord} Successfully</p>
            </div>
          </div>
          <Header />
          <div className="container">
            <div className="first-half">
              <div className="image">
                <img src={imageUrl} className="image" />
              </div>
              <p className="name">
                <span className="actual-name">
                  {role === "Software-engineer" ? "Eng: " : "Dr: "}
                  {name}
                </span>
              </p>
            </div>{" "}
          </div>
          <Spikes />
          <div className="second-half">
            <div class="articles container">
              <DashboardHeader title={"Articles"} />
              <div class=" articles-container">
                {articles.map((article) => (
                  <Article
                    article={article}
                    process="Deleted"
                    onShowToast={onShowToast}
                    onToastWord={onToastWord}
                  />
                ))}
                {/* <Article
              title="title"
              description={lorem}
              date={niceFormattedDate}
              imgSrc={"../../../public/test1.png"}
            /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export function loader({ params }) {
  const id = params.userId;
  const data = getUser(id);
  return data;
}
export default User;
