import { Link, useNavigate } from "react-router-dom";
import "./course.css";
import { useState } from "react";
function Course({ src, title, description, mainColor, slug }) {
  const [isHovered, setIsHovered] = useState(false);
  const beforeColor = `${mainColor}60`;
  const navigate = useNavigate();
  if (title == "computer-funamentals") title = "fundamentals";
  else if (title == "computer-skills") title = "skills";
  else title = title.split("-")[0];
  console.log(slug);
  const beforeStyle = {
    backgroundColor: beforeColor,
  };
  function handleMouseEnter() {
    setIsHovered(true);
  }
  const afterStyle = {
    backgroundColor: mainColor,
    width: title.length === 2 ? "100%" : "calc(100% - 30px)",
    left: title.length === 2 ? 0 : "15px",
  };
  function handleMouseLeave() {
    setIsHovered(false);
  }
  function handleClick() {
    navigate(`/companies/${slug}`);
  }
  const size = "200% 100%";
  const position = `right bottom`;
  const position2 = `left bottom`;
  const color = "white";
  const gradient = `linear-gradient(to right, ${mainColor} 50%, white 50%)`;
  const linkStyle = {
    color: isHovered ? color : mainColor,
    borderColor: mainColor,
    background: gradient,
    backgroundSize: size,
    backgroundPosition: isHovered ? position2 : position,
  };
  return (
    <div
      onClick={handleClick}
      className="course"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-main-color={mainColor}
    >
      <div className="img-holder" data-main-color={mainColor}>
        <div className="img-holder-before" style={beforeStyle}></div>
        <img src={src} />
      </div>
      <h2>
        {title} <div className="h2-after" style={afterStyle}></div>
      </h2>
      <p>{description}</p>
      <Link style={linkStyle}>more</Link>
    </div>
  );
}

export default Course;
