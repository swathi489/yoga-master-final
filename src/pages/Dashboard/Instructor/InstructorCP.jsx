import React from 'react';
import bgImg from "../../../assets/dashboard/jaconda-14.png";
import useUser from '../../../hooks/useUser';
import { Link } from 'react-router-dom';

const InstructorCP = () => {
  const { currentUser } = useUser();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <div>
          <img
            onContextMenu={e => e.preventDefault()}
            src={bgImg}
            alt=""
            className="h-[300px] mx-auto"
          />
        </div>
        <h1 className="text-4xl capitalize font-bold">
          Hi,<span className="text-secondary">{currentUser?.name}!</span> Welcome to Instructor Dashboard
        </h1>
        <p className="text-base py-2">Yoga classes for your bright future</p>
        <div>
          <h2 className="font-bold">You can jump to the page you want from here.</h2>
          <div className="flex items-center justify-center my-4 gap-3 flex-wrap">
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
              <Link to="/dashboard/add-class">Add a Classes</Link>
            </div>
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
              <Link to="/dashboard/my-classes">My Classes</Link>
            </div>
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
              <Link to="/dashboard/my-pending">Pending Courses</Link>
            </div>
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
              <Link to="/dashboard/my-approved">Approved Classes</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCP;
