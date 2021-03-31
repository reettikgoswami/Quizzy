import React, { useState, useEffect, Fragment } from "react";
import attemptApi from "apis/attempt";

function Result(props) {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [attempt, setAttempt] = useState({});
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
      setAttempt(response.data.attempt);
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
    if (!submittedOption) {
      return;
    }
    if (optionId === submittedOption && !isCorrect) {
      return "bg-red-400";
    }
    if (isCorrect) {
      return "bg-green-400";
    }
  };
  const optionIcon = (optionId, isCorrect, submittedOption) => {
    if (optionId === submittedOption && !isCorrect) {
      return "✗";
    }
    if (isCorrect) {
      return "✔️";
    }
    return <Fragment />;
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="text-3xl text-center py-5 font-bold text-gray-700 font-serif">
        {name}
      </div>
      <div className="text-center font-medium font-serif text-lg">
        Thanks you for taking the quiz, here are your results You have submitted
        <span className="text-xl text-green-700">
          {attempt.correct_answer_count}
        </span>
        correct and
        <span className="text-xl text-red-700">
          {attempt.incorrect_answer_count}
        </span>
        incorrect answers.
      </div>

      {quizResult.map(({ question, options }, index) => (
        <div className="w-6/12 h-56 mx-auto py-4" key={question.id}>
          <div className="flex">
            <div className="w-11/12  flex items-center justify-around px-3  rounded-full mx-auto border-black border-2 mb-4 bg-blue-100">
              <div className="text-center py-2 font-serif font-medium text-lg">
                {`${index + 1}. `} {question.description}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap w-11/12 mx-auto justify-evenly">
            {options.map(option => (
              <div
                key={option.id}
                className={`w-6/12 border border-gray-500 px-2 py-2 mb-2 rounded-full ${optionClass(
                  option.id,
                  option.is_correct,
                  question.submittedOption
                )}`}
              >
                <div className="flex items-start">
                  {optionIcon(
                    option.id,
                    option.is_correct,
                    question.submittedOption
                  )}
                  {option.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Result;
