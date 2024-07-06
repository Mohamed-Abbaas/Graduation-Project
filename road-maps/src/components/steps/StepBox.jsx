import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./stepBox.css";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBook,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import Book from "./Book";
import Content from "./Content";
import { useState } from "react";
function StepBox({ track }) {
  const [slide, setSlide] = useState(true);
  const { name, books, courses } = track;
  function handleClick() {
    setSlide((slide) => !slide);
  }
  return (
    <div className="step-box">
      <h2>{name}</h2>
      <FontAwesomeIcon
        icon={faAngleDoubleRight}
        className="angle right-angle"
        onClick={handleClick}
      />
      <Content arr={books} type="books" handleSlide={setSlide} slide={slide}>
        <FontAwesomeIcon icon={faBook} />
      </Content>
      <Content arr={courses} type="courses" slide={slide}>
        <FontAwesomeIcon icon={faGraduationCap} />
      </Content>
    </div>
  );
}

export default StepBox;
