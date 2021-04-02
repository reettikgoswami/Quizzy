import React, { useState, useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import quizApi from "apis/quiz";
import Toastr from "common/Toastr";
import Question from "./Question";
import Loading from "../common/Loading";

function Quiz(props) {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const { name = null, id, slug } = quiz;
  const quizId = props.match.params.id;

  const fetchQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await quizApi.show(quizId);
      setQuiz(response.data.quiz);
      setQuestions(response.data.questions);
    } catch (error) {
      if (error.response.status == 404) {
        Toastr.error("Quiz not found");
        props.history.push("/");
      } else {
        logger.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePublishQuiz = async () => {
    try {
      setLoading(true);
      const response = await quizApi.publishQuiz(quizId);
      setQuiz(response.data.quiz);
      Toastr.success(response.data.success);
    } catch (error) {
      if (error.response.status == 404) {
        Toastr.error("Quiz not found");
        props.history.push("/");
      } else {
        logger.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

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
    <Fragment>
      <div className="w-4/5 mx-auto">
        <div className="flex items-center py-6 justify-between">
          <div className="text-2xl font-bold text-gray-700">{name}</div>
          <div>
            <Link to={`/dashboard/quizzes/${id}/questions`}>
              <button className="rounded bg-blue-500 hover:bg-blue-600 py-1 px-3 text-white">
                Add questions
              </button>
            </Link>
            {!quiz.slug && questions.length >= 1 ? (
              <button
                className="rounded bg-blue-500 hover:bg-blue-600 py-1 px-3 text-white ml-2"
                onClick={handlePublishQuiz}
              >
                Publish
              </button>
            ) : (
              <Fragment />
            )}
          </div>
        </div>
      </div>
      {slug ? (
        <div className="font-serif font-bold w-4/5 mx-auto">
          ✅ Published, your public link is -
          <a href={`/public/${slug}`} className="text-blue-600 italic ">
            {`${window.location.origin}/public/${quiz.slug}`}
          </a>
        </div>
      ) : (
        <Fragment />
      )}

      {questions.map(({ options, question }) => (
        <Question options={options} question={question} key={question.id} />
      ))}
    </Fragment>
  );
}

export default withRouter(Quiz);
