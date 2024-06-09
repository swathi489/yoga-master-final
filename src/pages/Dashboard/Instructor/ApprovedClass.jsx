import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from 'moment';

const ApprovedCourses = () => {
  const [approvedCourses, setApprovedCourses] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (currentUser) {
      axiosSecure.get(`/classes/${currentUser?.email}`)
        .then((res) => {
          console.log("API Response:", res); // Log the entire response object
          const approved = res.data.filter(cls => cls.status === "approved");
          console.log("Approved courses:", approved); // Log the approved courses
          setApprovedCourses(approved);
        })
        .catch(err => {
          console.error('Error fetching classes:', err);
          setError('Failed to fetch classes. Please try again later.');
        });
    }
  }, [currentUser]);

  return (
    <div>
      <div className="my-9">
        <h1 className="text-4xl font-bold text-center">
          Approved<span className="text-secondary">Courses</span>
        </h1>
        <div>
          <p className="text-[15px] text-center my-2">
            Here you can see all your approved courses
          </p>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : approvedCourses.length === 0 ? (
          <div className="text-center text-2xl font-bold mt-10">
            You have no approved courses
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center">Image</th>
                  <th className="py-2 px-4 border-b text-center">Course Name</th>
                  <th className="py-2 px-4 border-b text-center">Total Students</th>
                  <th className="py-2 px-4 border-b text-center">Total Seats</th>
                  <th className="py-2 px-4 border-b text-center">Instructor Name</th>
                  <th className="py-2 px-4 border-b text-center">Status</th>
                  <th className="py-2 px-4 border-b text-center">Price</th>
                  <th className="py-2 px-4 border-b text-center">Submitted</th>
                  <th className="py-2 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {approvedCourses.map((cls, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b text-center">
                      <img
                        src={cls.image}
                        alt=""
                        className="max-h-[100px] max-w-[150px] mx-auto"
                      />
                    </td>
                    <td className="py-2 px-4 border-b text-center">{cls.name}</td>
                    <td className="py-2 px-4 border-b text-center">{cls.totalEnrolled ? cls.totalEnrolled : 0}</td>
                    <td className="py-2 px-4 border-b text-center">{cls.availableSeats}</td>
                    <td className="py-2 px-4 border-b text-center">{cls.instructorName}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <span className="font-bold text-green-500">
                        {cls.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-center">{cls.price}$</td>
                    <td className="py-2 px-4 border-b text-center">
                      {cls.submitted
                        ? moment(cls.submitted).format("MMMM Do YYYY")
                        : "Not Get Data"}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => navigate(`/dashboard/update-user/${cls._id}`)}
                        className="px-3 bg-blue-700 font-bold py-2 my-3 text-white w-full rounded-lg"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedCourses;
