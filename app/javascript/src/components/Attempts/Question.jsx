import React, { Fragment } from "react";

function Question(props) {
  const { question, options, selectedOption, selectOption } = props;

  return (
    <div className="w-6/12 h-56 mx-auto py-4">
      <div className="flex">
        <div className="w-11/12  flex items-center justify-around px-3  rounded-full mx-auto border-black border-2 mb-4 bg-blue-100">
          <div className="text-center py-2 font-serif font-medium text-lg">
            {question.description}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-11/12 mx-auto justify-evenly">
        {options.map(option => (
          <div
            key={option.id}
            className={`w-6/12 border border-gray-500 px-2 py-2 mb-2 rounded-full cursor-pointer ${
              selectedOption && option.id == selectedOption
                ? "bg-yellow-400"
                : ""
            }`}
            onClick={() => selectOption(question.id, option.id)}
          >
            {option.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
