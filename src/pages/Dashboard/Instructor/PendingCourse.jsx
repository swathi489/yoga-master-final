import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from 'moment';

const PendingCourses = () => {
  const [pendingCourses, setPendingCourses] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser, isLoading } = useUser();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (currentUser) {
      axiosSecure.get(`/classes/${currentUser?.email}`)
        .then((res) => {
          console.log("API Response:", res); // Log the entire response object
          const pending = res.data.filter(cls => cls.status === "pending");
          console.log("Pending courses:", pending); // Log the pending courses
          setPendingCourses(pending);
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
          Pending<span className="text-secondary">Courses</span>
        </h1>
        <div>
          <p className="text-[15px] text-center my-2">
            Here you can see all your pending courses
          </p>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : pendingCourses.length === 0 ? (
          <div className="text-center text-2xl font-bold mt-10">
            You have no pending courses
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Course Name</th>
                  <th className="px-4 py-2">Total Students</th>
                  <th className="px-4 py-2">Total Seats</th>
                  <th className="px-4 py-2">Instructor Name</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {pendingCourses.map((cls, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">
                      <img
                        src={cls.image}
                        alt={cls.name}
                        className="max-h-[100px] max-w-[150px] mx-auto"
                      />
                    </td>
                    <td className="border px-4 py-2">{cls.name}</td>
                    <td className="border px-4 py-2">{cls.totalEnrolled ? cls.totalEnrolled : 0}</td>
                    <td className="border px-4 py-2">{cls.availableSeats}</td>
                    <td className="border px-4 py-2">{cls.instructorName}</td>
                    <td className="border px-4 py-2 font-bold text-orange-400">{cls.status}</td>
                    <td className="border px-4 py-2">{cls.price}$</td>
                    <td className="border px-4 py-2">
                      {cls.submitted
                        ? moment(cls.submitted).format("MMMM Do YYYY")
                        : "Not Get Data"}
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

export default PendingCourses;
