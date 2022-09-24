
// import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/Login/LogoutButton';
import Announcement from '../../Dashboard/Announcement/Announcement';
import Reports from '../../Reports/ViewReports/Reports';
import StaffList from '../../Staff/StaffList/StaffList';
import './NavBar.css'

const NavBar = ({ tab, tabs, setTabs, tabIndex }) => {
  const user = useSelector(state => state.session.user)

  const setIndex = (e, i) => {
    let tabTitle = [...tabs]
    if (i === 0) tabTitle[tabIndex].title = "Dash..."
    else if (i === 1) tabTitle[tabIndex].title = "Report"
    else if (i === 2) tabTitle[tabIndex].title = "Patient"
    else if (i === 3) tabTitle[tabIndex].title = "Fees"
    else if (i === 4) tabTitle[tabIndex].title = "Staff"
    else if (i === 5) tabTitle[tabIndex].title = "Messages"
    tab.idx = i
    setTabs(tabTitle)
  }


  return (


    <div className="navBar_main_div">
      <div className="navBar_inner_div">
        <div className='navbar-header-container'>
          <h1 className={tab.idx === 0 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 0)}>
            Dashboard
          </h1>
        </div>
        {user &&
        <>
        <div>
            <h1 className={tab.idx === 1 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 1)}>
            Reports
          </h1>
        </div>
          <h1 className={tab.idx === 2 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 2)}>
          Patient
        </h1>
          <h1 className={tab.idx === 3 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 3)}>
          Fees
        </h1>
          <h1 className={tab.idx === 4 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 4)}>
          Staff
        </h1>
          <h1 className={tab.idx === 5 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 5)}>
          Messages
        </h1>
        </>
        }
      </div>
      <div className='main-info-container'>

        <Announcement idx={tab.idx} />
        <Reports idx={tab.idx} />
        <StaffList idx={tab.idx}/>
      </div>

    </div>
    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to='/' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/login' exact={true} activeClassName='active'>
    //         Login
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default NavBar;
