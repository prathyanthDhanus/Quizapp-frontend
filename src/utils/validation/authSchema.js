import * as Yup from "yup";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //check for contain "@" and "." in the email

// --------------------- name validation  section ----------------------
export const nameValidation = Yup.string()
  .required("Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name cannot exceed 50 characters");
// ------------------- name validation  section end --------------------

// ------------------- email validation  section --------------------
export const emailValidation = Yup.string()
  .matches(emailRegex, "Invalid email address")
  .email("Invalid email address")
  .required("Email is required");
// ------------------- email validation  section end --------------------

// ------------------- password validation section --------------------
export const passwordValidation = Yup.string()
  .min(6, "Must be at least 6 characters")
  .matches(/[a-z]/, "Must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  .matches(/[0-9]/, "Must contain at least one number")
  .required("Password is required");
// ------------------- password validation  section end --------------------

// --------------------- login section ----------------------
export const loginInitialValues = {
  email: "",
  password: "",
};

export const loginSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});
//--------------------- login section end --------------------

//--------------------- register section ----------------------
export const registerInitialValues = {
  userName: "",
  email: "",
  password: "",
};

export const registerSchema = Yup.object().shape({
  userName: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});
//-------------------- register section end ---------------------
