
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { getContact } from '../../../store/contact'
import { loadContact } from '../../../store/contact'
import { removeContacts } from '../../../store/contact'
import { getPatientDetails } from '../../../store/patientreport'

import PatientReport from './PatientReport/PatientReport'
import PatientContact from './PatientContact/PatientContact'
import './PatientDetail.css'

import * as RiIcons from 'react-icons/ri'


const PatientDetail = ({ patient, index, setIndex }) => {

    const patientReports = Object.values(useSelector(state=>state.patientReports.patient))

    const reports = useSelector(state =>state.reports)

    return (
        <div className="patient-detail-page-container">
            <PatientContact patient= {patient}/>
            <PatientReport patient = {patient} />
        </div>
    )
}

export default PatientDetail