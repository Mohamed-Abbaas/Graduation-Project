import { Link } from "react-router-dom";
import "./pagination.css";
function Pagination({ active, slug }) {
  console.log(slug);
  return (
    <div className="container">
      <ul className="pagination">
        <li className={`${active === "overview" ? "active" : ""}`}>
          <Link to={`/companies/${slug}`}>Overview</Link>
        </li>
        <li>
          <Link>Roadmap</Link>
        </li>
        <li className={`${active === "steps" ? "active" : ""}`}>
          <Link to={`/steps/${slug}`}>Steps</Link>
        </li>
        <li>
          <Link>Articles</Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
