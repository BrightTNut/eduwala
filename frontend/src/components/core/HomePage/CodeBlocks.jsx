import React from "react";
import Button from "./Button";
import { CiLocationArrow1 } from "react-icons/ci";
import { TypeAnimation } from "react-type-animation";
const CodeBlocks = ({
  position,
  heading,
  subheading,
  button1,
  button2,
  CodeBlock,
  bggradient,
  codeColour,
}) => {
  return (
    <div
      className={`lg:w-[80%] m-auto flex my-20  items-center justify-between ${position}`}
    >
      {/* Section 1 */}
      <div className="w-[50%] flex flex-col gap-6 ">
        {heading}
        {subheading}
        <div className="flex gap-8 m-2">
          <Button active={button1.active} linkto={button1.linkto}>
            <div className="gap-3 items-center">{button1.text}</div>
            <CiLocationArrow1 />
          </Button>
          <Button active={button2.active} linkto={button2.linkto}>
            <div className="gap-3 items-center">{button2.text}</div>
          </Button>
        </div>
      </div>
      {/* // Section2 */}
      <div className="w-[50%] flex flex-row  rounded-md p-4  bg-radial-[at_20%_5%] from-sky-5 via-blue-40 to-indigo-300 to-90%">
        {/* todo bg gradient */}
        <div className="flex text-center w-[10%] font-bold flex-col ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>
        <div
          className={`font-doto text-richblue-900 w-[90%] flex flex-row  font-bold  ${codeColour}`}
        >
          <TypeAnimation
            sequence={[CodeBlock, 1000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
