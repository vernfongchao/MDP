import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getContact } from '../../../../store/contact'
import { updateContact } from '../../../../store/contact'
import './PatientContact.css'

import * as RiIcons from 'react-icons/ri'

const PatientContact = ({ patient }) => {
    const dispatch = useDispatch()


    useEffect(() => {
        (async () => {
            if (patient) {
                const contact = await dispatch(getContact(patient?.id))
                if (contact.id) {
                    setFirstName(contact?.firstName)
                    setLastName(contact?.lastName)
                    setPhone(contact?.phone)
                }
                else {
                    setFirstName("")
                    setLastName("")
                    setPhone("")
                    setSuccess("")
                }
            }
        })()
    }, [dispatch, patient])

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [success, setSuccess] = useState("")

    const handleFirstName = (e) => {
        setSuccess("")
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setSuccess("")
        setLastName(e.target.value)
    }

    const handlePhone = (e) => {
        setSuccess("")
        setPhone(e.target.value)
    }

    const handleSave = async () => {
        const contact = await dispatch(updateContact({
            "id":patient.id,
            "first_name": firstName,
            "last_name" : lastName,
            "phone": phone
        }))
        if (contact.id){
            setFirstName(contact?.firstName)
            setLastName(contact?.lastName)
            setPhone(contact?.phone)
            setSuccess("Saved")
        }
    }

    return (
        <div className="patient-contact-page-container">
            <div className='patient-contact-header-container'>
                <h2>Emergency Contact</h2>
            </div>
            {patient &&
                <div className='patient-contact-save-icon-container'>
                    {success && <span style={{fontSize:"1.5em"}}>{success}</span>}
                    <RiIcons.RiSave3Fill
                        className='patient-contact-save-icon'
                        onClick={handleSave}
                    />

                </div>}
            {patient &&
                <div className='patient-contact-name-phone-container'>
                    <div className='patient-contact-name-container'>
                        <div className='patient-contact-first-name-container'>
                            <label className='patient-contact-first-name-header'>First Name</label>
                            <input
                                value={firstName}
                                onChange={handleFirstName}
                            />
                        </div>
                        <div className='patient-contact-last-name-container'>
                            <label className='patient-contact-first-name-header'>Last Name</label>
                            <input
                                value={lastName}
                                onChange={handleLastName}
                            />
                        </div>

                    </div>
                    <div className='patient-contact-phone-container'>
                        <label className='patient-contact-phone-header'>Phone</label>
                        <input
                            value={phone}
                            onChange={handlePhone}
                            maxLength="10"
                        />
                    </div>
                </div>
            }
        </div >
    )
}

export default PatientContact