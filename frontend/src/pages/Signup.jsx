import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData((prevFormData) => ({
            ...prevFormData, 
            [name]: value, 
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/users/signup', formData);
            if (res.status === 200) {
                toast.info(res?.data?.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-24 mx-auto lg:py-32">
                    <div className="lg:flex">
                        <div className="lg:w-1/2">
                            <h1 className="mt-4 text-gray-600 font-medium dark:text-gray-300 md:text-lg">Welcome!</h1>
                            <h1 className="mt-4 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                                Create your new account
                            </h1>
                            <p>
                                Already have an account? <Link to="/" className="text-blue-600">Signin</Link>
                            </p>
                        </div>

                        <div className="mt-8 lg:w-1/2 lg:mt-0">
                            <form
                                onSubmit={handleSubmit}
                                className="w-full lg:max-w-xl"
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        name='name'
                                        value={formData?.name}
                                        onChange={handleChange}
                                        placeholder="Enter your fullname"
                                        className="block w-full py-3 pl-11 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:ring focus:ring-opacity-40 focus:border-blue-400 dark:focus:border-blue-300"
                                    />
                                </div>

                                <div className="relative flex items-center mt-4">
                                    <input
                                        type="email"
                                        name='email'
                                        value={formData?.email}
                                        onChange={handleChange}
                                        placeholder="Email address"
                                        className="block w-full py-3 pl-11 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:ring focus:ring-opacity-40 focus:border-blue-400 dark:focus:border-blue-300"
                                    />
                                </div>

                                <div className="relative flex items-center mt-4">
                                    <input
                                        type="password"
                                        name='password'
                                        value={formData?.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="block w-full py-3 pl-11 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:ring focus:ring-opacity-40 focus:border-blue-400 dark:focus:border-blue-300"
                                    />
                                </div>

                                <div className="mt-8 md:flex md:items-center">
                                    <button
                                        type="submit"
                                        className="w-full cursor-pointer px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default Signup;
