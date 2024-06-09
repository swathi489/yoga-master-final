import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdFileCopy ,MdOutlinePending } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";

const AdminStats = ({users}) => {
    const [data,setData] = useState();
    const axiosSecure = useAxiosSecure();
    useEffect(() =>{
        axiosSecure.get('/admin-stats').then(res =>setData(res.data)).catch(err => console.log(err))
    },[])

    console.log(data)
  return (
    <div>
      <div className='grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8'>
        <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-green-400'>
                <FaUsers className='h-12 w-12 text-white'/>

            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Total Member</h3>
              <p className='text-3xl'>{users.length}</p>
            </div>
        </div>
        <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-blue-500'>
              <MdFileCopy  className='h-12 w-12 text-white' />

            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Approved Class</h3>
              <p className='text-3xl'>{data?.approvedClasses}</p>
            </div>
        </div>
        <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-purple-400'>
              <FaChalkboardTeacher 
  className='h-12 w-12 text-white' />
            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Instructors</h3>
              <p className='text-3xl'>{data?.instructors}</p>
            </div>
        </div>
        <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-red-400'>
              <MdOutlinePending   className='h-12 w-12 text-white' />

            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Pending Class</h3>
              <p className='text-3xl'>{data?.pendingClasses}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStats
