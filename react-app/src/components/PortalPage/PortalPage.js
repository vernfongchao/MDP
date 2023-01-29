import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import { getRoles } from "../../store/roles";
import { getAnnouncements } from "../../store/announcements";
import { getStaffs } from "../../store/staff";
import { getDepartments } from "../../store/department";
import { getPatients } from "../../store/patient";
import { getReports } from "../../store/report";
import { getConditions } from "../../store/condition";

import LandingPage from "../Landing/Landing";
import Tabs from "../Tabs/Tabs";
import TopNavBar from "../NavBar/TopNavBar/TopNavBar";
import "./PortalPage.css";

const PortalPage = () => {
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getRoles());
      await dispatch(getStaffs());
      await dispatch(getPatients());
      await dispatch(getReports());
      await dispatch(getAnnouncements());
      await dispatch(getDepartments());
      await dispatch(getConditions());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className="portalPage_outer_container">
      {user ? (
        <>
          <TopNavBar />
          <Tabs />
        </>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default PortalPage;
