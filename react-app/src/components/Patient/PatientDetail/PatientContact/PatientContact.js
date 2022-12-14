import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

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
        let last = e.target.value.split("")[e.target.value.length - 1]
        if (!last || /\d/.test(last)){
            setSuccess("")
            setPhone(e.target.value)
        }
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
                <h2 className='patient-contact-header'>Emergency Contact</h2>
            </div>
            {patient &&
                <div className='patient-contact-save-icon-container'>
                    {success && <span className='patient-contact-edit-success'>{success}</span>}
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
                            <input className='patient-contact-input-fields'
                                value={firstName}
                                onChange={handleFirstName}
                                maxLength="255"
                            />
                        </div>
                        <div className='patient-contact-last-name-container'>
                            <label className='patient-contact-first-name-header'>Last Name</label>
                            <input className='patient-contact-input-fields'
                                value={lastName}
                                onChange={handleLastName}
                                maxLength="255"
                            />
                        </div>

                    </div>
                    <div className='patient-contact-phone-container'>
                        <label className='patient-contact-phone-header'>Phone</label>
                        <input className='patient-contact-input-fields'
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