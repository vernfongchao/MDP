
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/Login/LogoutButton';
import Announcement from '../../Dashboard/Announcement/Announcement';
import ReportList from '../../Reports/ViewReports/ReportList';
import PatientList from '../../Patient/PatientList/PatientList';
import StaffList from '../../Staff/StaffList/StaffList';
import DepartmentList from '../../Departments/DepartmentList/DepartmentList';
import Fee from '../../Fees/Fee';
import Message from '../../Message/Message';
import Credit from '../../Credit/Credit';

import './NavBar.css'

const NavBar = ({ tab, tabs, setTabs, tabIndex }) => {
  const user = useSelector(state => state.session.user)

  const setIndex = (e, i) => {
    let tabTitle = [...tabs]
    if (i === 0) tabTitle[tabIndex].title = "Dash..."
    else if (i === 1) tabTitle[tabIndex].title = "Report"
    else if (i === 2) tabTitle[tabIndex].title = "Patients"
    else if (i === 3) tabTitle[tabIndex].title = "Fees"
    else if (i === 4) tabTitle[tabIndex].title = "Staff"
    else if (i === 5) tabTitle[tabIndex].title = "Depar..."
    else if (i === 6) tabTitle[tabIndex].title = "Messages"
    else if (i === 7) tabTitle[tabIndex].title = "Credits"
    tab.idx = i
    setTabs(tabTitle)
  }

  return (


    <div className="navBar_main_div">
      <div className="navBar_inner_div">
        <div className={tab.idx === 0 ? "navbar-header-container active-navbar" : "navbar-header-container"} >
          <h1 className="navbar-header" onClick={(e) => setIndex(e, 0)}>
            Dashboard
          </h1>
        </div>
        {user &&
          <>
            <div className={tab.idx === 1 ? "navbar-header-container active-navbar" : "navbar-header-container"} >
            <h1 className="navbar-header" onClick={(e) => setIndex(e, 1)}>
                Reports
              </h1>
            </div >
            <div className={tab.idx === 2 ? "navbar-header-container active-navbar" : "navbar-header-container"} >
            <h1 className="navbar-header" onClick={(e) => setIndex(e, 2)}>
                Patients
              </h1>
            </div >
            <div className={tab.idx === 3 ? "navbar-header-container active-navbar" : "navbar-header-container"} >
            <h1 className="navbar-header" onClick={(e) => setIndex(e, 3)}>
                Fees
              </h1>
            </div >
          <div className={tab.idx === 4 ? "navbar-header-container active-navbar" : "navbar-header-container"} >
            <h1 className="navbar-header" onClick={(e) => setIndex(e, 4)}>
                Staff
              </h1>
            </div >
          <div className={tab.idx === 5 ? "navbar-header-container active-navbar" : "navbar-header-container"}>
            <h1 className="navbar-header" onClick={(e) => setIndex(e, 5)}>
                Department
              </h1>
            </div >
          <div className={tab.idx === 6 ? "navbar-header-container active-navbar" : "navbar-header-container"} >
              <h1 className= "navbar-header" onClick={(e) => setIndex(e, 6)}>
                Messages
              </h1>
            </div >
          <div className={tab.idx === 7 ? "navbar-header-container active-navbar" : "navbar-header-container"} >
              <h1 className="navbar-header" onClick={(e) => setIndex(e, 7)}>
                Credits
              </h1>
            </div >
          </>
        }
      </div>
      <div className='main-info-container'>
        {tab.idx === 0 &&
          <Announcement idx={tab.idx} />
        }
        {tab.idx === 1 &&
          <ReportList idx={tab.idx} />
        }
        {tab.idx === 2 &&
          <PatientList idx={tab.idx} />
        }
        {tab.idx === 3 &&
          <Fee idx={tab.idx} />
        }
        {tab.idx === 4 &&
          <StaffList idx={tab.idx} />
        }

        {tab.idx === 5 &&
          <DepartmentList idx={tab.idx} />
        }
        {tab.idx === 6 &&
          <Message idx={tab.idx} />
        }
        {tab.idx === 7 &&
          <Credit idx={tab.idx} />
        }
      </div>
    </div>
  );
}

export default NavBar;
