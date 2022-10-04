import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
    const [maxTitle, setMaxTitle] = useState("")
    const [content, setContent] = useState("")
    const [delta, setDelta] = useState('')

    const [titleError, setTitleError] = useState("")
    const [contentError, setContentError] = useState("")

    useEffect(() => {
        if (edit) {
            setTitle(edit.title)
            setContent(edit.content)
            setId(edit.id)
            setTitleError("")
            setContentError("")
        }
        if (!edit) {
            setTitle("")
            setContent("")
            setId(null)
            setTitleError("")
            setContentError("")
        }
    }, [edit])

    useEffect(() => {
        if (title.length >= 100) {
            setMaxTitle("Maximum characters for title reached")
        }
        if (title.length < 100) {
            setMaxTitle("")
        }
        if (title.length) {
            setTitleError("")
        }
        if (content.length) {
            setContentError("")
        }
    }, [title, content])

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
            else {
                setEdit(null)
                setTitle("")
                setContent("")
                setTitleError("")
                setContentError("")
            }
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }


    const handleContentChange = (content, delta, source, editor) => {
        setContent(content)
        setDelta(editor.getHTML(content))
        const text = editor.getText()
        if (text === "\n") {
            setContent("")
        }
    }

    const cancelEdit = (e) => {
        e.preventDefault()
        setEdit(null)
        setTitleError("")
        setContentError("")
    }


    return (
        <div className="announcement-form-page-container" onSubmit={handleSubmit}>
            <div className="announcement-form-header-container">
                {edit ? (
                    <h1>Edit Announcement</h1>

                ) : (
                    <h1>Add Announcement</h1>
                )}
            </div>
            {user ?
                <form className="announcement-form-container">
                    <div className="announcement-form-title-container">
                        <label className={titleError ? "announcement-form-title-label form-error" : "announcement-form-title-label"}>Title:</label>
                        <input className={titleError ? "announcement-input-form form-error-input-border" : "announcement-input-form"}
                            maxLength="100"
                            name="title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                        {maxTitle && <p className="announcement-form-errors">{maxTitle}</p>}
                    </div>
                    {/* <div className="announcement-form-content-container"> */}
                    <label className={contentError ? "announcement-form-title-label form-error" : "announcement-form-title-label"}>Content:</label>
                    <ReactQuill
                        className={contentError ? "announcement-form-content form-error" : "announcement-form-content"}
                        theme="snow"
                        value={content}
                        placeholder={"Please add your announcement here"}
                        onChange={handleContentChange}
                        style={
                            {
                                width: '100%',
                                height: '70%',
                            }
                        }
                        />
                    {content.length ?
                        <div className="annoucement-form-content-tracker-container">
                            <span className="annoucement-form-content-tracker-text" >
                                character length after styling <span style={(content.length > 5000 ? { color: "red" } : null)}>{content.length}</span>
                                /5000
                            </span>
                        </div>
                        : null
                    }
                    {/* </div> */}
                    {(titleError || contentError) &&
                        <div className="announcement-form-errors-container">
                            {titleError && <p className="announcement-form-errors">{titleError}</p>}
                            {contentError && <p className="announcement-form-errors">{contentError}</p>}
                        </div>
                    }

                    {edit ? (
                        <div className="announcement-form-button-container">
                            <button type="button" className="announcement-buttons" onClick={cancelEdit}> Cancel</button>
                            <button className="announcement-buttons">Edit</button>
                        </div>
                    ) : (
                        <div className="announcement-form-button-container">
                            <button className="announcement-buttons announcement-add">Add</button>
                        </div>
                    )}

                </form>
                : <h2>Must be signed-in to make announcement</h2>
            }
        </div>
    )
}

export default AnnouncementForm