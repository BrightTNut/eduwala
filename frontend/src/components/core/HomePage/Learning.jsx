import React from "react";
import HighlightText from "./HighlightText";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import Button from "./Button";
const Learning = () => {
  return (
    <div className="flex flex-col items-center pt-29 ">
      <div className="text-center ">
        <h1 className="text-3xl pb-4 decoration-dotted underline underline-offset-6">
          Your swiss knife for <HighlightText text={"Learning any Language"} />
        </h1>
        <p className="pl-38">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          laborum at, sequi id deserunt consectetur adipisicing elit. Veniam
          laborum at, sequi id deserunt consectetur adipisicing elit. Veniam
          laborum at, sequi id deserunt
        </p>
      </div>
      <div className="flex items-center w-[90%] ">
        <img src={Know_your_progress} className="translate-x-[19%]" />
        <img src={Compare_with_others} />
        <img src={Plan_your_lessons} className="translate-x-[-29%] " />
      </div>
      <div className="w-fit  pt-9">
        <Button linkto={"/signup"}>Learn More</Button>
      </div>
    </div>
  );
};

export default Learning;
