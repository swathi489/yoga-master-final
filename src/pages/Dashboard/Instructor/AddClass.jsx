import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { HashLoader } from "react-spinners";

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import getDownloadURL

import { storage } from '../../../config/firebase.init'; // Import storage

const AddClass = () => {
  const API_URL = "";
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newData = Object.fromEntries(formData.entries());

  if (image) {
    const storageRef = ref(storage, 'images/' + image.name); // Specify the path where you want to store the image
    await uploadBytes(storageRef, image); // Upload the image to Firebase Storage
    newData.image = await getDownloadURL(storageRef); // Get the download URL of the uploaded image
  }

  // newData.instructorName = currentUser?.displayName || '';
  newData.instructorEmail = currentUser?.email || '';
  newData.instructorName = currentUser?.name || '';
  newData.status = 'pending';
  newData.submitted = new Date();
  newData.totalEnrolled = 0;

    // Post data to your API
    axiosSecure
      .post("/new-class", newData)
      .then((res) => {
        alert("Successfully added class");
        console.log("Response data:", res.data); // Log response data
        console.log("New class added:", newData); // Log the new class data
      })
      .catch((error) => {
        console.error("Error adding class:", error); // Log error if any
      });
    
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    );
  }
}

    return (
        <div>
            <div className="my-10">
                <h1 className="text-center text-3xl font-bold">Add Your Course Here</h1>
            </div>
            <form onSubmit={handleFormSubmit} className="mx-auto p-6 bg-white rounded shadow">
                <div className="grid grid-cols-2 w-full gap-3 items-center">
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-grey-700 font-bold mb-2">Course Name</label>
                        <input type="text" required placeholder="Course Name" name="name" id="name" className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="image" className="block text-grey-700 font-bold mb-2">Thumbnail Photo</label>
                        <input type="file" name="image" id="image" required onChange={handleImageChange} className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4" />
                    </div>
                </div>
                <div className="grid grid-cols-2 w-full gap-3 items-center">
                    <div className="mb-6">
                        <label htmlFor="instructorName" className="block text-grey-700 font-bold mb-2">Instructor Name</label>
                        <input type="text" required placeholder="Instructor Name" name="instructorName" id="instructorName" value={currentUser.name} readOnly className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="instructorEmail" className="block text-grey-700 font-bold mb-2">Instructor Email</label>
                        <input type="email" required placeholder="Instructor Email" name="instructorEmail" id="instructorEmail" value={currentUser.email} readOnly className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500" />
                    </div>
                </div>
                <div className="grid grid-cols-2 w-full gap-3 items-center">
                    <div className="mb-6">
                        <label htmlFor="availableSeats" className="block text-grey-700 font-bold mb-2">Available Seats</label>
                        <input type="number" required placeholder="How many seats are available?" name="availableSeats" id="availableSeats" className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="price" className="block text-grey-700 font-bold mb-2">Price</label>
                        <input type="number" required placeholder="Course Price" name="price" id="price" className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500" />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="videolink" className="block text-grey-700 font-bold mb-2">YouTube Link</label>
                    <p className="text-[16px] my-2 mt-2 text-xl">Only YouTube videos are supported</p>
                    <input type="url" required placeholder="YouTube video Link" name="videolink" id="videolink" className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block text-grey-700 font-bold mb-2">Description about your course</label>
                    <textarea required placeholder="Description about your course" name="description" id="description" className="resize-none border w-full p-2 rounded-lg border-secondary outline-none" />
                </div>
                <div>
                    <button className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded">Add New Course</button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;
