import SubTrack from "./SubTrack";

function Leaf({
  className,
  name,
  data,
  backgroundColor,
  isHovered,
  onHoverChange,
  showSubTracks,
}) {
  // var first = data.sub_sub_track[0].name;
  // var fourth = data.sub_sub_track[3].name;
  // if (className == "six") first = "Introduction to Continuous Integration";
  // if (className == "five") fourth = "Hosting Services";
  var classSub;
  if (
    className == "one" ||
    className == "two" ||
    className == "three" ||
    className == "ten" ||
    className == "four" ||
    className == "six"
  ) {
    classSub = "first";
  }
  if (
    className == "five" ||
    className == "eight" ||
    className == "nine" ||
    className == "twelve" ||
    className == "thirteen"
  ) {
    classSub = "second";
  }
  if (
    className == "seven" ||
    className == "eleven" ||
    className == "fourteen" ||
    className == "fifteen"
  )
    classSub = "third";
  function handleChange(value) {
    onHoverChange(value);
  }
  return (
    <div
      className={`big-wrapper-${className} ${classSub} big-wrapper ${
        isHovered != className && isHovered != "" ? "hidden" : "visible"
      }`}
    >
      <div
        className={`wrapper-${className} wrapper`}
        onMouseEnter={() => {
          handleChange(className);
        }}
        onMouseLeave={() => onHoverChange("")}
      >
        <div
          className={`${className} location`}
          style={{ borderColor: backgroundColor }}
        >
          <span className="text">{name}</span>
          {/* <span className="before"></span> */}
          <span
            className="before"
            style={{
              borderColor: `${backgroundColor} transparent transparent transparent`,
            }}
          ></span>
        </div>
      </div>
      {data.sub_sub_track.map((sub, index) => (
        <SubTrack
          name={sub.name}
          index={index}
          visible={isHovered == className && showSubTracks}
          key={index}
        />
      ))}
    </div>
  );
}

export default Leaf;
