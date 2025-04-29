import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
    const user = useSelector(state => state?.auth?.user);
    const navigate = useNavigate();

    useEffect(() => {
        const passwordExpiry = sessionStorage.getItem("passwordExpiry");
        const now = Date.now();

        if (passwordExpiry && now >= passwordExpiry) {
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("passwordExpiry");
            
            toast.success("Your password has expired. Please sign in again.")
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("passwordExpiry");
        navigate('/');
    };

    return (
        <div className="flex flex-col justify-center sm:h-screen p-4">
            <div className="max-w-2xl w-full mx-auto border border-slate-300 rounded-2xl p-8">
                <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 text-slate-600 cursor-pointer px-4 py-2 rounded-full"
                >
                    Logout
                </button>

                <div className="text-center">
                    <h1 className="mt-4 text-4xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Hi! Welcome back </h1>
                </div>

                <div className="mt-20">
                    <div>
                        <span className='text-slate-600 text-xl font-bold mt-6'>General Information</span>
                        <div className='mt-5'>
                            <div className='mb-4'>
                                <label className="text-slate-800 text-sm font-medium mb-2 block">Name</label>
                                <input type="text" value={user?.name} className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" readOnly />
                            </div>
                            <div className='mb-4'>
                                <label className="text-slate-800 text-sm font-medium mb-2 block">Email</label>
                                <input type="text" value={user?.email} className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" readOnly />
                            </div>
                            <div className="flex justify-end mt-2">
                                <Link to="/email-verify" className="text-sm text-blue-600 hover:underline">
                                    Change Password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
