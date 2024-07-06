import { useSelector } from "react-redux";
import MainTitle from "../components/Features/MainTitle";
import Header from "../components/Header";
import "./newsLetter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import NewsTrack from "../components/NewsTrack";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";
import axios from "axios";
import Error from "../components/Error";
import Cookies from "js-cookie";
import { useNavigation } from "react-router";
import Loader from "../components/Loader";
function NewsLetter() {
  const { name } = useSelector((store) => store.user);
  const navigation = useNavigation();
  const navigationLoading = navigation.state == "loading";
  const [isLoading, setIsLoading] = useState(false);
  const [trackSlug, setTrackSlug] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const token = Cookies.get("jwt");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const colors = [
    "#f44036",
    "#800000",
    "#03a9f4",
    "#39CCCC",
    "#009688",
    "#AAAAAA",
    "#556B2F",
    "#4B0082",
  ];
  function onShowToast() {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }
  function handleChange(e) {
    if (e.target.value == trackSlug) {
      setTrackSlug("");
      return;
    }
    setTrackSlug(e.target.value);
    console.log(trackSlug);
  }
  const selectors = [
    { slug: "front-end", color: "#f44036" },
    { slug: "artificial-intelligence", color: "#800000" },
    { slug: "back-end", color: "#03a9f4" },
    { slug: "cyber-security", color: "#39CCCC" },
    { slug: "mobile-development", color: "#009688" },
    { slug: "DevOps", color: "#2196f3" },
    { slug: "computer-skills", color: "#556B2F" },
    { slug: "computer-funamentals", color: "#4B0082" },
  ];
  var fir;
  if (name.length != 0) {
    [fir] = name.split(" ");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (trackSlug == "") return;
    try {
      const response = await fetch(
        `https://knowledge-sharing-1.onrender.com/api/v1/newsletters/${trackSlug}`,
        { headers, method: "PATCH" }
      );
      onShowToast();
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(fir);
  return (
    <>
      {navigationLoading ? (
        <Loader />
      ) : (
        <div className="news-letter">
          <Toast toastWord="Subscribed" showToast={showToast} />
          <Header active="newsLetter" />
          {/* <MainTitle title="NewsLetter" /> */}
          <div className="news-container container">
            <div className="upper">
              <div className="news-image">
                <img className="the-image" src="../../public/news.jpg" />{" "}
              </div>
              <div className="text">
                <h1>How Are You, {name.length != 0 ? fir : ""}?</h1>
                <div className="small-text">
                  <FontAwesomeIcon icon={faStickyNote} />
                  <p>
                    Welcome to our Weekly newsLetter stay informed and inspired
                    with our curated selection of industry insights, expert tips
                    and exclusive updates delivered to your inbox every week
                  </p>
                </div>
                <div className="small-text">
                  <FontAwesomeIcon icon={faStickyNote} />
                  <p>
                    Unlock a world of knowledge with our weekly newsLetter
                    delivered fresh to your inbox
                  </p>
                </div>
              </div>
            </div>
            <>
              {name == "" ? (
                <p>!you have to login to unlock this service</p>
              ) : (
                <div className="lower">
                  <hr />
                  <h2>Choose the track you are interested in:</h2>
                  <form className="news-form" onSubmit={handleSubmit}>
                    {error && <Error err={error} />}
                    {selectors.map((selector, index) => (
                      <>
                        <NewsTrack
                          selector={selector}
                          onChange={handleChange}
                          trackSlug={trackSlug}
                          key={selector.color}
                        />
                      </>
                    ))}
                    <button
                      className={`news-button ${
                        trackSlug != "" ? "working" : ""
                      }`}
                      style={{
                        pointerEvents:
                          isLoading || trackSlug == "" ? "none" : "auto",
                      }}
                    >
                      {isLoading ? <Spinner /> : "Submit"}
                    </button>
                  </form>
                </div>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
}

export default NewsLetter;
