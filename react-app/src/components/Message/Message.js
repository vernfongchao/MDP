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

    const [index, setIndex] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

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

    useEffect(() => {
        dispatch(getRooms(user?.id))
        setCurrStaff(staffsArrays[index])
    },[dispatch,staffsArrays.length])


    return (
        <div className="message-page-container">
            <MessageList
                staffsArrays={staffsArrays}
                index={index}
                setIndex={setIndex}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
                setCurrStaff={setCurrStaff} />
            <Chat
                currStaff={currStaff}
                index={index}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
            />
            <DiscoverList
                currStaff={currStaff}
                setCurrStaff={setCurrStaff} 
                index={index}
                isLoaded={isLoaded}
            />
        </div>
    )
}

export default Message