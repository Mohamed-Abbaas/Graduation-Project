import { useLoaderData, useNavigation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { getFirst, getRoadMap } from "../services/tracksApi";
import "./roadmap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import Leaf from "../components/Roadmaps/Leaf";
import { useState } from "react";
import Loader from "../components/Loader";
function Roadmap() {
  const dataen = useLoaderData();
  const datae = dataen.data;
  const navigation = useNavigation();
  const data = datae.finalSubTracks;
  const paramData = useParams();
  const slug = paramData.trackSlug;
  const [showSubTracks, setShowSubTracks] = useState(false);
  const isLoading = navigation.state == "loading";
  const [isHovered, setIsHovered] = useState("");
  const colors = [
    "#ffccab",
    "#64cbe6",
    "#a8d2d4",
    "#15bf9e",
    "#f3b2db",
    "#ffb7b0",
    "#c4dfb1",
    "#bbe2e8",
    "#ffdcad",
    "#cdbdf6",
    "#9d87f5",
    "#df2323",
    "#74876d",
    "#015c67",
    "#68597c",
  ];
  const classNames15 = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
  ];
  const classNames14 = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
  ];
  const classNames12 = [
    "one",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "eleven",
    "twelve",
    "fourteen",
    "fifteen",
  ];
  const classNames11 = [
    "one",
    "three",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "eleven",
    "twelve",
    "fourteen",
    "fifteen",
  ];
  const classNames10 = [
    "one",
    "three",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "eleven",
    "twelve",
    "fifteen",
  ];
  const classNames8 = [
    "one",
    "three",
    "five",
    "six",
    "nine",
    "eleven",
    "twelve",
    "fifteen",
  ];
  function onShowSubTracks() {
    setShowSubTracks((showSubTracks) => !showSubTracks);
  }
  var classNames = classNames15;
  function onHoverChange(className) {
    setIsHovered(className);
  }
  if (data.length === 14) classNames = classNames14;
  if (data.length === 12) classNames = classNames12;
  if (data.length === 11) classNames = classNames11;
  if (data.length == 10) classNames = classNames10;
  if (data.length == 8) classNames = classNames8;
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="road-map">
            <div
              className={`road-map-layout ${
                isHovered != "" && showSubTracks && "visible"
              }`}
            ></div>
            <Header />
            <div className="road-map-container">
              {data.map((val, index) => (
                <Leaf
                  className={classNames[index]}
                  name={data[index].name}
                  data={data[index]}
                  backgroundColor={colors[index]}
                  isHovered={isHovered}
                  onHoverChange={onHoverChange}
                  showSubTracks={showSubTracks}
                />
              ))}
              <img src="../../public/roadmap.png" />
            </div>
            <Pagination active="roadmap" slug={slug} />
          </div>
          <div className="show-sub-road-map">
            <p>Show Sub Tracks while hovering</p>
            <div
              onClick={onShowSubTracks}
              className={`toggle-switch ${showSubTracks && "clicked"}`}
            >
              <div className="icon">
                {showSubTracks ? <FontAwesomeIcon icon={faCheck} /> : "X"}
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
}
export async function loader({ params }) {
  const trackSlug = params.trackSlug;
  const data = await getRoadMap(trackSlug);
  return { data };
}
export default Roadmap;
