
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editStaff } from '../../../store/staff';

import * as RiIcons from 'react-icons/ri'
import * as ImIcons from 'react-icons/im'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser'

import './StaffProfile.css'


const StaffProfile = ({ index }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const staff = Object.values(useSelector(state => state.staffs))[index]

    const [id, setId] = useState(0)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [notes, setNotes] = useState("")

    const [success, setSuccess] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")

    const imageInputRef = useRef()

    const [isLoading, setIsLoading] = useState("")

    const [previewPicture, setPreviewPicture] = useState("")
    const [deletePicture, setDeletePicture] = useState()
    const [uploadPicture, setUploadPicture] = useState()
    // const [picture, setPicture] = useState("https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg")


    const [delta, setDelta] = useState('')

    let isEdit = user?.id === staff?.id

    useEffect(() => {
        if (isEdit) {
            setId(staff?.id)
            setFirstName(staff?.firstName)
            setLastName(staff?.lastName)
            setNotes(staff?.notes)
        }
        else if (!isEdit) {
            setSuccess("")
            setFirstNameError("")
            setLastNameError("")
            setDeletePicture("")
            setPreviewPicture("")
            setUploadPicture("")
        }
    }, [isEdit])

    const handleImageError = (e) => {
        e.target.src = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }

    const handleFirstName = (e) => {
        setSuccess("")
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setSuccess("")
        setLastName(e.target.value)
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

    const handleAddImage = (e) => {
        if (!uploadPicture) return imageInputRef.current.click()
    }

    const handleCancelImage = (e) => {
        setPreviewPicture()
        setUploadPicture()
        setDeletePicture()
    }


    const onChangeImageFiles = (e) => {
        if (staff.img) {
            setDeletePicture(staff.img)
        }
        setSuccess("")
        const file = e.target.files[0]
        const imagePreview = URL.createObjectURL(file)
        setPreviewPicture(imagePreview)
        setUploadPicture(file)
        e.target.value = null
    }


    const handleEdit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("id", id)
        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        formData.append('notes', notes)
        if (uploadPicture) {
            formData.append('image', uploadPicture)
        }
        if (deletePicture) {
            formData.append('img_id', staff?.imgId)
            formData.append('imgDelete', deletePicture)
        }

        setIsLoading("Please wait while image is loading")
        const profile = await dispatch(editStaff(formData))

        if (profile && profile.id) {
            setIsLoading("")
            setPreviewPicture("")
            setFirstNameError("")
            setLastNameError("")
            setSuccess("Saved")
            setUploadPicture("")
        }
        else {
            setIsLoading(profile.image)
            setFirstNameError(profile.first_name)
            setLastNameError(profile.last_name)
        }
    }

    return (
        <div className="staff-profile-page-container">
            <div className='staff-profile-detail-container'>
                <div className='staff-profile-header-container'>
                    {isEdit &&
                        <div className='staff-profile-edit-position'>
                            <div className='staff-profile-edit-container'>
                                {success ?
                                    <span className='staff-profile-edit-success'>
                                        {success}
                                    </span> : null}
                                <RiIcons.RiSave3Fill
                                    className='staff-profile-edit-icon'
                                    onClick={handleEdit} />
                            </div>
                        </div>
                    }
                    <h1>
                        Staff Profile
                    </h1>

                </div>

                <div className='staff-profile-container'>
                    <div className='staff-profile-picture-container'>
                        <div className='staff-profile-picture-icon-position'>
                            {isEdit && (uploadPicture ?
                                <ImIcons.ImCancelCircle
                                    className='staff-profile-picture-icon'
                                    onClick={handleCancelImage} />
                                // <button onClick={handleCancelImage}>
                                //     Cancel Change
                                // </button>
                                :
                                <ImIcons.ImFilePicture
                                    className='staff-profile-picture-icon'
                                    onClick={handleAddImage} />
                                // <button onClick={handleAddImage}>
                                //     Change Image
                                // </button>
                            )
                            }
                        </div>
                        <img
                            className='staff-profile-picture'
                            src={previewPicture ? previewPicture : staff?.img}
                            onError={handleImageError}
                            alt="profile"
                        >
                        </img>

                    </div>
                    <div className='staff-profile-info-container'>
                        <div className='staff-profile-id-name-update-container'>
                            <p className='staff-profile-info-header-text'>Staff ID</p>
                            <p className='staff-profile-info-text'>{staff?.id}</p>
                        </div>
                        {isEdit ?
                            <div className='staff-profile-id-name-update-container split-name'>
                                <div>
                                    <p className={firstNameError ? 'staff-profile-info-header-text staff-profile-error'
                                        : "staff-profile-info-header-text "
                                    }>First Name</p>
                                    <input
                                        className='staff-profile-edit-name-input'
                                        value={firstName}
                                        onChange={handleFirstName}
                                        type='text'
                                    />
                                </div>
                                <div>
                                    <p className={lastNameError ? 'staff-profile-info-header-text staff-profile-error'
                                        : "staff-profile-info-header-text "
                                    }>Last Name</p>
                                    <input
                                        className='staff-profile-edit-name-input'
                                        value={lastName}
                                        onChange={handleLastName}
                                        type='text'
                                    />
                                </div>
                            </div>
                            :
                            <div className='staff-profile-id-name-update-container split-name'>
                                <div>
                                    <p className='staff-profile-info-header-text'>First Name</p>
                                    <p className='staff-profile-info-text'>{staff?.firstName}</p>

                                </div>
                                <div>
                                    <p className='staff-profile-info-header-text'>Last Name</p>
                                    <p className='staff-profile-info-text'>{staff?.lastName}</p>
                                </div>
                            </div>
                        }
                        <div className='staff-profile-id-name-update-container'>
                            <p className='staff-profile-info-header-text'>Last Updated</p>
                            <p className='staff-profile-info-text'>{staff?.updateOn}</p>
                        </div>
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
                            <span className='staff-profile-error'>{isLoading}
                            </span>
                        }
                        {firstNameError && <span className='staff-profile-error'>
                            {firstNameError}
                        </span>
                        }
                        {lastNameError && <span className='staff-profile-error'>
                            {lastNameError}
                        </span>
                        }

                    </div>

                </div>

            </div>

            <div className='staff-profile-notes-container'>
                {isEdit ?
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

                    :
                    <>  <h4>Notes:</h4>
                        <p>{parse(staff?.notes || "")}</p>
                    </>
                }
            </div>


        </div>
    )
}

export default StaffProfile