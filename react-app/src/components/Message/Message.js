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

    // const roomsArray = Object.values(useSelector(state => state.rooms)).forEach(room => {
    //     if((room?.staffId1 === user?.id || room?.staffId2 === user?.id) &&
    //         (staffs[room?.staffId1] || staffs[room?.staffId2])
    //         ){
    //             if(room?.staffId1 === user.id){
    //                 staffsWithUser[room.staffId2] = staffs[room?.staffId2]
    //             }
    //             else {
    //                 staffsWithUser[room.staffId1] = staffs[room?.staffId1]
    //             }
    //     }
    // })

    // const staffsArray = Object.values(staffs).sort((a,b) => {
    //     if (staffsWithUser[a.id] && !staffsWithUser[b.id]){
    //         return -1
    //     }
    // })

    const [messagedStaffs, setMessagedStaffs] = useState([])
    const [unmessagedStaffs, setUnmessagedStaffs] = useState([])
    const [index, setIndex] = useState(0)

    const currStaff = messagedStaffs[index]

    useEffect(() => {
        (async () => {
            if (user) {
                const rooms = await dispatch(getRooms(user.id))
                const staffsWithUser = {}
                const roomsArray = Object.values(rooms).forEach(room => {
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
                // const staffsArray = Object.values(staffs).sort((a,b) => {
                //     if (staffsWithUser[a.id] && !staffsWithUser[b.id]){
                //         return -1
                //     }
                // })
                const staffsArrays = Object.values(staffs).filter(staff => staffsWithUser[staff.id])
                setMessagedStaffs(staffsArrays)
            }

        })()
    }, [dispatch, user])

    return (
        <div className="message-page-container">
            <MessageList
                messagedStaffs={messagedStaffs}
                index={index}
                setIndex={setIndex} />
            <Chat
                currStaff={currStaff}
            />
            <DiscoverList
                currStaff={currStaff}
                messagedStaffs={messagedStaffs}
                // setMappedStaffs = {setMappedStaffs}
            />
        </div>
    )
}

export default Message