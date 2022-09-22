import { useEffect } from "react"

import "./AnnouncementForm.css"


const AnnouncementForm = ({ idx }) => {

    // useEffect(() => {

    // }, [idx])



    return (
        <div className={idx === 0 ? "announcement-form-page-container" : "hidden"}>
            <h1>Announcement Form</h1>
        </div>
    )
}

export default AnnouncementForm