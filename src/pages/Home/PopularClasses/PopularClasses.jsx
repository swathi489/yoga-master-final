import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import Card from '../../Home/PopularClasses/Card';
const PopularClasses = () => {
    const axiosFetch = useAxiosFetch();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axiosFetch.get('/classes');
                // console.log(response.data);
                setClasses(response.data); // Assuming response.data is an array of classes
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []); 
    return (
        <div className='md:w-[80%] mx-auto my-36'>
            <div>
                <h1 className='text-5xl font-bold text-center'>
                    Our <span className='text-secondary'>Popular</span> Classes
                </h1>
                <div className='w-[40%] text-center mx-auto my-4'>
                    <p className='text-grey-500'>
                        Explore our popular classes. Here are some popular classes based on how many students are enrolled.
                    </p>
                </div>
                <div className='grid md:grid-cols-3 ld:grid-cols-3 gap-4'>{
                    
                    classes.slice(0,9).map((item,index) => <Card key={index} item={item}/>)
                }
                </div>
            </div>
        </div>
    );
};

export default PopularClasses;