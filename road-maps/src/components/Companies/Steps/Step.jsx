import { useRef, useState } from "react";
import "./step.css";
import PopUp from "../../Companies/PopUp";
import { useDispatch } from "react-redux";
function Step({ step, color, index }) {
  const colonIndex = step.indexOf(":");
  const slashIndex = step.indexOf("Skills");
  const backIndex = step.indexOf("\n");
  const question = slashIndex != -1 ? slashIndex - 10 : backIndex - 10;
  const [isShowed, setIsShowed] = useState(false);
  const excludeElementRef = useRef(null);
  const name = step.substr(colonIndex + 2, question);
  const str = step.substr(slashIndex + 7, 90);
  function handleClose() {
    setIsShowed(false);
  }

  return (
    <div className="step">
      {isShowed && (
        <PopUp
          text={step}
          onClose={handleClose}
          isShowed={isShowed}
          ref2={excludeElementRef}
        />
      )}
      {index % 2 ? (
        <>
          {" "}
          <div
            className="left"
            style={{
              backgroundColor: color,
              borderRadius: "50px 0 0 50px",
              alignItems: "end",
              marginRight: "-30px",
              zIndex: "-1",
              textAlign: "right",
            }}
          >
            <span>{index == 10 ? "10" : `0${index}`}</span>
            <span>{name}</span>
            <span
              className="before"
              style={{ backgroundColor: `${color}60`, right: "-11px" }}
            ></span>
          </div>
          <div className="right" style={{ paddingLeft: "50px" }}>
            {str}{" "}
            <span
              className="more"
              onClick={() => setIsShowed(true)}
              ref={excludeElementRef}
            >
              Show More...
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="right" style={{ paddingRight: "50px" }}>
            {str}{" "}
            <span
              className="more"
              onClick={() => setIsShowed(true)}
              ref={excludeElementRef}
            >
              Show More...
            </span>
          </div>
          <div
            className="left"
            style={{
              backgroundColor: color,
              borderRadius: "0 50px 50px 0",
              alignItems: "start",
              marginLeft: "-30px",
              zIndex: "-1",
              textAlign: "left",
            }}
          >
            <span>{index == 10 ? "10" : `0${index}`}</span>
            <span>{name}</span>
            <span
              className="before"
              style={{ backgroundColor: `${color}60`, left: "-11px" }}
            ></span>
          </div>
        </>
      )}
    </div>
  );
}

export default Step;
