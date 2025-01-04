import React from "react";

import quizImage from "../../assets/images/speech-bubble-for-comic-text-quiz-cartoon-comic-sign-effects-explosion-png.webp";
import vector from "../../assets/images/Vector.png";

import Card from "../../components/card/Card";
import { useFetchAllQuiz } from "../../services/quizService";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  //Function for fetch  all quiz
  const { data: quizData } = useFetchAllQuiz();
  const navigate = useNavigate();
 //Select quiz type
  const handleSelectQuiz = (quizId)=>{
    console.log("first")
    navigate(`/quiz/${quizId}`);
  }
  return (
    <>
      <div className="container mx-auto  lg:py-5">
        {/* first section */}
        <section className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  m-20 lg:h-[30rem] ">
          <div>
            <h5 className="text-5xl poppins-bold py-5">
              The Ultimate <span className="text-customLightBlue">Brain</span>{" "}
              Workout Starts Here! ✨
            </h5>
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
            <p>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p>
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and
              1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
              reproduced in their exact original form, accompanied by English
              versions from the 1914 translation by H. Rackham.
            </p>
          </div>
          <div>
            <img src={quizImage} alt="quiz image" />
          </div>
        </section>
        {/* first section end */}

        {/* categories section */}
        <section>
          <div className="text-center">
            <h4 className="text-4xl poppins-bold">Categories</h4>
            <img src={vector} alt="vector" className="w-[11rem] mx-auto " />
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-10  my-10 lg:px-10">
            {quizData && quizData.length > 0 ? (
              quizData.map((quiz) => (
                <Card
                  key={quiz._id}
                  title={quiz.title}
                  subtitle={quiz.category}
                  description={quiz.description}
                  questions={`Total questions: ${quiz.questions.length}`}
                  duration={quiz?.timeLimit}
                  onClick={() => handleSelectQuiz(quiz._id)}
                />
              ))
            ) : (
              <p>No quizzes available</p>
            )}
          </div>
        </section>
        {/* categories section end */}
      </div>

      <section>
        <div className="text-center">
          <h4 className="text-4xl poppins-bold">Explore</h4>
          <img src={vector} alt="vector" className="w-[11rem] mx-auto " />
        </div>
        <div className="bg-customLightBlue p-10 lg:p-[7rem] xl:p-[7rem] text-customWhite poppins-semibold text-xl my-10 ">
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable. The generated Lorem
            Ipsum is therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
