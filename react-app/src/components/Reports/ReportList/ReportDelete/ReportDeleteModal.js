import { useState } from "react";
import { Modal } from "../../../../context/Modal/Modal";
import ReportDelete from "./ReportDelete";


import * as AiIcons from 'react-icons/ai'
import './ReportDelete.css'

const ReportDeleteModal = ({id,i,index,setIndex})=> {
    const [showModal,setShowModal] = useState(false)
    return (
        <div className="delete-report-icon-position">
            <AiIcons.AiFillDelete
                className="delete-report-icon"
                onClick={() => setShowModal(true)}
            />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ReportDelete 
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

export default ReportDeleteModal