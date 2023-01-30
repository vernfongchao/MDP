import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { patchStaffDepartments } from "../../../../../store/departmentstaff"

import * as RiIcons from 'react-icons/ri'
import * as Mdicons from 'react-icons/md'
import * as VscIcons from 'react-icons/vsc'

const EditStaffDepartment = ({ staff, setShowModal }) => {
    const dispatch = useDispatch()

    const staffDepartments = useSelector(state => state.departmentStaffs.staff)
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
        if (staff) {
            setDepartmentsObj(staffDepartments)
        }
    }, [staff,staffDepartments])

    const clearSearch = () => {
        setSearch("")
    }
    const handleAdd = (e, departmentId) => {
        setDepartmentsObj({ ...departmentsObj, [departmentId]: { departmentId } })
        if (!staffDepartments[departmentId]) {
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
        if (staffDepartments[departmentId]) {
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
        const newStaffDepartments = await dispatch(patchStaffDepartments({
            "id": staff.id,
            [deleteDepartments.length ? "delete_departments" : undefined]: deleteDepartments.length ? deleteDepartments : null,
            [addDepartments.length ? "add_departments" : undefined]: addDepartments.length ? addDepartments : null,
        }))
        if (newStaffDepartments.length >= 0) {
            setShowModal(false)
        }
    }

    return (
        <div className="edit-staff-department-page-container">
            <div className="edit-staff-department-icon-container">
                <RiIcons.RiSave3Fill
                    className='edit-staff-deapartment-edit-icon'
                    onClick={handleSave}
                />
                <Mdicons.MdOutlineClear
                    className="edit-staff-department-cancel-icon"
                    onClick={e => setShowModal(false)}
                />
            </div>
            <div className="edit-staff-department-header-container">
                <h1 className="edit-staff-department-header">
                    Departments
                </h1>
            </div>
            <div className="edit-staff-department-search-container">
                <div className="edit-staff-deparment-search-label-container">
                    <label
                        className="edit-staff-deparment-search-label"
                    >Search:</label>
                </div>
                <div className="edit-staff-department-input-container">
                    <input className="edit-staff-department-search-input"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <VscIcons.VscSearchStop
                        className="edit-staff-department-search-clear-icon"
                        onClick={clearSearch}
                    />

                </div>
            </div>
            <div className="edit-staff-department-remove-container">
                {Object.values(departmentsObj)?.map(({ departmentId }, i) => (
                    <div className="edit-staff-department-name-container"
                        key={departmentId}>
                        <span className="report-department-name">
                            {departments[departmentId].name}
                        </span>
                        <div className="edit-staff-department-remove-icon-container">
                            <Mdicons.MdOutlineClear
                                className="edit-staff-department-remove-icon"
                                onClick={e => handleDelete(departmentId)}
                            />
                        </div>
                    </div>

                ))}
            </div>

            <div className="edit-staff-department-cards-container">
                {filteredDepartments.map((department) => (
                    <div
                        className="edit-staff-department-card-container"
                        key={department.id}
                        onClick={e => handleAdd(e, department.id)}>

                        <h3 className="edit-staff-department-card-name">
                            {department.name}
                        </h3>
                        <h4 className="edit-staff-department-card-id">
                            Department ID: {department.id}
                        </h4>
                    </div>
                ))
                }
            </div>
        </div>
    )

}

export default EditStaffDepartment