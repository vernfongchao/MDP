import { useState } from "react";
import { Modal } from "../../../context/Modal/Modal";
import PatientDelete from "./PatientDelete";

import * as AiIcons from 'react-icons/ai'
import './PatientDelete.css'

const PatientDeleteModal = ({ id, i, index, setIndex }) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div className="delete-patient-icon-position">
            <AiIcons.AiFillDelete
                className="delete-patient-icon"
                onClick={() => setShowModal(true)}
            />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PatientDelete
                        id={id}
                        i={i}
                        index={index}
                        setIndex={setIndex}
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </div>
    );
}

export default PatientDeleteModal