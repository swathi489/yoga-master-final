import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageApplications = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axiosFetch
      .get("/applied-instructors")
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await axiosSecure.patch(`/change-instructor-status/${id}`, { status: "approved", reason: "Approved by administrator" });

      if (response.status === 200) {
        console.log(response.data);
        alert("Application Approved Successfully!");

        const updatedApplications = applications.map((app) =>
          app._id === id ? { ...app, status: "approved" } : app
        );
        setApplications(updatedApplications);
      } else {
        console.error("Unexpected status code:", response.status);
        alert("Failed to approve application. Please try again.");
      }
    } catch (error) {
      console.error("Error approving application:", error);
      alert("Failed to approve application. Please try again later.");
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
      confirmButtonText: "Yes, Reject it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.patch(`/change-instructor-status/${id}`, { status: "rejected", reason: "Rejected by administrator" });

          if (response.status === 200) {
            Swal.fire("Rejected!", "The application has been rejected.", "success");

            const updatedApplications = applications.map((app) =>
              app._id === id ? { ...app, status: "rejected" } : app
            );
            setApplications(updatedApplications);
          } else {
            console.error("Unexpected status code:", response.status);
            Swal.fire("Failed!", "Failed to reject application. Please try again.", "error");
          }
        } catch (error) {
          console.error("Error rejecting application:", error);
          Swal.fire("Failed!", "Failed to reject application. Please try again later.", "error");
        }
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl text-secondary font-bold text-center my-10">
        Manage<span className="text-black"> Applications</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                NAME
              </th>
              <th scope="col" className="px-6 py-4">
                EMAIL
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
            {applications.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-2xl font-bold">
                  No applications Found
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr
                  key={app._id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-500 dark:hover:bg-neutral-500"
                >
                  <td className="whitespace-pre-wrap px-6 py-4">{app.name}</td>
                  <td className="whitespace-pre-wrap px-6 py-4">{app.email}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`font-bold ${
                        app.status === "pending"
                          ? "bg-orange-400"
                          : app.status === "checking"
                          ? "bg-yellow-500"
                          : app.status === "approved"
                          ? "bg-green-600"
                          : "bg-red-600"
                      } px-2 py-1 uppercase text-white rounded-xl`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(app._id)}
                        className={`text-[12px] py-1 cursor-pointer rounded-md px-2 text-white ${
                          app.status === "approved"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500"
                        }`}
                        disabled={app.status === "approved"}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(app._id)}
                        className="text-sm py-1 rounded-md px-2 text-white bg-yellow-500 hover:bg-red-700"
                      >
                        Deny
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

export default ManageApplications;
