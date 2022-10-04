import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentStaffs } from "../../../../store/departmentstaff";


import "./DepartmentStaff.css"

const DepartmentStaff = ({ index, department }) => {
    const dispatch = useDispatch()
    const staffs = useSelector(state => state.staffs)
    const departmentStaffs = Object.values(useSelector(state => state.departmentStaffs).department)

    useEffect(() => {

        dispatch(getDepartmentStaffs(department?.id))
    }, [dispatch, department])



    return (
        <div className="department-staff-page-container">
            <div className="department-staff-header-container">
                <h2 className="department-staff-header">
                    Staff
                </h2>
            </div>
            <div className="department-staff-list-container">
                {department && departmentStaffs.map(({ staffId }) => {
                    const staff = staffs[staffId]
                    return (
                        <div
                            key={staffId}
                            className="department-staff-name-container">
                            <span className="department-staff-name">{`${staff?.firstName} ${staff?.lastName}|Staff ID: ${staffId}`}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default DepartmentStaff;