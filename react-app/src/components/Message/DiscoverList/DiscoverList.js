

import './DiscoverList.css'
const DiscoverList = ({ currStaff,isLoaded}) => {

    const handleImageError = (e) => {
        e.target.src = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }

    return (
        <div className="discover-list-page-container">
            {currStaff && isLoaded &&
                <div className="report-staffs-card-container">
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
                    </div>
                </div>
            }
        </div>
    )
}

export default DiscoverList