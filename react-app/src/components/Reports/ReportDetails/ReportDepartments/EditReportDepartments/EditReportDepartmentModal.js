import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal/Modal';
import EditReportDepartments from './EditReportDepartments.js';
import * as RiIcons from 'react-icons/ri'

import './EditReportDepartments.css'

const EditReportDepartmentModal = ({ report }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="report-department-edit-modal-container">
            <RiIcons.RiFileEditFill
                className='report-department-edit-icon'
                onClick={() => setShowModal(true)}
            />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReportDepartments
                        report={report}
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </div>
    );
}

export default EditReportDepartmentModal
