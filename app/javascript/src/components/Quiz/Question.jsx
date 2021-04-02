import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import questionApi from "apis/question";
import Toastr from "common/Toastr";
import Loading from "../common/Loading";

function Question(props) {
  const [loading, setLoading] = useState(false);
  const { options, question, history } = props;
  const { quiz_id, id, description } = question;

  const handelDeleteQuestion = async (id, quizId) => {
    try {
      setLoading(true);
      const response = await questionApi.destroy(id, quizId);
      Toastr.success(response.data.success);
      history.push(`/dashboard/quizzes/${quizId}`);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="w-6/12 h-56 mx-auto py-4">
      <div className="flex relative">
        <div className="w-11/12  flex items-center justify-around px-3  rounded-full mx-auto border-black border-2 mb-4 bg-blue-100">
          <div className="text-center py-2 font-serif font-medium text-lg">
            {description}
          </div>
        </div>

        <div className="flex item-center justify-center absolute -right-10 top-2">
          <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-150 cursor-pointer ">
            <Link to={`/dashboard/quizzes/${quiz_id}/questions/${id}/edit`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </Link>
          </div>
          <div
            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-150 cursor-pointer "
            onClick={() => handelDeleteQuestion(id, quiz_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-11/12 mx-auto justify-evenly">
        {options.map(option => (
          <div
            key={option.key}
            className={`w-6/12 ${
              option.is_correct ? "bg-green-400" : "bg-yellow-100"
            } border border-gray-500 px-2 py-2 mb-2 rounded-full`}
          >
            <span>{option.is_correct ? "✔️" : <Fragment />}</span>{" "}
            {option.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRouter(Question);
