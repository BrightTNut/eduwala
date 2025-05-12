import React from "react";
import FooterLink2 from "./footer-links";
import { Link } from "react-router-dom";
import HighlightText from "../core/HomePage/HighlightText";
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const Footer = () => {
  return (
    // footer
    <div className="lg:w-[80%] flex m-auto  gap-8 bottom  ">
      <div>
        <h1 className="text-5xl pb-9">LOGO</h1>
        {["About", "Careers", "Affiliates"].map((data, i) => (
          <div key="i">{data}</div>
        ))}
        <div className="flex gap-4 ">
          <FaFacebook /> <FaGoogle /> <FaTwitter /> <FaYoutube />
        </div>
      </div>
      <div>
        <h1 className="text-3xl">
          <HighlightText text={"Resources"} />
        </h1>
        {Resources.map((d, index) => (
          <div key={index} className="w-[150px] ">
            <h3>{d}</h3>
          </div>
        ))}
      </div>
      <div>
        {" "}
        <h1 className="text-3xl">
          <HighlightText text={"Plan"} />
        </h1>
        {Plans.map((d, index) => (
          <div key={index} className="w-[150px] ">
            <h3>{d}</h3>
          </div>
        ))}
        <h1 className="text-3xl">
          <HighlightText text={"Community"} />
        </h1>
        {Community.map((d, index) => (
          <div key={index} className="w-[150px] ">
            <h3>{d}</h3>
          </div>
        ))}
      </div>

      {FooterLink2.map((section, index) => (
        <div
          key={index}
          className="w-[150px] "
          style={{ textOverflow: "ellipsis" }}
        >
          <h3 className="text-2xl ">
            <HighlightText text={`${section.title}`} />
          </h3>
          <ul>
            {section.links.map((d, idx) => (
              <li key={idx}>
                <Link to={d.link}>{d.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Footer;
