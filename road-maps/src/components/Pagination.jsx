import { Link } from "react-router-dom";
import "./pagination.css";
function Pagination({ active, slug, isShowed = true }) {
  console.log(slug);
  return (
    <div className="container">
      <ul className="pagination">
        <Link
          className={`${active === "overview" ? "active" : ""}`}
          to={`/companies/${slug}`}
        >
          Overview
        </Link>
        <Link
          to={`/roadmap/${slug}`}
          className={`${active === "roadmap" ? "active" : ""}`}
        >
          Roadmap
        </Link>
        <Link
          className={`${active === "steps" ? "active" : ""}`}
          to={`/steps/${slug}`}
        >
          Steps
        </Link>
        <Link
          className={`${active == "articles" && isShowed ? "active" : ""}`}
          to={`/articles/${slug}`}
        >
          Articles
        </Link>
      </ul>
    </div>
  );
}
23;

export default Pagination;
