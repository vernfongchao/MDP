import { useSelector } from 'react-redux'


import './DiscoverList.css'
const DiscoverList = ({ currStaff, setCurrStaff, isLoaded, setIndex }) => {

    const user = useSelector(state => state.session.user)
    const staffs = Object.values(useSelector(state => state.staffs)).filter(staff => staff.id !== user?.id)
    const roles = useSelector(state => state.roles)


    const handleImageError = (e) => {
        e.target.src = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }

    const handleStaff = (i) => {
        setIndex(-1)
        setCurrStaff(staffs[i])
    }

    return (
        <div className="discover-list-page-container">
            {currStaff && isLoaded &&
                <div className="discover-current-staff-card-container">
                    <div className="discover-staffs-card-container">
                        <div >
                            <img
                                className='staff-profile-picture'
                                alt="staff profile"
                                src={currStaff?.img}
                                onError={handleImageError}
                            >
                            </img>
                        </div>
                        <div className="report-staff-card-id-name-container">
                            <div className="report-staff-card-id-container">
                                <p className="report-staff-card-id-name-header">
                                    Staff ID:
                                </p>
                                <p className="report-staff-card-id">
                                    {currStaff?.id}
                                </p>
                            </div>
                            <div className="report-staff-card-name-container">
                                <div className="report-staff-name-container">
                                    <p className="report-staff-card-id-name-header">
                                        First Name
                                    </p>
                                    <p className="report-staff-card-id">
                                        {currStaff?.firstName}
                                    </p>
                                </div>
                                <div className="report-staff-name-container">
                                    <p className="report-staff-card-id-name-header">
                                        Last Name
                                    </p>
                                    <p className="report-staff-card-id">
                                        {currStaff?.lastName}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="report-staff-card-id-name-header">
                                    Role:
                                </p>
                                <p className="report-staff-card-id">
                                    {roles[currStaff?.position].position_name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='discover-staff-list-container'>
                <div>
                    <h2 className='discover-staff-list-header'>
                        Message a new staff
                    </h2>
                </div>
                <div className="discover-staff-cards-container">
                    {staffs.map((staff, i) => (
                        <div
                            className="discover-staff-card-container"
                            key={staff.id}
                            onClick={e => handleStaff(i)}
                        >
                            <div>
                                <img
                                    className='discover-staff-img'
                                    alt="staff profile"
                                    src={staff?.img}
                                    onError={handleImageError}
                                >
                                </img>
                            </div>
                            <div className="discover-staff-card-id-name-container">
                                <span className="discover-staff-id-name-header">
                                    Staff ID
                                </span>
                                <span className="discover-staff-id-name">
                                    {staff.id}
                                </span>
                                <span className="discover-staff-id-name-header">
                                    Name
                                </span >
                                <span className="discover-staff-id-name">
                                    {staff.firstName} {staff.lastName}
                                </span>
                            </div>

                        </div>

                    ))}
                </div>
            </div>

        </div>
    )
}

export default DiscoverList