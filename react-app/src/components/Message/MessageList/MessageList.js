import { useState } from "react";
import { useSelector } from 'react-redux'

import * as VscIcons from 'react-icons/vsc'

import './MessageList.css'

const MessageList = ({ messagedStaffs, index, setIndex }) => {

    const [search, setSearch] = useState("")

    const filteredStaffs = messagedStaffs.filter(staff => {
        return (
            staff.firstName.toLowerCase().includes(search.toLowerCase()) ||
            staff.lastName.toLowerCase().includes(search.toLowerCase()) ||
            staff.id.toString().includes(search)
        )
    })


    const changeSearch = (e) => {
        setIndex(0)
        setSearch(e.target.value)
    }

    const clearSearch = () => {
        setSearch("")
    }

    const changeStaff = (e, i) => {
        setIndex(i)
    }

    return (
        <div className="message-list-page-container">
            <div className="message-list-header-search-container">
                <div className="message-list-header-container">
                    <h1 className="message-list-header">
                        Staff
                    </h1>
                </div>
                <div className="message-list-search-container">
                    <div className="message-search-label-container">
                        <label
                            className="message-search-label"
                        >
                            Search
                        </label>
                    </div>
                    <div className="message-search-icon-container">
                        <input
                            className="message-search-input-field"
                            type="text"
                            value={search}
                            onChange={changeSearch}
                        />
                        <VscIcons.VscSearchStop
                            className="message-search-clear-icon"
                            onClick={clearSearch}
                        />

                    </div>
                </div>
            </div>
            <div className="message-all-card-container">
                {filteredStaffs?.map((staff, i) => (
                    <div key={i} className={index === i ? 'message-card-container active-staff'
                        : "message-card-container"}
                        onClick={e => changeStaff(e, i)}
                    >

                        <h3 className="message-card-name-text">
                            {staff.firstName} {staff.lastName}
                        </h3>
                        <h4 className="message-list-id">
                            ID: {staff.id}
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MessageList