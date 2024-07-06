function SubTrack({ name, index, visible }) {
  return (
    <span className={`sub${index + 1} sub ${visible ? "visible" : ""}`}>
      {name} <span className={`before-sub ${visible ? "behind" : ""}`}></span>
    </span>
  );
}

export default SubTrack;
