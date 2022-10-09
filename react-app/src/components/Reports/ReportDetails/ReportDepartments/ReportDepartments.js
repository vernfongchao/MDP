import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import EditReportDepartmentModal from "./EditReportDepartments/EditReportDepartmentModal"

import { getReportDepartments } from "../../../../store/departmentreport"

import './ReportDepartments.css'

const ReportDepartments = ({ report }) => {
    const dispatch = useDispatch()

    const reportDepartments = Object.values(useSelector(state => state.departmentReports.report))
    const departments = useSelector(state => state.departments)

    useEffect(() => {
        if (report) {
            dispatch(getReportDepartments(report?.id))
        }
    }, [dispatch,report])

    return (
        <div className="report-department-container">
            <div className="report-department-header-container">
                {report &&
                    <EditReportDepartmentModal
                        report={report}
                    />
                }
                <h2 className="report-department-header">
                    Departments
                </h2>
            </div>
            <div className="report-department-list-container">
                {report && reportDepartments?.map(({ departmentId }) => (
                    <div
                        key={departmentId}
                        className="report-department-name-container">
                        <span className="report-department-name">
                            {departments[departmentId]?.name}
                        </span>
                    </div>

                ))}

            </div>
        </div>

    )
}

export default ReportDepartments