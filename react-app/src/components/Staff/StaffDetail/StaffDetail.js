import StaffDepartment from './StaffDepartment/StaffDepartment'
import StaffReport from './StaffReports/StaffReport'
import './StaffDetail.css'

const StaffDetail = ({ index, staffs }) => {

    const staff = staffs[index]

    return (

            <div className="staff-detail-page-container">
                <StaffDepartment staff={staff} />
                <StaffReport staff={staff} />
            </div>
    )
}

export default StaffDetail