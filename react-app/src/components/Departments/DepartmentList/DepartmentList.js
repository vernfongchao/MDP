import DepartmentDetails from '../DepartmentDetails/DepartmentDetails'
import DepartmentStaff from '../DepartmentStaff/DepartmentStaff'
import "./DepartmentList.css"

const DepartmentList = ({idx}) => {
    return (
        <div className={idx === 5 ? "department-list-page-container" : "hidden"}>
            <div className="department-list-container">
                <h1 className="department-header">Departments</h1>    
            </div>
                <DepartmentDetails /> 
                <DepartmentStaff />
        </div>
    )
}

export default DepartmentList;