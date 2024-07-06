import { useLoaderData } from "react-router";
import { getArticles } from "../services/tracksApi";
import DashboardHeader from "../components/DashboardHeader";
import DashBox from "../components/dashboard/DashBox";

function DashArticles() {
  const data = useLoaderData();
  const articles = data.articles;
  console.log(data);
  return (
    <div className="boxes-container">
      <DashboardHeader title="Articles" />
      <div className="actual-boxes-container">
        {articles.map((article, index) => (
          <DashBox article={article} key={index + 1} />
        ))}
      </div>
    </div>
  );
}
export async function loader() {
  const data = getArticles();
  return data;
}
export default DashArticles;
