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
    const [maxContent, setMaxContent] = useState("")
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
        if (title.length >= 1000) {
            setMaxTitle("Maximum characters for title reached")
        }
        if (title.length < 1000) {
            setMaxTitle("")
        }
    }, [title])

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
        if (content.length > 5000) {
            setMaxContent("Maximum Characters Reached for Content")
        }
        else if (content.length < 5000) {
            setMaxContent("")
        }
        setContent(content)
        setDelta(editor.getHTML(content))
        const text = editor.getText()
        if (text === "\n") {
            setContent("")
        }
    }

    const cancelEdit = () => {
        setEdit(null)
    }




    return (
        <div className="announcement-form-page-container" onSubmit={handleSubmit}>
            <div className="announcement-form-page-subcontainer">
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
                        <input className="announcement-input-form"
                            maxLength="1000"
                            name="title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                        {maxTitle && <p className="announcement-form-errors">{maxTitle}</p>}
                    </div>
                    <div className="announcement-form-content-container">
                        <label className={contentError ? "announcement-form-title-label form-error" : "announcement-form-title-label"}>Content:</label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            placeholder={"Please add your announcement here"}
                            onChange={handleContentChange}
                            style={
                                {
                                    width: '100%',
                                    height: '400px',
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
                        {content.length ?
                            <div className="annoucement-form-countent-tracker-container">
                                <div className="annoucement-form-countent-tracker-position">
                                    <span style={{ "font-size": ".75em" }}>
                                        character length after style added <span style={(content.length > 5000 ? { color: "red" } : null)}>{content.length}</span>
                                        /5000
                                    </span>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                    {(titleError || contentError) &&
                        <div className="announcement-form-errors-container">
                            {titleError && <p className="announcement-form-errors">{titleError}</p>}
                            {contentError && <p className="announcement-form-errors">{contentError}</p>}
                        </div>
                    }

                    {edit ? (
                        <div className="announcement-form-button-container">
                            <button className="announcement-buttons" onClick={cancelEdit}> Cancel</button>
                            <button className="announcement-buttons">Edit</button>
                        </div>
                    ) : (
                        <button className="announcement-buttons">Add</button>
                    )}

                </form>
                : <h2>Must be signed-in to make announcement</h2>
            }
        </div>
    )
}

export default AnnouncementForm