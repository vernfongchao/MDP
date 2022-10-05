import React, { useState } from 'react';
import { Modal } from '../../../../../context/Modal/Modal';

import EditStaffDepartment from './EditStaffDepartment';
import './EditStaffDepartment.css'

import * as RiIcons from 'react-icons/ri'

const EditStaffDepartmentModal = ({staff}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="staff-department-edit-modal-container">
            <RiIcons.RiFileEditFill
                className='staff-department-edit-icon'
                onClick={() => setShowModal(true)}
            />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditStaffDepartment
                        staff={staff}
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </div>
    );
}

export default EditStaffDepartmentModal