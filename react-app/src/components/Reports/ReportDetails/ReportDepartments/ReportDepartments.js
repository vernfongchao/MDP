import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import EditReportDepartmentModal from "./EditReportDepartments/EditReportDepartmentModal"

import { getReportDepartments } from "../../../../store/departmentreport"

import './ReportDepartments.css'

const ReportDepartments = ({ report }) => {
    const dispatch = useDispatch()


    const [departmentsArray, setDepartmentsArray] = useState([])
    // const [departmentsToAdd, setDepartmentsToAdd] = useState([])
    // const [departmentsToDelete, setDepartmentsToDelete] = useState([])

    const reportDepartments = Object.values(useSelector(state => state.departmentReports.report))
    const departments = useSelector(state => state.departments)

    // const handleDelete = (e, i) => {
    //     let splicedDepartments = [...departmentsArray]
    //     let spliced = splicedDepartments.splice(i, 1)
    //     setDepartmentsArray(splicedDepartments)
    //     if (reportDepartments[spliced[0].departmentId] && !departmentsToDelete.find(({ departmentId }) => (spliced[0].departmentId === departmentId))
    //     ) {
    //         let toBeDelete = [...departmentsToDelete, reportDepartments[spliced[0].departmentId]]
    //         setDepartmentsToDelete(toBeDelete)
    //     }
    // }
    useEffect(() => {
        (async () => {
            if (report) {
                const departments = await dispatch(getReportDepartments(report?.id))
                setDepartmentsArray([...departments])
            }
        })()
    }, [dispatch, report])

    return (
        <div className="report-department-container">
            <div className="report-department-header-container">
                {report &&
                    <EditReportDepartmentModal
                        report={report}
                    />
                }
                <h1>
                    Departments
                </h1>
            </div>
            <div className="report-department-list-container">
                {report && reportDepartments?.map(({ departmentId }, i) => (
                    <div>
                        <span className="report-department-name">
                            {departments[departmentId].name}
                        </span>
                    </div>

                ))}

            </div>
        </div>

    )
}

export default ReportDepartments