import React, { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "./navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
const Navbar = () => {
  //use selectors of slices
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, SetSubLinks] = useState([]);
  const fetchCatalogs = async () => {
    try {
      const result = await apiConnector("GET", categories.CATAGORIES_API);
      SetSubLinks(result.data.data);
      console.log("Tag fetched successfullly", result.data.data);
    } catch (error) {
      console.log("fetching all categories !!", error);
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCatalogs();
  }, []);
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex  rounded-lg p-4  justify-center border-b-[1px] bg-richblack-300">
      <div className="w-11/12 max-w-maxContent flex">
        <Link to="/">
          <img src={logo} loading="lazy" alt="logo" />
        </Link>
        <nav className="flex items-center mx-auto">
          <ul className="flex gap-6 ">
            {NavbarLinks.map((ele, index) => (
              <li key={index}>
                {ele.title === "Catalog" ? (
                  <div>{ele.title} </div>
                ) : (
                  <Link to={ele?.path}>
                    <p
                      className={`
                      ${
                        matchRoute(ele?.path)
                          ? "text-black-800 hover:none decoration-dotted underline underline-offset-4"
                          : "text-richblue-900"
                      }
                      no-underline hover:underline hover:decoration-wavy`}
                    >
                      {ele.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* //login/signup/deshboard/ */}
        <div className="flex justify-between">
          {user && user?.account != "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaOpencart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login" className="flex items-center px-5">
              <button className="hover:border-none  border-2 border-dashed rounded-lg px-2">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup" className="flex items-center">
              <button className="hover:border-none border-2 border-dashed rounded-lg px-2">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
