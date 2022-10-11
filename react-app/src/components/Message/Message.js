import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import MessageList from './MessageList/MessageList'
import Chat from './Chat/Chat'
import DiscoverList from './DiscoverList/DiscoverList'

import { getRooms } from '../../store/room'
import './Message.css'


const Message = () => {
    // const dispatch = useDispatch()


    // const user = useSelector(state => state.session.user)
    // const staffs = useSelector(state => state.staffs)

    // const [messagedStaffs, setMessagedStaffs] = useState([])
    
    const [index, setIndex] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    const [currStaff,setCurrStaff] = useState(null)


    // useEffect(() => {
    //     (async () => {
    //         if (user) {
    //             const rooms = await dispatch(getRooms(user.id))
    //             const staffsWithUser = {}
    //             const roomsArray = await Object.values(rooms).forEach(room => {
    //                 if ((room?.staffId1 === user?.id || room?.staffId2 === user?.id) &&
    //                     (staffs[room?.staffId1] || staffs[room?.staffId2])
    //                 ) {
    //                     if (room?.staffId1 === user.id) {
    //                         staffsWithUser[room.staffId2] = staffs[room?.staffId2]
    //                     }
    //                     else {
    //                         staffsWithUser[room.staffId1] = staffs[room?.staffId1]
    //                     }
    //                 }
    //             })
    //             const staffsArrays = Object.values(staffs).filter(staff => staffsWithUser[staff.id])
    //             setMessagedStaffs(staffsArrays)
    //         }

    //     })()
    // }, [dispatch, user])

    console.log(currStaff)

    return (
        <div className="message-page-container">
            <MessageList
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
                index={index}
                isLoaded={isLoaded}
                // setMappedStaffs = {setMappedStaffs}
            />
        </div>
    )
}

export default Message