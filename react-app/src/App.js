import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import PortalPage from './components/PortalPage/PortalPage';
import { getRoles } from './store/roles';
import { getAnnouncements } from './store/announcements';
import { getStaffs } from './store/staff';
import { getDepartments } from './store/department';
import { getPatients } from './store/patient';
import { getReports } from './store/report';
import { getConditions } from './store/condition'

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
      await dispatch(getConditions())
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
