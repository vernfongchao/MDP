import { useEffect } from "react"

import ReportPatients from "./ReportPatients/ReportPatients"
import ReportStaffs from "./ReportStaffs/ReportStaffs"
import ReportDepartments from "./ReportDepartments/ReportDepartments"


import './ReportDetails.css'

const ReportDetails = ({ index, report }) => {

    useEffect(() => {
        if(report){
            window.scrollTo(0, 0)

        }
    },[report])

    return (
        <div className="report-details-page-container">

            <ReportPatients report= {report} />
            <ReportStaffs report={report} />
            <ReportDepartments report={report}/>

        </div>
    )
}

export default ReportDetails