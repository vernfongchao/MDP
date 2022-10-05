

import DepartmentStaff from './DepartmentStaff/DepartmentStaff'

import './DepartmentDetail.css'

const DepartmentDetail = ({ department }) => {

    return (
        <div className='department-detail-page-container'>
            <DepartmentStaff
                department={department}
            />
        </div>
    )
}

export default DepartmentDetail