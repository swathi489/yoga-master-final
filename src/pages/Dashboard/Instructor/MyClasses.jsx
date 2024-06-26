import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from 'moment';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (currentUser) {
      axiosSecure.get(`/classes/${currentUser?.email}`)
        .then((res) => {
          console.log("API Response:", res); // Log the entire response object
          console.log("Classes data:", res.data); // Log the data received from the API
          setClasses(res.data);
        })
        .catch(err => {
          console.error('Error fetching classes:', err);
          setError('Failed to fetch classes. Please try again later.');
        });
    }
  }, [currentUser]);


  const handleFeedback = (classId) => {
    // Handle feedback logic here
  };

  return (
    <div>
      <div className="my-9">
        <h1 className="text-4xl font-bold text-center">
          My<span className="text-secondary">Classes</span>{" "}
        </h1>
        <div>
          <p className="text-[15px] text-center my-2">
            Here you can see how many classes added by you and all classes
            status
          </p>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : classes.length === 0 ? (
          <div className="text-center text-2xl font-bold mt-10">
            You have not added any class yet
          </div>
        ) : (
          <div>
            {classes.map((cls, index) => (
              <div key={index} className="mb-5 hover:ring ring-secondary duration-200 focus:ring-rounded-lg ">
                <div className="bg-white flex rounded-lg gap-8 shadow p-4">
                  <div>
                    <img
                      src={cls.image}
                      alt=""
                      className="max-h-[200px] max-w-[300px]"
                    />
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="w-2/3">
                      <h2 className="text-[21px] font-bold text-secondary border-b pb-2 mb-2">
                        {cls.name}
                      </h2>
                      <div>
                        <div>
                          <h1 className="font-bold mb-3">Some Info</h1>
                          <h1 className="text-secondary my-2">
                            <span className="text-black">Total Student</span>:{" "}
                            {cls.totalEnrolled ? cls.totalEnrolled : 0}
                          </h1>
                          <h1 className="text-secondary my-2">
                            <span className="text-black">Total Seats</span>:{" "}
                            {cls.availableSeats}
                          </h1>
                          <h1 className="text-secondary my-2">
                            <span className="text-black">Instructor Name</span>:{" "}
                            {cls.instructorName}
                          </h1>
                          <h1 className="text-secondary my-2">
                            <span className="text-black">Status</span>:{" "}
                            <span
                              className={`font-bold ${
                                cls.status === "pending"
                                  ? "text-orange-400"
                                  : cls.status === "checking"
                                  ? "text-yellow-400"
                                  : cls.status === "approved"
                                  ? "text-green-500"
                                  : "text-red-600"
                              }`}
                            >
                              {cls.status}
                            </span>
                          </h1>
                        </div>
                        <div className="">
                          <h1 className="text-secondary my-2">
                            <span className="text-black">Price</span>: {cls.price}
                            <span className="text-black">$</span>
                          </h1>
                          <h1 className="text-black my-2">
                            <span className="">Submitted</span>:
                            <span className="text-secondary">
                              {cls.submitted
                                ? moment(cls.submitted).format("MMMM Do YYYY")
                                : "Not Get Data"}
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <h1 className="font-bold mb-3">Action:</h1>
                      <div className="flex flex-col justify-space h-full py-6">
                        <button
                          onClick={() => handleFeedback(cls._id)}
                          className="px-3 bg-orange-400 font-bold py-2 my-3 text-white w-full rounded-lg"
                        >
                          View Feedback
                        </button>
                        <button
                          className="px-3 bg-green-500 font-bold py-2 my-3 text-white w-full rounded-lg"
                        >
                          View details
                        </button>
                        <button
                          onClick={() => navigate( `/dashboard/update/${cls._id}`)}
                          className="px-3 bg-blue-700 font-bold py-2 my-3 text-white w-full rounded-lg"
                        >
                          Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClasses;
