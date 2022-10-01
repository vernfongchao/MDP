import { useState, useEffect } from "react"
import { VscSearch } from "react-icons/vsc"
import { useSelector, useDispatch } from "react-redux"

import { patchReportDepartments } from "../../../../../store/departmentreport"


const EditReportDepartments = ({ report }) => {
    const dispatch = useDispatch()

    const reportDepartments = useSelector(state => state.departmentReports.report)
    const departments = useSelector(state => state.departments)

    const [search, setSearch] = useState("")
    // const [departmentsArray, setDepartmentsArray] = useState([])
    const [departmentsObj, setDepartmentsObj] = useState({})
    const [departmentsToAdd, setDepartmentsToAdd] = useState({})
    const [departmentsToDelete, setDepartmentsToDelete] = useState({})

    const filteredDepartments = Object.values(departments).filter(department => {
        return (
            (department.name.toLowerCase().includes(search.toLowerCase()) ||
                department.id.toString().includes(search)) && !departmentsObj[department.id]
        )
    })

    console.log("departmentsObj",departmentsObj)
    console.log("departmentsToAdd",departmentsToAdd)
    console.log("departmentsToDelete",departmentsToDelete)

    useEffect(() => {
        if (report) {
            setDepartmentsObj(reportDepartments)
        }
    }, [report])



    const clearSearch = () => {
        setSearch("")
    }

    const handleAdd = (e, departmentId) => {
        console.log("reached")
        setDepartmentsObj({ ...departmentsObj, [departmentId]: { departmentId } })
        if(!reportDepartments[departmentId]){
            setDepartmentsToAdd({ ...departmentsToAdd, [departmentId]: { departmentId } })
        }
        if (departmentsToDelete[departmentId]){
            const departments = { ...departmentsToDelete }
            delete departments[departmentId]
            setDepartmentsToDelete(departments)
        }
    }


    const handleDelete = (e,departmentId, i) => {
        const newDepartmentsObj = {...departmentsObj}
        delete newDepartmentsObj[departmentId]
        setDepartmentsObj(newDepartmentsObj)
        if(reportDepartments[departmentId]){
            const toBeDelete = { ...departmentsToDelete,[departmentId]:{ departmentId}}
            setDepartmentsToDelete({...toBeDelete})
        }
        if(departmentsToAdd[departmentId]){
            const departments = { ...departmentsToAdd }
            delete departments[departmentId]
            setDepartmentsToAdd(departments)
        }
    }

    const handleSave = async e => {
        const deleteDepartmentsLength = Object.values(departmentsToDelete).length
        const addDepartmentsLength = Object.values(departmentsToAdd).length
        const newReportDepartments = await dispatch(patchReportDepartments({
            "id": report.id,

            [deleteDepartmentsLength ? "delete_departments" : undefined]: deleteDepartmentsLength ? Object.values(departmentsToDelete) : null,
            [addDepartmentsLength ? "add_departments" : undefined]: addDepartmentsLength ? Object.values(departmentsToAdd) : null,
            // "delete_departments": Object.values(departmentsToDelete),
            // "add_departments": Object.values(departmentsToAdd)
        }))
    }

    return (
        <div className="Edit-Report-Department-Page-Container">
            <button onClick={handleSave}>
                Save
            </button>
            <button>
                Cancel
            </button>
            <h1>
                Departments
            </h1>
            <label>Search</label>
            <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            />
            {Object.values(departmentsObj)?.map(({ departmentId }, i) => (
                <div
                    key={departmentId}>
                    <button onClick={e => handleDelete(e,departmentId, i)}>
                        x
                    </button>
                    <span className="report-department-name">
                        {departments[departmentId].name}
                    </span>
                </div>

            ))}

            {filteredDepartments.map((department) => (
                <div
                    key={department.id}
                    onClick={e => handleAdd(e, department.id)}>
                    <span>{department.name} {department.id}</span>
                </div>
            ))

            }
        </div>
    )
}

export default EditReportDepartments