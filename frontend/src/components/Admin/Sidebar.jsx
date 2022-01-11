import React, { useContext } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo1.png";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { ThemeContext } from "../../context";

const Sidebar = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <>
      <div
        className="sidebar"
        style={{ backgroundColor: darkMode ? "var(--color-bg)" : "#fff" }}
      >
        <Link to="/">
          <img src={logo} alt="MaiMart" />
        </Link>
        <Link to="/admin/dashboard">
          <p style={{ color: darkMode && "#fff" }}>
            <DashboardIcon /> Dashboard
          </p>
        </Link>
        <Link to="#">
          <TreeView
            style={{ color: darkMode && "#fff" }}
            defaultExpandIcon={<ExpandMoreIcon />}
            defaultCollapseIcon={<ImportExportIcon />}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to="/admin/products" style={{ color: darkMode && "#fff" }}>
                <TreeItem
                  nodeId="2"
                  label="all"
                  icon={<PostAddIcon />}
                ></TreeItem>
              </Link>
              <Link to="/admin/product" style={{ color: darkMode && "#fff" }}>
                <TreeItem
                  nodeId="3"
                  label="create"
                  icon={<AddIcon />}
                ></TreeItem>
              </Link>
            </TreeItem>
          </TreeView>
        </Link>
        <Link to="/admin/orders">
          <p style={{ color: darkMode && "#fff" }}>
            <ListAltIcon /> Order
          </p>
        </Link>
        <Link to="/admin/users">
          <p style={{ color: darkMode && "#fff" }}>
            <PeopleIcon /> Users
          </p>
        </Link>
        <Link to="/admin/reviews">
          <p style={{ color: darkMode && "#fff" }}>
            <RateReviewIcon /> Reviews
          </p>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
