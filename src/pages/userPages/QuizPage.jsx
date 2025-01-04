import React, { useState, useEffect } from "react";

import vector from "../../assets/images/Vector.png";
import { guidelines } from "../../utils/hardcodedData/userHardcoded/userHardcoded";

import CustomButton from "../../components/customButton/CustomButton";

const QuizPage = () => {
  // Retrieve startQuiz state from localStorage on initial load
  const storedStartQuiz = localStorage.getItem("startQuiz") === "true";
  // Set state based on localStorage or initialize with false
  const [startQuiz, setStartQuiz] = useState(storedStartQuiz);

  // Handle Start Quiz button click
  const handleStartQuiz = (e) => {
    e.preventDefault();
    setStartQuiz(true);
  };

  // Update localStorage whenever startQuiz changes
  useEffect(() => {
    localStorage.setItem("startQuiz", startQuiz); // Store startQuiz in localStorage
  }, [startQuiz]);

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
            <div className="text-center m-10">
              <h4 className="text-4xl poppins-bold">Quiz Title</h4>
              <img src={vector} alt="vector" className="w-[11rem] mx-auto " />
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 place-items-center gap-10  my-10 lg:px-10   border-2 rounded-md shadow-xl">
              {/* left side section */}
              <div className="col-span-2  my-10">
                <div className=" container mx-auto rounded-md grid grid-cols-1  items-center border-2 rounded-md border-customLightBlue p-5 my-10">
                  <h5 className="text-md poppins-semibold">Question 1</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </div>

                <div className=" container mx-auto rounded-md grid grid-cols-1  items-center border rounded-md shadow-xl px-5 p-2  col-span-2 my-5 hover:cursor-pointer">
                  <h5 className="text-md poppins-medium">Option 1</h5>
                </div>
                <div className=" container mx-auto rounded-md grid grid-cols-1  items-center border rounded-md shadow-xl px-5 p-2  col-span-2 ">
                  <h5 className="text-md poppins-medium">Option 1</h5>
                </div>
                {/* button container */}
                <div className="grid grid-cols-2 justify  space-x-5  ">
                  <div className="flex justify-end">
                    <CustomButton
                      buttonText="Prev"
                      className="w-full my-10 bg-customYellow text-white poppins-semibold hover:text-customYellow hover:bg-white hover:border-customYellow"
                      type="submit"
                    />
                  </div>
                  <div className="flex ">
                    <CustomButton
                      buttonText="Next"
                      className="w-full my-10 bg-customBlue text-white poppins-semibold hover:text-customBlue hover:bg-white hover:border-customBlue"
                      type="submit"
                    />
                  </div>
                </div>
                {/* button container end */}

                <div className=" container mx-auto rounded-md grid grid-cols-1  items-center border-2 rounded-md  p-5 ">
                  <h5 className="text-md poppins-semibold">Question 1</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </div>
              </div>

              {/* right side section */}

              {/* total questions */}
              <div>
                <p>Total questions</p>
              </div>
            </div>
          </section>
        )}
        {/* quiz section end */}
      </div>
    </>
  );
};

export default QuizPage;
