import React, { useEffect, useState } from "react";
import useUser from "../../../../hooks/useUser";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { FiBriefcase, FiMail, FiSend, FiUser } from "react-icons/fi";

const AsInstructor = () => {
  const { currentUser } = useUser();
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch
      .get(`/applied-instructors/${currentUser?.email}`)
      .then((res) => {
        console.log(res.data); // corrected 'data' to 'res.data'
        setSubmittedData(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err)); // corrected 'err'
  }, [currentUser?.email]); // Added currentUser?.email to the dependency array

  const onSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    console.log(name,email)
    const experience = event.target.experience.value;
    console.log(experience);
    const data = {
      name,email,experience
    }
    axiosFetch.post(`/as-instructor`,data).then((res)=>{
      console.log(res.data);
      alert("Successfully Applied")
    })
  };

  return (
    <div>
      <div>
        {!submittedData?.name && (
          <div>
            <div className="md:w-1/2">
              <form onSubmit={onSubmit}>
                <div className="flex w-full">
                  <div className="mb-4 w-full">
                    <label htmlFor="name" className="text-gray-500">
                      Name
                    </label>
                    <div className="flex items-center mt-1">
                      <FiUser className="text-gray-500" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={currentUser?.name}
                        disabled
                        readOnly
                        className="ml-2 w-full border-b
                    border-gray-300 focus:border-secondary outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <label htmlFor="email" className="text-gray-500">
                      Email
                    </label>
                    <div className="flex items-center mt-1">
                      <FiMail className="text-gray-500" />
                      <input
                        type="text"
                        id="email"
                        name="email"
                        defaultValue={currentUser?.email}
                        disabled
                        readOnly
                        className="ml-2 w-full border-b
                    border-gray-300 focus:border-secondary outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label htmlFor="experience" className="text-gray-500">
                    Experience
                  </label>
                  <div className="flex items-center mt-1">
                    <FiBriefcase className="text-gray-500" />
                    <textarea
                      placeholder="Tell us about your Experience"
                      type="text"
                      id="experience"
                      name="experience"
                      className="ml-2 rounded-lg px-2 placeholder:text-sm py-1
                     w-full border border-gray-300 focus:border-secondary outline-none resize-none"
                    />
                  </div>
                </div>
                <div className="text-center flex justify-center">
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-secondary text-white
                     rounded-md focus:outline-none"
                  >
                    <FiSend className="mr-2" />
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsInstructor;
