import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal/Modal';

import EditReportStaff from './EditReportStaff';
import './EditReportStaff.css'

import * as RiIcons from 'react-icons/ri'


const EditReportStaffModal = ({ report }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="report-staff-edit-icon-modal-container">
            <RiIcons.RiFileEditFill
                className='report-staff-edit-icon'
                onClick={() => setShowModal(true)}
            />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReportStaff
                        report={report}
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </div>
    );
}

export default EditReportStaffModal