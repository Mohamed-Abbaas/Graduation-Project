import { useLoaderData, useNavigation, useParams } from "react-router-dom";
import { getSteps } from "../services/tracksApi";
import "./steps.css";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import StepBox from "../components/steps/StepBox";
import Loader from "../components/Loader";
function Steps() {
  const data = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state == "loading";
  const { trackSlug } = useParams();
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="steps">
          <Header />
          <div className="steps-container">
            <div className="container">
              {data.map((track) => (
                <StepBox key={track._id} track={track} />
              ))}
            </div>
          </div>
          <Pagination active="steps" slug={trackSlug} />
        </div>
      )}
    </>
  );
}
export async function loader({ params }) {
  const trackSlug = params.trackSlug;
  const data = await getSteps(trackSlug);
  return data;
}
export default Steps;
