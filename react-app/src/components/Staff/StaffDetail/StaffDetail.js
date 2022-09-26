
import { useState ,useEffect} from 'react'
import { useSelector } from 'react-redux'
import './StaffDetail.css'

import * as RiIcons from 'react-icons/ri'


const StaffDetail = () => {
    return (
        <div className="staff-detail-page-container">
            <div className="staff-detail-department-container">
                <h2>Department</h2>
            </div>
            <div className="staff-detail-reports-container">
                <h2>Reports</h2>
            </div>
        </div>
    )
}

export default StaffDetail