
import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Reports from '../Reports/ViewReports/Reports';
import './NavBar.css'

const NavBar = ({tabs,setTabs, tabIndex}) => {

  const [idx, setIdx] = useState(0)

  useEffect(()=> {
    if(tabs.length === 1){
      setIdx(0)
    }
    else if(tabs.length > 1){
      setIdx(1)
    }
  },[])


  const setIndex = (e,i) => {
    let tabTitle = [...tabs]
    if (i === 0) tabTitle[tabIndex].title = "Ann..."
    else if (i === 1) tabTitle[tabIndex].title = "Report"
    else if (i === 2) tabTitle[tabIndex].title = "Patient"
    setTabs(tabTitle)
    setIdx(i)
  }

  return ( 


    <div className="navBar_main_div">
      <div className="navBar_inner_div">
        <h1 onClick={(e) => setIndex(e, 0)}>
          Announcement
        </h1>
        <h1 onClick={(e) => setIndex(e,1)}>
          Reports
        </h1>
        <h1 onClick={(e) => setIndex(e,2)}>
          Patient
        </h1>
      </div>


      <div className="navBar_reports_div">
        <Reports idx={idx}/>
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
