import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Announcement from "../Announcement/Announcement"
import { addAnnouncement } from "../../../store/announcements"
import { editAnnouncement } from "../../../store/announcements"

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./AnnouncementForm.css"


const AnnouncementForm = ({ edit, setEdit, announcement }) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const [id, setId] = useState(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [delta, setDelta] = useState('')

    const [titleError, setTitleError] = useState("")
    const [contentError, setContentError] = useState("")



    useEffect(() => {
        if (edit) {
            setTitle(edit.title)
            setContent(edit.content)
            setId(edit.id)
        }
        else if (!edit) {
            setTitle("")
            setContent("")
            setId(null)
        }
    }, [edit, announcement])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (edit) {
            const editedAnnouncement = await dispatch(editAnnouncement({
                id,
                staff_id: announcement.staffId,
                title,
                content
            }))
            if (editedAnnouncement.errors) {
                console.log(editedAnnouncement.errors)
                setTitleError(editedAnnouncement.errors.title ? editedAnnouncement.errors.title[0] : "")
                setContentError(editedAnnouncement.errors.content ? editedAnnouncement.errors.content[0] : "")
            }
            else {
                setEdit(null)
                setTitleError("")
                setContentError("")
            }
        }


        else {
            const newAnnouncement = await dispatch(addAnnouncement({
                staff_id: user.id,
                title,
                content
            }))
            if (newAnnouncement.errors) {
                setTitleError(newAnnouncement.errors.title ? newAnnouncement.errors.title[0] : "")
                setContentError(newAnnouncement.errors.content ? newAnnouncement.errors.content[0] : "")
            }
        }
    }


    const handleContentChange = (content, delta, source, editor) => {
        setContent(content)
        setDelta(editor.getHTML(content))
    }


    return (
        <div className="announcement-form-page-container" onSubmit={handleSubmit}>
            {edit ? (
                <h1>Edit Announcement</h1>

            ) : (
                <h1>Add Announcement</h1>
            )}
            {user ?
                <form className="announcement-form-container">
                    <div>
                        <label className={titleError ? "announcement-form-title-label form-error" : "announcement-form-title-label"}>Title</label>
                        <input

                            type="text"
                            label="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={contentError ? "announcement-form-title-label form-error" : "announcement-form-title-label"}>Content</label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={handleContentChange}
                            style={
                                {
                                    width: '455px',
                                    height: '150px',
                                }
                            }
                        />
                        {/* <textarea
                            className={contentError ? "announcement-form-title-label form-error-input-border" : "announcement-form-title-label"}
                            placeholder="Please add the description here..."
                            label="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        /> */}
                    </div>
                    <div className="announcement-form-button-container">
                        {edit ? (
                            <button>Edit</button>
                        ) : (
                            <button>Add</button>
                        )}
                    </div>
                </form>
                : <h2>Must be signed-in to make announcement</h2>
            }
        </div>
    )
}

export default AnnouncementForm