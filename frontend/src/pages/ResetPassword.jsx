import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { OTP } = useParams(); 

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/users/reset-password/${OTP}`, formData);
            console.log("Response", response)
            if (response.status === 200) {
                toast.success(response.data.message );
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message );
        }
    };

    return (
        <>
            <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center">
                <div className="container px-6 mx-auto">
                    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
                        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Reset Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="New Password"
                                    required
                                    className="w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm New Password"
                                    required
                                    className="w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                            >
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default ResetPassword;
