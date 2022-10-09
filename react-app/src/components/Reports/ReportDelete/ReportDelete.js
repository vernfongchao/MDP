import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReport } from "../../../store/report";

const ReportDelete = ({ id, setShowModal, setIndex, i, index }) => {
    const dispatch = useDispatch()
    const [error, setError] = useState("")

    const handleDelete = async (e) => {
        let announcement = await (dispatch(deleteReport(id)))
        if(announcement.id){
            setShowModal(false)
            if (index === i && index === 0) {
                setIndex(0)
            }
            else if (index >= i) {
                setIndex(index - 1)
            }
        }
        else {
            setError(announcement.errors)
        }
    }

    return (
        <div className="delete-report-header-main-container">
            <div className='delete-report-header-container'>
                <h1 className="delete-report-header">WARNING</h1>
            </div>
            <div className="delete-report-message-container">
                <p className="delete-report-warning">
                    Warning, This action is irreversible! Please confirm to delete.
                </p>
                {error ?
                    <p className="delete-report-error">
                        {error}
                    </p> : null
                }
            </div>
            <div className="delete-report-button-container">
                <button className="delete-report-buttons" onClick={handleDelete}>
                    Delete
                </button>
                <button className="delete-report-buttons" onClick={() => setShowModal(false)}>
                    Cancel
                </button >
            </div>

        </div>
    )
}

export default ReportDelete