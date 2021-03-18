import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import authenticationApi from "apis/authentication";
import Toastr from "common/Toastr";

function Header(props) {
  const { authenticated, currentUser } = props;

  const handleLogout = async () => {
    try {
      await authenticationApi.logout();
      window.location.href = "/login";
      Toastr.success("Logout successfully.");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="h-16">
      <div className="w-4/5 mx-auto h-full flex items-center justify-between">
        <Link to="/">
          <h2 className="text-4xl font-extrabold font-serif text-green-700">
            Quizzy
          </h2>
        </Link>
        {authenticated ? (
          <div className="flex items-center">
            <div className="mr-6">
              {currentUser &&
                `${currentUser.first_name} ${currentUser.last_name}`}
            </div>
            <div className="flex items-center justify-end">
              <button
                onClick={handleLogout}
                className="rounded bg-blue-500 hover:bg-blue-600 py-2 px-4 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
}

export default Header;
