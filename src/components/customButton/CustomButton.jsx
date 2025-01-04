export const CustomButton = ({
  buttonText,
  className,
  onClick,
  type = "button",
  disabled,
}) => {
  return (
    <div>
      <button
        className={`flex items-center border justify-center rounded-md poppins-light ${className}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        <span className=" p-3">{buttonText}</span>
      </button>
    </div>
  );
};

export default CustomButton;
