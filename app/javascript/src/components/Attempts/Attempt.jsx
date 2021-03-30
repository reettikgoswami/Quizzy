/* eslint-disable indent */
import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";

import attemptApi from "apis/attempt";
import Toastr from "common/Toastr";

import UserForm from "./UserForm";
import Result from "./Result";
import AttemptQuiz from "./AttemptQuiz";

function Attempts(props) {
  const [loading, setLoading] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [user, setUser] = useState({});
  const [attemptObject, setAttemptObject] = useState({});
  // const [quiz, setQuiz] = useState({});
  const [pageNo, setPageNo] = useState(1);

  const slug = props.match.params.slug;

  const checkValidUrl = async () => {
    try {
      setLoading(true);
      await attemptApi.isUrlValid(slug);
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

  const MoveToNextPage = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    checkValidUrl();
  }, []);

  if (loading) {
    return <div>loading</div>;
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
          MoveToNextPage={MoveToNextPage}
          slug={slug}
          setAttemptObject={setAttemptObject}
          setUser={setUser}
        />
      );
    case 2:
      return (
        <AttemptQuiz
          MoveToNextPage={MoveToNextPage}
          user={user}
          attemptObject={attemptObject}
        />
      );
    case 3:
      return <Result />;
    default:
      break;
  }
}

export default withRouter(Attempts);
