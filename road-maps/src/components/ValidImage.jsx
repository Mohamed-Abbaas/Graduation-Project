import "./validImage.css";
function ValidImage({ src }) {
  return (
    <div className="right">
      <img className="valid-image" src={src} />
    </div>
  );
}

export default ValidImage;
