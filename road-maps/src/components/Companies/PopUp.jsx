import { useEffect, useRef } from "react";
import { useState } from "react";
import "./popup.css";
function PopUp({ text, onClose, isShowed, ref2, showed }) {
  const excludeElementRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);
  console.log(ref2);
  useEffect(
    function () {
      let timer;
      console.log(excludeElementRef);
      function handleClickOutside(e) {
        if (
          ref2.current &&
          excludeElementRef.current &&
          !ref2.current.contains(e.target) &&
          !excludeElementRef.current.contains(e.target) &&
          isShowed
        ) {
          onClose();
        }
      }
      if (isShowed) {
        timer = setTimeout(() => {
          setShouldRender(true);
        }, 10);
        document.addEventListener("click", handleClickOutside);
      } else {
        setShouldRender(false);
        clearTimeout(timer);
        setShouldRender(false);
        return () => document.removeEventListener("click", handleClickOutside);
      }
    },
    [isShowed]
  );
  return (
    <>
      {" "}
      <div className="popup-background">
        <div
          className={`popup-content ${shouldRender ? "activated" : ""}`}
          ref={excludeElementRef}
        >
          <button onClick={onClose}>&times;</button>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}

export default PopUp;
