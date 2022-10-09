import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addReport } from '../../../store/report'
import { patchReport } from '../../../store/report'

import * as RiIcons from 'react-icons/ri'
import * as AiIcons from 'react-icons/ai'
import * as FcIcons from 'react-icons/fc'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import "./Report.css"

const Report = ({ index, setIndex, setSearch, report }) => {
    const dispatch = useDispatch()

    const reportLength = Object.values(useSelector(state => state.reports)).length


    const [lastIndex, setLastIndex] = useState(index)

    const [newReport, setNewReport] = useState(false)
    const [title, setTitle] = useState(report?.title)
    const [maxTitle, setMaxTitle] = useState("")
    const [content, setContent] = useState("")
    const [delta, setDelta] = useState('')

    const [titleError, setTitleError] = useState([])

    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (report) {
            setLastIndex(index)
            setNewReport(false)
            setTitle(report?.title)
            setContent(report?.content)
            setTitleError([])

        }
        else if (!report) {
            setMaxTitle("")
            setTitle("")
            setTitleError([])
            setContent("")
        }
    }, [report,index])

    useEffect(() => {
        if (title.length >= 100) {
            setMaxTitle("Maximum characters for title reached")
        }
        if (title.length < 100) {
            setMaxTitle("")
        }
    }, [title])


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
        setTitleError([])
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

    const handleSubmit = async (e) => {
        if (newReport) {
            const newReport = await dispatch(addReport({
                title,
                content,
            }))

            if (newReport.id) {
                setSearch("")
                setIndex(reportLength)
                setSuccess("Saved")
                setNewReport(false)
            }
            else if (newReport.errors) {
                setTitleError(newReport.errors.title)
            }
        }
        else if (!newReport) {
            const editReport = await dispatch(patchReport({
                id: report?.id,
                title,
                content
            }))
            if (editReport.id) {
                setSearch("")
                setSuccess("Saved")
                setNewReport(false)
            }
            else if (editReport.errors) {
                setTitleError(editReport.errors.title)
            }
        }

    }

    return (
        <div className="report-form-page-container">
            <div className='report-detail-container'>
                <div className='report-header-container'>
                    <div className='report-edit-position'>
                        {/* <div className='report-edit-container'> */}
                            {success ?
                                <span className='report-edit-success'>
                                    {success}
                                </span> : null}
                            {(report || newReport) &&
                                <RiIcons.RiSave3Fill
                                    className='report-edit-icon'
                                    onClick={handleSubmit}
                                />
                            }
                            {newReport ?
                                <FcIcons.FcCancel
                                    className='report-edit-icon'
                                    onClick={cancelNewReport}
                                />
                                :
                                <AiIcons.AiOutlineFileAdd
                                    className='report-edit-icon'
                                    onClick={addNewReport}
                                />
                            }
                        {/* </div> */}
                    </div>
                    <h1 className='report-form-header'>
                        Report
                    </h1>
                    {report && !newReport &&
                        <h3 className='report-form-id'>
                            ID: {report?.id}
                        </h3>
                    }

                </div>
                {(report || newReport) &&
                    <>
                        <div className='report-title-container'>
                            <label
                            className={titleError.length ? "report-title-label report-title-error" :"report-title-label"}
                            >Title:</label>
                            <input
                            className={titleError.length ? "report-title-input report-title-input-error" : "report-title-input"}
                                value={title}
                                maxLength="100"
                                onChange={handleTitle}
                            />

                            {maxTitle &&
                                <div className='report-title-max-text-container'>
                                    <span className='report-title-max-text'>
                                        {maxTitle}
                                    </span>
                                </div>

                            }
                            {titleError.length ?
                                titleError.map(error => (
                                    <span className='report-title-error-text'>
                                        {error}
                                    </span>
                                )) : null
                            }

                        </div>
                        {report &&
                            <div className='report-updated-container'>
                            <span className='report-title-label'>Last Updated</span>
                            <span className='report-update-text'>{report?.updatedOn}</span>
                            </div>
                        }
                        <div className='report-content-container'>
                            <h3 className='report-details-title'>Report Details</h3>
                            <ReactQuill
                                theme="snow"
                                value={content}
                                placeholder={"Add notes here"}
                                onChange={handleContentChange}
                                style={
                                    {
                                        width: '100%',
                                        height: '90%',
                                    }
                                }
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Report