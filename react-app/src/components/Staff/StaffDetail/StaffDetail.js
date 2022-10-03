
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import StaffReport from './StaffReports/StaffReport'
import './StaffDetail.css'

import * as RiIcons from 'react-icons/ri'


const StaffDetail = ({ index, staffs }) => {

    const staff = staffs[index]

    return (

            <div className="staff-detail-page-container">
                <div className="staff-detail-department-container">
                    <h2>Department</h2>
                </div>
                <StaffReport staff={staff} />
            </div>
    )
}

export default StaffDetail