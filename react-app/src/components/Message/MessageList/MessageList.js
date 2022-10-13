import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { getRooms } from "../../../store/room";
import * as VscIcons from 'react-icons/vsc'

import './MessageList.css'

const MessageList = ({ filteredStaffs, setCurrStaff, index, setIndex, setIsLoaded,search,setSearch }) => {

    
    // useEffect(() => {
    //     if(search){
    //         setCurrStaff(filteredStaffs[0])
    //     }
    //     else if(!search){
    //         setCurrStaff(filteredStaffs[0])
    //     }
    // },[search])

    const changeSearch = async(e) => {
        setSearch(e.target.value)
        setIndex(-1)
    }

    const clearSearch = () => {
        setSearch("")
    }

    const changeStaff = (e, i) => {
        if (index === i) return
        setIndex(i)
        setCurrStaff(filteredStaffs[i])
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



