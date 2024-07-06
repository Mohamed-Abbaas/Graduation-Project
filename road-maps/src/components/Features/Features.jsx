import {
  faFileAlt,
  faNewspaper,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import FeaturesBox from "./FeaturesBox";
import MainTitle from "./MainTitle";
import "./features.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Features() {
  const roadMap =
    "Explore our roadmap to see where we're headed get an inside look at upcoming features, improvements, and exciting developments, stay informed and be a part of our journey towards excellence";
  const news =
    "Subscribe to our newsletter fo exclusive content delivered straight to your inbox. Receive curated articles, updates on upcoming events, and special offers. join our community and stay connected with the latest happenings.";
  const articles =
    "Dive into our rich library of articles covering a wide range of topics. From informative guides to insightful analyses, there's something for everyone. Stay up-to-date with the latest trends, tips, and industry news";
  return (
    <div className="features">
      <div className="container">
        <MainTitle title="Our Features" />
        <div className="features-content">
          <FeaturesBox title="RoadMap" parag={roadMap}>
            <FontAwesomeIcon icon={faRoad} />
          </FeaturesBox>
          <FeaturesBox title="NewsLetter" parag={news}>
            <FontAwesomeIcon icon={faNewspaper} />
          </FeaturesBox>
          <FeaturesBox title="Articles" parag={articles}>
            <FontAwesomeIcon icon={faFileAlt} />
          </FeaturesBox>
          <FeaturesBox title="RoadMap" parag={roadMap}>
            <FontAwesomeIcon icon={faRoad} />
          </FeaturesBox>
        </div>
      </div>
    </div>
  );
}

export default Features;
