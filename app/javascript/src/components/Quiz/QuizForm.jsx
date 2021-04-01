import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Toastr from "common/Toastr";
import Loading from "../common/Loading";
import quizApi from "apis/quiz";

function QuizForm(props) {
  const [quizTitle, setQuizTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { history, editMode = false } = props;
  const quizId = props.match.params.id;
  const isValidQuizName = quizTitle.trim() ? true : false;
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

  const fetchQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await quizApi.show(quizId);
      const { name } = response.data.quiz;
      setQuizTitle(name);
    } catch (error) {
      if (error.response.status == 404) {
        Toastr.error("Quiz not found");
        history.push("/");
      } else {
        logger.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editMode) {
      fetchQuizDetails();
    }
  }, []);

  const handleSubmit = async event => {
    try {
      setLoading(true);
      if (isValidQuizName) {
        let response = null;
        if (editMode) {
          response = await quizApi.update(quizId, buildPayload(quizTitle));
        } else {
          response = await quizApi.create(buildPayload(quizTitle));
        }
        Toastr.success(response.data.success);
      } else {
        Toastr.error("Quiz name should not be empty.");
      }
      history.push("/");
    } catch (error) {
      Toastr.error(error.response.data.errors[0]);
      setQuizTitle("");
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
            className={`uppercase text-sm font-bold tracking-wide bg-blue-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline ${
              isValidQuizName ? "bg-blue-500" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={isValidQuizName ? false : true}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(QuizForm);
