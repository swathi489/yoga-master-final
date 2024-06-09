import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from "react-icons/bi";
import { FaHome, FaUsers } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import { TbBrandAppleArcade } from "react-icons/tb";
import {
  MdExplore,
  MdOfflineBolt,
  MdOutlinePendingActions,
  MdPayments,
} from "react-icons/md";
import { GiFigurehead } from "react-icons/gi";
import Swal from "sweetalert2";
import { IoSchoolSharp } from "react-icons/io5";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { IoMdDoneAll } from "react-icons/io";
import { HashLoader } from "react-spinners";
import Scroll from "../hooks/useScroll";

const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Dashboard Home",
  },
  {
    to: "/dashboard/manage-users",
    icon: <FaUsers className="text-2xl" />,
    label: "Manage Users",
  },
  {
    to: "/dashboard/manage-classes",
    icon: <BsFillPostcardFill className="text-2xl" />,
    label: "Manage Classes",
  },
  {
    to: "/dashboard/manage-applications",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    label: "Applications",
  },
];

const instructorNavItem = [
  {
    to: "/dashboard/instructor-cp",
    icon: <FaHome className="text-2xl" />,
    label: "Home",
  },
  {
    to: "/dashboard/add-class",
    icon: <MdExplore className="text-2xl" />,
    label: "Add A Class",
  },
  {
    to: "/dashboard/my-classes",
    icon: <IoSchoolSharp className="text-2xl" />,
    label: "My Classes",
  },
  {
    to: "/dashboard/my-pending",
    icon: <MdOutlinePendingActions className="text-2xl" />,
    label: "Pending Courses",
  },
  {
    to: "/dashboard/my-approved",
    icon: <IoMdDoneAll className="text-2xl" />,
    label: "Approved Classes",
  },
];

const students = [
  {
    to: "/dashboard/student-cp",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Dashboard",
  },
  {
    to: "/dashboard/enrolled-class",
    icon: <SiGoogleclassroom className="text-2xl" />,
    label: "My Enroll",
  },
  {
    to: "/dashboard/my-selected",
    icon: <BiSelectMultiple className="text-2xl" />,
    label: "My Selected",
  },
  {
    to: "/dashboard/my-payments",
    icon: <MdPayments className="text-2xl" />,
    label: "Payment History",
  },
  {
    to: "/dashboard/apply-instructor",
    icon: <SiInstructure className="text-2xl" />,
    label: "Apply for Instructor",
  },
];

const lastMenuItem = [
  {
    to: "/",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Main Home",
  },
  {
    to: "/trending",
    icon: <MdOfflineBolt className="text-2xl" />,
    label: "Trending",
  },
  {
    to: "/browse",
    icon: <GiFigurehead className="text-2xl" />,
    label: "Following",
  },
];

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false); // State to handle mobile menu
  const { loader, logout } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const role = currentUser?.role;

  const handleLogout = () => {
    console.log("Logged Out");
    logout();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout me!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been logged out successfully.",
              icon: "success",
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  if (loader) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <div className="flex">
        <div
          className={`${
            open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"
          } bg-white h-screen p-5 md:block hidden pt-8 relative duration-300`} // Changed the background color to bg-yellow-300
        >
          <div className="flex gap-x-4 items-center">
            <img
              onClick={() => setOpen(!open)}
              src="/yoga-logo.png"
              alt=""
              className={`cursor-pointer h-[40px] duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <Link to="/">
              <h1
                onClick={() => setOpen(!open)}
                className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${
                  !open && "scale-0"
                }`}
              >
                Yoga Maiyam
              </h1>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)} // Toggle mobileOpen state
            className="md:hidden absolute top-5 right-5" // Position the hamburger icon in the top right corner
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
                    </svg>
          </button>

          <ul className="pt-6 md:block hidden">
            <p className={`ml-3  text-grey-600 ${!open && "hidden"}`}>
              <small>MENU</small>
            </p>
            {role === "admin" && (
              <>
                {adminNavItems.map((menuItem, index) => (
                  <li key={index} className="mb-2">
                    <NavLink
                      to={menuItem.to}
                      className={({ isActive }) =>
                        `flex ${
                          isActive ? "bg-red-500 text-black" : "text-[#413F44]"
                        } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-black font-bold text-sm items-center gap-x-4`
                      }
                    >
                      {menuItem.icon}
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        {menuItem.label}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </>
            )}

            {role === "instructor" && (
              <>
                {instructorNavItem.map((menuItem, index) => (
                  <li key={index} className="mb-2">
                    <NavLink
                      to={menuItem.to}
                      className={({ isActive }) =>
                        `flex ${
                          isActive ? "bg-gray-400 text-black" : "text-[#413F44]"
                        } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-black font-bold text-sm items-center gap-x-4`
                      }
                    >
                      {menuItem.icon}
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        {menuItem.label}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </>
            )}

            {role === "user" && (
              <>
                {students.map((menuItem, index) => (
                  <li key={index} className="mb-2">
                    <NavLink
                      to={menuItem.to}
                      className={({ isActive }) =>
                        `flex ${
                          isActive ? "bg-gray-400 text-black" : "text-[#413F44]"
                        } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-black font-bold text-sm items-center gap-x-4`
                      }
                    >
                      {menuItem.icon}
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        {menuItem.label}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </>
            )}

            <p
              className={`ml-3 text-gray-600 uppercase mb-3 ${
                !open && "hidden"
              }`}
            >
              <small>USEFUL LINKS</small>
            </p>
            {lastMenuItem.map((menuItem, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={menuItem.to}
                  className={({ isActive }) =>
                    `flex ${
                      isActive ? "bg-gray-400 text-black" : "text-[#413F44]"
                    } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-black font-bold text-sm items-center gap-x-4`
                  }
                >
                  {menuItem.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menuItem.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
          {open && (
            <ul>
              <li>
                <button
                  onClick={() => handleLogout()}
                  className="flex bg-white-500 text-[#413F44] duration-150 rounded-md p-2 cursor-pointer hover:bg-red-600 font-bold text-sm items-center gap-x-4"
                >
                  <BiLogInCircle className="text-2xl" />
                  <span className="origin-left duration-200">Logout</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div
        className={`${
          mobileOpen ? "block" : "hidden"
        } md:hidden w-full bg-cyan-100 h-screen p-5`}
      >
        {/* Mobile menu content */}
        <div className="flex flex-col">
          {/* Render menu items here */}
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-5"
        >
          {/* Close button icon */}
        </button>
      </div>
      <div className="h-screen overflow-y-auto py-8 flex-1 bg-white">
        {/* Content */}
        <Scroll />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
