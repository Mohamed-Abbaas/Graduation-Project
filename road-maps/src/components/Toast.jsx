import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./toast.css";
function Toast({ toastWord, showToast }) {
  console.log(showToast);
  return (
    <div className={`toastify ${showToast ? "active" : ""}`}>
      <FontAwesomeIcon className="success-icon" icon={faCheckCircle} />
      <p>{toastWord} Successfully</p>
    </div>
  );
}

export default Toast;
