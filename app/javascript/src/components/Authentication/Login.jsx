import React, { useState } from "react";
import PropTypes from "prop-types";

import authenticationApi from "apis/authentication";
import Toastr from "common/Toastr";
import Loading from "../common/Loading";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await authenticationApi.login({
        user: { email, password },
      });
      Toastr.success("Logged in successfully.");
      props.fetchCurrentUser();
      props.history.push("/");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="max-w-md mx-auto shadow-xl rounded my-8">
      <h2 className="text-3xl text-center font-extrabold font-serif text-green-700">
        Login
      </h2>
      <div className="pt-8 pb-16">
        <div className="w-4/5 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center bg-white rounded shadow-md mb-4">
              <span className="px-3">
                <svg
                  className="fill-current text-gray-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z" />
                </svg>
              </span>
              <input
                className="w-full h-12 focus:outline-none"
                required
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-white rounded shadow-md mb-4">
              <span className="px-3">
                <svg
                  className="fill-current text-gray-500 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 8V6a6 6 0 1 1 12 0h-3v2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                </svg>
              </span>
              <input
                className="w-full h-12 focus:outline-none"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                className="rounded bg-blue-500 hover:bg-blue-600 py-2 px-4 text-white"
                type="submit"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
