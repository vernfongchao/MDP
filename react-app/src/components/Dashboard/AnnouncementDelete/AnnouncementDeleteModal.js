import React, {useState} from "react"
import {Modal} from '../../../context/Modal/Modal'
import AnnouncementDelete from "./AnnouncementDelete"

import * as AiIcons from 'react-icons/ai'
import './AnnouncementDelete.css'

const AnnouncementDeleteModal = ({id,setIndex , i ,index}) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className='announcement-delete-modal-container'>
            <div className='announcement-delete-button-container'>

                <AiIcons.AiFillDelete
                    className="announcement-delete-icon"
                    onClick={() => setShowModal(true)}
                />
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AnnouncementDelete setShowModal={setShowModal} id={id} setIndex={setIndex} i={i} index={index} />
                </Modal>
            )}
        </div> 
    );
}
export default AnnouncementDeleteModal