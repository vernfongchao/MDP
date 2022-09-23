import { useEffect } from "react"
import { useSelector } from "react-redux"

import "./AnnouncementDetails.css"

const AnnouncementDetails = ({ edit, setEdit, announcement }) => {

    const user = useSelector(state => state.session.user)

    const onEdit = () => {
        setEdit(announcement)
    }

    const cancelEdit = () => {
        setEdit(null)
    }

    let isUser 

    if (user?.id === announcement?.staffId) {
        isUser = (
            edit ? (
                <button onClick={cancelEdit} >
                    cancel
                </button >
            ) : (
                <button onClick={onEdit}>
                    Edit
                </button>
            )
        )
    }
    else {
        isUser = null
    }



    return (
        <div className="announcements-details-page-container">
            <div>
                <h1>
                    Announcement Information
                </h1>
                {isUser}


            </div>

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