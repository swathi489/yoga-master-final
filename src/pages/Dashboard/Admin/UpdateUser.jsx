import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateUser = () => {
    const { user } = useAuth();
    const userCredentials = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedUser = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            skills: formData.get('skills'),
            address: formData.get('address'),
            photoUrl: formData.get('photoUrl'),
            role: formData.get('option'),
            about: formData.get('about'),
        };

        try {
            const response = await axiosSecure.put(`/update-user/${userCredentials._id}`, updatedUser);
            if (response.status === 200) {
                Swal.fire('Success', 'User updated successfully', 'success');
            } else {
                Swal.fire('Error', 'Failed to update user', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'An error occurred while updating the user', 'error');
        }
    };

    console.log(userCredentials);

    return (
        <div>
            <h1 className='text-center text-4xl font-bold mt-5'>
                Update : <span className='text-secondary'>{user?.displayName}</span>
            </h1>
            <p className='text-center'>
                Change details about<span className='text-red-400 font-bold'>{user?.displayName}</span>
            </p>
            <section className=''>
                <div className='mx-auto px-4 py-16 sm:px-6 lg:px-8'>
                    <div className='rounded-lg bg-white p-8 shadow-lg lg:p-12'>
                        <form className='space-y-4' onSubmit={handleFormSubmit}>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor="name" className='ml-2 pb-4'>Name</label>
                                    <input
                                        type="text"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Your Name'
                                        required
                                        defaultValue={userCredentials?.name || ""}
                                        id='name'
                                        name='name'
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className='ml-2 '>Phone</label>
                                    <input
                                        type="tel"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Phone Number'
                                        required
                                        defaultValue={userCredentials?.phone || ""}
                                        id='phone'
                                        name='phone'
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor="email" className='ml-2 '>Email</label>
                                    <p className='text-[12px] ml-2 text-red-400'>Update Email is not recommended. Please leave it default</p>
                                    <input
                                        type="email"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Email'
                                        required
                                        defaultValue={userCredentials?.email}
                                        name='email'
                                    />
                                </div>
                                <div>
                                    <label htmlFor="skills" className='ml-2 pb-4'>Skills</label>
                                    <p className='text-[12px] ml-2 text-red-400'>If the user is an instructor, then set skills; otherwise, leave it empty</p>
                                    <input
                                        type="text"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Skills'
                                        defaultValue={userCredentials?.skills || ""}
                                        name='skills'
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor="address" className='ml-2 '>Address</label>
                                    <input
                                        type="text"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Address'
                                        required
                                        defaultValue={userCredentials?.address}
                                        name='address'
                                    />
                                </div>
                                <div>
                                    <label htmlFor="photoUrl" className='ml-2 pb-4'>Photo Url</label>
                                    <input
                                        type="text"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Photo Url'
                                        required
                                        defaultValue={userCredentials?.photoUrl}
                                        name='photoUrl'
                                    />
                                </div>
                            </div>
                            <h1>Please select a role</h1>
                            <div className='grid grid-cols-1 gap-3 text-center sm:grid-cols-3'>
                                <div>
                                    <input
                                        type="radio"
                                        className='peer sr-only'
                                        id="option1"
                                        value="user"
                                        defaultChecked={userCredentials?.role === 'user'}
                                        tabIndex="-1"
                                        name="option"
                                    />
                                    <label htmlFor="option1" className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white' tabIndex="0">
                                        <span className='text-sm font-medium'>User</span>
                                    </label>
                                </div>
                            
                                <div>
                                    <input
                                        type="radio"
                                        className='peer sr-only'
                                        id="option2"
                                        value="admin"
                                        defaultChecked={userCredentials?.role === 'admin'}
                                        tabIndex="-1"
                                        name="option"
                                    />
                                    <label htmlFor="option2" className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white' tabIndex="0">
                                        <span className='text-sm font-medium'>Admin</span>
                                    </label>
                                </div>
                            
                                <div>
                                    <input
                                        type="radio"
                                        className='peer sr-only'
                                        id="option3"
                                        value="instructor"
                                        defaultChecked={userCredentials?.role === 'instructor'}
                                        tabIndex="-1"
                                        name="option"
                                    />
                                    <label htmlFor="option3" className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white' tabIndex="0">
                                        <span className='text-sm font-medium'>Instructor</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="about" className='sr-only'>About</label>
                                <textarea
                                    className='w-full resize-none rounded-lg border-secondary border outline-none p-3 text-sm'
                                    placeholder='About User'
                                    rows="4"
                                    defaultValue={userCredentials?.about || ""}
                                    name='about'
                                    id="about"
                                ></textarea>
                            </div>
                            <div className='mt-4'>
                                <button type='submit' className='inline-block w-full rounded-lg bg-secondary px-5 py-3 font-medium text-white sm:w-auto'>
                                    Update User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateUser;
