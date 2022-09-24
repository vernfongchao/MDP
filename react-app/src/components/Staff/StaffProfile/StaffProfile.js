
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './StaffProfile.css'

const StaffProfile = ({ index }) => {
    const user = useSelector(state => state.session.user)
    const staff = Object.values(useSelector(state => state.staffs))[index]
    console.log(staff.firstName)

    const [picture, setPicture] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [notes, setNotes] = useState("")
    const [delta, setDelta] = useState('')

    let isEdit = user?.id === staff?.id

    useEffect(() => {
        if (isEdit) {
            setFirstName(staff?.firstName)
            setLastName(staff?.lastName)
            setNotes(staff?.notes)
        }
    }, [isEdit])

    const handleImageError = (e) => {
        e.target.src = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }

    const handleContentChange = (content, delta, source, editor) => {
        setNotes(content)
        setDelta(editor.getHTML(content))
        const text = editor.getText()
        if (text === "\n") {
            setNotes("")
        }
    }


    return (
        <div className="staff-profile-page-container">
            <div className='staff-profile-detail-container'>
                <div className='staff-profile-header-container'>
                    <h1>
                        Staff Profile
                    </h1>

                </div>

                <div className='staff-profile-container'>
                    <div className='staff-profile-picture-container'>
                        <img
                            className='staff-profile-picture'
                            src={""}
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
                                    <p className='staff-profile-info-header-text'>First Name</p>
                                    <input
                                        className='staff-profile-edit-name-input'
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        type='text'
                                    />
                                </div>
                                <div>
                                    <p className='staff-profile-info-header-text'>Last Name</p>
                                    <input
                                        className='staff-profile-edit-name-input'
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
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

                    </div>

                </div>

            </div>

            <div className='staff-profile-notes-container'>
                {isEdit ?
                    <ReactQuill
                        theme="snow"
                        value={notes}
                        placeholder={"Please add your announcement here"}
                        onChange={handleContentChange}
                        style={
                            {
                                width: '100%',
                                height: '400px',
                            }
                        }
                    />

                    :
                    <p>{staff?.notes}</p>
                }
            </div>


        </div>
    )
}

export default StaffProfile