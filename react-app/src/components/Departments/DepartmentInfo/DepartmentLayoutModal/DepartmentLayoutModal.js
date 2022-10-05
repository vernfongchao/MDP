import { useState } from "react";
import { Modal } from "../../../../context/Modal/Modal";

import DepartmentLayout from "./DepartmentLayout";
import MDPLayout from '../MDPLayout.png'

import './DepartmentLayout.css'

const DepartmentLayoutModal = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="department-info-modal-container">
            <img
                className="department-info-layout"
                src={MDPLayout}
                alt="MDPLayout"
                onClick={() => setShowModal(true)}>
            </img>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DepartmentLayout
                    />
                </Modal>
            )}
        </div>
    )
}



export default DepartmentLayoutModal