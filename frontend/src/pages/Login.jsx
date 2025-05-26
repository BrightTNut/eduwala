import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Button from "../components/core/HomePage/Button";
import git from "../assets/Images/git.gif";
import HighlightText from "../components/core/HomePage/HighlightText";
import Footer from "../components/common/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
const Login = () => {
  const [see, setSee] = useState(false);

  const callLogin = async () => {
    try {
      const result = await apiConnector("POST", login.LOGIN);
    } catch (error) {
      console.log("fetching all categories !!", error);
      console.error(error);
    }
  };
  return (
    <div className="mx-auto w-full  border-dotted border-4 border-t-none rounded-lg">
      <Navbar />
      <div className="flex mx-auto justify-around p-5">
        <div className="w-[50%] rounded-lg ">
          <div className="text-2xl font-bold p-3">
            <HighlightText text={" Welcome Back Education"} /> <br />
            Build skills for today, tomorrow, and beyond. <br />
            <p className="underline text-blue-500">
              Education to future-proof your career.
            </p>
          </div>
          <form className="bg-richblue-200 rounded-lg flex p-4 mx-center gap-5 flex-col">
            <label className="flex">
              Email <p className="text-red-900">*</p>
            </label>
            <input text={"Email"} className="border rounded-lg px-3" />
            <label className="flex">
              Password<p className="text-red-900">*</p>
            </label>
            <div className="flex gap-9 items-center">
              <input
                type={`${see ? "text" : "password"}`}
                className="border rounded-lg w-[90%] px-3"
              />
              <div
                className="bg-richblue-300 px-5 py-2 rounded-lg"
                onClick={() => setSee(!see)}
              >
                {see ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="w-[16%] mx-auto ">
              <Button active={true} onClick={() => callLogin}>
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="py-9">
          <div className="m-3 [box-shadow:rgb(171,_196,245)-8px_8px] ">
            <img src={git}></img>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
