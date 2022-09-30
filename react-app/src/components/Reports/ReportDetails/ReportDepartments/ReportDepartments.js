import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getReportDepartments } from "../../../../store/departmentreport"

import './ReportDepartments.css'

const ReportDepartments = ({ report }) => {
    const dispatch = useDispatch()

    const reportDepartments = Object.values(useSelector(state => state.departmentReports.report))

    const departments = useSelector(state => state.departments)

    console.log(reportDepartments)

    useEffect(() => {
        (async () => {
            if (report) {
                await dispatch(getReportDepartments(report?.id))
            }
        })()
    }, [dispatch, report])

    return (
        <div className="report-department-container">
            <div className="report-department-header-container">
                <h1>
                    Departments
                </h1>
            </div>
            <div className="report-department-list-container">
                {report && reportDepartments.map(({ departmentId }) => (
                    <span className="report-department-name">
                        {departments[departmentId].name}
                    </span>
                ))}

            </div>
        </div>

    )
}

export default ReportDepartments