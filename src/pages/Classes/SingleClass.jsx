import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BiTime } from "react-icons/bi";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";

const SingleClass = () => {
  const course = useLoaderData();
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  if (!course) {
    return <div>Loading...</div>; // or any other loading indicator
  }

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
            .get(`/cart-item/${id}/${currentUser.email}`)
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
    <div className="container mt-8 flex flex-col md:flex-row">
      <div className="main-content flex-grow md:w-3/4 w-full">
        <div className="font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto">
          <div className="breadcrumbs bg-primary py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat">
            <div className="container text-center">
              <h2 className="text-2xl text-black">Course Details</h2>
            </div>
          </div>
          <div className="nav-tab-wrapper tabs section-padding mt-8">
            <div className="container">
              <div className="grid grid-cols-12 md:gap-[30px]">
                <div className="lg:col-span-8 col-span-12">
                  <div className="single-course-details">
                    <div className="xl:h-[400px] h-[300px] w-full mb-10 course-main-thumb">
                      <img
                        src={course?.image}
                        alt=""
                        className="rounded-md object-full w-full h-full block"
                      />
                    </div>
                    <h2 className="text-2xl mb-2">{course?.name}</h2>
                    <div className="author-meta mt-6 sm:flex lg:space-x-5 space-y-5 sm:space-y-0 items-center">
                      <div className="flex space-x-4 items-center group">
                        <div className="flex-none h-12 w-12 rounded">
                          <img
                            src={course.image}
                            alt=""
                            className="object-cover w-full h-full rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-secondary">
                            Trainer:{" "}
                            <a href="#" className="text-black">
                              {course?.instructorName}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="text-secondary">
                          Last Update:{" "}
                          <a href="#" className="text-black ml-1">
                            {new Date(course?.submitted).toLocaleDateString()}
                          </a>
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary">
                          Level: {course?.level}
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary">
                          Language: {course?.language}
                        </span>
                      </div>
                    </div>
                    <div className="nav-tab-wrapper mt-12">
                      <div id="tabs-content">
                        <div id="tab1" className="tab-content">
                          <h3 className="text-2xl mt-8">Course description</h3>
                          <p className="mt-4">
                            Discover yoga's transformative power with our
                            comprehensive course. From dynamic asanas to
                            mindfulness practices, unlock your full potential
                            with experienced guidance. Join us and embark on a
                            journey of self-discovery and holistic wellness.
                          </p>
                        </div>
                        <div id="tab2" className="tab-content ">
                          <h3 className="text-2xl mt-8 ">Lesson Plan</h3>
                          <p>
                            Objective: Cultivate mindfulness, strength, and
                            flexibility. Duration: 60 minutes Warm-Up (10 mins):
                            Centering breathwork Sun Salutations Asana Practice
                            (35 mins): Standing Poses Balancing Poses Seated
                            Poses Core Strengthening Cool Down (5 mins): Gentle
                            stretches and twists Breathwork and Meditation (10
                            mins): Alternate nostril breathing (5 mins) Guided
                            meditation (5 mins) Closing (5 mins): Reflect and
                            set intentions Collective 'Om' or closing chant.
                          </p>

                          {/* {course.lessonPlan ? (
                            <>
                              <p className="mt-4">
                                Objective: {course.lessonPlan.objective} Duration: {course.lessonPlan.duration}
                              </p>
                              <ul className="mt-4">
                                {course.lessonPlan.sections.map((section, index) => (
                                  <li key={index}>
                                    {section.title}: {section.duration}
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <p className="mt-4">No lesson plan available.</p>
                          )} */}
                          {/* <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                            <h4 className="text-2xl">
                              This Course is for Beginners
                            </h4>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 col-span-12 mt-8 lg:mt-0">
                  <div className="sidebarWrapper container mt-4 md:mt-0">
                    <div className="widget custom-text space-y-5">
                      <a className="h-[220px] rounded relative block" href="#">
                        <img
                          src={course.image}
                          alt=""
                          className="block w-full h-full object-cover rounded"
                        />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <img src="/play.png" alt="" />
                        </div>
                      </a>
                      <h3 className="text-secondary">${course.price}</h3>
                      <div className="enroll-info">
                        <button
                          onClick={() => handleSelect(course._id)}
                          title={
                            role === "admin" || role === "instructor"
                              ? "Instructor/Admin can not be able to select"
                              : course.availableSeats < 1
                              ? "No Seat Available"
                              : " You can select this classes"
                          }
                          disabled={
                            role === "admin" ||
                            role === "instructor" ||
                            course.availableSeats < 1
                          }
                          className="btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white"
                        >
                          Enroll Now
                        </button>
                      </div>
                      <div className="learn-prerequisite">
                        
                        <ul className="list">
            <li className="flex space-x-3 border-b border-[#F8F8F8] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex items-center">
                <FaUser className="inline=flex" />
                <div className="text-black font-semibold">Instructor</div>
              </div>
              <div className="flex-none">{course.instructorName}</div>
            </li>
            <li className="flex space-x-3 border-b border-[#F8F8F8] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex items-center">
                <MdBookOnline className="inline=flex" />
                <div className="text-black font-semibold">Lectures</div>
              </div>
              <div className="flex-none">23</div>
            </li>
            <li className="flex space-x-3 border-b border-[#F8F8F8] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex items-center">
                <BiTime className="inline=flex" />
                <div className="text-black font-semibold">Duration</div>
              </div>
              <div className="flex-none">2Hr 36Minutes</div>
            </li>
            <li className="flex space-x-3 border-b border-[#F8F8F8] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex items-center">
                <FaUsers className="inline=flex" />
                <div className="text-black font-semibold">Enrolled</div>
              </div>
              <div className="flex-none">{course.totalEnrolled}</div>
            </li>
            <li className="flex space-x-3 border-b border-[#F8F8F8] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex items-center">
                <FaLevelUpAlt className="inline=flex" />
                <div className="text-black font-semibold">Course Level</div>
              </div>
              <div className="flex-none">Intermediate</div>
            </li>
            <li className="flex space-x-3 border-b border-[#F8F8F8] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
              <div className="flex-1 space-x-3 flex items-center">
                <FaLanguage className="inline=flex" />
                <div className="text-black font-semibold">Language</div>
              </div>
              <div className="flex-none">English</div>
            </li>
          </ul>
                      </div>
                      <div className="learn-prerequisite">
                        {/* <h4 className="text-2xl mt-6">This Course Include</h4>
                        <ul className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                          <li className="flex space-x-3">
                            <div className="relative top-1 flex-none ">
                              <BiTime size={25} />
                            </div>
                            <div className="flex-1">5 Hours Videos</div>
                          </li>
                          <li className="flex space-x-3">
                            <div className="relative top-1 flex-none ">
                              <MdBookOnline size={25} />
                            </div>
                            <div className="flex-1">15 Articles</div>
                          </li>
                          <li className="flex space-x-3">
                            <div className="relative top-1 flex-none ">
                              <FaUsers size={25} />
                            </div>
                            <div className="flex-1">
                              10 Downloadable Resources
                            </div>
                          </li>
                          <li className="flex space-x-3">
                            <div className="relative top-1 flex-none ">
                              <FaUser size={25} />
                            </div>
                            <div className="flex-1">12 Live Classes</div>
                          </li>
                          <li className="flex space-x-3">
                            <div className="relative top-1 flex-none ">
                              <FaLevelUpAlt size={25} />
                            </div>
                            <div className="flex-1">2 Level Up Challenges</div>
                          </li>
                          <li className="flex space-x-3">
                            <div className="relative top-1 flex-none ">
                              <FaLanguage size={25} />
                            </div>
                            <div className="flex-1">
                              Languages: {course?.language}
                            </div>
                          </li>
                        </ul> */}
                        <h4 className="text-2xl mt-6">What will you learn?</h4>
                        <ul className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                          <li className="flex space-x-3">
                            <div className="relative top-1 flex-none ">
                              <img src="/correct-mark.png" alt="" />
                            </div>
                            <div className="flex-1">
                              Techniques to enhance physical strength and flexibility.

                            </div>
                          </li>
                          <li className="flex space-x-3">
                            <div className="relative top-1 flex-none ">
                              <img src="/correct-mark.png" alt="" />
                            </div>
                            <div className="flex-1">
                              Mindfulness and meditation practices for mental clarity.

                            </div>
                          </li>
                          <li className="flex space-x-3">
                            <div className="relative top-1 flex-none ">
                              <img src="/correct-mark.png" alt="" />
                            </div>
                            <div className="flex-1">
                              Breathing exercises to improve respiratory health.

                            </div>
                          </li>
                          <li className="flex space-x-3">
                            <div className="relative top-1 flex-none ">
                              <img src="/correct-mark.png" alt="" />
                            </div>
                            <div className="flex-1">
                              Alignment and posture corrections to prevent injuries.
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="widget widget-banner mt-8">
                      <img src="/promotion.png" alt="" className="w-full" />
                      {/* <div className="promo-text">
                        <h4 className="text-2xl">Special Offer!</h4>
                      </div> */}
                    </div>
                    {/* <div className="widget widget-newsletter mt-8">
                      <h4 className="text-2xl">Subscribe to Newsletter</h4>
                      <form className="mt-4">
                        <input
                          type="email"
                          className="form-input"
                          placeholder="Enter your email"
                        />
                        <button type="submit" className="btn btn-primary w-full mt-4">
                          Subscribe
                        </button>
                      </form>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container text-center my-12">
            <button className="border bg-secondary py-2 px-6 w-full  text-white">
              <a href="/classes" className="btn btn-primary ">
                Back to Courses
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClass;
