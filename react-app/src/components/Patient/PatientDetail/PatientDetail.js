import PatientReport from './PatientReport/PatientReport'
import PatientContact from './PatientContact/PatientContact'
import './PatientDetail.css'



const PatientDetail = ({ patient, index, setIndex }) => {

    return (
        <div className="patient-detail-page-container">
            <PatientContact patient= {patient}/>
            <PatientReport patient = {patient} />
        </div>
    )
}

export default PatientDetail