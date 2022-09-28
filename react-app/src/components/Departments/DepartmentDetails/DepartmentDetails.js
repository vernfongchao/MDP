import React from "react";
import "./DepartmentDetails.css"

const DepartmentDetails = ({index,department}) => {


    return ( department?
        <div className="department-details-page-container">
            <div className="department-detail-header-container">
                <h1 className="department-information">
                    Department Information
                </h1>
            </div>
        </div>
        :
        <div className="department-details-page-container">
            <div className="department-detail-header-container">
                <h1 className="department-information">
                    Department Information
                </h1>
            </div>
        </div>
    )
};

export default DepartmentDetails;