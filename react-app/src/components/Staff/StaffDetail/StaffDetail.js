
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import StaffDepartment from './StaffDepartment/StaffDepartment'
import StaffReport from './StaffReports/StaffReport'
import './StaffDetail.css'

import * as RiIcons from 'react-icons/ri'


const StaffDetail = ({ index, staffs }) => {

    const staff = staffs[index]

    return (

            <div className="staff-detail-page-container">
                <StaffDepartment staff={staff} />
                <StaffReport staff={staff} />
            </div>
    )
}

export default StaffDetail