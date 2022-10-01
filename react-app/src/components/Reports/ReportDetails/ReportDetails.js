import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import ReportPatients from "./ReportPatients/ReportPatients"
import ReportStaffs from "./ReportStaffs/ReportStaffs"
import ReportDepartments from "./ReportDepartments/ReportDepartments"

import { getReportDepartments } from "../../../store/departmentreport"


import './ReportDetails.css'

const ReportDetails = ({ index, report }) => {
    const dispatch = useDispatch()


    const reportDepartments = Object.values(useSelector(state => state.departmentReports.report))

    // useEffect(() => {
    //     (async () => {
    //         if (report) {
    //             const departments = await dispatch(getReportDepartments(report?.id))
    //             setDepartmentsArray([...departments])
    //         }
    //     })()
    // }, [dispatch, report])

    return (
        <div className="report-details-page-container">

            <ReportPatients report={report} />
            <ReportStaffs report={report} />
            <ReportDepartments
                report={report}
            />

        </div>
    )
}

export default ReportDetails