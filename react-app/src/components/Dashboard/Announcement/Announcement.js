import { useState } from "react"
import { useSelector } from "react-redux"
import AnnouncementForm from "../AnnouncementForm/AnnouncementForm"
import AnnouncementDetails from "../AnnouncementDetails/AnnouncementDetails"
import AnnouncementDeleteModal from "../AnnouncementDelete/AnnouncementDeleteModal"


import "./Announcement.css"


const Announcement = ({ idx }) => {

    const user = useSelector(state => state.session.user)
    const announcements = Object.values(useSelector(state => state.announcements)).reverse()

    const [index, setIndex] = useState(0)
    const [edit, setEdit] = useState(null)



    const announcement = announcements[index]



    const changeAnnouncement = (e, i) => {
        setEdit(null)
        setIndex(i)
    }

    return (
        <div className={idx === 0 ? "announcements-page-container" : "hidden"}>
                <div className="announcement-list-container">
                    <h1 className="announcement-header">Announcements</h1>
                    <div className="announcement-list-header">
                        {announcements?.map((announcement, i) => (
                            <div key={i} className="announcement-list-title-container">
                                {user?.id === announcement.staffId ?
                                        <div className="announcement-delete-icon-container">
                                            <AnnouncementDeleteModal id={announcement.id} setIndex={setIndex} i={i} index={index} />
                                        </div>
                                    :
                                    null
                                }

                                <div className={index === i ? "announcement-title-container active-announcement"
                                    : "announcement-title-container"}
                                    onClick={e => changeAnnouncement(e, i)}>
                                    <h3 className="announcement-title">{announcement.title}</h3>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
                <AnnouncementDetails edit={edit} setEdit={setEdit} announcement={announcement} />
                <AnnouncementForm edit={edit} setEdit={setEdit} announcement={announcement} />

        </div>
    )
}

export default Announcement