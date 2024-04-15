import React, { useEffect, useState } from "react";

import img1 from "../Images/Doctors/doctor2.jpeg"
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'
import { useAsyncValue, useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { handleUnAuthorized } from '../hook/handleUnauthorized';
import axios from "axios";




const notifications = [
    { id: 1, text: "$2400, Plan1 sale", time: "22 DEC 7:20 PM" },
    { id: 2, text: "$2400, Plan2 sale", time: "25 DEC 7:20 PM" },
    { id: 3, text: "User signup request", time: "26 DEC 7:20 PM" },
    // Add more notification objects as needed
];

export default function Dashboard() {
    const [user, setUser] = useState({});
    const [donation, setDonation] = useState({});
    const navigate = useNavigate();

    const getProfile = async () => {
        const token = localStorage.getItem('token') || ''
        if (token) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-profile`, { headers: { Authorization: token } });
            if (data.data.success) {
                setUser(data?.data?.data?.user)
                setDonation(data?.data?.data?.studentDonation)

            } else {
                handleUnAuthorized(data.data.msg, navigate)
            }
        } else {
            navigate('/login')
        }
    }
    useEffect(() => {
        getProfile()
    }, [])
    return (
        <>
            {/* <div class="relative py-3">
                <div class="px-3 md:px-3 mx-auto w-full">
                    <div>
                        <div class="flex flex-wrap md:gap-y-4" >
                            <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                                <div class="py-2 relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                    <div class="flex-auto p-4">
                                        <div class="flex flex-wrap">
                                            <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 class="text-blueGray-400 uppercase  text-xs">Material</h5>
                                                <span class=" text-xl">3,508</span>
                                            </div>
                                            <div class="relative w-auto pl-4 flex-initial">
                                                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"><i class="fas fa-book"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                                <div class="py-2 relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                    <div class="flex-auto p-4">
                                        <div class="flex flex-wrap">
                                            <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 class="text-blueGray-400 uppercase  text-xs">Pending</h5>
                                                <span class=" text-xl">235</span>
                                            </div>
                                            <div class="relative w-auto pl-4 flex-initial">
                                                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#452a72]"><i class="fa-solid fa-clock"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                                <div class="py-2 relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                    <div class="flex-auto p-4">
                                        <div class="flex flex-wrap">
                                            <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 class="text-blueGray-400 uppercase  text-xs">Rejected</h5>
                                                <span class=" text-xl">92</span>
                                            </div>
                                            <div class="relative w-auto pl-4 flex-initial">
                                                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500"><i class="fa-solid fa-xmark"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                                <div class="py-2 relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                                    <div class="flex-auto p-4">
                                        <div class="flex flex-wrap">
                                            <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 class="text-blueGray-400 uppercase  text-xs">Live</h5>
                                                <span class=" text-xl">234</span>
                                            </div>
                                            <div class="relative w-auto pl-4 flex-initial">
                                                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#293770]"><i class="fa-solid fa-book"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div> */}

            <div className="mb-4 px-1 md:px-5 my-3 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                    <div className="flex flex-col items-center p-5">
                        <div className="h-40 w-40 rounded-full mb-3">
                            <img className="h-full w-full object-cover rounded-full shadow" src={user?.image ? user.image : "https://tuk-cdn.s3.amazonaws.com/assets/components/sidebar_layout/sl_1.png"} />
                        </div>
                        <p className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">{user?.name}</p>
                        <p className="mb-6 text-sm text-gray-700 dark:text-gray-400">{user.email}</p>

                        {/* <div className="flex justify-start flex-wrap pt-5 gap-4 socials px-3">

                            <div className="relative overflow-hidden block footer-div cursor-pointer">
                                <span className="block"><a target="_blank" href="https://www.linkedin.com/in/buff-goofy-164bb027a">
                                    <FaLinkedinIn className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
                                </a></span>
                            </div>
                            <div className="relative overflow-hidden block footer-div cursor-pointer">
                                <span className="block"><a target="_blank" href="mailto:contact@buffgoofy.com">
                                    <i className="social-links fa-solid fa-envelope text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                </a></span>
                            </div>
                            <div className=" relative overflow-hidden block footer-div cursor-pointer">
                                <span className="block"><a target="_blank" href="https://www.facebook.com/profile.php?id=100093479117440">
                                    <i className=" social-links fa-brands fa-facebook text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                </a></span>
                            </div>
                            <div className="relative overflow-hidden block footer-div cursor-pointer">
                                <span className="block">
                                    <a target="_blank" href="https://www.instagram.com/buff.goofy/">
                                        <i className="social-links fa-brands fa-instagram text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                    </a></span>

                            </div>
                            <div className="relative overflow-hidden block footer-div cursor-pointer">
                                <span className="block">
                                    <a target="_blank" href="http://discordapp.com/users/1118422230804725760">
                                        <i className="social-links fa-brands fa-discord text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                    </a></span>

                            </div>
                            <div className="relative overflow-hidden block footer-div cursor-pointer">
                                <span className="block">
                                    <a target="_blank" href="https://www.reddit.com/user/Buff_Goofy/">
                                        <i className="social-links fa-brands fa-reddit text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
                                    </a></span>

                            </div>
                            <div className="relative overflow-hidden block footer-div cursor-pointer">
                                <span className="block"><a target="_blank" href="https://twitter.com/findoutsoon">
                                    <FiTwitter className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
                                </a></span>
                            </div>

                        </div> */}
                    </div>


                </div>

            </div>
            <div className="mb-4 px-1 md:px-5 my-3 grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* <div className="grid grid-cols-1 relative flex flex-col bg-clip-border rounded-xl  text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                    

                </div> */}
                {user.type === 'student' && <>
                    <div className="grid grid-cols-1 flex flex-col items-center p-5 bg-white h-[120px] w-[200px] bg-clip-border">
                        <div className="w-40 rounded-full text-center">
                            <span>ScholarShip Receive:</span>
                        </div>
                        <p className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100 text-center">{donation?.amount || 0}</p>
                        {/* <p className="mb-6 text-sm text-gray-700 dark:text-gray-400">{user.email}</p> */}
                    </div>
                    <div className="grid grid-cols-1 flex flex-col items-center p-5 bg-white h-[120px] w-[200px] bg-clip-border">
                        <div className="w-40 rounded-full text-center">
                            <span>Account Verified:</span>
                        </div>
                        <p className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100 text-center">{user?.scholarshipStatus || 0}</p>
                        {/* <p className="mb-6 text-sm text-gray-700 dark:text-gray-400">{user.email}</p> */}
                    </div>
                </>}


            </div>
            <ToastContainer />
        </>
    );
}
