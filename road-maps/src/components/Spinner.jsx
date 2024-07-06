import "./spinner.css";
function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <span className="submitting">Submitting...</span>
    </div>
  );
}

export default Spinner;
