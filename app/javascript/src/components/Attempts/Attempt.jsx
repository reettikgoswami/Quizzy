/* eslint-disable indent */
import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";

import attemptApi from "apis/attempt";
import Toastr from "common/Toastr";

import UserForm from "./UserForm";
import Result from "./Result";
import AttemptQuiz from "./AttemptQuiz";
import Loading from "../common/Loading";

function Attempts(props) {
  const [loading, setLoading] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [user, setUser] = useState({});
  const [attemptObject, setAttemptObject] = useState({});
  const [pageNo, setPageNo] = useState(1);

  const slug = props.match.params.slug;

  const checkValidUrl = async () => {
    try {
      setLoading(true);
      const response = await attemptApi.isUrlValid(slug);
      setQuiz(response.data.quiz);
      setIsValidUrl(true);
    } catch (error) {
      if (error.response.status == 403) {
        Toastr.error(error.response.data.error);
      } else {
        logger.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const MoveToNextPage = (moveToPage = null) => {
    if (moveToPage) {
      setPageNo(moveToPage);
    } else {
      setPageNo(pageNo + 1);
    }
  };

  useEffect(() => {
    checkValidUrl();
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

  if (!isValidUrl) {
    return (
      <div className="font-bold font-serif text-xl text-center mt-32">
        Url not published
      </div>
    );
  }

  switch (pageNo) {
    case 1:
      return (
        <UserForm
          slug={slug}
          MoveToNextPage={MoveToNextPage}
          setAttemptObject={setAttemptObject}
          setUser={setUser}
          quiz={quiz}
        />
      );
    case 2:
      return (
        <AttemptQuiz
          slug={slug}
          MoveToNextPage={MoveToNextPage}
          attemptObject={attemptObject}
        />
      );
    case 3:
      return <Result slug={slug} attemptObject={attemptObject} />;
    default:
      break;
  }
}

export default withRouter(Attempts);
