import {
  faBuilding,
  faCalendar,
  faGlobe,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./companyBox.css";
import { Link } from "react-router-dom";
function CompanyBox({ company, index, isShowed }) {
  const { founded, location, name, link } = company;

  const description = company["who we are"]
    ? company["who we are"]
    : company["description"];
  return (
    <div className={`company-box ${isShowed ? "behind" : ""}`}>
      <h2 className="title">{name}</h2>
      <div className="line">
        <FontAwesomeIcon icon={faCalendar} /> <p>Founded In {founded}</p>
      </div>
      <div className="line">
        <FontAwesomeIcon icon={faMapMarkedAlt} /> <p>{location}</p>
      </div>
      <div className="line">
        <FontAwesomeIcon icon={faBuilding} /> <p>{description}</p>
      </div>
      <div className="info">
        <span></span>
        <a target="_blank" href={link}>
          Details
        </a>
      </div>
    </div>
  );
}

export default CompanyBox;
