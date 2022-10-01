import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addReport } from '../../../store/report'
import { patchReport } from '../../../store/report'

import * as RiIcons from 'react-icons/ri'
import * as ImIcons from 'react-icons/im'
import * as AiIcons from 'react-icons/ai'
import * as FcIcons from 'react-icons/fc'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser'

import "./Report.css"

const Report = ({ index, setIndex, setSearch, report }) => {
    const dispatch = useDispatch()

    const reportLength = Object.values(useSelector(state => state.reports)).length


    const [lastIndex, setLastIndex] = useState(index)

    const [newReport, setNewReport] = useState(false)
    const [title, setTitle] = useState(report?.title)
    // const [maxTitle, setMaxTitle] = useState("")
    const [content, setContent] = useState("")
    const [delta, setDelta] = useState('')

    const [titleError, setTitleError] = useState("")

    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (report) {
            setLastIndex(index)
            setNewReport(false)
            setTitle(report?.title)
            setContent(report?.content)
            setTitleError("")

        }
        else if (!report) {
            setTitle("")
            setTitleError("")
            setContent("")
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
                setTitleError(newReport.errors.title[0])
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

                setTitleError(editReport.errors.title[0])
            }
        }

    }

    return (
        <div className="report-form-page-container">
            <div className='report-detail-container'>
                <div className='report-header-container'>
                    <div className='report-edit-position'>
                        <div className='report-edit-container'>
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
                        </div>
                    </div>
                    <h1>
                        Report
                    </h1>
                    {report && !newReport &&
                        <h3>
                            ID: {report?.id}
                        </h3>
                    }

                </div>
                {(report || newReport) &&
                    <>
                        <div className='report-title-container'>
                            <label
                                className={titleError ? "report-title-error" : null} style={{ fontWeight: 'bold', fontSize: '12px' }}
                            >Title:</label>
                            <input
                                className={titleError ? "report-title-input-error" : null}
                                value={title}
                                maxLength="1000"
                                onChange={handleTitle}
                            />

                            {titleError &&
                                <p className='report-title-error'>
                                    {titleError}
                                </p>
                            }
                        </div>
                        {report &&
                            <div className='report-updated-container'>
                                <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Last Updated</span>
                                <span>{report?.updatedOn}</span>
                            </div>
                        }
                        <div className='report-content-container'>
                            <h3 >Report Details</h3>
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
                    </>
                }
            </div>
        </div>
    )
}

export default Report