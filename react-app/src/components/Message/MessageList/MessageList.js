import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { getRooms } from "../../../store/room";
import * as VscIcons from 'react-icons/vsc'

import './MessageList.css'

const MessageList = ({ setCurrStaff, index, setIndex, setIsLoaded }) => {


    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const staffs = useSelector(state => state.staffs)
    const rooms = useSelector(state => state.rooms)

    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState([])

    const staffsWithUser = {}
    Object.values(rooms).forEach(room => {
        if ((room?.staffId1 === user?.id || room?.staffId2 === user?.id) &&
            (staffs[room?.staffId1] || staffs[room?.staffId2])
        ) {
            if (room?.staffId1 === user.id) {
                staffsWithUser[room.staffId2] = staffs[room?.staffId2]
            }
            else {
                staffsWithUser[room.staffId1] = staffs[room?.staffId1]
            }
        }
    })
    const staffsArrays = Object.values(staffs).filter(staff => staffsWithUser[staff.id])

    useEffect(() => {
        (async () => {
            if (user && staffs) {
                const rooms = await dispatch(getRooms(user.id))
                const staffsWithUser = {}
                const roomsArray = await Object.values(rooms).forEach(room => {
                    if ((room?.staffId1 === user?.id || room?.staffId2 === user?.id) &&
                        (staffs[room?.staffId1] || staffs[room?.staffId2])
                    ) {
                        if (room?.staffId1 === user.id) {
                            staffsWithUser[room.staffId2] = staffs[room?.staffId2]
                        }
                        else {
                            staffsWithUser[room.staffId1] = staffs[room?.staffId1]
                        }
                    }
                })
                const staffsArrays = Object.values(staffs).filter(staff => staffsWithUser[staff.id])
                setCurrStaff(staffsArrays[index])
                setFiltered(staffsArrays)
            }
        })()
    }, [dispatch, user,staffs])



    const changeSearch = (e) => {
        setIndex(0)
        setSearch(e.target.value)
        const filtered = [...staffsArrays]
        const filteredStaffs = filtered.filter(staff => {
            return (
                staff.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                staff.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                staff.id.toString().includes(e.target.value)
            )
        })
        setFiltered(filteredStaffs)
        setCurrStaff(filteredStaffs[0])
    }

    const clearSearch = () => {
        setSearch("")
    }

    const changeStaff = (e, i) => {
        if (index === i) return
        setIndex(i)
        setIsLoaded(false)
        setCurrStaff(filtered[i])
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
                {filtered?.map((staff, i) => (
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