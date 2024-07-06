import {
  useLoaderData,
  useLocation,
  useNavigation,
  useParams,
} from "react-router-dom";
import { getSource, getTrack } from "../services/tracksApi";
import Header from "../components/Header";
import "./companies.css";
import { useEffect, useRef, useState } from "react";
import PopUp from "../components/Companies/PopUp";
import CompanyBox from "../components/Companies/CompanyBox";
import ReferenceBox from "../components/Companies/ReferenceBox";
import MainTitle from "../components/Features/MainTitle";
import StepsCon from "../components/Companies/Steps/StepsCon";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
function Companies() {
  const [isShowed, setIsShowed] = useState(false);
  const excludeElementRef = useRef(null);
  const location = useLocation();
  const { trackSlug } = useParams();
  const src = getSource(trackSlug);
  const steps =
    trackSlug == "computer-funamentals" || trackSlug == "computer-skills"
      ? true
      : false;
  const { track } = useLoaderData();
  const instructions = steps ? track.importance.split("\n \n") : "";
  const description = steps ? track.caseStudy : track.description;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  function handleIsShowed() {
    setIsShowed((isShowed) => !isShowed);
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="companies">
          <Header />
          <div className="description">
            <div className="container">
              <div className="text">
                <h1>{track.name}</h1>

                <p>
                  {isShowed && (
                    <PopUp
                      text={description}
                      onClose={handleIsShowed}
                      isShowed={isShowed}
                      showed={isShowed}
                      ref2={excludeElementRef}
                    />
                  )}

                  <span className="short">{description.substring(0, 167)}</span>

                  <span
                    className="more"
                    onClick={handleIsShowed}
                    ref={excludeElementRef}
                  >
                    Show More...
                  </span>
                </p>
              </div>
              <div className="image" style={isShowed ? { zIndex: -1 } : {}}>
                <img src={src} />
              </div>
            </div>
          </div>
          {steps ? (
            <StepsCon steps={instructions} />
          ) : (
            <div className="companies-content">
              <div className="container">
                {track.companies.map((company, index) => (
                  <CompanyBox
                    company={company}
                    index={index + 1}
                    isShowed={isShowed}
                    key={company.name}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="references-content">
            <MainTitle title="References" />
            <div className="container">
              {track.reference.map((reference) => (
                <ReferenceBox reference={reference} key={reference._id} />
              ))}
            </div>
          </div>
          <Pagination active="overview" slug={trackSlug} />
        </div>
      )}
    </>
  );
}

export default Companies;

export async function loader({ params }) {
  console.log(params.trackSlug);
  const track = await getTrack(params.trackSlug);
  return track;
}
