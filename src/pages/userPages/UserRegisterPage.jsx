import React from "react";
import { useNavigate } from "react-router-dom";

import RegisterImage from "../../assets/images/rb_66187.png";

import { useGlobalFormik } from "../../customHooks/useFormik";
import { useRegister } from "../../services/authService";
import CustomInputField from "../../components/inputfield/CustomInputField";
import {
  registerInitialValues,
  registerSchema,
} from "../../utils/validation/authSchema";

import Spinner from "../../components/Loader/Spinner";
import CustomButton from "../../components/customButton/CustomButton";

const UserRegisterPage = () => {
  //Custom hook for registration
  const { mutate, isPending } = useRegister();
  const navigate = useNavigate();

  //formik for validation
  const formik = useGlobalFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div>
      <div className=" h-screen flex justify-center items-center">
        <div className="lg:container lg:mx-auto rounded-md grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 justify-items-center border-2 rounded-md border-yellow-300">
          <div>
            <img src={RegisterImage} alt="login image " className="h-full " />
          </div>
          <div className="lg:my-10 px-10">
            <div className="flex justify-center ">
              <span className="text-center poppins-semibold my-5 text-4xl">
                Register
              </span>
            </div>
            <p className="poppins-light text-xl mb-5">
              🔐 Join the Adventure! Start Your Journey with Us Today. 🚀
            </p>
            {/* form started here */}
            <form onSubmit={formik.handleSubmit}>
              <CustomInputField
                title="Enter Your Name"
                type="text"
                placeholder="Enter Your Name"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.userName}
                touched={formik.touched.userName}
              />
              <CustomInputField
                title="Enter Your Email"
                type="text"
                placeholder="Enter Your Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.email}
                touched={formik.touched.email}
              />
              <CustomInputField
                title="Enter Your Password"
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.password}
                touched={formik.touched.password}
              />
              {isPending ? (
                <>
                  <div className="p-5">
                    <Spinner />
                  </div>
                </>
              ) : (
                <>
                  <CustomButton
                    buttonText="Register"
                    className="w-full my-5 bg-customYellow text-white poppins-semibold hover:text-yellow-500 hover:bg-white hover:border-yellow-500"
                    type="submit"
                  />
                </>
              )}
            </form>
            {/* form ended here */}
            <span className="poppins-light text-sm">
              Already have an account? Click here to
            </span>{" "}
            <span
              className="poppins-semibold text-customBlue text-sm cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
