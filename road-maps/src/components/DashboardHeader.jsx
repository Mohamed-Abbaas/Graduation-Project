import "./dashboardHeader.css";
function DashboardHeader({ title }) {
  return (
    <div className="dashboard-header-con">
      <h1 className="dashboard-header">{title}</h1>
    </div>
  );
}

export default DashboardHeader;
