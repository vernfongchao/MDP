
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getContact } from '../../../store/contact'
import './PatientDetail.css'

import * as RiIcons from 'react-icons/ri'


const PatientDetail = ({ patient, index, setIndex }) => {

    const dispatch = useDispatch()

    const contact = Object.values(useSelector(state => state.contact))[0]

    const [contactFirstName, setContactFirstName] = useState("")
    const [contactLastName, setContactLastName] = useState("")
    const [contactPhone, setContactPhone] = useState("")

    useEffect(() => {
        if (patient) {
            dispatch(getContact(patient?.id))
        }
        else {

        }
    }, [dispatch, patient])

    useEffect(() => {
        if (contact?.patientId === patient?.id) {
            setContactFirstName(contact?.firstName)
            setContactLastName(contact?.lastName)
            setContactPhone(contact?.phone)
        }
        if (!patient) {
            setContactFirstName("")
            setContactLastName("")
            setContactPhone("")
        }
    }, [contact, patient])


    return (
        <div className="patient-detail-page-container">
            <div className="patient-detail-emergency-container">
                <h2>Emergency Contact Information</h2>
                {patient ?
                    <>
                        <label>First Name</label>
                        <input
                            value={contactFirstName}
                            onChange={e => setContactFirstName(e.target.value)}
                        />
                        <label>Last Name</label>
                        <input
                            value={contactLastName}
                            onChange={e => setContactLastName(e.target.value)}
                        />
                        <label>Phone</label>
                        <input
                            value={contactPhone}
                            onChange={e => setContactPhone(e.target.value)}
                        />
                    </>
                    : null
                }
            </div>
            <div className="patient-detail-department-container">
                <h2>Department</h2>
            </div>
            <div className="patient-detail-reports-container">
                <h2>Reports</h2>
            </div>
        </div>
    )
}

export default PatientDetail