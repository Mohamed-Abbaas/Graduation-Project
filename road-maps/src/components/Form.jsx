import "./form.css";
function Form({ children, h2, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <h2>{h2}</h2>
      {children}
    </form>
  );
}

export default Form;
