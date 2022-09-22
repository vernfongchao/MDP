import { useEffect } from "react"

import "./Announcement.css"


const Announcement = ({ idx }) => {

    // useEffect(() => {

    // }, [idx])



    return (
        <div className={idx === 0 ? "reports-page-container" : "hidden"}>
            <h1>Announcements</h1>
        </div>
    )
}

export default Announcement