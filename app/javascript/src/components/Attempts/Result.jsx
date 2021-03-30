import React from "react";

function Result(props) {
  const options = [
    { id: 1, value: "Earth" },
    { id: 2, value: "Marse" },
    { id: 3, value: "venus" },
    { id: 4, value: "neptune" },
  ];
  return (
    <div className="w-4/5 mx-auto">
      <div className="flex items-center py-6 justify-between">
        <div className="text-2xl font-bold text-gray-700">
          Solar System Quiz
        </div>
      </div>
      <div className="w-6/12 h-56 mx-auto py-4">
        <div className="flex">
          <div className="w-11/12  flex items-center justify-around px-3  rounded-full mx-auto border-black border-2 mb-4 bg-blue-100">
            <div className="text-center py-2 font-serif font-medium text-lg">
              which planet is closest to sun?
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-11/12 mx-auto justify-evenly">
          {options.map(option => (
            <div
              key={option.key}
              className={`w-6/12 border border-gray-500 px-2 py-2 mb-2 rounded-full`}
            >
              {option.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Result;
