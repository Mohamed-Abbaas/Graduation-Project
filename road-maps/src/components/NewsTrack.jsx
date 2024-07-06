import { useState } from "react";
import "./newsTrack.css";
function NewsTrack({ selector, onChange, trackSlug }) {
  const { slug, color } = selector;
  const hoveredColor1 = `${color}60`;
  const hoveredColor2 = `${color}40`;
  const hoveredColor3 = `${color}80`;
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseEnter(e) {
    const sluginhom = e.target.getAttribute("htmlFor");
    if (slug == trackSlug) return;
    setIsHovered(true);
    console.log("Yes We are here you idiot");
  }
  function handleMouseLeave() {
    setIsHovered(false);
    console.log("we are out you idiot");
  }
  return (
    <>
      <label
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="news-label"
        htmlFor={slug}
        style={{
          backgroundColor: isHovered
            ? `${hoveredColor2}`
            : slug == trackSlug
            ? `${hoveredColor3}`
            : "#ececec",
        }}
      >
        <span
          className="news-before"
          style={{
            backgroundColor: isHovered
              ? `${hoveredColor1}`
              : slug == trackSlug
              ? `${color}`
              : "white",
          }}
        ></span>
        <p>
          Choose <span className="slug">{slug}</span> and receive weekly
          articles{" "}
        </p>
      </label>
      <input
        className="news-input"
        type="radio"
        name="track"
        id={slug}
        value={slug}
        checked={trackSlug === { slug }}
        onChange={onChange}
      />
    </>
  );
}

export default NewsTrack;
