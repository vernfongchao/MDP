import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getStaffDepartment } from "../../../../store/departmentstaff"
import EditStaffDepartmentModal from "./EditStaffDepartment/EditStaffDepartmentModal"

import './StaffDepartment.css'

const StaffDepartment = ({ staff }) => {
    const dispatch = useDispatch()
    const staffDepartments = Object.values(useSelector(state => state.departmentStaffs.staff))
    const departments = useSelector(state => state.departments)

    useEffect(() => {
        if (staff) {
            dispatch(getStaffDepartment(staff.id))
        }
    }, [dispatch, staff])

    return (
        <div className="staff-department-page-container">

            <div className="staff-department-header-container">
                {staff &&
                    <EditStaffDepartmentModal
                        staff={staff}
                    />
                }
                <h2>
                    Departments
                </h2>
            </div>

            <div className="staff-department-list-container">
                {staff && staffDepartments?.map(({departmentId}) => (
                    <div
                        key={departmentId}
                        className="staff-department-name-container">
                        <span className="staff-department-name">
                            {departments[departmentId]?.name}
                        </span>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default StaffDepartment