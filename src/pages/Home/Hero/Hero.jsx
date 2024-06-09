import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from '../../../assets/home/banner-3.jpg';
import useUser from '../../../hooks/useUser';

const Hero = () => {
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const email = currentUser?.email;

    const handleJoinToday = () => {
        navigate('/register'); // Navigate to the register page
    };

    const handleViewCourse = () => {
        if (email) {
            navigate('/classes'); // Navigate to the classes page
        } else {
            console.log("No user is logged in or email is missing.");
        }
    };

    return (
        <div className='min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60">
                <div>
                    <div className='space-y-4 mx-9'>
                        <p className='md:text-4xl text-2xl'>
                            We Provide 
                        </p>
                        <h1 className='md:text-7xl text-4xl font-bold'>
                            Best Yoga Course Online     
                        </h1>
                        <div className='md:w-1/2'>
                            <p className='text-white'>
                                Discover tranquility and strength within with our comprehensive online yoga course, blending ancient wisdom with modern accessibility, guiding you towards holistic well-being and inner balance.
                            </p>
                        </div>
                        <div className='flex flex-wrap items-center gap-5'>
                            <button onClick={handleJoinToday} className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join today</button>
                            <button onClick={handleViewCourse} className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase'>View Course</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
