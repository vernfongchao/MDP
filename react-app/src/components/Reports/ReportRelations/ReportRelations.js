import ReportPatients from "./ReportPatients/ReportPatients"
import ReportStaffs from "./ReportStaffs/ReportStaffs"
import ReportDepartments from "./ReportDepartments/ReportDepartments"

import './ReportRelations.css'

const ReportRelations = ({ index, report }) => {

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

export default ReportRelations