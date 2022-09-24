import { useEffect } from "react"
import { useSelector } from "react-redux"

import "./AnnouncementDetails.css"
import parse from 'html-react-parser'

const AnnouncementDetails = ({ edit, setEdit, announcement }) => {

    const user = useSelector(state => state.session.user)

    const onEdit = () => {
        setEdit(announcement)
    }

    let isUser

    if (user?.id === announcement?.staffId) {
        isUser = (
            edit ? (

                null

            ) : (
                <div className="announcement-edit-button-position">
                    <div className="announcement-edit-button-container">
                        <button className="announcement-buttons" onClick={onEdit}>
                            Edit
                        </button>
                    </div>
                </div>
            )
        )
    }
    else {
        isUser = null
    }



    return (
        <div className="announcements-details-page-container">
            <div className="announcements-details-page-subcontainer">
                {isUser}
                <h1 className="announcement-information">
                    Announcement Information
                </h1>


            </div>

            <div>
                <span>{parse(announcement?.content)}</span>
            </div>
            <div>
                <p>Announcement By: {announcement?.staffFirstName} {announcement?.staffLastName}</p>
            </div>
        </div>
    )
}

export default AnnouncementDetails