import axios from 'axios'; // Add this import statement
import { useForm } from "react-hook-form";
import { FaMap, FaPhone, FaUser } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhoto } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Social/GoogleLogin";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import { useContext } from 'react';


const Register = () => {
  const navigate = useNavigate();
  const { signUp, updateUser,setError } = useContext(AuthContext); // Ensure AuthContext is defined and contains the necessary context values
  
  const {
    register,
    handleSubmit,
    watch,
    
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    setError("")
    signUp(data.email,data.password)
    .then((result)=>{
      const user = result.user;
      if(user){
        return updateUser(data.name,data.photoUrl)
        .then(()=>{
          const userImp = {
            name:user?.displayName,
            email:user?.email,
            photoUrl:user?.photoUrl,
            role:"user",
            gender:data.gender,
            phone:data.phone,
            address:data.address
          };
          if(user.email && user.displayName){
            return axios.post("https://yoga-master-server-991u.onrender.com/new-user",userImp).then(()=>{
              setError("")
              navigate('/login');
              return "Registration Successfull"
            }).catch((err)=>{
              throw new Error(err);
            })
          }    
        }).catch((err)=>{
          setError(err.code);
          throw new Error(err)
        });

      }
    })
  };
  const password = watch('password','')
  return (
    <div className="flex justify-center items-center pt-14 bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Please Register</h2>

        {/*form data*/}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                <FaUser className="inline-block mr-2 mb-1 text-lg" />
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: true,
                })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none
              focus-ring focus:border-blue-300"
              ></input>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                <MdOutlineEmail className="inline-block mr-2 mb-1 text-lg" />
                Email
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none
              focus-ring focus:border-blue-300"
              ></input>
            </div>
          </div>


          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="">
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: true,
                })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none
              focus-ring focus:border-blue-300"
              ></input>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="confirmpassword"
              >
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmpassword", {
                  required: true,validate:(value)=>value === password || "password not matched!"
                })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none
              focus-ring focus:border-blue-300"
              ></input>
            </div>
          </div>


          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="phone number"
              >
                <FaPhone className="inline-block mr-2 mb-1 text-lg" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                {...register("phone", {
                  required: true,
                })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none
              focus-ring focus:border-blue-300"
              ></input>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="photoUrl"
              >
                <MdOutlinePhoto className="inline-block mr-2 mb-1 text-lg" />
                PhotoUrl
              </label>
              <input
                type="text"
                placeholder="PhotoUrl"
                {...register("photoUrl", { required: true })} // Register the input field with the name attribute "photoUrl"
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none
    focus-ring focus:border-blue-300"
              />
            </div>
          </div>
          <div>
            <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="gender"
              >
                <FaUser className="inline-block mr-2 mb-1 text-lg" />
                Gender
              </label>
              <select {...register("gender",{required:true}) }className="w-full border border-gray-300 rounded-md
              py-2 px-4 focus:outline-none focus:ring focus:border-blue-300">
                <option value="">Select Gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
       <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="address"
              >
                <FaMap className="inline-block mr-2 mb-1 text-lg" />
                Address
              </label>
              <textarea {...register("address",{required:true})} rows="3" 
              placeholder="Enter Address"className="w-full border-gray-300 border rounded-md 
              py-2 px-4 focus:outline-none
    focus-ring focus:border-blue-300"></textarea>
            </div>           
          </div>
          <div className="text-center">
            <button type="submit" className="bg-secondary hover:bg-red-500 
            text-white py-2 px-4 rounded-md ">
              Register
            </button>
            {
              errors.password && (<div className="text-red-500 text-sm w-full mt-1">
                <p>Password doesn't match!</p></div>)
            }
          </div>
        </form>
        <p className="text-center mt-4 ">
          Already have an account?<Link to = "/login" className="underline text-secondary"> Login</Link>
        </p>
        <GoogleLogin/>
      </div>
    </div>
  );
};

export default Register;
