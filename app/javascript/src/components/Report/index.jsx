import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

import reportApi from "apis/report";
import BasicTable from "../common/BasicTable";
import { REPORT_LIST_COLUMNS } from "utils/constant";

function Report(props) {
  const [loading, setLoading] = useState(true);
  const [attemptResult, setAttemptResult] = useState([]);

  const loadAttemptResult = attempts => {
    const attemptTableData = attempts.map(({ attempt, quiz, user }) => {
      return {
        quizName: quiz.name,
        userName: user.first_name + " " + user.last_name,
        email: user.email,
        correctAnswers: attempt.correct_answer_count,
        incorrectAnswers: attempt.incorrect_answer_count,
      };
    });
    setAttemptResult(attemptTableData);
  };

  const fetchAttemptResult = async () => {
    try {
      setLoading(true);
      const response = await reportApi.getReport();
      loadAttemptResult(response.data.attempt);
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
    return <div>Loading</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-4/5 mx-auto">
        <div className="flex items-center py-6 justify-between">
          <div className="text-2xl font-bold text-gray-700">Reports</div>
          <Link to="#">
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
