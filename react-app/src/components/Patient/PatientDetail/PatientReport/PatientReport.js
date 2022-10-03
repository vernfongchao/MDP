
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './PatientReport.css'

import { getPatientReports } from '../../../../store/patientreport'
import { removePatientReports } from '../../../../store/patientreport'

const PatientReport = ({ patient }) => {
    const dispatch = useDispatch()
    const patientReports = Object.values(useSelector(state => state.patientReports.patient))
    const reports = useSelector(state => state.reports)

    useEffect(() => {
        (async () => {
            if (patient) {
                const reports = await dispatch(getPatientReports(patient.id))
            }
            else {
                await dispatch(removePatientReports())
            }
        })()
    }, [dispatch, patient])

    return (
        <div className="patient-report-page-container">
            <div className='patient-report-header-container'>
                <h2>Reports</h2>
            </div>
            <div className='patient-report-map-container'>
                {patientReports.map(({ reportId }) => {
                    const report = reports[reportId]
                    return (
                        <div key = {reportId} className='patient-report-info-container'>
                            <span className='patient-report-info-text'>
                                Report ID: {report.id}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PatientReport