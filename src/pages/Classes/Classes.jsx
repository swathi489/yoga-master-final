import React, { useContext, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser } = useUser();
  console.log("Current User:", currentUser?.email); // Add null check here
  const role = currentUser?.role;
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const userEmail = currentUser?.email;

  useEffect(() => {
    axiosFetch
      .get("/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.error("Error fetching classes:", err));
  }, []);

  const handleSelect = (id) => {
    if (!currentUser) {
      navigate("/login");
      return alert("Please Login First!");
    }

    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => {
        const enrolledClasses = res.data;
        if (enrolledClasses.find((item) => item.classes._id === id)) {
          alert("Already Enrolled");
        } else {
          axiosSecure
            .get(`/cart-item/${id}/${userEmail}`)
            .then((res) => {
              if (res.data.classId === id) {
                alert("Already Selected");
              } else {
                const data = {
                  classId: id,
                  userMail: currentUser.email,
                  date: new Date(),
                };

                axiosSecure
                  .post("/add-to-cart", data)
                  .then((res) => {
                    console.log(res.data);
                    alert("Added to Cart Successfully");
                    // You might want to update some state here if needed
                  })
                  .catch((error) => {
                    console.error("Error adding to cart:", error);
                    alert("Failed to add to Cart");
                  });
              }
            })
            .catch((error) => {
              console.error("Error checking cart item:", error);
              alert("Failed to check cart item");
            });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="mt-20 pt-3">
        <h1 className="text-4xl font-bold text-center text-secondary">
          Classes
        </h1>
        <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {classes.map((cls, index) => (
            <div
              key={index}
              className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 
               mx-auto ${
                 cls.availableSeats < 1 ? "bg-red-300" : "bg-white"
               } dark:bg-slate-600 rounded-lg 
              shadow-lg overflow-hidden cursor-pointer `}
            >
              <div className="relative h-48">
                <img
                  src={cls.image}
                  alt=""
                  className="object-cover w-full h-full"
                />
                <Transition
                  show={true} // Change this condition based on your requirement
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {role !== "admin" && (
                      <button
                        onClick={() => handleSelect(cls._id)}
                        title={
                          role === "instructor"
                            ? "Instructor cannot select classes"
                            : cls.availableSeats < 1
                            ? "No Seats available"
                            : "You can select classes"
                        }
                        disabled={
                          role === "instructor" || cls.availableSeats < 1
                        }
                        className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 
                      rounded hover:bg-red-700"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </Transition>
              </div>
              {/* Details */}
              <div className="px-6 py-2 mb-1">
                <h3 className="font-semibold">{cls.name}</h3>
                <p className="text-gray-500 text-xs">
                  Instructor: {cls.instructorName}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-600 text-xs">
                    Available Seats: {cls.availableSeats}
                  </span>
                  <span className="text-green-500 font-semibold">
                    ${cls.price}
                  </span>
                </div>
                <Link to={`/class/${cls._id}`}>
                  <button className="px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 
                  rounded hover:bg-red-700">View</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
