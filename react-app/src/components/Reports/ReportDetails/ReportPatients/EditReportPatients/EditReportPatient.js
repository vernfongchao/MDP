import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { patchReportPatients } from "../../../../../store/patientreport"


import * as RiIcons from 'react-icons/ri'
import * as Mdicons from 'react-icons/md'
import * as VscIcons from 'react-icons/vsc'

const EditReportPatient = ({ report, setShowModal }) => {
    const dispatch = useDispatch()

    const reportPatients = useSelector(state => state.patientReports.report)
    const patients = useSelector(state => state.patients)

    const [search, setSearch] = useState("")
    const [patientIds, setPatientIds] = useState({})
    const [patientIdsToAdd, setPatientIdsToAdd] = useState({})
    const [patientIdsToDelete, setPatientIdsToDelete] = useState({})

    const filteredPatients = Object.values(patients).filter(patient => (

        (patient.firstName.toLowerCase().includes(search.toLowerCase()) ||
            patient.lastName.toLowerCase().includes(search.toLowerCase()) ||
            patient.id.toString().includes(search)) && !patientIds[patient.id]

    ))

    useEffect(() => {
        if (report) {
            setPatientIds(reportPatients)
        }
    }, [report,reportPatients])

    const clearSearch = () => {
        setSearch("")
    }

    const handleImageError = (e) => {
        e.target.src = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }

    const handleAdd = patientId => {
        setPatientIds({ ...patientIds, [patientId]: { patientId } })
        if (!reportPatients[patientId]) {
            setPatientIdsToAdd({ ...patientIdsToAdd, [patientId]: { patientId } })
        }
        if (patientIdsToDelete[patientId]) {
            const removedPatients = { ...patientIdsToDelete }
            delete removedPatients[patientId]
            setPatientIdsToDelete(removedPatients)
        }
    }

    const handleDelete = patientId => {
        const deletePatients = { ...patientIds }
        delete deletePatients[patientId]
        setPatientIds(deletePatients)
        if (reportPatients[patientId]) {
            const toBeDelete = { ...patientIdsToDelete, [patientId]: { patientId } }
            setPatientIdsToDelete(toBeDelete)
        }
        if (patientIdsToAdd[patientId]) {
            const patients = { ...patientIdsToAdd }
            delete patients[patientId]
            setPatientIdsToAdd(patients)
        }
    }

    const handleSave = async e => {
        const deletePatients = Object.values(patientIdsToDelete)
        const addPatients = Object.values(patientIdsToAdd)
        const newReportPatients = await dispatch(patchReportPatients({
            "id": report.id,
            [deletePatients.length ? "delete_patients" : undefined]: deletePatients.length ? deletePatients : null,
            [addPatients.length ? "add_patients" : undefined]: addPatients.length ? addPatients : null
        }))
        if (newReportPatients.length >= 0) {
            setShowModal(false)
        }
    }





    return (
        <div className="edit-report-patient-page-container">
            <div className="edit-report-patient-icon-container">
                <RiIcons.RiSave3Fill
                    className='edit-report-patient-save-icon'
                    onClick={handleSave}
                />
                <Mdicons.MdOutlineClear
                    className="edit-report-patient-cancel-icon"
                    onClick={e => setShowModal(false)}
                />
            </div>
            <div className="edit-report-patient-header-container">
                <h1 className="edit-report-patient-header">
                    Patients
                </h1>

            </div>

            <div className="edit-report-patient-search-container">
                <div className="edit-report-patient-search-label-container">
                    <label
                        className="edit-report-patient-search-label"
                    >Search</label>
                </div>
                <div className="edit-report-patient-input-container">
                    <input className="edit-report-patient-search-input"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <VscIcons.VscSearchStop
                        className="edit-report-patient-search-clear-icon"
                        onClick={clearSearch}
                    />
                </div>
            </div>
            <div className="edit-report-patient-remove-container">

                {Object.values(patientIds)?.map(({ patientId }) => {
                    const patient = patients[patientId]
                    return (
                        <div className="edit-report-patient-name-container"
                            key={patientId}>
                            <div className="edit-report-patient-name-id-container">
                                <span className="edit-report-patient-name">
                                    {patient.firstName} {patient.lastName} <span className="edit-report-id">Patient ID: {patient.id}</span>
                                </span>
                            </div>
                            <div className="edit-report-patient-remove-icon-container">
                                <Mdicons.MdOutlineClear
                                    className="edit-report-patient-remove-icon"
                                    onClick={e => handleDelete(patientId)}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="edit-report-patient-cards-container">
                {filteredPatients?.map(patient => (
                    <div
                        className="edit-report-patient-card-container"
                        key={patient.id}
                        onClick={e => handleAdd(patient.id)}
                    >
                        <div>
                            <img
                                className='edit-report-patient-img'
                                alt="patient profile"
                                src={patient?.img}
                                onError={handleImageError}
                            >
                            </img>
                        </div>
                        <div className="edit-report-patient-card-id-name-container">
                            <span className="edit-report-patient-id-name-header">
                                Patient ID
                            </span>
                            <span className="edit-report-patient-id-name">
                                {patient.id}
                            </span>
                            <span className="edit-report-patient-id-name-header">
                                Name
                            </span >
                            <span className="edit-report-patient-id-name">
                                {patient.firstName} {patient.lastName}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EditReportPatient