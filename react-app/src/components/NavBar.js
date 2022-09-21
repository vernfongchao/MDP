
import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Reports from './Reports/ViewReports/Reports';

const NavBar = () => {

  const [idx,setIdx] = useState(0)

  const setIndex = (e,i) => {
    setIdx(i)
  }

  return ( 


    <>
      <h1 onClick={(e) => setIndex(e,0)}>
        Reports
      </h1>
      <h1 onClick={(e) => setIndex(e,1)}>
        Patient
      </h1>



      <Reports idx={0}/>
    </>
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
