import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal/Modal';

import EditReportPatient from './EditReportPatient';
import './EditReportPatient.css'

import * as RiIcons from 'react-icons/ri'


const EditReportPatientModal = ({ report }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="report-patient-edit-icon-modal-container">
            <RiIcons.RiFileEditFill
                className='report-patient-edit-icon'
                onClick={() => setShowModal(true)}
            />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReportPatient
                        report={report}
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </div>
    );
}

export default EditReportPatientModal