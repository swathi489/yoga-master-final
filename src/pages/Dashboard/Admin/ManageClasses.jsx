import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axiosFetch
      .get("/classes-manage")
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await axiosSecure.patch(`/change-status/${id}`, { status: "approved", reason: "Approved by administrator" });

      if (response.status === 200) {
        console.log(response.data);
        alert("Class Approved Successfully!");

        const updatedClasses = classes.map((cls) =>
          cls._id === id ? { ...cls, status: "approved" } : cls
        );
        setClasses(updatedClasses);
      } else {
        console.error("Unexpected status code:", response.status);
        alert("Failed to approve class. Please try again.");
      }
    } catch (error) {
      console.error("Error approving class:", error);
      alert("Failed to approve class. Please try again later.");
    }
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unpublish it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.patch(`/change-status/${id}`, { status: "rejected", reason: "Rejected by administrator" });

          if (response.status === 200) {
            Swal.fire("Unpublished!", "Your course is unpublished.", "success");

            const updatedClasses = classes.map((cls) =>
              cls._id === id ? { ...cls, status: "rejected" } : cls
            );
            setClasses(updatedClasses);
          } else {
            console.error("Unexpected status code:", response.status);
            Swal.fire("Failed!", "Failed to unpublish class. Please try again.", "error");
          }
        } catch (error) {
          console.error("Error rejecting class:", error);
          Swal.fire("Failed!", "Failed to unpublish class. Please try again later.", "error");
        }
      }
    });
  };

  const handleFeedback = (classId) => {
    // Handle feedback logic here
  };

  return (
    <div>
      <h1 className="text-4xl text-secondary font-bold text-center my-10">
        Manage<span className="text-black"> Classes</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                PHOTO
              </th>
              <th scope="col" className="px-6 py-4">
                COURSE NAME
              </th>
              <th scope="col" className="px-6 py-4">
                STATUS
              </th>
              <th scope="col" className="px-6 py-4">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-2xl font-bold">
                  No classes Found
                </td>
              </tr>
            ) : (
              classes.map((cls) => (
                <tr
                  key={cls._id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-500 dark:hover:bg-neutral-500"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <img
                      src={cls.image}
                      className="h-[35px] w-[35px]"
                      alt=""
                    />
                  </td>
                  <td className="whitespace-pre-wrap px-6 py-4">{cls.name}</td>
                  {/* <td className="whitespace-pre-wrap px-6 py-4">
                    {cls.InstructorName}
                  </td> */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`font-bold ${
                        cls.status === "pending"
                          ? "bg-orange-400"
                          : cls.status === "checking"
                          ? "bg-yellow-500"
                          : cls.status === "approved"
                          ? "bg-green-600"
                          : "bg-red-600"
                      } px-2 py-1 uppercase text-white rounded-xl`}
                    >
                      {cls.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(cls._id)}
                        className={`text-[12px] py-1 cursor-pointer rounded-md px-2 text-white ${
                          cls.status === "approved"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500"
                        }`}
                        disabled={cls.status === "approved"}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(cls._id)}
                        className="text-sm py-1 rounded-md px-2 text-white bg-yellow-500 hover:bg-red-700"
                      >
                        Deny
                      </button>
                      <button
                        onClick={() => handleFeedback(cls._id)}
                        className={`text-sm py-1 rounded-md px-2 text-white ${
                          cls.status === "approved" || cls.status === "rejected"
                            ? "bg-red-600 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                        disabled={cls.status === "approved" || cls.status === "rejected"}
                      >
                        Feedback
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
