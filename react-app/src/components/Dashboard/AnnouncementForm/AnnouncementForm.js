import { useEffect, useState } from "react"
import Announcement from "../Announcement/Announcement"

import "./AnnouncementForm.css"


const AnnouncementForm = ({ edit, setEdit, announcement }) => {

    const [id, setId] = useState(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")



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
    }, [edit,announcement])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(edit){
            // const announcement = await dispatchEvent()

        }
        else{

        }
    }

    return (
        <div className="announcement-form-page-container" onSubmit={handleSubmit}>
            {edit?(
                <h1>Edit Announcement</h1>

            ):(
                <h1>Add Announcement</h1>
            )}
            <form className="announcement-form-container">
                <div>
                    <label></label>
                    <input
                        type="text"
                        label="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label></label>
                    <textarea
                        placeholder="Please add the description here..."
                        label="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    {edit?(
                        <button>Edit</button>
                    ):(
                        <button>Add</button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default AnnouncementForm