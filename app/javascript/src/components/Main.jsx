import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "apis/axios";

const Main = props => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registerIntercepts(authDispatch);
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <div className="h-screen">loading</div>;
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact path="/login" component={Login} />
        {/* {!isLoggedIn && <Route exact path="/" component={Hero} />}
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
