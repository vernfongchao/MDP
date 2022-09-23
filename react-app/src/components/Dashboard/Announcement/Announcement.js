import { useEffect, useState } from "react"
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
    const [hover, setHover] = useState(null)


    const announcement = announcements[index]



    const changeAnnouncement = (e, i) => {
        setEdit(null)
        setIndex(i)
    }

    const onHoverEnter = (e, i) => {
        setHover(i)
    }

    const onHoverLeave = (e, i) => {
        setHover(null)
    }



    return (
        <div className={idx === 0 ? "announcements-page-container" : "hidden"}>
            <div className="announcement-border-container">
                <div className="announcement-list-container">
                    <h1>Announcements</h1>
                    {announcements?.map((announcement, i) => (
                        <div
                            className={index === i ? "announcement-title-container active-announcement" : "announcement-title-container"}
                            key={i}
                            onClick={e => changeAnnouncement(e, i)}
                            onMouseEnter={(e) => onHoverEnter(e, i)}
                            onMouseLeave={(e) => onHoverLeave(e, i)}
                        >
                            <h3 className="announcement-header">{announcement.title}</h3>
                            {hover === i ?
                                <div className="announcement-delete-position-container">
                                    <div className="announcement-delete-icon-container">
                                        <AnnouncementDeleteModal id={announcement.id}/>
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                    ))}

                </div>
                <AnnouncementDetails edit={edit} setEdit={setEdit} announcement={announcement} />
                <AnnouncementForm edit={edit} setEdit={setEdit} announcement={announcement} />

            </div>
        </div>
    )
}

export default Announcement