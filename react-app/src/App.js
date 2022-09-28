import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar/SideNavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import PortalPage from './components/PortalPage/PortalPage';
import { getRoles } from './store/roles';
import { getAnnouncements } from './store/announcements';
import { getStaffs } from './store/staff';
import { getDepartments } from './store/department';
import { getPatients } from './store/patient';
import { getReports } from './store/report';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getRoles())
      await dispatch(getStaffs())
      await dispatch(getPatients())
      await dispatch(getReports())
      await dispatch(getAnnouncements())
      await dispatch(getDepartments())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" >
          <PortalPage />
        </Route>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        // <ProtectedRoute path='/users' exact={true} >
        //   <UsersList/>
        // </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
