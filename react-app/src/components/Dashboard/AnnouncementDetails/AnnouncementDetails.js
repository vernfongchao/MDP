import { useSelector } from "react-redux"

import "./AnnouncementDetails.css"

const AnnouncementDetails = ({ announcement }) => {


    return (
        <div className="announcements-details-page-container">
            <h1>
                Announcement Information
            </h1>
            <div>
                <span>{announcement?.content}</span>
            </div>
            <div>
                <p>Announcement By: {announcement?.staffFirstName} {announcement?.staffLastName}</p>
            </div>
        </div>
    )
}

export default AnnouncementDetails