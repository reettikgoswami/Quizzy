import React from "react";

function Header(props) {
  return (
    <div className="h-16">
      <div className="w-4/5 mx-auto h-full flex items-center justify-between">
        <h2 className="text-4xl font-extrabold font-serif text-green-700">
          Quizzy
        </h2>
        <div className="flex items-center">
          <div className="mr-16">Report</div>
          <div className="mr-6">Sam Smith</div>
          <div className="flex items-center justify-end">
            <button className="rounded bg-blue-500 hover:bg-blue-600 py-2 px-4 text-white">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
