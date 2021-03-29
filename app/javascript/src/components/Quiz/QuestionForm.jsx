/* eslint-disable react/jsx-key */
import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Toastr from "common/Toastr";
import questionApi from "apis/question";

function QuestionForm(props) {
  const [loading, setLoading] = useState(false);
  const [questionDescription, setQuestionDescription] = useState("");
  const [options, setOptions] = useState([{ value: "" }, { value: "" }]);
  const [removedOptions, setRemovedOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const { history, editMode = false } = props;
  const { quiz_id: quizId, id } = props.match.params;

  const loadStateWithQuestionDetail = (question, options) => {
    setQuestionDescription(question.description);
    setOptions(options);
    for (let i = 0; i < options.length; i++) {
      if (options[i].is_correct) {
        setCorrectAnswer(i + 1);
        return;
      }
    }
  };

  const fetchQuestionDetails = async () => {
    const id = props.match.params.id;
    try {
      setLoading(true);
      const response = await questionApi.show(id, quizId);
      const { question, options } = response.data;
      loadStateWithQuestionDetail(question, options);
    } catch (error) {
      if (error.response.status == 404) {
        Toastr.error("Question not found");
        history.push("/");
      } else {
        logger.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editMode) {
      fetchQuestionDetails();
    }
  }, []);

  const handleAddOptions = () => {
    const newOption = { value: "" };
    setOptions(options.concat([newOption]));
  };

  const isValidQuestion = () => {
    if (!questionDescription.trim()) {
      Toastr.error("Description can't be blank");
      return false;
    }
    for (let i = 0; i < options.length; i++) {
      const value = options[i].value;
      if (!value) {
        Toastr.error("Option can't be blank");
        return false;
      }
    }
    if (!correctAnswer) {
      Toastr.error("Select the correct answer from drop-down menu");
      return false;
    }
    return true;
  };

  const buildPayload = (description, options, correctAnswer) => {
    let options_attributes = options.map((option, index) => ({
      ...option,
      is_correct: index == correctAnswer - 1,
    }));

    if (editMode) {
      options_attributes = options_attributes.concat(removedOptions);
    }

    const payload = {
      question: { description, options_attributes },
    };
    return payload;
  };

  const handelRemoveOptions = optionIndex => {
    const deletedOption = [];
    const newOptionsValue = options.filter((option, index) => {
      if (editMode && option.id && index == optionIndex) {
        deletedOption.push({ ...option, _destroy: true });
      }
      return index !== optionIndex;
    });
    setOptions(newOptionsValue);
    setRemovedOptions(removedOptions.concat(deletedOption));
    setCorrectAnswer("");
  };

  const handelSetCorrectAnswer = event => {
    setCorrectAnswer(event.target.value);
  };

  const handleChangeOptionValue = (event, optionIndex) => {
    const newOptionsValue = options.map((option, index) => {
      return index === optionIndex
        ? { ...option, value: event.target.value }
        : option;
    });
    setOptions(newOptionsValue);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!isValidQuestion()) return;

      let response = null;
      if (editMode) {
        response = await questionApi.update(
          id,
          quizId,
          buildPayload(questionDescription, options, correctAnswer)
        );
      } else {
        response = await questionApi.create(
          quizId,
          buildPayload(questionDescription, options, correctAnswer)
        );
      }
      Toastr.success(response.data.success);
      history.push(`/dashboard/quizzes/${quizId}`);
    } catch (error) {
      Toastr.error(error.response.data.errors[0]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="pb-5">
      <div className="text-center pt-3 pb-10  font-sans font-extrabold text-gray-600 text-xl">
        Add new question
      </div>
      <div className="w-4/12 mx-auto">
        <div className="mb-4">
          <span className="text-sm text-gray-600 font-bold ">
            Description of question
          </span>
          <input
            className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text"
            placeholder=""
            value={questionDescription}
            onChange={e => setQuestionDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <span className="text-sm text-gray-600 font-bold ">Options</span>
          {options.map((option, index) => (
            <div className="flex relative">
              <input
                className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option.value}
                onChange={e => handleChangeOptionValue(e, index)}
              />
              {index >= 2 ? (
                <span className="absolute -right-10 top-4">
                  <div
                    className="h-8 border-2 border-red-700 w-8 text-black rounded-full flex items-center justify-center cursor-pointer "
                    onClick={() => handelRemoveOptions(index)}
                  >
                    &#10006;
                  </div>
                </span>
              ) : (
                <Fragment />
              )}
            </div>
          ))}
        </div>

        {options.length < 4 ? (
          <div
            className="pb-2 cursor-pointer text-sm font-bold text-gray-700"
            onClick={handleAddOptions}
          >
            &#10010; Add more option
          </div>
        ) : (
          <Fragment />
        )}

        <div className="relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={`${correctAnswer}`}
            onChange={e => handelSetCorrectAnswer(e)}
          >
            <option value="">Correct answer</option>

            {options.map((option, index) => (
              <option value={index + 1}> {`Option ${index + 1}`}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <div className="mt-8">
          <button
            className="uppercase text-sm font-bold tracking-wide bg-blue-500 text-gray-100 p-3 rounded-lg w-40  focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(QuestionForm);
