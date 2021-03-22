import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

import Toastr from "common/Toastr";
import quizApi from "apis/quiz";
import alertbox from "components/utils/alertbox";

const ActionButtons = quiz => {
  const { id } = quiz;

  const quizDeleteAction = async id => {
    try {
      const response = await quizApi.destroy(id);
      return response;
    } catch (error) {
      Toastr.error(error.response.data.errors[0]);
    }
  };

  const handelQuizDelete = async () => {
    try {
      alertbox({
        title: "Are you sure?",
        text: "You will not be able to recover this quiz",
        icon: "warning",
        redirectUrl: "/",
        confirmAction: () => quizDeleteAction(id),
      });
    } catch (error) {
      Toastr.error(error.response.data.errors[0]);
    }
  };

  return (
    <Fragment>
      <td className="py-3 px-6 text-center">
        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
          Not Published
        </span>
        {/* <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
          Published
        </span> */}
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
          <Link to={`/dashboard/quizzes/${id}/edit`}>
            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-150">
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
            </div>
          </Link>

          <div
            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-150"
            onClick={handelQuizDelete}
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
      </td>
    </Fragment>
  );
};

export default ActionButtons;
