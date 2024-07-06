import "./book.css";
function Book({ book, type }) {
  var link, bookName, description, author, publishDate;
  if (type == "books") {
    bookName = book.bookName;
    description = book.description;
    author = book.author;
    publishDate = book.publishDate;
  }
  if (type == "courses") {
    console.log(book.courseName);
    bookName = book.courseName;
    description = book.description;
    author = book.instructorName;
  }
  link = book.link;
  var short = bookName.substr(0, 11);
  var arr = author.split(" ");
  var res = arr.slice(0, 2);
  var result = res.join(" ");
  if (result.length > 15) {
    arr = result.split(" ");
    res = arr.slice(0, 1);
    result = res.join(" ");
  }
  return (
    <a className="book-container" href={link} target="_blank">
      <h3 className="book-title">
        <span className="title">title: </span>
        <span className="short">{short}</span>
        {short.length < bookName.length && <span>...</span>}
      </h3>
      {/* <p className="description">
        <span className="title">
          desc: <span className="descriptionn">{description}</span>
        </span>
      </p> */}
      <p className="author">
        <span className="title">
          {type == "books" ? "author:" : "inst:"}{" "}
          <span className="short">{result}</span>
        </span>
      </p>
      {type == "books" ? (
        <p className="publish">
          <span className="title">
            published in: <span className="short">{publishDate}</span>
          </span>
        </p>
      ) : (
        <></>
      )}
      <a href={link} target="_blank" className="details">
        Details
      </a>
    </a>
  );
}

export default Book;
