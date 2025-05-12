import React from "react";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const timeLine = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimeLine = () => {
  return (
    <div>
      <div className="flex flex-row pt-12 items-center  pl-35">
        <div className="w-[70%]">
          {timeLine.map((d, i) => (
            <div key={i} className="flex  flex-col h-20 overflow-visible">
              <div className="flex gap-5 pl-4">
                <img src={d.Logo} />
                <div>
                  <p className="text-richblack-900 decoration-dotted underline  underline-offset-4">
                    {d.Heading}
                  </p>
                  <p>{d.Description}</p>
                </div>
              </div>
              <div
                className={`hidden ${
                  timeLine.length - 1 === i ? "hidden" : "lg:block"
                }  h-10  border-dotted border-r border-richblack-900 bg-richblack-400/ w-[26px]`}
              ></div>
            </div>
          ))}
        </div>
        <div className="relative">
          <img
            src={TimeLineImage}
            className="rounded-md ring shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
          />
          <div className="flex rounded-lg translate-x-[23%] translate-y-[-50%] flex-row mx-auto uppercase py-10 absolute bg-pink-200  h-19 mx-auto">
            <div className="flex border-r-4 gap-5 border-richblack-900 items-center px-4">
              <h1 className="text-pink-900 text-2xl">10</h1>
              <h1>
                Years of <br />
                Experience
              </h1>
            </div>
            <div className="h-10 translate-y-[-50%] border-r-2 "></div>
            <div className="flex items-center gap-5 px-4">
              <h1 className="text-pink-900 text-2xl">250</h1>
              <h1>
                Types of <br></br>Courses
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TimeLine;
