import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import Report from "../Report/Report"
import ReportDetails from "../ReportDetails/ReportDetails"

import "./ReportList.css"

import * as VscIcons from 'react-icons/vsc'

const ReportList = ({ idx }) => {

    const reports = Object.values(useSelector(state => state.reports))

    const [search, setSearch] = useState("")
    const [index, setIndex] = useState(0)

    const filteredReports = reports.filter(reports => {
        return (
            reports.title.toLowerCase().includes(search.toLowerCase()) ||
            reports.id.toString().includes(search)
        )
    })

    const clearSearch = () => {
        setSearch("")
        setIndex(0)
    }

    const changeReport = (e, i) => {
        setIndex(i)
    }


    return (
        <div className={idx === 1 ? "report-list-page-container" : "hidden"}>
            <div className="report-list-container">
                <div className="report-list-header-search-container">
                    <div className="report-list-header-container">
                        <h1>
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
                                onChange={e => setSearch(e.target.value)}
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
                        <div key={i} className={index === i ? 'report-card-container active-report'
                            : "report-card-container"}
                            onClick={e => changeReport(e, i)}
                        >
                            <h3 className="report-title">
                                {report.title}
                            </h3>
                            <h4>
                                ID: {report.id}
                            </h4>
                        </div>
                    ))}


                </div>
            </div>

            <Report index={index} reports={filteredReports} setIndex={setIndex} setSearch={setSearch} />
            <ReportDetails index={index} reports={filteredReports} setIndex={setIndex} setSearch={setSearch} />
        </div>
    )
}

export default ReportList