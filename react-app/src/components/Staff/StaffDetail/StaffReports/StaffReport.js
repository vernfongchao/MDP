import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './StaffReport.css'
import { getStaffReports } from '../../../../store/staffreport'

const StaffReport = ({ staff }) => {
    const dispatch = useDispatch()
    const staffReports = Object.values(useSelector(state => state.staffReports.staff))
    const reports = useSelector(state => state.reports)

    useEffect(() => {
        if(staff) {
            dispatch(getStaffReports(staff.id))
        }
    },[dispatch,staff])




    return (
        <div className="staff-report-page-container">
            <div className='staff-report-header-container'>
                <h2>Reports</h2>
            </div>
            <div className='staff-report-map-container'>
                {staffReports.map(({ reportId }) => {
                    const report = reports[reportId]
                    return (
                        <div className='staff-report-info-container'>
                            <span className='staff-report-info-text'>
                                Report ID: {report.id}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default StaffReport