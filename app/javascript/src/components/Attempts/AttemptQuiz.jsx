import React, { useState, useEffect } from "react";

import Question from "./Question";

import quizApi from "apis/quiz";
import Toastr from "common/Toastr";

function AttemptQuiz(props) {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);

  const { MoveToNextPage, user, attemptObject } = props;
  const { quiz_id: quizId } = attemptObject;

  // const handelSelectOption = (questionId, optionId) => {};

  const fetchQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await quizApi.show(quizId);
      setQuiz(response.data.quiz);
      setQuestions(response.data.questions);
    } catch (error) {
      // console.dir(error);
      // if (error.response.status == 404) {
      //   Toastr.error("Quiz not found");
      // } else {
      //   logger.error(error);
      // }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  // console.log("quiz and question ", quiz, questions);

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex items-center py-6 justify-between">
        <div className="text-2xl font-bold text-gray-700">
          Solar System Quiz
        </div>
      </div>
      <Question />
      <Question />
      <Question />
      <div className="w-6/12 mx-auto">
        <div className="flex items-center justify-end">
          <button
            className="rounded bg-blue-500 hover:bg-blue-600 py-2 px-4 text-white"
            type="submit"
            // onClick={MoveToNextPage}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttemptQuiz;
