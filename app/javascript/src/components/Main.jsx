import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import authenticationApi from "apis/authentication";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/common/PrivateRoute";
import Login from "components/Authentication/Login";
import Dashboard from "components/Dashboard";
import Header from "components/Dashboard/Header";
import QuizForm from "components/Quiz/QuizForm";
import Quiz from "components/Quiz/Quiz";
import QuestionForm from "components/Quiz/QuestionForm";
import AttemptQuiz from "components/Attempts/Attempt";
import Report from "components/Report";
import Loading from "./common/Loading";

const Main = props => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await authenticationApi.currentUser();
      setAuthenticated(true);
      setCurrentUser(response.data.user);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  const isLoggedIn = () => {
    return authenticated;
  };

  useEffect(() => {
    initializeLogger();
    setAuthHeaders();
    fetchCurrentUser();
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
    <BrowserRouter>
      <ToastContainer />
      <Header
        {...props}
        currentUser={currentUser}
        authenticated={authenticated}
      />
      <Switch>
        <Route
          exact
          path="/public/:slug/attempt/new"
          component={props => <AttemptQuiz />}
        />
        <Route
          exact
          path="/login"
          component={props => (
            <Login
              {...props}
              setAuthenticated={setAuthenticated}
              fetchCurrentUser={fetchCurrentUser}
            />
          )}
        />

        <PrivateRoute
          path="/report"
          redirectRoute="/login"
          condition={authenticated}
          component={() => <Report />}
        />

        <PrivateRoute
          path="/dashboard/quizzes/new"
          redirectRoute="/login"
          condition={authenticated}
          component={() => <QuizForm />}
        />
        <PrivateRoute
          path="/dashboard/quizzes/:id/edit"
          redirectRoute="/login"
          condition={authenticated}
          component={() => <QuizForm editMode={true} />}
        />
        <PrivateRoute
          path="/dashboard/quizzes/:quiz_id/questions/:id/edit"
          redirectRoute="/login"
          condition={authenticated}
          component={() => <QuestionForm editMode={true} />}
        />
        <PrivateRoute
          path="/dashboard/quizzes/:quiz_id/questions"
          redirectRoute="/login"
          condition={authenticated}
          component={() => <QuestionForm />}
        />
        <PrivateRoute
          path="/dashboard/quizzes/:id"
          redirectRoute="/login"
          condition={authenticated}
          component={() => <Quiz />}
        />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={authenticated}
          component={props => <Dashboard {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
