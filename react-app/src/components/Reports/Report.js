import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ReportList from "./ReportList/ReportList";
import ReportDetail from "./ReportDetail/ReportDetail";
import ReportRelations from "./ReportRelations/ReportRelations";
import Loading from "../Loading/Loading";

import { getReports } from "../../store/report";
import "./Report.css";

const Reports = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);

  const reports = Object.values(
    useSelector((state) => state.reports)
  ).reverse();

  const filteredReports = reports.filter((reports) => {
    return (
      reports.title.toLowerCase().includes(search.toLowerCase()) ||
      reports.id.toString().includes(search)
    );
  });

  const report = filteredReports[index];

  useEffect(() => {
    async function getAllAnnouncements() {
      await dispatch(getReports());
      setIsLoading(true);
    }

    getAllAnnouncements();
  }, [dispatch]);

  return isLoading ? (
    <div className="report-list-page-container">
      <ReportList
        reports={filteredReports}
        search={search}
        index={index}
        setSearch={setSearch}
        setIndex={setIndex}
      />
      <ReportDetail
        index={index}
        report={report}
        setIndex={setIndex}
        setSearch={setSearch}
      />
      <ReportRelations
        index={index}
        report={report}
        setIndex={setIndex}
        setSearch={setSearch}
      />
    </div>
  ) : (
    <Loading />
  );
};

export default Reports;
