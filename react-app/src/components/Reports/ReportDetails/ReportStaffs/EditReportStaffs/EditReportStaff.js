import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { patchReportStaffs } from "../../../../../store/staffreport"

import * as RiIcons from 'react-icons/ri'
import * as Mdicons from 'react-icons/md'
import * as VscIcons from 'react-icons/vsc'

const EditReportStaff = ({ report, setShowModal }) => {
    const dispatch = useDispatch()

    const reportStaffs = useSelector(state => state.staffReports.report)
    const staffs = useSelector(state => state.staffs)


    const [search, setSearch] = useState("")
    const [staffIds, setStaffIds] = useState({})
    const [staffToAdd, setStaffToAdd] = useState({})
    const [staffToDelete, setStaffToDelete] = useState({})

    const filteredStaffs = Object.values(staffs).filter(staff => (
        (staff.firstName.toLowerCase().includes(search.toLowerCase()) ||
            staff.lastName.toLowerCase().includes(search.toLowerCase()) ||
            staff.id.toString().includes(search)) && !staffIds[staff.id]
    ))

    useEffect(() => {
        if (report) {
            setStaffIds(reportStaffs)
        }
    }, [report])

    const clearSearch = () => {
        setSearch("")
    }

    const handleImageError = (e) => {
        e.target.src = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }


    const handleAdd = staffId => {
        setStaffIds({ ...staffIds, [staffId]: { staffId } })
        if (!reportStaffs[staffId]) {
            setStaffToAdd({ ...staffToAdd, [staffId]: { staffId } })
        }
        if (staffToDelete[staffId]) {
            const removedStaff = { ...staffToDelete }
            delete removedStaff[staffId]
            setStaffToDelete(removedStaff)
        }
    }

    const handleDelete = staffId => {
        const deleteStaffs = { ...staffIds }
        delete deleteStaffs[staffId]
        setStaffIds(deleteStaffs)
        if (reportStaffs[staffId]) {
            const toBeDelete = { ...staffToDelete, [staffId]: { staffId } }
            setStaffToDelete(toBeDelete)
        }
        if (staffToAdd[staffId]) {
            const staffs = { ...staffToAdd }
            delete staffs[staffId]
            setStaffToAdd(staffs)
        }
    }

    const handleSave = async e => {
        const deleteStaffs = Object.values(staffToDelete)
        const addStaffs = Object.values(staffToAdd)
        const newStaffReports = await dispatch(patchReportStaffs({
            "id": report.id,
            [deleteStaffs.length ? "delete_staffs" : undefined]: deleteStaffs.length ? deleteStaffs : null,
            [addStaffs.length ? "add_staffs" : undefined]: addStaffs.length ? addStaffs : null
        }))
        if (newStaffReports.length >= 0) {
            setShowModal(false)
        }
    }


    return (
        <div className="edit-report-staff-page-container">
            <div className="edit-report-staff-icon-container">
                <RiIcons.RiSave3Fill
                    className='report-edit-icon'
                    onClick={handleSave}
                />
                <Mdicons.MdOutlineClear
                    className="edit-report-staff-cancel-icon"
                    onClick={e => setShowModal(false)}
                />
            </div>
            <div className="edit-report-staff-header-container">
                <h1>
                    Staffs
                </h1>

            </div>
            <div className="edit-report-staff-search-container">
                <div className="edit-report-staff-search-label-container">
                    <label
                        className="edit-report-staff-search-label"
                    >Search</label>
                </div>
                <div className="edit-report-staff-input-container">
                    <input className="edit-report-staff-search-input"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <VscIcons.VscSearchStop
                        className="edit-report-staff-search-clear-icon"
                        onClick={clearSearch}
                    />
                </div>
            </div>
            <div className="edit-report-staff-remove-container">
                {Object.values(staffIds)?.map(({ staffId }) => {
                    const staff = staffs[staffId]
                    return (
                        <div className="edit-report-staff-name-container"
                            key={staffId}
                        >
                            <span className="edit-report-staff-name">
                                {staff.firstName} {staff.lastName} Staff ID: {staff.id}
                            </span>
                            <div className="edit-report-staff-remove-icon-container">
                                <Mdicons.MdOutlineClear
                                    className="edit-report-staff-remove-icon"
                                    onClick={e => handleDelete(staffId)}
                                />
                            </div>

                        </div>
                    )
                })}
            </div>
            <div className="edit-report-staff-cards-container">
                {filteredStaffs.map((staff) => (
                    <div
                        className="edit-report-staff-card-container"
                        key={staff.id}
                        onClick={e => handleAdd(staff.id)}
                    >
                        <div>
                            <img
                                className='edit-report-staff-img'
                                src={staff?.img}
                                onError={handleImageError}
                            >
                            </img>
                        </div>
                        <div className="edit-report-staff-card-id-name-container">
                            <span className="edit-report-staff-id-name-header">
                                Staff ID
                            </span>
                            <span className="edit-report-staff-id-name">
                                {staff.id}
                            </span>
                            <span className="edit-report-staff-id-name-header">
                                Name
                            </span >
                            <span className="edit-report-staff-id-name">
                                {staff.firstName} {staff.lastName}
                            </span>

                        </div>

                    </div>

                ))}
            </div>
        </div>
    )
}

export default EditReportStaff