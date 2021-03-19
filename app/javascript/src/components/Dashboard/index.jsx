import React from "react";
import { Link } from "react-router-dom";

function Dashboard(props) {
  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="w-4/5 mx-auto">
        <div className="flex items-center py-6 justify-end">
          <Link to="/dashboard/quizzes/new">
            <button className="rounded bg-blue-500 hover:bg-blue-600 py-1 px-3 text-white">
              Add new quiz
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
