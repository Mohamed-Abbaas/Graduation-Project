import { useLoaderData, useNavigation, useParams } from "react-router-dom";
import Header from "../components/Header";
import { getArticles } from "../services/tracksApi";
import Pagination from "../components/Pagination";
import { useEffect, useRef, useState } from "react";
import CreateArticle from "../components/Articles/CreateArticle";
import "./articles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Article from "../components/Articles/Article";
import MainTitle from "../components/Features/MainTitle";
import Loader from "../components/Loader";
function Articles() {
  const params = useParams();
  const slug = params.trackSlug;
  const [showArticleForm, setShowArticleForm] = useState(false);
  const navigation = useNavigation();
  var articlesFetched = useLoaderData();
  const [articles, setArticles] = useState(articlesFetched.articles);
  const excludeElementRef = useRef(null);
  const isLoading = navigation.state === "loading";
  const [showToast, setShowToast] = useState(false);
  const [toastWord, SetToastWord] = useState("");
  const [test, setTest] = useState(false);
  const [freshArticles, setFreshArticles] = useState([]);
  function onToastWord(word) {
    SetToastWord(word);
  }
  function onShowToast() {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }
  function onTest() {
    setTest((test) => !test);
  }
  function onFreshArticles(newArticle) {
    setFreshArticles([...freshArticles, newArticle]);
  }
  function onArticleForm() {
    setShowArticleForm((showArticleForm) => !showArticleForm);
  }
  const reversedFreshArticles = freshArticles.slice().reverse();
  useEffect(() => {
    async function getArticlesEffect() {
      var fetchedArticles = await getArticles();
      setArticles(fetchedArticles.articles);
    }
    getArticlesEffect();
  }, [test]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="articles">
          <div className={`toastify ${showToast ? "active" : ""}`}>
            <FontAwesomeIcon className="success-icon" icon={faCheckCircle} />
            <p>{toastWord} Successfully</p>
          </div>
          <div className="the-header" ref={excludeElementRef}>
            <Header articles={true} onArticleForm={onArticleForm} />
          </div>
          {showArticleForm && (
            <CreateArticle
              onClose={onArticleForm}
              isShowed={showArticleForm}
              ref2={excludeElementRef}
              slug={slug}
              onShowToast={onShowToast}
              process={"published"}
              onToastWord={onToastWord}
              onFreshArticles={onFreshArticles}
              onTest={onTest}
            />
          )}
          <MainTitle title="Articles" />
          <div className="articles-container">
            <div className="actual-articles container">
              {/* {reversedFreshArticles.map((article) => (
                <Article
                  article={article}
                  key={article._id}
                  slug={slug}
                  process="Deleted"
                  onShowToast={onShowToast}
                  onToastWord={onToastWord}
                  fresh={true}
                />
              ))} */}
              {articles.map((article) => (
                <Article
                  article={article}
                  key={article._id}
                  slug={slug}
                  process="Deleted"
                  onShowToast={onShowToast}
                  onToastWord={onToastWord}
                  onTest={onTest}
                />
              ))}
            </div>
          </div>
          <Pagination
            active="articles"
            slug={slug}
            isShowed={!showArticleForm}
          />
        </div>
      )}
    </>
  );
}
export function loader({ params }) {
  const trackSlug = params.trackSlug;
  const data = getArticles(trackSlug);
  return data;
}
export default Articles;
