import { Link } from "react-router-dom";
import "./button.css";
function Button({
  children,
  type,
  link = "",
  to = "",
  handleSubmit,
  typo,
  onClick,
  className,
}) {
  return (
    <>
      <button className={`${type} ${className}`} type={typo} onClick={onClick}>
        {children}
      </button>{" "}
      {link ? (
        <Link to={to} className="sign">
          {link}
        </Link>
      ) : (
        ""
      )}
    </>
  );
}

export default Button;
