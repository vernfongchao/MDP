
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/Login/LogoutButton';
import Announcement from '../../Dashboard/Announcement/Announcement';
import Reports from '../../Reports/ViewReports/Reports';
import './NavBar.css'

const NavBar = ({ tabs, setTabs, tabIndex }) => {
  const user = useSelector(state => state.session.user)

  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if(!user){
      setIdx(0)
    }
  }, [user])


  const setIndex = (e, i) => {
    let tabTitle = [...tabs]
    if (i === 0) tabTitle[tabIndex].title = "Dash..."
    else if (i === 1) tabTitle[tabIndex].title = "Report"
    else if (i === 2) tabTitle[tabIndex].title = "Patient"
    else if (i === 3) tabTitle[tabIndex].title = "Fees"
    else if (i === 4) tabTitle[tabIndex].title = "Staff"
    else if (i === 5) tabTitle[tabIndex].title = "Messages"
    setTabs(tabTitle)
    setIdx(i)
  }
  console.log(tabIndex,idx)


  return (


    <div className="navBar_main_div">
      <div className="navBar_inner_div">
        <div className='navbar-header-container'>
          <h1 className={idx === 0 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 0)}>
            Dashboard
          </h1>
        </div>
        {user &&
        <>
        <div>
          <h1 className={idx === 1 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 1)}>
            Reports
          </h1>
        </div>
        <h1 className={idx === 2 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 2)}>
          Patient
        </h1>
        <h1 className={idx === 3 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 3)}>
          Fees
        </h1>
        <h1 className={idx === 4 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 4)}>
          Staff
        </h1>
        <h1 className={idx === 5 ? "navbar-header active-navbar" : "navbar-header"} onClick={(e) => setIndex(e, 5)}>
          Messages
        </h1>
        </>
        }
      </div>
      <div className='main-info-container'>

        <Announcement idx={idx} />
        <Reports idx={idx} />
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
