import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";

import vector from "../../assets/images/Vector.png";
import { guidelines } from "../../utils/hardcodedData/userHardcoded/userHardcoded";

import CustomButton from "../../components/customButton/CustomButton";
import CommonLoader from "../../components/Loader/CommonLoader";
import { useFetchAllQuestions } from "../../services/questionService";
import { useSaveResult } from "../../services/quizService";

const QuizPage = () => {
  // Accessing the quizId parameter from the URL
  const { quizId } = useParams();
  // Retrieve startQuiz state from localStorage on initial load
  const storedStartQuiz = localStorage.getItem("startQuiz") === "true";
  // Set state based on localStorage or initialize with false
  const [startQuiz, setStartQuiz] = useState(storedStartQuiz);
  //Fetch all questions by quiz(category)
  const { data: questions, isLoading } = useFetchAllQuestions(quizId);
  //Save data to the backend
  const { mutate, isPending } = useSaveResult();
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  // Retrieve the current question index from localStorage or default to 0
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentQuestionIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  // Explanation states for each question
  const [explanationClicks, setExplanationClicks] = useState(
    new Array(questions?.length).fill(false) // Initialize with an array of false values
  );

  // Load saved answers from localStorage or initialize with an empty array
  const [savedAnswers, setSavedAnswers] = useState(() => {
    const saved = localStorage.getItem("quizAnswers");
    return saved ? JSON.parse(saved) : [];
  });

  // Handle Start Quiz button click
  const handleStartQuiz = (e) => {
    e.preventDefault();
    setStartQuiz(true);
  };

  // Update localStorage whenever startQuiz changes
  useEffect(() => {
    localStorage.setItem("startQuiz", startQuiz); // Store startQuiz in localStorage
  }, [startQuiz]);

  useEffect(() => {
    // On initial load, pre-select saved answer if available
    const savedAnswer = savedAnswers[currentQuestionIndex];
    if (savedAnswer) {
      setSelectedOption(savedAnswer);
    }
  }, [currentQuestionIndex, savedAnswers]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setError("");
  };

  const handleNext = () => {
    if (!selectedOption) {
      setError("Please select an option before proceeding.");
      return;
    }

    // Save selected option in savedAnswers state
    const updatedAnswers = [...savedAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    
    // Update localStorage and state
    localStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
    setSavedAnswers(updatedAnswers);

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      localStorage.setItem("currentQuestionIndex", nextIndex); // Save to localStorage
      setSelectedOption(null);
    }

    if (currentQuestionIndex === questions.length - 1) {
      setCompleted(true);
    }
  };

  //Function for previous
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      localStorage.setItem("currentQuestionIndex", prevIndex); // Save to localStorage
      setSelectedOption(null);
      setError("");
    }
  };

  // Function for explanation toggle for individual question
  const toggleExplanation = (index) => {
    const newExplanationClicks = [...explanationClicks];
    newExplanationClicks[index] = !newExplanationClicks[index]; // Toggle the explanation state for the clicked question
    setExplanationClicks(newExplanationClicks);
  };

  const handleSubmit = () => {
    // Retrieve answers from local storage
    const storedAnswers = localStorage.getItem("quizAnswers");

    if (!storedAnswers) {
      setError("No answers found. Please complete the quiz before submitting.");
      return;
    }

    // Parse the answers from JSON
    const answers = JSON.parse(storedAnswers);

    // Validate answers and quizId
    if (!answers || !quizId) {
      setError("Invalid quiz data. Please try again.");
      return;
    }

    // Prepare the payload
    const payload = {
      quizId,
      answers,
    };

    // Reset any existing errors
    setError("");

    // Call the backend using the mutate function
    mutate(payload, {
      onSuccess: () => {
        // Clear relevant local storage items after successful submission
        localStorage.removeItem("quizAnswers");
        localStorage.removeItem("currentQuestionIndex");
        localStorage.removeItem("startQuiz");
      },
   
    });
  };

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
            {completed ? (
              <div className=" w-full p-4">
                <h5 className="text-4xl font-bold poppins ">
                  Confirmation: Are You Ready to Submit?
                </h5>
                <ul className="list-disc pl-5 text-lg mt-5">
                  <li>Ensure all questions are answered.</li>
                  <li>Review your answers before submitting.</li>
                  <li>You cannot change your answers after submission.</li>
                  <li>
                    Click 'Submit' when you're ready to finalize your quiz.
                  </li>
                </ul>
                <div className="flex gap-5 m-4">
                  <CustomButton
                    buttonText="Prev"
                    className="w-24 bg-customYellow text-white hover:text-customYellow hover:bg-white hover:border-customYellow"
                    type="button"
                    onClick={() => setCompleted(false)}
                  />
                  <CustomButton
                    buttonText="Submit"
                    className="w-24 bg-customRed text-white hover:text-customRed hover:bg-white hover:border-customRed"
                    type="button"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            ) : (
              questions && (
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
                        <p className="poppins-medium">
                          {questions[currentQuestionIndex]?.questionText}
                        </p>
                      </div>
                      {questions[currentQuestionIndex]?.options?.map(
                        (option) => (
                          <>
                            <div
                              key={option.text}
                              onClick={() => handleOptionSelect(option)}
                              className={`cursor-pointer p-4 border rounded-md my-3 shadow-md ${
                                selectedOption === option ||
                                (savedAnswers[currentQuestionIndex] &&
                                  savedAnswers[currentQuestionIndex]?.text ===
                                    option.text)
                                  ? explanationClicks[currentQuestionIndex]
                                    ? option.isCorrect
                                      ? "bg-green-500 text-white" // Correct answer
                                      : "bg-customLightRed text-white" // Incorrect answer
                                    : "bg-blue-500 text-white" // Selected option but explanation not clicked
                                  : ""
                              }`}
                            >
                              <h5 className="text-md poppins-medium">
                                {option.text}
                              </h5>
                            </div>
                          </>
                        )
                      )}
                      {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                      )}

                      {/* button container */}
                      <div className="grid grid-cols-2 justify  space-x-5  my-10">
                        <div className="flex justify-end">
                          <CustomButton
                            buttonText="Prev"
                            className={`w-24 bg-customYellow text-white  ${
                              currentQuestionIndex === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:text-customYellow hover:bg-white hover:border-customYellow"
                            }`}
                            type="button"
                            onClick={handlePrev}
                            disabled={currentQuestionIndex === 0}
                          />
                        </div>
                        <div className="flex ">
                          {/* {currentQuestionIndex === questions.length - 1 ? ( */}

                          {/* ) : ( */}
                          <CustomButton
                            buttonText="Next"
                            className="w-24 bg-customBlue text-white hover:text-customBlue hover:bg-white hover:border-customBlue"
                            type="button"
                            onClick={handleNext}
                          />
                          {/* )} */}
                        </div>
                      </div>
                      {/* button container end */}

                      <div className=" container mx-auto rounded-md grid grid-cols-1  items-center border-2 rounded-md  p-5 ">
                        <div className="flex items-center gap-2 poppins-semibold">
                          <p>Explanation</p>
                          <FaLightbulb
                            className="text-customYellow cursor-pointer"
                            onClick={() =>
                              toggleExplanation(currentQuestionIndex)
                            }
                          />
                        </div>
                        {explanationClicks[currentQuestionIndex] && (
                          <p>{questions[currentQuestionIndex]?.explanation}</p> // Show explanation if clicked
                        )}
                      </div>
                    </div>

                    {/* right side section */}

                    {/* total questions */}
                    <div>
                      <div className="flex items-center justify-between poppins-medium">
                        <p>
                          Question {currentQuestionIndex + 1} /{" "}
                          {questions?.length || 0}
                        </p>
                        <p>Need help?</p>
                      </div>
                      <div className="grid grid-cols-5 gap-4 mt-4 ">
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
              )
            )}
          </section>
        )}
        {/* quiz section end */}
      </div>
    </>
  );
};

export default QuizPage;
