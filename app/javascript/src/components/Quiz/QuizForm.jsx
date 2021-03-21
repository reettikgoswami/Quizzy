import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Toastr from "common/Toastr";

import quizApi from "apis/quiz";

function QuizForm(props) {
  const { history } = props;
  const [quizTitle, setQuizTitle] = useState("");

  const handleChange = e => {
    setQuizTitle(e.target.value);
  };

  const buildPayload = quizTitle => {
    return {
      quiz: {
        name: quizTitle,
      },
    };
  };

  const handleSubmit = async event => {
    try {
      if (quizTitle.trim()) {
        const response = await quizApi.create(buildPayload(quizTitle));
        Toastr.success("Quiz successfully created");
      } else {
        Toastr.error("Quiz name should not be empty.");
        setQuizTitle("");
      }
      history.push("/");
    } catch (error) {
      Toastr.error("Something went wrong");
      setQuizTitle("");
    }
  };

  return (
    <div>
      <div className="text-center py-4 font-sans font-extrabold text-gray-600 text-2xl">
        Add new quiz
      </div>
      <div className="w-5/12 mx-auto">
        <div>
          <span className="uppercase text-sm text-gray-600 font-bold">
            Quiz Name
          </span>
          <input
            className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text"
            placeholder=""
            value={quizTitle}
            onChange={handleChange}
          />
        </div>
        <div className="mt-8">
          <button
            className="uppercase text-sm font-bold tracking-wide bg-blue-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(QuizForm);
