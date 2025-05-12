import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";
import { Link } from "react-router-dom";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="w-full items-center flex flex-col">
      {/* Explore more section */}
      <div>
        <div className="text-4xl font-semibold text-center my-10">
          Unlock the <HighlightText text={"Power of Code"} />
          <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex gap-7 mx-auto ">
        {tabsName.map((ele, index) => {
          return (
            <div
              key={index}
              className={`bg-richblue-300 rounded-lg px-3 pt-1 items-center  
            ${currentTab === ele ? "underline text-2xl " : "hover:scale-113"}
          `}
            >
              <Link onClick={() => setMyCards(ele)}>{ele}</Link>
            </div>
          );
        })}
      </div>

      {/* Cards Group */}
      <div className=" flex w-11/12 px-19 ">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              index={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
