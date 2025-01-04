import React from "react";
import { useNavigate } from "react-router-dom";

import LoginImage from "../../assets/images/rb_12300.png";

import { useGlobalFormik } from "../../customHooks/useFormik";
import {
  loginInitialValues,
  loginSchema,
} from "../../utils/validation/authSchema";
import { useLogin } from "../../services/userService/authService";

import Spinner from "../../components/Loader/Spinner";
import CustomButton from "../../components/customButton/CustomButton";
import CustomInputField from "../../components/inputfield/CustomInputField";

const UserLoginPage = () => {
  const navigate = useNavigate();
  //Custom hook for login
  const { mutate, isPending } = useLogin();
  //formik validation
  const formik = useGlobalFormik({
    initialValues: loginInitialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="lg:container lg:mx-auto rounded-md grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 justify-items-center border-2 rounded-xl border-yellow-300">
        <div>
          <img src={LoginImage} alt="login image" className="h-full" />
        </div>
        <div className="lg:my-20">
          <div className="flex justify-center ">
            <span className="text-center poppins-semibold my-5 text-4xl">
              Login
            </span>
          </div>
          <p className="poppins-light text-xl mb-5">
            🔐 Welcome Back! Unlock Your Journey with Us. ✨
          </p>
          {/* form started here */}
          <form onSubmit={formik.handleSubmit}>
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
                  buttonText="Login"
                  className="w-full my-5 bg-customYellow text-white poppins-semibold hover:text-customYellow hover:bg-white hover:border-customYellow"
                  type="submit"
                />
              </>
            )}
          </form>
           {/* form ended here */}
          <span className="poppins-light text-sm">
            Dont have any account? Click here to
          </span>{" "}
          <span
            className="poppins-semibold text-customBlue text-sm cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
