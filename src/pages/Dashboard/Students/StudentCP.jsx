import React from 'react'
import useUser from '../../../hooks/useUser'
import WelcomeImg from "../../../assets/dashboard/urban-welcome.svg"
import { Link } from 'react-router-dom';
const StudentCP = () => {
  const {currentUser} = useUser();
 
  return (
    <div >
      <div className='h-screen flex justify-center items-center p-3'>
        <div >
          <div>
<img
            onContextMenu={e => e.preventDefault()}
            src={WelcomeImg}
            alt=""
            className="h-[300px] mx-auto"
          />          </div>
          <h1 className='text-4xl capitalize font-bold'>Hi,<span className='text-secondary items-stretch'>{
          currentUser?.name}!</span> Welcome to you Dashboard</h1>
          <p className='text-center text-base py-2 '>Yoga classes for your bright future</p>
          <div>
            <h2 className='font-bold text-center'>you can jump to page you want from here.</h2>
            <div className='flex items-center justify-center my-4 gap-3 flex-wrap'>
                <div className='border border-secondary rounded-lg hover:bg-secondary
                 hover:text-whiteduration-200 px-2 py-1'>
                  <Link to="/dashboard/enrolled-class">My Enroll</Link>
                </div>
                <div className='border border-secondary rounded-lg hover:bg-secondary
                 hover:text-whiteduration-200 px-2 py-1'>
                  <Link to="/dashboard/my-selected">My Selected</Link>
                </div>
                <div className='border border-secondary rounded-lg hover:bg-secondary
                 hover:text-whiteduration-200 px-2 py-1'>
                  <Link to="/dashboard/my-payments">Payment History</Link>
                </div>
                <div className='border border-secondary rounded-lg hover:bg-secondary
                 hover:text-whiteduration-200 px-2 py-1'>
                  <Link to="/dashboard/apply-instructor">Join as a instructor</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentCP
