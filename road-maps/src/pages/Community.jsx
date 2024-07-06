import { useLoaderData } from "react-router";
import Header from "../components/Header";
import "./community.css";
import { getPosts } from "../services/posts";
import { useEffect, useRef, useState } from "react";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import Toast from "../components/Toast";
function Community() {
  const data = useLoaderData();
  const excludeElementRef = useRef(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [freshPosts, setFreshPosts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [test, setTest] = useState(false);
  const postsFetched = data.data.posts;
  const [toastWord, setToastWord] = useState("posted");
  const [posts, setPosts] = useState(postsFetched);
  function onFreshPosts(post) {
    setFreshPosts([...freshPosts, post]);
  }
  function onShowPostForm() {
    setShowPostForm((showPostForm) => !showPostForm);
  }
  function onToastWord(word) {
    setToastWord(word);
  }
  function onShowToast() {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }
  function onTest() {
    setTest((test) => !test);
  }
  const reversedFreshPosts = freshPosts.slice().reverse();
  // useEffect(() => {
  //   async function fetchPosts() {
  //     const data = await getPosts();
  //     console.log(data.response);
  //     setPosts(postsFetched);
  //   }
  //   fetchPosts();
  // }, [test]);
  return (
    <div className="community">
      <Toast toastWord={toastWord} showToast={showToast} />
      <div className="the-header" ref={excludeElementRef}>
        <Header
          posts={true}
          onShowPostForm={onShowPostForm}
          active="community"
        />
      </div>
      {showPostForm && (
        <CreatePost
          onClose={onShowPostForm}
          isShowed={showPostForm}
          ref2={excludeElementRef}
          onFreshPosts={onFreshPosts}
          onShowToast={onShowToast}
          onTest={onTest}
          //   process={"published"}
          //   onToastWord={onToastWord}
        />
      )}
      <div className="the-community">
        <div className="community-container container">
          {reversedFreshPosts.map((post, index) => (
            <Post
              onShowToast={onShowToast}
              onToastWord={onToastWord}
              post={post}
              fresh={true}
              key={index + 1}
            />
          ))}
          {posts.map((post, index) => (
            <Post
              onShowToast={onShowToast}
              onToastWord={onToastWord}
              key={index + 1}
              post={post}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export function loader() {
  const data = getPosts();
  return data;
}
export default Community;
