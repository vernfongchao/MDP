import AnnouncementDeleteModal from "../AnnouncementDelete/AnnouncementDeleteModal";

import "./AnnouncementList.css";

const AnnouncementList = ({ announcements,user, index, setIndex, setEdit }) => {
  const changeAnnouncement = (e, i) => {
    setEdit(null);
    setIndex(i);
  };

  return (
    <div className="announcement-list-container">
      <h1 className="announcement-header">Announcements</h1>
      <div className="announcement-list-header">
        {announcements?.map((announcement, i) => (
          <div key={i} className="announcement-list-title-container">
            {user?.id === announcement.staffId ? (
              <div className="announcement-delete-icon-container">
                <AnnouncementDeleteModal
                  id={announcement.id}
                  setIndex={setIndex}
                  i={i}
                  index={index}
                />
              </div>
            ) : null}

            <div
              className={
                index === i
                  ? "announcement-title-container active-announcement"
                  : "announcement-title-container"
              }
              onClick={(e) => changeAnnouncement(e, i)}
            >
              <h3 className="announcement-title">{announcement.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementList;
