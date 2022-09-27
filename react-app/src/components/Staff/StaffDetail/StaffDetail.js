
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './StaffDetail.css'

import * as RiIcons from 'react-icons/ri'


const StaffDetail = ({ index, staffs }) => {

    const staff = staffs[index]

    return (
        staff ?
            <div className="staff-detail-page-container">
                <div className="staff-detail-department-container">
                    <h2>Department</h2>
                </div>
                <div className="staff-detail-reports-container">
                    <h2>Reports</h2>
                </div>
            </div>
            :
            <div className="staff-detail-page-container">
            </div>
    )
}

export default StaffDetail