import MainTitle from "../../Features/MainTitle";
import Step from "./Step";
import "./stepsCon.css";
function StepsCon({ steps }) {
  const colors = [
    "#ffccab",
    "#f8e2ff",
    "#a8d2d4",
    "#fdf7d0",
    "#f3b2db",
    "#ffb7b0",
    "#c4dfb1",
    "#bbe2e8",
    "#ffdcad",
    "#cdbdf6",
  ];
  console.log(steps);
  return (
    <div className="container steps-con">
      <MainTitle title="Track-Skills" />
      {steps.map(
        (step, index) =>
          step.length > 100 && (
            <Step step={step} color={colors[index]} index={index + 1} />
          )
      )}
    </div>
  );
}

export default StepsCon;
