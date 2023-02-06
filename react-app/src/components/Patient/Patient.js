import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PatientList from "./PatientList/PatientList";
import PatientProfile from "./PatientProfile/PatientProfile";
import PatientDetail from "./PatientDetail/PatientDetail";

import "./Patient.css";

const Patient = () => {
  const dispatch = useDispatch();

  const patients = Object.values(useSelector((state) => state.patients));

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);

  const filteredPatients = patients.filter((patient) => {
    return (
      patient.firstName.toLowerCase().includes(search.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toString().includes(search)
    );
  }).reverse();

  const patient = filteredPatients[index];

  return (
    <div className="patient-list-page-container">
      <PatientList
        patients={filteredPatients}
        search={search}
        index={index}
        setSearch={setSearch}
        setIndex={setIndex}
      />
      <PatientProfile
        index={index}
        patient={patient}
        setIndex={setIndex}
        patients={filteredPatients}
        setSearch={setSearch}
      />
      <PatientDetail index={index} patient={patient} setIndex={setIndex} />
    </div>
  );
};

export default Patient;
