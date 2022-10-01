import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { patchReportDepartments } from "../../../../../store/departmentreport"

import * as RiIcons from 'react-icons/ri'
import * as Mdicons from 'react-icons/md'
import * as VscIcons from 'react-icons/vsc'

const EditReportDepartments = ({ report, setShowModal }) => {
    const dispatch = useDispatch()

    const reportDepartments = useSelector(state => state.departmentReports.report)
    const departments = useSelector(state => state.departments)

    const [search, setSearch] = useState("")

    const [departmentsObj, setDepartmentsObj] = useState({})
    const [departmentsToAdd, setDepartmentsToAdd] = useState({})
    const [departmentsToDelete, setDepartmentsToDelete] = useState({})

    const filteredDepartments = Object.values(departments).filter(department => {
        return (
            (department.name.toLowerCase().includes(search.toLowerCase()) ||
                department.id.toString().includes(search)) && !departmentsObj[department.id]
        )
    })

    useEffect(() => {
        if (report) {
            setDepartmentsObj(reportDepartments)
        }
    }, [report])



    const clearSearch = () => {
        setSearch("")
    }

    const handleAdd = (e, departmentId) => {
        setDepartmentsObj({ ...departmentsObj, [departmentId]: { departmentId } })
        if (!reportDepartments[departmentId]) {
            setDepartmentsToAdd({ ...departmentsToAdd, [departmentId]: { departmentId } })
        }
        if (departmentsToDelete[departmentId]) {
            const departments = { ...departmentsToDelete }
            delete departments[departmentId]
            setDepartmentsToDelete(departments)
        }
    }


    const handleDelete = departmentId => {
        const newDepartmentsObj = { ...departmentsObj }
        delete newDepartmentsObj[departmentId]
        setDepartmentsObj(newDepartmentsObj)
        if (reportDepartments[departmentId]) {
            const toBeDelete = { ...departmentsToDelete, [departmentId]: { departmentId } }
            setDepartmentsToDelete({ ...toBeDelete })
        }
        if (departmentsToAdd[departmentId]) {
            const departments = { ...departmentsToAdd }
            delete departments[departmentId]
            setDepartmentsToAdd(departments)
        }
    }

    const handleSave = async e => {
        const deleteDepartments = Object.values(departmentsToDelete)
        const addDepartments = Object.values(departmentsToAdd)
        const newReportDepartments = await dispatch(patchReportDepartments({
            "id": report.id,
            [deleteDepartments.length ? "delete_departments" : undefined]: deleteDepartments.length ? deleteDepartments : null,
            [addDepartments.length ? "add_departments" : undefined]: addDepartments.length ? addDepartments : null,
        }))
        if (newReportDepartments.length >= 0) {
            setShowModal(false)
        }
    }

    return (
        <div className="edit-report-department-page-container">
            <div className="edit-report-department-icon-container">

                <RiIcons.RiSave3Fill
                    className='report-edit-icon'
                    onClick={handleSave}
                />
                <Mdicons.MdOutlineClear
                    className="edit-report-department-cancel-icon"
                    onClick={e => setShowModal(false)}
                />
            </div>
            <div className="edit-report-department-header-container">
                <h1>
                    Departments
                </h1>

            </div>
            <div className="edit-report-department-search-container">
                <div className="edit-report-deparment-search-label-container">
                    <label
                        className="edit-report-deparment-search-label"
                    >Search</label>
                </div>
                <div className="edit-report-department-input-container">
                    <input className="edit-report-department-search-input"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <VscIcons.VscSearchStop
                        className="edit-report-department-search-clear-icon"
                        onClick={clearSearch}
                    />

                </div>
            </div>
            <div className="edit-report-department-remove-container">
                {Object.values(departmentsObj)?.map(({ departmentId }, i) => (
                    <div className="edit-report-department-name-container"
                        key={departmentId}>
                        <span className="report-department-name">
                            {departments[departmentId].name}
                        </span>
                        <div className="edit-report-department-remove-icon-container">
                            <Mdicons.MdOutlineClear
                                className="edit-report-department-remove-icon"
                                onClick={e => handleDelete(departmentId)}
                            />
                        </div>
                    </div>

                ))}
            </div>

            <div className="edit-report-department-cards-container">
                {filteredDepartments.map((department) => (
                    <div
                        className="edit-report-department-card-container"
                        key={department.id}
                        onClick={e => handleAdd(e, department.id)}>

                        <h3>
                            {department.name}
                        </h3>
                        <h4>
                            Department ID: {department.id}
                        </h4>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default EditReportDepartments