import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { deleteAnnouncement } from "../../../store/announcements";

const AnnouncementDelete = ({ id, setShowModal }) => {
    const dispatch = useDispatch()
    const [error,setError] = useState("")

    const handleDelete = async (e) => {
        let announcement = await dispatch(deleteAnnouncement(id))
        if(announcement.id){
            setShowModal(false)
        }
        else {
            setError(announcement.errors)
        }
    }

    return (
        <div>
            <div className='delete-announcement-header-container'>
                <h1 className="delete-announcement-header">WARNING</h1>
            </div>
            <div className="delete-announcement-message-container">
                <p className="delete-announcement-header">
                    Warning, This action is irreversible! Please confirm to delete.
                </p>
                {error?
                <p>
                    {error}
                </p>: null
                }
            </div>
            <div className="delete-announcement-button-container">
                <button onClick={handleDelete}>
                    Delete
                </button>
                <button onClick={() => setShowModal(false)}>
                    Cancel
                </button >
            </div>

        </div>
    )

}

export default AnnouncementDelete