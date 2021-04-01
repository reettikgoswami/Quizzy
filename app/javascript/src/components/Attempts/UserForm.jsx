import React, { useState } from "react";

import { HiOutlineMail, CgProfile } from "react-icons/all";

import attemptApi from "apis/attempt";
import Toastr from "common/Toastr";
import Loading from "../common/Loading";

function UserForm(props) {
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const { MoveToNextPage, slug, setUser, setAttemptObject, quiz } = props;

  const buildUserPayload = () => {
    return {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
      },
    };
  };

  const isValidUser = () => {
    if (!firstName.trim()) {
      Toastr.error("First name can't be blank");
      return false;
    }
    if (!lastName.trim()) {
      Toastr.error("Last name can't be blank");
      return false;
    }
    if (!email.trim()) {
      Toastr.error("Email can't be blank");
      return false;
    }
    return true;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!isValidUser()) return;
      const response = await attemptApi.createUser(slug, buildUserPayload());
      setUser(response.data.user);
      setAttemptObject(response.data.attempt);
      if (response.data.attempt.submitted) {
        MoveToNextPage(3);
      } else {
        MoveToNextPage();
      }
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
      <h2 className="text-xl text-center font-extrabold font-serif text-green-700">
        welcome to {quiz.name}
      </h2>
      <div className="pt-8 pb-16">
        <div className="w-4/5 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center bg-white rounded shadow-md mb-4 ">
              <span className="px-3">
                <CgProfile />
              </span>
              <input
                className="w-full h-12 focus:outline-none"
                type="text"
                name="First Name"
                value={firstName}
                placeholder="First Name"
                onChange={e => setfirstName(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-white rounded shadow-md mb-4 ">
              <span className="px-3">
                <CgProfile />
              </span>
              <input
                className="w-full h-12 focus:outline-none"
                type="text"
                name="Last Name"
                value={lastName}
                placeholder="Last Name"
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-white rounded shadow-md mb-4">
              <span className="px-3">
                <HiOutlineMail />
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

            <div className="flex items-center justify-end">
              <button
                className="rounded bg-blue-500 hover:bg-blue-600 py-2 px-4 text-white"
                type="submit"
                disabled={loading}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
