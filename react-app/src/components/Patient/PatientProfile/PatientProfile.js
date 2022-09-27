


import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { editPatient } from '../../../store/staff';

import * as RiIcons from 'react-icons/ri'
import * as ImIcons from 'react-icons/im'
import * as AiIcons from 'react-icons/ai'
import * as FcIcons from 'react-icons/fc'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser'

import './PatientProfile.css'

const PatientProfile = ({ index, patient, setIndex }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [lastIndex, setLastIndex] = useState(index)

    const [id, setId] = useState("")
    const [newPatient, setNewPatient] = useState(false)
    const [success, setSuccess] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [notes, setNotes] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")

    const imageInputRef = useRef()

    const [previewPicture, setPreviewPicture] = useState("")
    const [deletePicture, setDeletePicture] = useState()
    const [uploadPicture, setUploadPicture] = useState()

    const [isLoading, setIsLoading] = useState("")

    const [delta, setDelta] = useState('')

    useEffect(() => {
        if (patient) {
            setLastIndex(index)
            setId(patient?.id)
            setFirstName(patient?.firstName)
            setLastName(patient?.lastName)
            setNotes(patient?.notes)
            setFirstNameError("")
            setLastNameError("")
            setPreviewPicture("")
            setDeletePicture("")
            setUploadPicture("")
        }
        else if (!patient) {
            setFirstName("")
            setLastName("")
            setNotes("")
            setFirstNameError("")
            setLastNameError("")
            setPreviewPicture("")
            setDeletePicture("")
            setUploadPicture("")
        }
    }, [patient, index])

    const handleImageError = (e) => {
        e.target.src = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }

    const handleContentChange = (content, delta, source, editor) => {
        setSuccess("")
        setNotes(content)
        setDelta(editor.getHTML(content))
        const text = editor.getText()
        if (text === "\n") {
            setNotes("")
        }
    }

    const handleFirstName = (e) => {
        setSuccess("")
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setSuccess("")
        setLastName(e.target.value)
    }

    const addNewPatient = (e) => {
        setSuccess("")
        setIndex(-1)
        setNewPatient(true)
    }

    const cancelNewPatient = (e) => {
        setSuccess("")
        setIndex(lastIndex)
        setNewPatient(false)
    }

    const handleAddImage = (e) => {
        if (!uploadPicture) return imageInputRef.current.click()
    }

    const handleCancelImage = (e) => {
        setPreviewPicture()
        setUploadPicture()
        setDeletePicture()
    }


    const onChangeImageFiles = (e) => {
        if (patient?.img) {
            setDeletePicture(patient?.img)
        }
        setSuccess("")
        const file = e.target.files[0]
        const imagePreview = URL.createObjectURL(file)
        setPreviewPicture(imagePreview)
        setUploadPicture(file)
        e.target.value = null
    }


    return (
        <div className="patient-profile-page-container">
            <div className='patient-profile-detail-container'>
                <div className='patient-profile-header-container'>
                    <div className='patient-profile-edit-position'>
                        <div className='patient-profile-edit-container'>
                            {success ?
                                <span className='patient-profile-edit-success'>
                                    {success}
                                </span> : null}
                            <RiIcons.RiSave3Fill
                                className='patient-profile-edit-icon'
                            // onClick={handleEdit} 
                            />
                            {newPatient ?
                                <FcIcons.FcCancel
                                    className='patient-profile-edit-icon'
                                    onClick={cancelNewPatient}
                                />
                                :
                                <AiIcons.AiOutlineUserAdd
                                    className='patient-profile-edit-icon'
                                    onClick={addNewPatient}
                                />
                            }
                        </div>
                    </div>
                    {newPatient ?
                        <h1>
                            Add Patient
                        </h1>
                        :
                        <h1>
                            Patient Profile
                        </h1>
                    }
                </div>


                <div className='patient-profile-container'>
                    <div className='patient-profile-picture-container'>
                        <div className='patient-profile-picture-icon-position'>
                            {uploadPicture ?
                                <ImIcons.ImCancelCircle
                                    className='patient-profile-picture-icon'
                                    onClick={handleCancelImage} />
                                :
                                <ImIcons.ImFilePicture
                                    className='patient-profile-picture-icon'
                                    onClick={handleAddImage} />
                            }
                        </div>
                        <img
                            className='patient-profile-picture'
                            src={previewPicture ? previewPicture : patient?.img || ""}
                            onError={handleImageError}
                            alt="profile"
                        >
                        </img>
                    </div>

                    <div className='patient-profile-info-container'>
                        {newPatient ?
                            null
                            :
                            <div className='patient-profile-id-name-update-container'>
                                <p className='patient-profile-info-header-text'>Patient ID</p>
                                <p className='patient-profile-info-text'>{patient?.id}</p>
                            </div>
                        }
                        <div className='patient-profile-id-name-update-container split-name'>
                            <div>
                                <p className={firstNameError ? 'patient-profile-info-header-text patient-profile-error'
                                    : "patient-profile-info-header-text "
                                }>First Name</p>
                                <input
                                    className='patient-profile-edit-name-input'
                                    value={firstName}
                                    onChange={handleFirstName}
                                    type='text'
                                />
                            </div>
                            <div>
                                <p className={lastNameError ? 'patient-profile-info-header-text patient-profile-error'
                                    : "patient-profile-info-header-text "
                                }>Last Name</p>
                                <input
                                    className='patient-profile-edit-name-input'
                                    value={lastName}
                                    onChange={handleLastName}
                                    type='text'
                                />
                            </div>
                        </div>
                        {newPatient ?
                            null :
                            <div className='staff-profile-id-name-update-container'>
                                <p className='staff-profile-info-header-text'>Last Updated</p>
                                <p className='staff-profile-info-text'>{patient?.updatedOn}</p>
                            </div>
                        }
                        <div>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                ref={imageInputRef}
                                onChange={onChangeImageFiles}
                                accept=".jpeg, .jpg, .gif , .png"

                            />

                        </div>
                        {isLoading &&
                            <span className='patient-profile-error'>{isLoading}
                            </span>
                        }
                        {firstNameError && <span className='patient-profile-error'>
                            {firstNameError}
                        </span>
                        }
                        {lastNameError && <span className='patient-profile-error'>
                            {lastNameError}
                        </span>
                        }
                    </div>

                </div>
            </div>

            <div className='staff-profile-notes-container'>
                <ReactQuill
                    theme="snow"
                    value={notes}
                    placeholder={"Add notes here"}
                    onChange={handleContentChange}
                    style={
                        {
                            width: '100%',
                            height: '400px',
                        }
                    }
                />
            </div>
        </div>
    )
}

export default PatientProfile