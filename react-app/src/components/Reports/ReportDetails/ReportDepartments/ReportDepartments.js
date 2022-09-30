import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getReportDepartments } from "../../../../store/departmentreport"

import './ReportDepartments.css'

const ReportDepartments = ({ report }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            if (report) {
                // const reportDetails = 
                await dispatch(getReportDepartments(report?.id))
            }
        })()
    }, [dispatch, report])

    return (
        <div className="report-department-container">

            <h1>
                Departments
            </h1>
        </div>

    )
}

export default ReportDepartments