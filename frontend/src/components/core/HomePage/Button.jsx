import React from "react";
import { Link } from "react-router-dom";
const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`shadow-xl/30 flex gap-2 items-center rounded-md font-bold text-center text-[17px] px-5 py-2
    ${
      active ? "bg-richblack-300" : "bg-richblack-900 text-richblack-200"
    } hover:scale-95 hover:text-richblack-100 transition-all duration-200`}
      >
        {children}
      </div>
    </Link>
  );
};
export default Button;
