import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import EditReportPatientModal from "./EditReportPatients/EditReportPatientModal"
import { getReportPatients } from "../../../../store/patientreport"


import * as RiIcons from 'react-icons/ri'

import './ReportPatients.css'

const ReportPatients = ({ report }) => {

    const dispatch = useDispatch()

    const reportPatients = Object.values(useSelector(state => state.patientReports.report))
    const patients = useSelector(state => state.patients)

    useEffect(() => {
        (async () => {
            if (report) {
                dispatch(getReportPatients(report?.id))
            }
        })()
    }, [dispatch, report])

    const handleImageError = (e) => {
        e.target.src = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }

    return (
        <div className='report-patients-container'>
            {report &&
                <EditReportPatientModal 
                report = {report}
                />

            }
            <div className="report-patients-header-container">
                <h2>Patients</h2>
            </div>

            {report && reportPatients?.map(({ patientId }) => {
                const patient = patients[patientId]

                return (
                    <div key={patientId} className="report-patients-card-container">
                        <div >
                            <img
                                className='patient-profile-picture'
                                src={patient.img}
                                onError={handleImageError}
                            >
                            </img>
                        </div>
                        <div className="report-patient-card-id-name-container">
                            <div className="report-patient-card-id-container">
                                <p className="report-patient-card-id-name-header">
                                    Patient ID:
                                </p>
                                <p className="report-patient-card-id">
                                    {patient?.id}
                                </p>
                            </div>
                            <div className="report-patient-card-name-container">
                                <div className="report-patient-name-container">
                                    <p className="report-patient-card-id-name-header">
                                        First Name
                                    </p>
                                    <p className="report-patient-card-id">
                                        {patient?.firstName}
                                    </p>
                                </div>
                                <div className="report-patient-name-container">
                                    <p className="report-patient-card-id-name-header">
                                        Last Name
                                    </p>
                                    <p className="report-patient-card-id">
                                        {patient?.lastName}
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


export default ReportPatients