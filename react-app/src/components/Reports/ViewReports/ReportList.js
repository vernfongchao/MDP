import { useState } from "react"
import { useSelector } from "react-redux"

import Report from "../Report/Report"
import ReportDetails from "../ReportDetails/ReportDetails"
import ReportDeleteModal from "../ReportDelete/ReportDeleteModal"

import "./ReportList.css"

import * as VscIcons from 'react-icons/vsc'

const ReportList = () => {

    const reports = Object.values(useSelector(state => state.reports))

    const [search, setSearch] = useState("")
    const [index, setIndex] = useState(0)

    const filteredReports = reports.filter(reports => {
        return (
            reports.title.toLowerCase().includes(search.toLowerCase()) ||
            reports.id.toString().includes(search)
        )
    })

    const report = filteredReports[index]

    const changeSearch = (e) => {
        setIndex(0)
        setSearch(e.target.value)
    }

    const clearSearch = () => {
        setSearch("")
        setIndex(0)
    }

    const changeReport = (e, i) => {
        setIndex(i)
    }


    return (
        <div className="report-list-page-container">
            <div className="report-list-container">
                <div className="report-list-header-search-container">
                    <div className="report-list-header-container">
                        <h1 className="report-list-header">
                            Reports
                        </h1>
                    </div>
                    <div className="report-list-search-container">
                        <div className="report-search-label-container">
                            <label
                                className="report-search-label"
                            >
                                Search
                            </label>
                        </div>
                        <div className="report-search-icon-container">
                            <input
                                className="report-search-input-field"
                                type="text"
                                value={search}
                                onChange={changeSearch}
                            />
                            <VscIcons.VscSearchStop
                                className="report-search-clear-icon"
                                onClick={clearSearch}
                            />
                        </div>
                    </div>
                </div>

                <div className="report-all-card-container">
                    {filteredReports.map((report, i) => (
                        <div key={i} className="report-card-container">
                            <ReportDeleteModal
                                id={report.id}
                                setIndex={setIndex}
                                i={i}
                                index={index}
                            />
                            <div className={index === i ? 'report-card-name-container active-report'
                                : "report-card-name-container"}
                                onClick={e => changeReport(e, i)}
                            >
                                <h3 className="report-list-title">
                                    {report.title}
                                </h3>
                                <h4 className="report-list-id">
                                    ID: {report.id}
                                </h4>
                            </div>
                        </div>
                    ))}


                </div>
            </div>

            <Report index={index} report={report} setIndex={setIndex} setSearch={setSearch} />
            <ReportDetails index={index} report={report} setIndex={setIndex} setSearch={setSearch} />
        </div>
    )
}

export default ReportList