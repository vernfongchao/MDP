import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as RiIcons from 'react-icons/ri'
import * as ImIcons from 'react-icons/im'
import * as AiIcons from 'react-icons/ai'
import * as FcIcons from 'react-icons/fc'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser'

import "./Report.css"

const Report = ({ index, reports, setIndex }) => {

    const report = reports[index]

    const [lastIndex, setLastIndex] = useState(index)

    const [newReport, setNewReport] = useState(false)
    const [title, setTitle] = useState(report?.title)
    // const [maxTitle, setMaxTitle] = useState("")
    const [content, setContent] = useState("")
    const [maxContent, setMaxContent] = useState("")
    const [delta, setDelta] = useState('')

    const [titleError, setTitleError] = useState("")
    const [contentError, setContentError] = useState("")

    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (report) {
            setLastIndex(index)
            setNewReport(false)
            setTitle(report?.title)
            setContent(report?.content)
            setTitleError("")
            setContentError("")
        }
        else if (!report) {
            setTitle("")
            setTitleError("")
            setContentError("")
        }
    }, [report])


    const addNewReport = (e) => {
        setSuccess("")
        setIndex(-1)
        setNewReport(true)
    }

    const cancelNewReport = (e) => {
        setSuccess("")
        setIndex(lastIndex)
        setNewReport(false)
    }

    const handleTitle = (e) => {
        setSuccess("")
        setTitle(e.target.value)
    }


    const handleContentChange = (content, delta, source, editor) => {
        setSuccess("")
        setContent(content)
        setDelta(editor.getHTML(content))
        const text = editor.getText()
        if (text === "\n") {
            setContent("")
        }
    }

    return (
        <div className="report-form-page-container">
            <div className='report-profile-detail-container'>
                <div className='report-profile-header-container'>
                    <div className='report-profile-edit-position'>
                        <div className='report-profile-edit-container'>
                            {success ?
                                <span className='report-profile-edit-success'>
                                    {success}
                                </span> : null}
                            {(report || newReport) &&
                                <RiIcons.RiSave3Fill
                                    className='report-profile-edit-icon'
                                // onClick={handleSubmit}
                                />
                            }
                            {newReport ?
                                <FcIcons.FcCancel
                                    className='report-profile-edit-icon'
                                    onClick={cancelNewReport}
                                />
                                :
                                <AiIcons.AiOutlineFileAdd
                                    className='report-profile-edit-icon'
                                    onClick={addNewReport}
                                />
                            }
                        </div>
                    </div>
                    {newReport ?
                        <h1>
                            Add Report
                        </h1>
                        :
                        <>
                            <h1>
                                Report
                            </h1>
                            <h3>
                                ID: {report?.id}
                            </h3>
                        </>
                    }
                </div>
                <div>
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={handleTitle}
                    />
                </div>
                {(report || newReport) &&
                    <div className='report-content-container'>
                        <ReactQuill
                            theme="snow"
                            value={content}
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
        </div>
    )
}

export default Report