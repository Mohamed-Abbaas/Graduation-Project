import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.css";
import {
  faCog,
  faEdit,
  faFileAlt,
  faList,
  faNewspaper,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
function SideBar() {
  const navigate = useNavigate();
  function handleNavigateClick(e) {
    console.log(e.target.id);
    console.log("are we even here");
    navigate(e.target.id);
  }
  return (
    <div className="sidebar">
      <h3>Dashboard</h3>
      <ul>
        <li onClick={handleNavigateClick} id="/dashboard/users">
          <Link className="link" id="/dashboard/users">
            <FontAwesomeIcon
              id="/dashboard/users"
              className="sidebar-icon"
              icon={faUsers}
            />
            <span id="/dashboard/users">Manage Users</span>
          </Link>
        </li>
        <li onClick={handleNavigateClick} id="/dashboard/articles">
          <Link className="link" id="/dashboard/articles">
            <FontAwesomeIcon
              id="/dashboard/articles"
              className="sidebar-icon"
              icon={faNewspaper}
            />
            <span id="/dashboard/articles">Manage Articles</span>
          </Link>
        </li>
        <li onClick={handleNavigateClick} id="/dashboard/posts">
          <Link className="link" id="/dashboard/posts">
            <FontAwesomeIcon
              id="/dashboard/posts"
              className="sidebar-icon"
              icon={faFileAlt}
            />
            <span id="/dashboard/posts">Manage Posts</span>
          </Link>
        </li>

        <li onClick={handleNavigateClick} id="/dashboard/rules">
          <Link id="/dashboard/rules" className="link">
            <FontAwesomeIcon
              id="/dashboard/rules"
              className="sidebar-icon"
              icon={faEdit}
            />
            <span id="/dashboard/rules">Edit Roles</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
