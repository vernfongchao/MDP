import { useState } from 'react'
import { useSelector } from 'react-redux'

import * as VscIcons from 'react-icons/vsc'

import DepartmentDetails from '../DepartmentDetails/DepartmentDetails'
import DepartmentStaff from '../DepartmentStaff/DepartmentStaff'
import "./DepartmentList.css"

const DepartmentList = ({ idx }) => {

    const departments = Object.values(useSelector(state => state.departments))
    

    const [search, setSearch] = useState("")
    const [index, setIndex] = useState(0)


    const filteredDepartments = departments.filter(department => {
        return (
            department.name.toLowerCase().includes(search.toLowerCase()) ||
            department.id.toString().includes(search)
        )
    })

    const department = filteredDepartments[index]

    const clearSearch = () => {
        setSearch("")
    }

    const changeDepartment = (e, i) => {
        setIndex(i)
    }

    return (
        <div className={idx === 5 ? "department-list-page-container" : "hidden"}>
            <div className="department-list-container">
                <div className="department-list-header-search-container">

                    <div className='department-list-header-container'>
                        <h1 className="department-header">Departments</h1>
                    </div>

                    <div className="department-list-search-container">
                        <div className="department-search-label-container">
                            <label
                                className="department-search-label"
                            >
                                Search
                            </label>
                        </div>
                        <div className="department-search-icon-container">
                            <input
                                className="department-search-input-field"
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <VscIcons.VscSearchStop
                                className="department-search-clear-icon"
                                onClick={clearSearch}
                            />

                        </div>
                    </div>
                </div>

                <div className='department-list-card-container'>
                    {filteredDepartments?.map((department, i) => (
                        <div
                            key={i}
                            className={index === i ? "department-card-container active-department"
                                : "department-card-container"
                            }
                            onClick={e => changeDepartment(e, i)}
                        >
                            <h3>
                                {department?.name}
                            </h3>
                            <h4>
                                Department ID: {department?.id}
                            </h4>
                        </div>
                    ))

                    }
                </div>
            </div>
            <DepartmentDetails index={index} department={department}/>
            <DepartmentStaff index={index} department={department}/>
        </div>
    )
}

export default DepartmentList;