import React from "react";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import { CiLocationArrow1 } from "react-icons/ci";
import Button from "../components/core/HomePage/Button";
import git from "../assets/Images/git.gif";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Footer from "../components/common/Footer";
import { FaAccessibleIcon } from "react-icons/fa";
import TimeLine from "../components/core/HomePage/TimeLine";
import Learning from "../components/core/HomePage/Learning";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Navbar from "../components/common/Navbar";
function Home() {
  return (
    <div className="mx-auto  border-dotted border-4 border-t-none rounded-lg">
      <Navbar />
      {/* section 1 */}

      <div className="w-full">
        <div className=" w-full  relative mx-auto   flex flex-col justify-between items-center text-richblue-700 bg-gradient-to-br from-[#c8d9ed] via-[#e1f1fd] to-[#4663ac]">
          <Link to="/singup">
            <div className="inset-ring-4 group mt-16 p-3 shadow-xl/30 mx-auto rounded-full bg-richblack-900 text-richblack-200 font-bold transition-all duration-200 hover:scale-95 w-fit">
              <div className="flex items-center px-10 group-hover:text-richblack-500">
                <button className="">Become the instructor</button>
                <CiLocationArrow1 />
              </div>
            </div>
          </Link>
          <div className="mt-4  font-bold text-2xl">
            Empower Your Future with <HighlightText text={"Coding Skills"} />
          </div>

          <div className="w-[80%] text-center m-4 ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              eligendi commodi fuga necessitatibus laboriosam esse, dolores,
              quia error provident molestiae accusantium doloribus numquam neque
              repudiandae sapiente possimus voluptas. Placeat, recusandae?
            </p>
          </div>

          <div className="gap-7 mt-3 flex">
            <Link to="/about">
              <Button active={true}>Learn More</Button>
            </Link>
            <Link to="/singup">
              <Button>Book a Demo</Button>
            </Link>
          </div>
          <div className="m-3 [box-shadow:rgb(171,_196,245)-8px_8px] ">
            <img src={git}></img>
          </div>
        </div>
        <div className="homepage_bg h-[333px] flex mx-auto">
          <div className="w-11/12 max-w-maxContent flex flex-col ">
            <div className="h-[180px]"></div>
            <div className="flex gap-4 justify-center mx-auto">
              <Button active={true} linkto={"/signup"}>
                <div className="items-center flex gap-2">
                  Explore Full CataLog
                  <CiLocationArrow1 />
                </div>
              </Button>
              <Button active={false} linkto={"/signup"}>
                <div className="items-center flex gap-2">
                  Learn More
                  <CiLocationArrow1 />
                </div>
              </Button>
            </div>
            <ExploreMore />
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 pt-52 text-richblack-500">
        <div className="flex flex-col lg:flex-row-reverse">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-bold">
                Unlock Coding skills with our{" "}
                <HighlightText text={"Coding Courses"} />{" "}
              </div>
            }
            subheading={
              "   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, saepe sunt quidem numquam provident, omnis blanditiis repudiandae quos vero nulla nemo odit harum quod dolor esse perspiciatis repellat doloribus incidunt!"
            }
            button1={{
              text: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            button2={{
              text: "Learn More",
              linkto: "/login",
              active: false,
            }}
            CodeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document Title</title>\n</head>\n<body>\n<!-- Content goes here -->\n</body>\n</html>`}
          />
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse gap-9"}
            heading={
              <div className="text-4xl font-bold">
                Unlock Coding skills with our{" "}
                <HighlightText text={"Coding Courses"} />{" "}
              </div>
            }
            subheading={
              "   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, saepe sunt quidem numquam provident, omnis blanditiis repudiandae quos vero nulla nemo odit harum quod dolor esse perspiciatis repellat doloribus incidunt!"
            }
            button1={{
              text: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            button2={{
              text: "Learn More",
              linkto: "/login",
              active: false,
            }}
            CodeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document Title</title>\n</head>\n<body>\n<!-- Content goes here -->\n</body>\n</html>`}
          />
        </div>
        <div className="bg-pure-greys-5 px-[90px] w-11/12 justify-between flex mx-auto  items-center text-richblack-500">
          <div className="w-[1000px] text-3xl">
            <h1>
              Get the skills you need for a{" "}
              <HighlightText text={"''job that is in demand''"} />
            </h1>
          </div>

          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A quaerat
              natus aut! Vel saepe eum atque accusamus nemo. Tempora quasi minus
              neque repellendus corporis eaque pariatur ipsa od.
            </p>
            <div className="w-[150px] pt-5">
              {" "}
              <Button linkto={"/signup"}>Learn More</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-11/12">
          <TimeLine />
          <Learning />
        </div>
      </div>
      {/* section 3 */}
      <div className="w-11/12 max-w-maxContent mx-auto p-5 flex flex-col justify-between gap-9  m-7 text-richblue-700 bg-gradient-to-br from-[#c8d9ed] via-[#e1f1fd] to-[#4663ac]">
        <InstructorSection />
        <h1 className="text-center pt-4 text-3xl underline underline-offset-4 decoration-dotted">
          Review From Students
        </h1>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}
export default Home;
