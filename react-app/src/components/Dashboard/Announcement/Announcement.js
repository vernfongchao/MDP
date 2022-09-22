import { useEffect,useState } from "react"
import { useSelector } from "react-redux"
import AnnouncementForm from "../AnnouncementForm/AnnouncementForm"
import AnnouncementDetails from "../AnnouncementDetails/AnnouncementDetails"
import "./Announcement.css"


const Announcement = ({ idx }) => {

    const [index,setIndex] = useState(0)
    const announcements = Object.values(useSelector(state => state.announcements)).reverse()
    const announcement = announcements[index]
    

    const changeAnnouncement = (e,i) => {
        setIndex(i)
    }


    return (
        <div className={idx === 0 ? "announcements-page-container" : "hidden"}>
            <div className="announcement-list-container">
                <h1>Announcements</h1>
                {announcements?.map((announcement, i) => (
                    <div className="announcement-title-container" key={i} onClick={e => changeAnnouncement(e,i)} >
                        <p>{announcement.title}</p>
                    </div>
                ))}

            </div>
            <AnnouncementDetails announcement={announcement}/>
            <AnnouncementForm idx={idx} />
        </div>
    )
}

export default Announcement