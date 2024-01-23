/* eslint-disable react/prop-types */

const Button = ({ btnText, btnColor }) => {
  return (
    <a
      href=""
      className={`bg-${btnColor} h-fit w-[100px] text-center py-2 rounded-[5px] text-[13px] font-medium`}
    >
      {btnText}
    </a>
  );
};

export default Button;
