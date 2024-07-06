import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import "./dashboard.css";
import Header from "../components/Header";

function Dashboard() {
  return (
    <div className="dashboard">
      <SideBar />
      <Header />
      <Outlet regular={true} />
    </div>
  );
}

export default Dashboard;
