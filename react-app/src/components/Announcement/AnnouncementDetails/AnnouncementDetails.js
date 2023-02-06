import { useSelector } from "react-redux";

import "./AnnouncementDetails.css";
import parse from "html-react-parser";

const AnnouncementDetails = ({ edit, setEdit, announcement }) => {
  const user = useSelector((state) => state.session.user);

  const onEdit = () => {
    setEdit(announcement);
  };

  let isUser;

  if (user?.id === announcement?.staffId) {
    isUser = edit ? null : (
      <div className="announcement-edit-button-position">
        <button className="announcement-edit-button" onClick={onEdit}>
          Edit
        </button>
      </div>
    );
  } else {
    isUser = null;
  }

  return (
    <div className="announcement-details-page-container">
      <div className="announcement-detail-header-container">
        {isUser}
        <h1 className="announcement-information">Announcement Information</h1>
      </div>

      <div className="announcement-detail-content-container">
        {parse(announcement?.content)}
      </div>
      <div className="announcement-detail-writer-container">
        <p>
          Announcement By: {announcement?.staffFirstName}{" "}
          {announcement?.staffLastName}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementDetails;
