import { useState,useEffect } from "react";
import { useSelector } from "react-redux";


import PatientProfile from "../PatientProfile/PatientProfile";
import PatientDetail from "../PatientDetail/PatientDetail";
import './PatientList.css'



import * as VscIcons from 'react-icons/vsc'



const PatientList = ({ idx }) => {

    const patients = Object.values(useSelector(state => state.patients))

    const [search, setSearch] = useState("")
    const [index, setIndex] = useState(0)

    const filteredPatients = patients.filter(patient => {
        return (
            patient.firstName.toLowerCase().includes(search.toLowerCase()) ||
            patient.lastName.toLowerCase().includes(search.toLowerCase()) ||
            patient.id.toString().includes(search)
        )
    })

    const patient = filteredPatients[index]

    const changeSearch = (e) => {
        setIndex(0)
        setSearch(e.target.value)
    }

    const clearSearch = () => {
        setSearch("")
    }

    const changePatient = (e, i) => {
        setIndex(i)
    }

    return (
        <div className={idx === 2 ? "patient-list-page-container" : "hidden"}>
            <div className="patient-list-container">
                <div className="patient-list-header-search-container">
                    <div className="patient-list-header-container">
                        <h1>
                            Patients
                        </h1>
                    </div>
                    <div className="patient-list-search-container">
                        <div className="patient-search-label-container">
                            <label
                                className="patient-search-label"
                            >
                                Search
                            </label>
                        </div>
                        <div className="patient-search-icon-container">
                            <input
                                className="patient-search-input-field"
                                type="text"
                                value={search}
                                onChange={changeSearch}
                            />
                            <VscIcons.VscSearchStop
                                className="patient-search-clear-icon"
                                onClick={clearSearch}
                            />

                        </div>
                    </div>

                </div>
                <div className="patient-all-card-container">
                    {filteredPatients?.map((patient, i) => (
                        <div key={i} className={index === i ? 'patient-card-container active-patient'
                            : "patient-card-container"}
                            onClick={e => changePatient(e, i)}
                        >

                            <h3>
                                {patient.firstName} {patient.lastName}
                            </h3>
                            <h4>
                                ID: {patient.id}
                            </h4>
                        </div>
                    ))}

                </div>
            </div>

            <PatientProfile index={index} patient={patient} setIndex={setIndex} patients={filteredPatients} setSearch={setSearch}/>
            <PatientDetail index={index} patient={patient} setIndex={setIndex} />

        </div>
    )

}

export default PatientList