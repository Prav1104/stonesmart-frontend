import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Sidebar />

      <div className="main-content">
        <Topbar />
        <div className="content-wrapper">{children}</div>
      </div>
    </div>
  );
}
