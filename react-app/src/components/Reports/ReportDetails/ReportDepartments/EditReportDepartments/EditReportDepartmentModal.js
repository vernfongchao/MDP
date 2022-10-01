import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal/Modal';
import EditReportDepartments from './EditReportDepartments.js';

import './EditReportDepartments.css'

const EditReportDepartmentModal = ({ report}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReportDepartments
                        report={report}/>
                </Modal>
            )}
        </>
    );
}

export default EditReportDepartmentModal
