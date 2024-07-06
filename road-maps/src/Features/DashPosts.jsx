import { useLoaderData, useNavigation } from "react-router";
import { getPosts } from "../services/posts";
import DashboardHeader from "../components/DashboardHeader";
import DashBox from "../components/dashboard/DashBox";
import Loader from "../components/Loader";
function DashPosts({ regular }) {
  const navigation = useNavigation();
  const isLoading = navigation.state == "loading";
  const data = useLoaderData();
  const posts = data.data.posts;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="boxes-container">
          <DashboardHeader title="Posts" />
          <div className="actual-boxes-container">
            {posts.map((post, index) => (
              <DashBox post={post} key={index + 1} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export async function loader() {
  const data = await getPosts();
  return data;
}
export default DashPosts;
