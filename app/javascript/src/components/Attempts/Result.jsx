import React, { useState, useEffect } from "react";

import attemptApi from "apis/attempt";

function Result(props) {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [quizResult, setQuizResult] = useState([]);

  const { name = null } = quiz;

  const setAttemptedResult = (attemptedAnswers, questions) => {
    const attemptResult = {};
    attemptedAnswers.forEach(({ question_id, option_id }) => {
      attemptResult[question_id] = option_id;
    });

    const quizResult = questions.map(({ question, options }) => {
      return {
        question: { ...question, submittedOption: attemptResult[question.id] },
        options,
      };
    });
    setQuizResult(quizResult);
  };

  const { attemptObject, slug } = props;
  const { id } = attemptObject;

  const fetchQuizResult = async () => {
    try {
      setLoading(true);
      const response = await attemptApi.result(slug, id);

      setAttemptedResult(
        response.data.attempted_answer,
        response.data.questions
      );
      setQuiz(response.data.quiz);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizResult();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  const optionClass = (optionId, isCorrect, submittedOption) => {
    if (optionId === submittedOption && !isCorrect) {
      return "bg-red-600";
    }
    if (isCorrect) {
      return "bg-green-600";
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex items-center py-6 justify-between">
        <div className="text-2xl font-bold text-gray-700">{name}</div>
      </div>

      {quizResult.map(({ question, options }) => (
        <div className="w-6/12 h-56 mx-auto py-4" key={question.id}>
          <div className="flex">
            <div className="w-11/12  flex items-center justify-around px-3  rounded-full mx-auto border-black border-2 mb-4 bg-blue-100">
              <div className="text-center py-2 font-serif font-medium text-lg">
                {question.description}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap w-11/12 mx-auto justify-evenly">
            {options.map(option => (
              <div
                key={option.key}
                className={`w-6/12 border border-gray-500 px-2 py-2 mb-2 rounded-full ${optionClass(
                  option.id,
                  option.is_correct,
                  question.submittedOption
                )}`}
              >
                {option.value}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Result;
