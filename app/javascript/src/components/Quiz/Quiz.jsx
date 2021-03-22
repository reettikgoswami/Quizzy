import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import quizApi from "apis/quiz";
import Toastr from "common/Toastr";

function Quiz(props) {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({});
  const { name = null } = quiz;
  const quizId = props.match.params.id;

  const fetchQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await quizApi.show(quizId);
      setQuiz(response.data.quiz);
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
    return <div>Loading</div>;
  }

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex items-center py-6 justify-between">
        <div className="text-2xl font-bold text-gray-700">{name}</div>
        <Link to="#">
          <button className="rounded bg-blue-500 hover:bg-blue-600 py-1 px-3 text-white">
            Add questions
          </button>
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Quiz);
