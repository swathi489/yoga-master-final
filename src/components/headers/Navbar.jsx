import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Switch } from "@mui/material";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../utilities/providers/AuthProvider";

const navLinks = [
  { name: "Home", route: "/" },
  { name: "Instructors", route: "/instructors" },
  { name: "Classes", route: "/classes" },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loader, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setisFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navBg, setNavBg] = useState("bg-[#15151580]");

  const { user } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    const isSmallScreen = window.innerWidth <= 768;
    setIsMobileMenuOpen(isSmallScreen ? !isMobileMenuOpen : false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setisFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentposition = window.pageYOffset;
      setScrollPosition(currentposition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      if (isHome) {
        setNavBg(
          "bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-white"
        );
      } else {
        setNavBg("bg-white dark:bg-black dark:text-white text-white");
      }
    } else {
      setNavBg(
        `${
          isHome || location.pathname === "/"
            ? "bg-transparent"
            : "bg-white dark:bg-black"
        } dark:text-white text-white`
      );
    }
  }, [scrollPosition, isHome, location.pathname]);

  const handleLogout = (e) => {
    e.preventDefault();
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
            navigate("/");
            closeMobileMenu();
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${
        isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2xl"
      }${isFixed ? " static" : " fixed"} top-0 
    transition-colors duration-500 ease-in-out w-full z-10`}
    >
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => {
              navigate("/");
              closeMobileMenu();
            }}
            className="flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center"
          >
            <div>
              <h1 className="text-2xl inline-flex gap-3 text-gray-300 items-center font-bold">
                YogaMaiyam
                <img src="/yoga-logo.png" className="w-8 h-8" alt="" />
              </h1>
              <p className="font-bold text-gray-200 text-[13px] tracking-[8px]">
                Quick Explorer
              </p>
            </div>
          </div>

          {/* Mobile menu icons */}
          <div className="md:hidden items-center">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-grey-300 hover:text-white focus:outline-none"
            >
              <FaBars className="h-6 w-6 hover:text-primary" />
            </button>
          </div>

          {/* Dropdown for mobile */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-black dark:text-white text-black z-10">
              <ul className="py-2">
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      to={link.route}
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 text-center bg-yellow-100 text-teal-500 hover:bg-blue-600 dark:hover:bg-gray-800 transition-colors duration-300"
                      style={{
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {user ? (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-center text-teal-800 bg-pink-100 rounded-xl hover:bg-red-600 transition-colors duration-300"
                        style={{
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="#"
                        className="block px-4 py-2 text-center text-teal-800 bg-pink-100 rounded-xl hover:bg-red-600 transition-colors duration-300"
                        style={{
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 text-center text-teal-800 bg-pink-100 rounded-xl hover:bg-red-600 transition-colors duration-300"
                      style={{
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Navigational Links */}
          <div className="hidden md:block text-black dark:text-white">
            <div className="flex">
              <ul className="ml-10 flex items-center space-x-4 pr-4">
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      to={link.route}
                      style={{
                        whiteSpace: "nowrap",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                      className={`font-bold text-gray-200 dark:text-white hover:text-secondary text-xl duration-300 ${
                        location.pathname === link.route ? "text-secondary" : ""
                      }`}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {/* Based on users */}
                {user ? null : isLogin ? (
                  <li>
                    <NavLink
                      to="/register"
                      style={{
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                      className={`font-bold text-gray-200 text-xl dark:text-black hover:text-secondary duration-300 ${
                        location.pathname === "/register" ? "text-secondary" : ""
                      }`}
                    >
                      Register
                    </NavLink>{" "}
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      style={{
                        boxShadow: "0px 4px 6px rgba(23, 0, 0, 0.1)",
                      }}
                      className={`font-bold text-2xl text-gray-200 dark:text-white hover:text-secondary duration-300 text-xl${
                        location.pathname === "/login" ? "text-secondary" : ""
                      }`}
                    >
                      Login
                    </NavLink>{" "}
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      style={{
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                      className={`font-bold  text-gray-200 text-xl dark:text-white hover:text-secondary duration-300 ${
                        location.pathname === "/dashboard" ? "text-secondary" : ""
                      }`}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <img
                      src={user.photoURL}
                      alt=""
                      className="h-[40px] rounded-full w-[40px]"
                      style={{
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      className="font-bold px-3 py-2 bg-secondary text-white rounded-xl"
                      style={{
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Logout
                    </NavLink>
                  </li>
                )}

                {/* Color toggle */}
                <li>
                  <ThemeProvider theme={theme}>
                    <div className="flex flex-col justify-center items-center">
                      <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                      <h1 className="text-[10px] text-white">Light/Dark</h1>
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
