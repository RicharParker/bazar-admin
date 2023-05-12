import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings, ExitToApp } from "@material-ui/icons";
import { useDispatch} from "react-redux";
import { logout } from "../../redux/user/userActions"
import { useHistory } from "react-router";

export default function Topbar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <ExitToApp onClick={handleLogout} />
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://www.fimpes.org.mx/images/universidades/ulsaoaxaca.jpg" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
