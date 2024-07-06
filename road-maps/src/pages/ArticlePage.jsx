import {
  unstable_HistoryRouter,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { getArticle } from "../services/ArticlesApi";
import Article from "../components/Articles/Article";
import Header from "../components/Header";
import "./articlePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Loader";
function ArticlePage() {
  const data = useLoaderData();
  const article = data.data.article;

  const navigation = useNavigation();
  const isLoading = navigation.state == "loading";
  console.log(data);
  function handleClick() {
    window.history.back();
  }
  const location = useLocation();
  // const slug = location.state.slug;
  console.log(location.state);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="article-page">
          <Header />
          <FontAwesomeIcon
            className="back-icon"
            icon={faArrowLeft}
            onClick={handleClick}
          />
          <div className="the-article">
            <div className="the-article-container container">
              <Article article={article} theArticle={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export function loader({ params }) {
  const id = params.id;
  const data = getArticle(id);
  console.log(data);
  return data;
}
export default ArticlePage;
