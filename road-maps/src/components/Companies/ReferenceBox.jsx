import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./referenceBox.css";
import {
  faArrowRight,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
function ReferenceBox({ reference }) {
  const { title, description, link } = reference;
  return (
    <a target="_blank" href={link} className="reference-box">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="info">
        <a target="_blank" href={link}>
          Read More
        </a>
        <FontAwesomeIcon icon={faLongArrowAltRight} />
      </div>
    </a>
  );
}

export default ReferenceBox;
