import React, { useState, useEffect } from "react";

import Question from "./Question";

import attemptApi from "apis/attempt";
import Toastr from "common/Toastr";

function AttemptQuiz(props) {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const { name = null, id: quizId } = quiz;
  const { MoveToNextPage, user, attemptObject, slug } = props;
  const { id } = attemptObject;

  const handelSelectOption = (questionId, optionId) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: optionId });
  };

  const buildAttemptQuizPayload = () => {
    const payload = [];
    for (let [questionId, optionId] of Object.entries(selectedOptions)) {
      payload.push({
        question_id: questionId,
        option_id: optionId,
        attempt_id: id,
      });
    }
    return { attempt: payload };
  };

  const fetchQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await attemptApi.getQuiz(slug);
      setQuiz(response.data.quiz);
      setQuestions(response.data.questions);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const attemptQuiz = async () => {
    try {
      setLoading(true);
      const response = await attemptApi.attemptQuiz(
        slug,
        id,
        buildAttemptQuizPayload()
      );
      Toastr.success(response.data.success);
      MoveToNextPage();
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex items-center py-6 justify-between">
        <div className="text-2xl font-bold text-gray-700">{name}</div>
      </div>
      {questions.map(({ question, options }) => (
        <Question
          key={question.id}
          question={question}
          options={options}
          selectedOption={selectedOptions[question.id]}
          selectOption={handelSelectOption}
        />
      ))}
      <div className="w-6/12 mx-auto">
        <div className="flex items-center justify-end">
          <button
            className="rounded bg-blue-500 hover:bg-blue-600 py-2 px-4 text-white"
            type="submit"
            onClick={attemptQuiz}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttemptQuiz;
