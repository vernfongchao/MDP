import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentStaffs } from "../../../store/departmentstaff";


import "./DepartmentStaff.css"

const DepartmentStaff = ({ index, department }) => {
    const dispatch = useDispatch()
    const staffs = useSelector(state => state.staffs)
    const departmentStaffs = Object.values(useSelector(state => state.departmentStaffs).department)

    useEffect(() => {
        dispatch(getDepartmentStaffs(department?.id))
    }, [dispatch, department])



    return (department ?
        <div className="department-staff-page-container">
            <div className="department-staff-header-container">
                <h1 className="department-staff-information">
                    Staff Information
                </h1>

                {departmentStaffs.map(({ staffId }) => (
                    <p key={staffId}>
                        {` Staff ID: ${staffId} ${staffs[staffId]?.firstName} ${staffs[staffId]?.lastName}`}
                    </p>
                ))}
            </div>
        </div>
        :
        <div className="department-staff-page-container">
            <div className="department-staff-header-container">
                <h1 className="department-staff-information">
                    Staff Information
                </h1>
            </div>
        </div>
    )
};

export default DepartmentStaff;