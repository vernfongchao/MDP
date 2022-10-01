import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getReportStaffs } from "../../../../store/staffreport"

import EditReportStaffModal from "./EditReportStaffs/EditReportStaffModal"
import * as RiIcons from 'react-icons/ri'

import './ReportStaffs.css'

const ReportStaffs = ({ report }) => {
    const dispatch = useDispatch()

    const reportStaffs = Object.values(useSelector(state => state.staffReports.report))
    const staffs = useSelector(state => state.staffs)

    const handleImageError = (e) => {
        e.target.src = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }

    useEffect(() => {
        (async () => {
            if (report) {
                // const reportDetails = 
                await dispatch(getReportStaffs(report?.id))
            }
        })()
    }, [dispatch, report])

    return (

        <div className="report-staffs-container">
            {report &&
                    <EditReportStaffModal 
                    report = {report}
                    />
            }
            <div className="report-staffs-header-container">
                <h1>Staffs</h1>
            </div>

            {report && reportStaffs?.map(({ staffId }) => {
                const staff = staffs[staffId]

                return (
                    <div key={staffId} className="report-staffs-card-container">
                        <div >
                            <img
                                className='staff-profile-picture'
                                src={staff?.img}
                                onError={handleImageError}
                            >
                            </img>
                        </div>
                        <div className="report-staff-card-id-name-container">
                            <div className="report-staff-card-id-container">
                                <p className="report-staff-card-id-name-header">
                                    Staff ID:
                                </p>
                                <p className="report-staff-card-id">
                                    {staff?.id}
                                </p>
                            </div>
                            <div className="report-staff-card-name-container">
                                <div className="report-staff-name-container">
                                    <p className="report-staff-card-id-name-header">
                                        First Name
                                    </p>
                                    <p className="report-staff-card-id">
                                        {staff?.firstName}
                                    </p>
                                </div>
                                <div className="report-staff-name-container">
                                    <p className="report-staff-card-id-name-header">
                                        Last Name
                                    </p>
                                    <p className="report-staff-card-id">
                                        {staff?.lastName}
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ReportStaffs