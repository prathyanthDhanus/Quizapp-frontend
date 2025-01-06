import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/customButton/CustomButton";

const LandingPage = () => {
  const navigate = useNavigate();

  //Function for get start
  const handleStartClick = () => {
    const token = localStorage.getItem("token");
    // Check if the token exists and is not empty
    token ? navigate("/home") : navigate("/login");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Quizzy
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Test your knowledge with our fun and engaging quizzes!
          </p>
         
         <div className="flex justify-center">
         <CustomButton
            buttonText="Get Started"
            className="w-full my-5 bg-customWhite text-customBlue poppins-semibold hover:text-white hover:bg-customBlue hover:border-customYellow"
            type="submit"
            onClick={handleStartClick}
          />
         </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Interactive Quizzes",
                description:
                  "Enjoy a variety of quizzes in multiple categories.",
              },
              {
                title: "Real-Time Scoring",
                description:
                  "See your results instantly after completing a quiz.",
              },
              {
                title: "Responsive Design",
                description:
                  "Accessible on all devices—desktop, tablet, and mobile.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "John Doe",
                feedback: "This is the best quiz app I've ever used!",
              },
              {
                name: "Jane Smith",
                feedback: "Fun quizzes with instant results. Highly recommend!",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
                <h3 className="text-indigo-600 font-bold mt-4">
                  {testimonial.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <footer className="bg-indigo-600 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to start your quiz journey?
          </h2>
          <div className="flex justify-center">
         <CustomButton
            buttonText="Get Started"
            className="w-full my-5 bg-customWhite text-customBlue poppins-semibold hover:text-white hover:bg-customBlue hover:border-customYellow"
            type="submit"
          />
         </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
