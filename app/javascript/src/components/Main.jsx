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
    return <div className="h-screen">loading</div>;
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
