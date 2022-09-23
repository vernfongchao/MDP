import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import AnnouncementForm from "../AnnouncementForm/AnnouncementForm"
import AnnouncementDetails from "../AnnouncementDetails/AnnouncementDetails"
import "./Announcement.css"


const Announcement = ({ idx }) => {

    const [index, setIndex] = useState(0)
    const [edit, setEdit] = useState(null)
    const user = useSelector(state => state.session.user)
    const announcements = Object.values(useSelector(state => state.announcements)).reverse()
    const announcement = announcements[index]




    const changeAnnouncement = (e, i) => {
        setEdit(null)
        setIndex(i)
    }


    return (
        <div className={idx === 0 ? "announcements-page-container" : "hidden"}>
            <div className="announcement-border-container">
                <div className="announcement-list-container">
                    <h1>Announcements</h1>
                    {announcements?.map((announcement, i) => (
                        <div className="announcement-title-container" key={i} >
                            <h3 className="announcement-header" onClick={e => changeAnnouncement(e, i)}>{announcement.title}</h3>
                        </div>
                    ))}

                </div>
                <AnnouncementDetails edit={edit} setEdit={setEdit} announcement={announcement} />
                <AnnouncementForm edit={edit} setEdit={setEdit}  announcement={announcement}/>

            </div>
        </div>
    )
}

export default Announcement