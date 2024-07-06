import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import "./header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createUser, reset } from "../Features/userSlice";
import userSlice from "../Features/userSlice";
function Header({
  active,
  articles = false,
  onArticleForm,
  posts,
  onShowPostForm,
}) {
  const excludeElementRef = useRef(null);
  const excludeElementRef2 = useRef(null);
  const excludeElementRef3 = useRef(null);
  const excludeElementRef4 = useRef(null);
  const excludeElementRef5 = useRef(null);
  const excludeElementRef6 = useRef(null);
  const excludeElementRef7 = useRef(null);
  const location = useLocation();
  const [showSettingsList, setShowSettingsList] = useState(false);
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const token = Cookies.get("jwt");
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { name, imageUrl, email, role, verifiedAsExpert } = useSelector(
    (store) => store.user
  );
  const [showPopUp, setShowPopUp] = useState(false);
  function handleShowPopUp() {
    setShowPopUp((showPopUp) => !showPopUp);
  }
  function handleNavigateClick(e) {
    navigate(`${e.target.id}`);
  }
  function handleDashClick() {
    window.open("/dashboard/users", "_blank");
  }
  function handleClick() {
    setIsClicked(true);
  }
  function handleLogo() {
    navigate("/");
  }
  function handleInfoClick() {
    navigate("/info");
  }
  function handleLogOut() {
    dispatch(reset());
    Cookies.remove("jwt");
  }
  function onShowSettingsClick() {
    setShowSettingsList((showSettingsList) => !showSettingsList);
  }
  function handleNavigateAbout() {
    if (location.pathname == "/") {
      const element = document.getElementById("about");
      element.scrollIntoView({ behavior: "smooth" });
    } else navigate("/", { state: true });
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        excludeElementRef.current &&
        excludeElementRef2.current &&
        !excludeElementRef2.current.contains(event.target) &&
        !excludeElementRef.current.contains(event.target) &&
        isClicked
      ) {
        setIsClicked(false);
      }
      if (
        excludeElementRef3.current &&
        excludeElementRef4.current &&
        !excludeElementRef3.current.contains(event.target) &&
        !excludeElementRef4.current.contains(event.target) &&
        showSettingsList
      ) {
        setShowSettingsList(false);
      }
      if (
        excludeElementRef5.current &&
        excludeElementRef6.current &&
        !excludeElementRef5.current.contains(event.target) &&
        !excludeElementRef6.current.contains(event.target) &&
        showPopUp
      ) {
        setShowPopUp(false);
      } else if (excludeElementRef7.current.contains(event.target)) {
        setShowPopUp(false);
      }
    }
    async function getUserData() {
      if (!token) return;
      // Set the authorization header with the token
      if (name !== "") return;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setIsLoading(true);
      await axios
        .get(
          "https://knowledge-sharing-git-master-mustafa-s-projects-4eb52aa8.vercel.app/api/v1/users/getMe",
          {
            headers,
          }
        )
        .then((response) => {
          setUser(response.data.data);
          const image = response.data.data.imageUrl;
          const name = response.data.data.user.name;
          const email = response.data.data.user.email;
          const role = response.data.data.user.role;
          const id = response.data.data.user._id;
          const verifiedAsExpert = response.data.data.user.verifiedAsExpert;
          dispatch(createUser(name, image, email, role, verifiedAsExpert, id));
        })
        .catch((error) => console.error("Error:", error))
        .finally(() => {
          setIsLoading(false);
        });
    }
    getUserData();
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isClicked, showSettingsList, showPopUp]);
  return (
    <>
      {!isLoading && (
        <header>
          <div className="container header-container">
            <div className="logo-con" onClick={handleLogo}>
              <span className="logo">K-share</span>
              <span className="word">corporation</span>
            </div>
            <ul
              ref={excludeElementRef2}
              className={`${isClicked ? "clicked" : ""}`}
            >
              <li
                onClick={handleNavigateClick}
                id="/"
                className={`${active === "home" ? "active" : ""}`}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                onClick={handleNavigateClick}
                id="/newsLetter"
                className={`${active == "newsLetter" ? "active" : ""}`}
              >
                <Link to="/newsLetter">News Letter</Link>
              </li>
              <li
                className={`${active === "community" ? "active" : ""}`}
                onClick={handleNavigateClick}
                id="/community"
              >
                Community
              </li>
              <li
                onClick={handleNavigateClick}
                id="/contact"
                className={`${active === "contact" ? "active" : ""}`}
              >
                <Link to="/contact">Contact</Link>
              </li>
              <li onClick={handleNavigateAbout}>About Us</li>
            </ul>
            <div className="buttons">
              {articles && verifiedAsExpert ? (
                <button className="publish" onClick={onArticleForm}>
                  {" "}
                  publish
                </button>
              ) : name != "" && !verifiedAsExpert && posts ? (
                <button onClick={onShowPostForm} className="post-button">
                  Post
                </button>
              ) : name != "" ? (
                <img className="user-image" src={`${imageUrl}`} />
              ) : (
                <Link to="/login" className="button signn">
                  Sign In
                </Link>
              )}
              {name != "" ? (
                <>
                  <div className="logout" onClick={handleShowPopUp}>
                    <FontAwesomeIcon
                      ref={excludeElementRef5}
                      className="logout-icon"
                      icon={faSignOutAlt}
                    />
                    {showPopUp && (
                      <div className="logout-popup" ref={excludeElementRef6}>
                        <p>Are you sure you wanna logout?</p>
                        <div className="yes-no">
                          <button
                            className="confirm-logout"
                            onClick={handleLogOut}
                          >
                            Yes
                          </button>
                          <button
                            ref={excludeElementRef7}
                            className="cancel-logout"
                            onClick={() => {
                              setShowPopUp((showPopUp) => !showPopUp);
                            }}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="settings-icon">
                    <FontAwesomeIcon
                      className="the-settings-icon"
                      icon={faCog}
                      ref={excludeElementRef4}
                      onClick={onShowSettingsClick}
                    />

                    <ul
                      ref={excludeElementRef3}
                      className={`settings-list ${
                        showSettingsList ? "showed" : ""
                      }`}
                    >
                      <li onClick={handleInfoClick}>Account Info</li>
                      {role == "Admin" && (
                        <li onClick={handleDashClick}>Dashboard</li>
                      )}
                    </ul>
                  </div>
                </>
              ) : (
                <Link to="/register" className="button join">
                  Join Now
                </Link>
              )}
              <FontAwesomeIcon
                ref={excludeElementRef}
                className="icon"
                onClick={handleClick}
                icon={faBars}
              />
            </div>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
