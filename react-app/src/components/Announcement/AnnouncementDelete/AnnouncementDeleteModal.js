import React, { useState } from "react"
import { Modal } from '../../../context/Modal/Modal'
import AnnouncementDelete from "./AnnouncementDelete"

import * as AiIcons from 'react-icons/ai'
import './AnnouncementDelete.css'

const AnnouncementDeleteModal = ({ id, setIndex, i, index }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <AiIcons.AiFillDelete
                className="announcement-delete-icon"
                onClick={() => setShowModal(true)}
            />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AnnouncementDelete setShowModal={setShowModal} id={id} setIndex={setIndex} i={i} index={index} />
                </Modal>
            )}
        </>
    );
}
export default AnnouncementDeleteModal