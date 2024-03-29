import React from "react";
import { useSelector } from "react-redux";
import Announcement from "../../Announcement/Announcement";
import Reports from "../../Reports/Report";
import Patient from "../../Patient/Patient";
import StaffList from "../../Staff/StaffList/StaffList";
import DepartmentList from "../../Departments/DepartmentList/DepartmentList";
import Condition from "../../Conditions/Conditions";
import Message from "../../Message/Message";
import Credit from "../../Credit/Credit";

import "./NavBar.css";

const NavBar = ({ tab, tabs, setTabs, tabIndex }) => {
  const user = useSelector((state) => state.session.user);

  const setIndex = (e, i) => {
    let tabTitle = [...tabs];
    if (i === 0) tabTitle[tabIndex].title = "Dash...";
    else if (i === 1) tabTitle[tabIndex].title = "Report";
    else if (i === 2) tabTitle[tabIndex].title = "Patients";
    else if (i === 3) tabTitle[tabIndex].title = "Cond...";
    else if (i === 4) tabTitle[tabIndex].title = "Staff";
    else if (i === 5) tabTitle[tabIndex].title = "Depar...";
    else if (i === 6) tabTitle[tabIndex].title = "Messages";
    else if (i === 7) tabTitle[tabIndex].title = "Credits";
    tab.idx = i;
    setTabs(tabTitle);
  };

  return (
    <div className="navBar_main_div">
      <div className="navBar_inner_div">
        <div
          className={
            tab.idx === 0
              ? "navbar-header-container active-navbar"
              : "navbar-header-container"
          }
        >
          <h2 className="navbar-header" onClick={(e) => setIndex(e, 0)}>
            Dashboard
          </h2>
        </div>
        {user && (
          <>
            <div
              className={
                tab.idx === 1
                  ? "navbar-header-container active-navbar"
                  : "navbar-header-container"
              }
            >
              <h2 className="navbar-header" onClick={(e) => setIndex(e, 1)}>
                Reports
              </h2>
            </div>
            <div
              className={
                tab.idx === 2
                  ? "navbar-header-container active-navbar"
                  : "navbar-header-container"
              }
            >
              <h2 className="navbar-header" onClick={(e) => setIndex(e, 2)}>
                Patients
              </h2>
            </div>
            <div
              className={
                tab.idx === 3
                  ? "navbar-header-container active-navbar"
                  : "navbar-header-container"
              }
            >
              <h2 className="navbar-header" onClick={(e) => setIndex(e, 3)}>
                Conditions
              </h2>
            </div>
            <div
              className={
                tab.idx === 4
                  ? "navbar-header-container active-navbar"
                  : "navbar-header-container"
              }
            >
              <h2 className="navbar-header" onClick={(e) => setIndex(e, 4)}>
                Staff
              </h2>
            </div>
            <div
              className={
                tab.idx === 5
                  ? "navbar-header-container active-navbar"
                  : "navbar-header-container"
              }
            >
              <h2 className="navbar-header" onClick={(e) => setIndex(e, 5)}>
                Department
              </h2>
            </div>
            <div
              className={
                tab.idx === 6
                  ? "navbar-header-container active-navbar"
                  : "navbar-header-container"
              }
            >
              <h2 className="navbar-header" onClick={(e) => setIndex(e, 6)}>
                Messages
              </h2>
            </div>
            <div
              className={
                tab.idx === 7
                  ? "navbar-header-container active-navbar"
                  : "navbar-header-container"
              }
            >
              <h2 className="navbar-header" onClick={(e) => setIndex(e, 7)}>
                Credits
              </h2>
            </div>
          </>
        )}
      </div>
      <div className="main-info-container">
        {tab.idx === 0 && <Announcement />}
        {tab.idx === 1 && <Reports/>}
        {tab.idx === 2 && <Patient/>}
        {tab.idx === 3 && <Condition/>}
        {tab.idx === 4 && <StaffList/>}
        {tab.idx === 5 && <DepartmentList/>}
        {tab.idx === 6 && <Message/>}
        {tab.idx === 7 && <Credit/>}
      </div>
    </div>
  );
};

export default NavBar;
