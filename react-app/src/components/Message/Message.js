import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import MessageList from './MessageList/MessageList'
import Chat from './Chat/Chat'
import './Message.css'

const Message = () => {

    const user = useSelector(state => state.session.user)
    const staffs = Object.values(useSelector(state => state.staffs))

    const removedUserStaffs = staffs.filter(staffs => staffs.id !== user.id)
    const [mappedStaffs, setMappedStaffs] = useState([])
    const [index,setIndex] = useState(0)


    const receiver = removedUserStaffs[index]

    useEffect(() => {
        if (receiver){
            // dispatch(receiver room)
            // setMappedStaffs(removedUserStaffs)
        }
    },[staffs])

 

    console.log(user)
    return (
        <div className="message-page-container">
            <MessageList 
                mappedStaffs={mappedStaffs}
                setMappedStaffs = {setMappedStaffs}
                index={index}
                setIndex={setIndex}/>
            <Chat 
                receiver={receiver}/>
        </div>
    )
}

export default Message