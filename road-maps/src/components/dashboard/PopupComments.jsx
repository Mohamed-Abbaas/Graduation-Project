import { useEffect, useRef, useState } from "react";
import "./popupComments.css";
function PopupComments({ children, ref2, isShowed, onClose }) {
  console.log(children);
  const excludeElementRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(
    function () {
      let timer;
      function handleClickOutside(e) {
        if (
          ref2.current &&
          !ref2.current.contains(e.target) &&
          excludeElementRef.current &&
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
        return () => document.removeEventListener("click", handleClickOutside);
      }
    },
    [isShowed]
  );
  return (
    <div className="comments-background">
      <div
        className={`the-comments ${shouldRender ? "activated" : ""}`}
        ref={excludeElementRef}
      >
        {children}
        <span className="close-butt" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
}

export default PopupComments;
