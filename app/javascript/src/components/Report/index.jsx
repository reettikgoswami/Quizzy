import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import reportApi from "apis/report";
import BasicTable from "../common/BasicTable";
import { REPORT_LIST_COLUMNS } from "utils/constant";

import Loading from "../common/Loading";

function Report(props) {
  const [loading, setLoading] = useState(true);
  const [attemptResult, setAttemptResult] = useState([]);

  const fetchAttemptResult = async () => {
    try {
      setLoading(true);
      const response = await reportApi.getReport();
      setAttemptResult(response.data.report);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttemptResult();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <div className="w-40 m-40 mx-auto">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-4/5 mx-auto">
        <div className="flex items-center py-6 justify-between">
          <div className="text-2xl font-bold text-gray-700">Reports</div>
          <Link to="/report/download">
            <button className="rounded bg-blue-500 hover:bg-blue-600 py-1 px-3 text-white">
              Download
            </button>
          </Link>
        </div>
      </div>
      <div>
        <BasicTable COLUMNS={REPORT_LIST_COLUMNS} tableData={attemptResult} />
      </div>
    </div>
  );
}

export default Report;
