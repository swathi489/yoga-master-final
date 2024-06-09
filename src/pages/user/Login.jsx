import React, { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import GoogleLogin from "../../components/Social/GoogleLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const { login, error, setError, loader, setLoader } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = e => {
    setError(''); // Clear any existing error
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);
    console.log(data);
    login(formData.email, formData.password)
      .then(() => {
        Swal.fire({ // Use SweetAlert for success message
          title: "Login Successful",
          icon: "success"
        });
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        setError(err); // Set the entire error object
        setLoader(false);
        Swal.fire({ // Use SweetAlert for error message
          title: "Login Failed",
          text: err.message || "Login ID not found",
          icon: "error"
        });
      });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-secondary sm-text-3xl text-center">
        Get Started Today
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-gray-500 ">
        Explore our comprehensive library of courses, meticulously crafted to
        cater to all levels of expertise.
      </p>
      <div className="mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <p className="text-center text-red-400 text-lg font-medium">
            Sign in to your account
          </p>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full border outline-none
              rounded-lg border-gray-800 p-4 pe-12 text-sm shadow-sm"
              />
              <span
                className="absolute inset-y-0 end-0 grid 
              place-content-center px-4"
              >
                <MdAlternateEmail className="h-4 w-4 text-gray-400" />
              </span>
            </div>
          </div>

          {/*password */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                className="w-full border outline-none
              rounded-lg border-gray-800 p-4 pe-12 text-sm shadow-sm"
              />
              <span onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 end-0 grid 
              place-content-center px-4"
              >
                <IoEyeSharp className="h-4 w-4 text-gray-400" />
              </span>
            </div>
          </div>
          <button type="submit" className="block w-full rounded-lg bg-secondary px-5 py-3 text-sm 
          font-medium text-white">Sign In</button>
          <p className="text-center text-sm text-gray-500">
            No Account? <Link to="/register" className="underline text-secondary">Sign Up</Link>
          </p>
        </form>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
