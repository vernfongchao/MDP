import { useState } from 'react'
import { useSelector } from 'react-redux'

import * as VscIcons from 'react-icons/vsc'

import './CreatorList.css'

const CreatorList = ({index,setIndex}) => {

    const creators = Object.values(useSelector(state => state.staffs)).filter(staff => {
        return staff.id === 2 || staff.id === 3 || staff.id === 4 || staff.id === 5 || staff.id === 6 || staff.id === 7
    })

    const [search, setSearch] = useState("")


    const filteredCreators = creators.filter(creator => {
        return (
            creator.firstName.toLowerCase().includes(search.toLowerCase()) ||
            creator.lastName.toLowerCase().includes(search.toLowerCase())
        )
    })

    const clearSearch = () => {
        setSearch("")
    }

    const changeCreator = (i) => {
        setIndex(i)
    }

    return (
        <div className="creator-list-page-container">
            <div className="staff-list-header-search-container">
                <div className="staff-list-header-container">
                    <h1>
                        Staff
                    </h1>
                </div>
                <div className="staff-list-search-container">
                    <div className="staff-search-label-container">
                        <label
                            className="staff-search-label"
                        >
                            Search
                        </label>
                    </div>
                    <div className="staff-search-icon-container">
                        <input
                            className="staff-search-input-field"
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <VscIcons.VscSearchStop
                            className="staff-search-clear-icon"
                            onClick={clearSearch}
                        />

                    </div>
                </div>

            </div>
            <div className="staff-all-card-container">
                {filteredCreators?.map((creator, i) => (
                    <div key={i} className={index === i ? 'staff-card-container active-staff'
                        : "staff-card-container"}
                        onClick={e => changeCreator(i)}
                    >

                        <h3>
                            {creator.firstName} {creator.lastName}
                        </h3>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default CreatorList