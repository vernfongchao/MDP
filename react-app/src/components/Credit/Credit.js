import { useState } from 'react'

import './Credit.css'

import CreatorList from './CreatorList/CreatorList'

const Credit = ({ idx }) => {

    const [index, setIndex] = useState(0)

    return (
        <div className='credit-page-container'>
            <CreatorList
            index={index}
            setIndex={setIndex} />
        </div>
        // 
    )
}

export default Credit