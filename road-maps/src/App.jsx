import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import "./app.css";
import Login from "./pages/Login";
import Register /*, { action as registerAction } */ from "./pages/Register";
import Reset from "./pages/Reset";
import Courses, { loader as coursesLoader } from "./pages/Courses";
import Contact from "./pages/Contact";
import Verify from "./pages/Verify";
import Dashboard from "./Features/Dashboard";
import Settings from "./Features/Settings";
import AccountInfo from "./pages/AccountInfo";
import User, { loader as userLoader } from "./pages/User";
import { useEffect } from "react";
import Companies, { loader as companiesLoader } from "./pages/Companies";
import Steps, { loader as stepsLoader } from "./pages/Steps";
import Roadmap, { loader as roadMapLoader } from "./pages/Roadmap";
import Articles, { loader as articlesLoader } from "./pages/Articles";
import ArticlePage, { loader as articleLoader } from "./pages/ArticlePage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import NewsLetter from "./pages/NewsLetter";
import Community, { loader as communityLoader } from "./pages/Community";
import DashUsers, { loader as dashUsersLoader } from "./Features/DashUsers";
import DashArticles, {
  loader as dashArticlesLoader,
} from "./Features/DashArticles";
import DashPosts, { loader as dashPostsLoader } from "./Features/DashPosts";
import DashRules, { loader as dashRulesLoader } from "./Features/DashRules";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
    // action: registerAction,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/courses",
    element: <Courses />,
    loader: coursesLoader,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/users",
        element: <DashUsers />,
        loader: dashUsersLoader,
      },
      {
        path: "/dashboard/articles",
        element: <DashArticles />,
        loader: dashArticlesLoader,
      },
      {
        path: "/dashboard/posts",
        element: <DashPosts />,
        loader: dashPostsLoader,
      },
      {
        path: "/dashboard/rules",
        element: <DashRules />,
        loader: dashRulesLoader,
      },
    ],
  },
  {
    path: "/info",
    element: <AccountInfo />,
  },
  {
    path: "/user/:userId",
    element: <User />,
    loader: userLoader,
  },
  {
    path: "/companies/:trackSlug",
    element: <Companies />,
    loader: companiesLoader,
  },
  {
    path: "/steps/:trackSlug",
    element: <Steps />,
    loader: stepsLoader,
  },
  {
    path: "/roadmap/:trackSlug",
    element: <Roadmap />,
    loader: roadMapLoader,
  },
  {
    path: "/articles/:trackSlug",
    element: <Articles />,
    loader: articlesLoader,
  },
  {
    path: "/article/:id",
    element: <ArticlePage />,
    loader: articleLoader,
  },
  {
    path: "/forget_password",
    element: <ForgetPassword />,
  },
  {
    path: "/api/v1/users/resetPassword/:id",
    element: <ResetPassword />,
  },
  {
    path: "/newsLetter",
    element: <NewsLetter />,
  },
  {
    path: "/community",
    element: <Community />,
    loader: communityLoader,
  },
  // in case there is an id after the page
  // {path: "user/:userId", element: <User />}
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
