


import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPatient } from '../../../store/patient'
import { editPatient } from '../../../store/patient'

import * as RiIcons from 'react-icons/ri'
import * as ImIcons from 'react-icons/im'
import * as AiIcons from 'react-icons/ai'
import * as FcIcons from 'react-icons/fc'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser'

import './PatientProfile.css'

const PatientProfile = ({ index, patient, setIndex, setSearch }) => {
    const dispatch = useDispatch()

    const patients = Object.values(useSelector(state => state.patients))

    const [lastIndex, setLastIndex] = useState(index)

    const [id, setId] = useState("")
    const [newPatient, setNewPatient] = useState(false)
    const [success, setSuccess] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [notes, setNotes] = useState("")
    const [idError, setIdError] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [addressError, setAddressError] = useState("")

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
            setAddress(patient?.address)
            setNotes(patient?.notes)
            setIdError("")
            setFirstNameError("")
            setLastNameError("")
            setAddressError("")
            setPreviewPicture("")
            setDeletePicture("")
            setUploadPicture("")
            setNewPatient(false)
            setSuccess("")
        }
        else if (!patient) {
            setId("")
            setFirstName("")
            setLastName("")
            setAddress("")
            setNotes("")
            setIdError("")
            setFirstNameError("")
            setLastNameError("")
            setAddressError("")
            setPreviewPicture("")
            setDeletePicture("")
            setUploadPicture("")
            setSuccess("")
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
        setFirstNameError("")
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setSuccess("")
        setLastNameError("")
        setLastName(e.target.value)
    }

    const handleAddressName = (e) => {
        setSuccess("")
        setAddressError("")
        setAddress(e.target.value)
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
        setPreviewPicture("")
        setUploadPicture("")
        setDeletePicture("")
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        formData.append('notes', notes)
        formData.append('address', address)
        if (uploadPicture) {
            formData.append('image', uploadPicture)
            setIsLoading("Please wait while image is loading")
        }
        if (deletePicture) {
            formData.append('img_id', patient?.imgId)
            formData.append('imgDelete', deletePicture)
        }
        if (newPatient) {
            const newPatient = await dispatch(addPatient(formData))
            if (newPatient && newPatient.id) {
                setSearch("")
                setNewPatient(false)
                setSuccess("Saved")

                setFirstNameError("")
                setLastNameError("")
                setAddressError("")

                setPreviewPicture("")
                setDeletePicture("")
                setUploadPicture("")

                setIsLoading("")
                setIndex(patients.length)
            }
            else {
                setIsLoading(newPatient.image)
                setAddressError(newPatient.address)
                setFirstNameError(newPatient.first_name)
                setLastNameError(newPatient.last_name)
            }
        }
        else if (!newPatient) {
            if (!id) {
                setIdError("Please Select a Patient")
                return
            }
            formData.append("id", id)
            const editedPatient = await dispatch(editPatient(formData))
            if (editedPatient.id) {
                setNewPatient(false)
                setSuccess("Saved")

                setFirstNameError("")
                setLastNameError("")
                setAddressError("")

                setPreviewPicture("")
                setDeletePicture("")
                setUploadPicture("")

                setIsLoading("")
            }
            else {
                setIsLoading(editedPatient.image)
                setAddressError(editedPatient.address)
                setFirstNameError(editedPatient.first_name)
                setLastNameError(editedPatient.last_name)
            }
        }
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
                            {(patient || newPatient) &&
                                <RiIcons.RiSave3Fill
                                    className='patient-profile-edit-icon'
                                    onClick={handleSubmit}
                                />
                            }
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

                {(patient || newPatient) &&
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
                            <div>
                                <p className={lastNameError ? 'patient-profile-info-header-text patient-profile-error'
                                    : "patient-profile-info-header-text "
                                }>Address</p>
                                <input
                                    className='patient-profile-edit-name-input'
                                    value={address}
                                    onChange={handleAddressName}
                                    type='text'
                                />
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
                            {idError && <span className='patient-profile-error'>
                                {idError}
                            </span>}
                            {addressError && <span className='patient-profile-error'>
                                {addressError}
                            </span>}
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
                }
            </div>
            {(patient || newPatient) &&
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
            }
        </div>
    )
}

export default PatientProfile