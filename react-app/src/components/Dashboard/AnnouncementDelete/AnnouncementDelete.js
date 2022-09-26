import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { deleteAnnouncement } from "../../../store/announcements";

const AnnouncementDelete = ({ id, setShowModal,setIndex, i ,index}) => {
    const dispatch = useDispatch()
    const [error,setError] = useState("")

    const handleDelete = async (e) => {
        let announcement = await dispatch(deleteAnnouncement(id))
        setShowModal(false)
        if(announcement.id){
            if(index === i && index === 0){

            }
            else if (i <= index) {
                setIndex(index -1)
            }
        }
        else {
            setError(announcement.errors)
        }
    }

    return (
        <div className="delete-announcement-header-main-container">
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
                <button className="delete-announcement-buttons" onClick={handleDelete}>
                    Delete
                </button>
                <button className="delete-announcement-buttons" onClick={() => setShowModal(false)}>
                    Cancel
                </button >
            </div>

        </div>
    )

}

export default AnnouncementDelete