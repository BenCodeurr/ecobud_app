/* eslint-disable no-unused-vars */
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const CustomSideBar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { dispatch } = useContext(AuthContext);

  const signout = async () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="sidebar pl-3">
      <ul>
        <li>
          <DashboardIcon className="icon" />
          <span>Dashboard</span>
        </li>

          <li>
            <StoreIcon className="icon" />
            <span>Products</span>
          </li>
 

        <li>
          <NotificationsNoneIcon className="icon" />
          <span>Notifications</span>
        </li>
        <li>
          <SettingsApplicationsIcon className="icon" />
          <span>Settings</span>
        </li>
        <p className="title text-sm font-bold text-[#999] mt-4 mb-2">USER</p>

        <li>
          <AccountCircleOutlinedIcon className="icon" />
          <span>Profile</span>
        </li>
        <li onClick={signout}>
          <ExitToAppIcon className="icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default CustomSideBar;
