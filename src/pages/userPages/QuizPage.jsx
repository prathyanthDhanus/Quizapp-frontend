import React, { useState, useEffect } from "react";
import { FaLightbulb } from "react-icons/fa";

import vector from "../../assets/images/Vector.png";
import { guidelines } from "../../utils/hardcodedData/userHardcoded/userHardcoded";

import CustomButton from "../../components/customButton/CustomButton";
import CommonLoader from "../../components/Loader/CommonLoader";
import { useFetchAllQuestions } from "../../services/questionService";
import { useParams } from "react-router-dom";

const QuizPage = () => {
  // Accessing the quizId parameter from the URL
  const { quizId } = useParams();
  // Retrieve startQuiz state from localStorage on initial load
  const storedStartQuiz = localStorage.getItem("startQuiz") === "true";
  // Set state based on localStorage or initialize with false
  const [startQuiz, setStartQuiz] = useState(storedStartQuiz);
  //Fetch all questions by quiz(category)
  const { data: questions, isLoading } = useFetchAllQuestions(quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");
  const [explanationClick, setExplanationClick] = useState(false);

  // Handle Start Quiz button click
  const handleStartQuiz = (e) => {
    e.preventDefault();
    setStartQuiz(true);
  };

  // Update localStorage whenever startQuiz changes
  useEffect(() => {
    localStorage.setItem("startQuiz", startQuiz); // Store startQuiz in localStorage
  }, [startQuiz]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setError("");
  };

  //Function for next
  const handleNext = () => {
    if (!selectedOption) {
      setError("Please select an option before proceeding.");
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  //Function for previous
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setError("");
    }
  };

  // function for explanation toggle
  const toggleExplanation = () => {
    setExplanationClick(!explanationClick); // Toggle visibility of explanation
  };

  console.log("daaaaata", questions);
  if (isLoading) {
    return <CommonLoader />;
  }
  return (
    <>
      <div className="container mx-auto">
        {/* Guidelines section */}
        {!startQuiz ? (
          <section>
            <div className="text-center m-10">
              <h4 className="text-4xl poppins-bold">Guidelines</h4>
              <img src={vector} alt="vector" className="w-[11rem] mx-auto " />
            </div>
            <div className="max-w-3xl mx-auto p-10">
              <ul className="list-disc pl-6 space-y-4 text-lg text-gray-700">
                {guidelines.map((guideline, index) => (
                  <li key={index} className="leading-relaxed">
                    {guideline}
                  </li>
                ))}
              </ul>
              <CustomButton
                buttonText="Start Quiz"
                className="w-full my-10 bg-customBlue text-white poppins-semibold hover:text-customBlue hover:bg-white hover:border-customBlue"
                type="submit"
                onClick={handleStartQuiz}
              />
            </div>
          </section>
        ) : (
          // quiz section when quiz is started
          <section>
            {questions && (
              <div key={questions[currentQuestionIndex]._id}>
                <div className="text-center m-10">
                  <h4 className="text-4xl poppins-bold">
                    {questions[currentQuestionIndex]?.quizId?.title}
                  </h4>
                  <img
                    src={vector}
                    alt="vector"
                    className="w-[11rem] mx-auto "
                  />
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 place-items-center gap-10  my-10 lg:px-10   border-2 rounded-md shadow-xl">
                  {/* left side section */}
                  <div className="col-span-2  my-10  w-full">
                    <div className=" container mx-auto rounded-md grid grid-cols-1  items-center border-2 rounded-md border-customLightBlue p-5 my-10">
                      <h5 className="text-md poppins-semibold">
                        {" "}
                        Question {currentQuestionIndex + 1}
                      </h5>
                      <p>{questions[currentQuestionIndex]?.questionText}</p>
                    </div>
                    {questions[currentQuestionIndex]?.options?.map((option) => (
                      <>
                        <div
                          // key={option.text}
                          // onClick={() => handleOptionSelect(option)}
                          // className={`cursor-pointer p-4 border rounded-md my-3 shadow-md ${
                          //   selectedOption === option
                          //     ? "bg-customLightBlue text-white"
                          //     : ""
                          // }`}

                          key={option.text}
                          onClick={() => handleOptionSelect(option)}
                          className={`cursor-pointer p-4 border rounded-md my-3 shadow-md ${
                            selectedOption === option
                              ? explanationClick
                                ? option.isCorrect
                                  ? "bg-green-500 text-white" // Correct answer
                                  : "bg-customLightRed text-white" // Incorrect answer
                                : "bg-customLightBlue text-white" // Selected option, but explanation not clicked
                              : ""
                          }`}
                        >
                          <h5 className="text-md poppins-medium">
                            {option.text}
                          </h5>
                        </div>
                      </>
                    ))}
                    {error && (
                      <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}

                    {/* button container */}
                    <div className="grid grid-cols-2 justify  space-x-5  my-10">
                      <div className="flex justify-end">
                        <CustomButton
                          buttonText="Prev"
                          className={`w-24 bg-customYellow text-white ${
                            currentQuestionIndex === 0
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:text-customYellow hover:bg-white"
                          }`}
                          type="button"
                          onClick={handlePrev}
                          disabled={currentQuestionIndex === 0}
                        />
                      </div>
                      <div className="flex ">
                        <CustomButton
                          buttonText="Next"
                          className="w-24 bg-customBlue text-white hover:text-customBlue hover:bg-white"
                          type="button"
                          onClick={handleNext}
                        />
                      </div>
                    </div>
                    {/* button container end */}

                    <div className=" container mx-auto rounded-md grid grid-cols-1  items-center border-2 rounded-md  p-5 ">
                      <div className="flex items-center gap-2 poppins-semibold">
                        <p>Explanation</p>
                        <FaLightbulb className="text-customYellow cursor-pointer" onClick={toggleExplanation} />
                      </div>
                      {explanationClick && (
                        <p>{questions[currentQuestionIndex]?.explanation}</p> // Show explanation if clicked
                      )}
                    </div>
                  </div>

                  {/* right side section */}

                  {/* total questions */}
                  <div>
                    <p>
                      Question {currentQuestionIndex + 1} /{" "}
                      {questions?.length || 0}
                    </p>
                    <div className="grid grid-cols-5 gap-4 mt-4">
                      {Array.from({ length: questions?.length || 0 }).map(
                        (_, index) => {
                          // Determine the button state (current, completed, upcoming)
                          const buttonState =
                            index === currentQuestionIndex
                              ? "current"
                              : index < currentQuestionIndex
                              ? "completed"
                              : "upcoming";

                          return (
                            <div
                              key={index}
                              className={`flex justify-center items-center w-10 h-10 rounded-full shadow-md ${
                                buttonState === "current"
                                  ? "bg-customLightRed text-white"
                                  : buttonState === "completed"
                                  ? "bg-customVioletBlue text-white"
                                  : "bg-gray-300 text-black"
                              }`}
                            >
                              <p className="poppins-bold">{index + 1}</p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
        {/* quiz section end */}
      </div>
    </>
  );
};

export default QuizPage;
