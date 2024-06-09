import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUser from '../../../../hooks/useUser';
import { Link } from 'react-router-dom';

const EnrolledClasses = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();

  useEffect(() => {
    if (currentUser && currentUser.email) {
      axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
        .then(res => {
          setData(res.data);
        })
        .catch(err => console.error(err));
    }
  }, [currentUser, axiosSecure]);

  return (
    <div>
      <h1 className='text-2xl my-6'>Enrolled Classes</h1>
      {data.length === 0 ? (
        <p className='text-center text-gray-500'>No enrolled classes.</p>
      ) : (
        <div className='grid md:grid-cols-4 gap-6 px-3'>
          {data.map((item, index) => (
            <div key={index} className='bg-white shadow-md rounded-2xl overflow-hidden'>
              <img className='h-52 w-full object-cover' src={item.classes.image} alt="" />
              <div className='p-4 flex flex-col justify-between'>
                <div>
                  <h2 className='text-lg font-semibold mb-2'>{item.classes.name}</h2>
                  <p className='text-gray-600'>Instructor: {item.classes.instructorName}</p>
                </div>
                <div className='flex gap-2'>
                  <h2 className='text-lg text-blue-500 font-bold mb-2'>${item.classes.price}</h2>
                  <Link to={`/dashboardher/course-details`}>
                    <button className='bg-secondary shadow-md mr-5 text-white py-1 px-3 font-bold rounded-2xl self-end'>
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledClasses;
