import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faRoute, faMapSigns } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./awesomeIcon.css";
import { useState } from "react";
function AwesomeIcon({ icon, color }) {
  const [isHovered, setIsHovered] = useState(false);
  function handleMouseEnter() {
    setIsHovered(true);
  }
  function handleMouseLeave() {
    setIsHovered(false);
  }
  const style = {
    backgroundColor: color,
  };
  return (
    <li
      className="lilili"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link className="aaa" style={isHovered ? style : {}}>
        <FontAwesomeIcon className="icon" icon={icon} />
      </Link>
    </li>
  );
}

export default AwesomeIcon;
