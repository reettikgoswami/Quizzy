import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

import quizApi from "apis/quiz";
import BasicTable from "../common/BasicTable";
import ActionButtons from "./ActionButtons";
import { QUIZ_LIST_COLUMNS } from "utils/constant";

function Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const [quizList, setQuizList] = useState([]);

  const fetchQuizzesList = async () => {
    try {
      setLoading(true);
      const response = await quizApi.list();
      setQuizList(response.data.quizzes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzesList();
  }, []);

  const renderAdditionalColumns = () => {
    return (
      <Fragment>
        <th className="py-3 px-6 text-center">Status</th>
        <th className="py-3 px-6 text-center">Actions</th>
      </Fragment>
    );
  };

  if (loading) {
    return <div>loading</div>;
  }
  const generateRedirectUrl = ({ id }) => {
    if (id) {
      return `/dashboard/quizzes/${id}`;
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-4/5 mx-auto">
        <div className="flex items-center py-6 justify-between">
          <div className="text-2xl font-bold text-gray-700">
            List of quizzes
          </div>
          <Link to="/dashboard/quizzes/new">
            <button className="rounded bg-blue-500 hover:bg-blue-600 py-1 px-3 text-white">
              Add new quiz
            </button>
          </Link>
        </div>
      </div>
      <div>
        <BasicTable
          COLUMNS={QUIZ_LIST_COLUMNS}
          tableData={quizList}
          renderAdditionalColumns={renderAdditionalColumns}
          renderAdditionalRows={quiz => <ActionButtons {...quiz} />}
          redirectUrl={generateRedirectUrl}
        />
      </div>
    </div>
  );
}

export default Dashboard;
