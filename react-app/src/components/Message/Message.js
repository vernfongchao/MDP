import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import MessageList from './MessageList/MessageList'
import Chat from './Chat/Chat'
import DiscoverList from './DiscoverList/DiscoverList'

import { getRooms } from '../../store/room'
import './Message.css'


const Message = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const staffs = useSelector(state => state.staffs)
    const rooms = useSelector(state => state.rooms)

    const [index, setIndex] = useState(-1)
    const [isLoaded, setIsLoaded] = useState(false)
    const [search, setSearch] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const [currStaff,setCurrStaff] = useState(null)

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

    const filteredStaffs = staffsArrays.filter(staff => {
        return (
            staff.firstName.toLowerCase().includes(search.toLowerCase()) ||
            staff.lastName.toLowerCase().includes(search.toLowerCase()) ||
            staff.id.toString().includes(search)
        )
    })

    useEffect(() => {
        dispatch(getRooms(user?.id))
    },[dispatch])

    useEffect(() => {
        if(currStaff){
            setIsLoaded(true)
        }
        else if(!currStaff){
            setIsLoaded(false)
        }
    },[currStaff])


    return (
        <div className="message-page-container">
            <MessageList
                filteredStaffs={filteredStaffs}
                index={index}
                setIndex={setIndex}
                isLoaded={isLoaded}
                // setIsLoaded={setIsLoaded}
                setCurrStaff={setCurrStaff}
                search={search}
                setSearch={setSearch} 
                setIsEdit={setIsEdit}/>
            <Chat
                filteredStaffs={filteredStaffs}
                currStaff={currStaff}
                index={index}
                setIndex={setIndex}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
                search={search}
                setSearch={setSearch}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
            />
            <DiscoverList
                currStaff={currStaff}
                setCurrStaff={setCurrStaff} 
                setIndex={setIndex}
                isLoaded={isLoaded}
                setIsEdit={setIsEdit}
            />
        </div>
    )
}

export default Message