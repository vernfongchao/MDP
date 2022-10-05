import { useState } from 'react'
import { useSelector } from 'react-redux'

import './Credit.css'

import CreatorList from './CreatorList/CreatorList'
import CreatorPicture from './CreatorPicture/CreatorPicture'
import CreatorSocial from './CreatorSocial/CreatorSocial'

const Credit = ({ idx }) => {

    const creators = Object.values(useSelector(state => state.staffs)).filter(staff => {
        return staff.id === 2 || staff.id === 7
        // || staff.id === 3 || staff.id === 4 || staff.id === 5 || staff.id === 6 
    })

    const [index, setIndex] = useState(0)

    return (
        <div className='credit-page-container'>
            <CreatorList
            index={index}
            setIndex={setIndex} 
            creators={creators}/>
            <CreatorPicture 
            index={index}
            creators={creators}/>
            <CreatorSocial 
            index={index}
            />
        </div>
        // 
    )
}

export default Credit