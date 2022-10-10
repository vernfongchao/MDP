import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePatient } from "../../../store/patient";


const PatientDelete = ({ id, setShowModal, setIndex, i, index }) => {
    const dispatch = useDispatch()
    const [error, setError] = useState("")

    const handleDelete = async (e) => {
        let patient = await (dispatch(deletePatient(id)))
        if (patient.id) {
            setShowModal(false)
            if (index === i && index === 0) {
                setIndex(0)
            }
            else if (index >= i) {
                setIndex(index - 1)
            }
        }
        else {
            setError(patient.errors)
        }
    }

    return (
        <div className="delete-patient-header-main-container">
            <div className='delete-patient-header-container'>
                <h1 className="delete-patient-header">WARNING</h1>
            </div>
            <div className="delete-patient-message-container">
                <p className="delete-patient-warning">
                    Warning, This action is irreversible! Please confirm to delete.
                </p>
                {error ?
                    <p className="delete-patient-error">
                        {error}
                    </p> : null
                }
            </div>
            <div className="delete-patient-button-container">
                <button className="delete-patient-buttons" onClick={handleDelete}>
                    Delete
                </button>
                <button className="delete-patient-buttons" onClick={() => setShowModal(false)}>
                    Cancel
                </button >
            </div>

        </div>
    )
}

export default PatientDelete