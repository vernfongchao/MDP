import PatientDeleteModal from "../PatientDelete/PatientDeleteModal";
import "./PatientList.css";

import * as VscIcons from "react-icons/vsc";

const PatientList = ({ patients, search, index, setSearch, setIndex }) => {
  const changeSearch = (e) => {
    setIndex(0);
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const changePatient = (e, i) => {
    setIndex(i);
  };

  return (
    <div className="patient-list-container">
      <div className="patient-list-header-search-container">
        <div className="patient-list-header-container">
          <h1 className="patient-list-header">Patients</h1>
        </div>
        <div className="patient-list-search-container">
          <div className="patient-search-label-container">
            <label className="patient-search-label">Search:</label>
          </div>
          <div className="patient-search-icon-container">
            <input
              className="patient-search-input-field"
              type="text"
              value={search}
              onChange={changeSearch}
            />
            <VscIcons.VscSearchStop
              className="patient-search-clear-icon"
              onClick={clearSearch}
            />
          </div>
        </div>
      </div>
      <div className="patient-all-card-container">
        {patients?.map((patient, i) => (
          <div
            key={i}
            className="patient-card-container"
            onClick={(e) => changePatient(e, i)}
          >
            <PatientDeleteModal
              id={patient.id}
              setIndex={setIndex}
              i={i}
              index={index}
            />
            <div
              className={
                index === i
                  ? "patient-card-name-container active-patient"
                  : "patient-card-name-container"
              }
            >
              <h3 className="patient-card-name-text">
                {patient.firstName} {patient.lastName}
              </h3>
              <h4 className="patient-list-id">ID: {patient.id}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
