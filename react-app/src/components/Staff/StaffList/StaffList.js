import { useState } from "react";
import { useSelector } from "react-redux";

import './StaffList.css'

import * as VscIcons from 'react-icons/vsc'

const StaffList = ({ idx }) => {

    const staffs = Object.values(useSelector(state => state.staffs))
    const [search, setSearch] = useState(null)
    const [index, setIndex] = useState(0)
    const staff = staffs[index]

    const changeStaff = (e, i) => {
        setIndex(i)
    }


    return (
        <div className={idx === 4 ? "staff-list-page-container" : "hidden"}>
            <div className="staff-list-border-container">
                <div className="staff-list-container">
                    <div className="staff-list-header-search-container">
                        <div className="staff-list-header-container">
                            <h1>
                                Staff
                            </h1>
                        </div>
                        <div className="staff-list-search-container">
                            <div className="staff-search-label-container">
                                <label
                                    className="staff-search-label"
                                >
                                    Search
                                </label>
                            </div>
                            <div className="staff-search-icon-container">
                                <input
                                    className="staff-search-input-field"
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <VscIcons.VscSearchStop
                                    className="staff-search-clear-icon"
                                />

                            </div>
                        </div>

                    </div>
                    {staffs?.map((staff, i) => (
                        <div className={index === i ? 'staff-card-container active-staff'
                            : "staff-card-container"}
                            onClick={e => changeStaff(e, i)}
                        >

                            <h3>
                                {staff.firstName} {staff.lastName}
                            </h3>
                            <h4>
                                ID: {staff.id}
                            </h4>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default StaffList