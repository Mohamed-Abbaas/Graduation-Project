import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Book from "./Book";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

function Content({ arr, children, type, slide }) {
  const slidenhom = type == "books" && slide == false ? "slide-right" : "";
  const slidenhom2 = type == "courses" && slide == true ? "slide-right" : "";
  const condStyle = { top: "20%", position: "absolute", width: "100%" };
  return (
    <div
      className={`books ${slidenhom} ${slidenhom2}`}
      style={type === "courses" ? condStyle : {}}
    >
      <div className="books-header">
        {children}
        <p>{type == "books" ? "Books" : "Courses"}</p>
      </div>
      <div className="books-container">
        {arr.map((book, index) => (
          <Book book={book} key={index} type={type} />
        ))}
      </div>
    </div>
  );
}

export default Content;
