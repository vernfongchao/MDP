import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAnnouncements } from "../../store/announcements";
import AnnouncementList from "./Announcement/AnnouncementList";
import AnnouncementDetails from "./AnnouncementDetails/AnnouncementDetails";
import AnnouncementForm from "./AnnouncementForm/AnnouncementForm";
import Loading from "../Loading/Loading";

import "./Announcement.css";

const Announcement = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [edit, setEdit] = useState(null);

  const user = useSelector((state) => state.session.user);
  const announcements = Object.values(
    useSelector((state) => state.announcements)
  ).reverse();

  const announcement = announcements[index];

  useEffect(() => {
    async function getAllAnnouncements() {
      await dispatch(getAnnouncements());
      setIsLoading(true);
    }

    getAllAnnouncements();
  }, [dispatch]);

  return isLoading ? (
    <div className="announcements-page-container">
      <AnnouncementList
        announcements={announcements}
        user={user}
        index={index}
        setIndex={setIndex}
        setEdit={setEdit}
      />

      <AnnouncementDetails
        edit={edit}
        setEdit={setEdit}
        announcement={announcement}
      />
      <AnnouncementForm
        edit={edit}
        setEdit={setEdit}
        announcement={announcement}
      />
    </div>
  ) : (
    <Loading />
  );
};

export default Announcement;
