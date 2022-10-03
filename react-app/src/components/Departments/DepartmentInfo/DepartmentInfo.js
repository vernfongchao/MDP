import React from "react";
import "./DepartmentInfo.css"

import DepartmentLayoutModal from "./DepartmentLayoutModal/DepartmentLayoutModal";

const DepartmentInfo = ({ index, department }) => {


    return (
        <div className="department-info-page-container">
            <div className="department-info-header-container">
                <h1 className="department-information">
                    Department Information
                </h1>
            </div>
            {department &&
                <DepartmentLayoutModal />
            }
            {department &&
                <div className="department-layout-info-container">
                    <h3>
                        Building #{department?.building} Floor #{department?.floor}
                    </h3>
                </div>
            }
        </div>
    )
};

export default DepartmentInfo;