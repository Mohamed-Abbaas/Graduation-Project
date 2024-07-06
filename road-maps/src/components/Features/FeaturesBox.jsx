import "./featuresBox.css";
function FeaturesBox({ children, title, parag }) {
  return (
    <div className="features-box">
      {children}
      <div className="text">
        <h3>{title}</h3>
        <p>{parag}</p>
      </div>
    </div>
  );
}

export default FeaturesBox;
