import "./input.css";
function Input({ id, label, children }) {
  return (
    <>
      <label className="regular-label" htmlFor={id}>
        {label}
      </label>
      {children}
    </>
  );
}

export default Input;
