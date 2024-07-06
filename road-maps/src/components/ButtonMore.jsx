import "./buttonMore.css";
function ButtonMore({ children, onClick = { onClick } }) {
  return (
    <button onClick={onClick} className="show-more">
      {children}
    </button>
  );
}

export default ButtonMore;
