import React, { useState } from "react";
import img1 from "../../Images/Doctors/doctor2.jpeg"
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { useNavigate } from "react-router";

function PaidSingleUser() {
    const navigate = useNavigate()
    const [open2, setOpen2] = useState(false)
    return (
        <>


            <div className="px-1 lg:px-6 py-5">
                <div className="bg-white dark:bg-gray-800 shadow rounded xl:flex lg:flex w-full px-3">
                    <div className="xl:w-2/5 lg:w-2/5 bg-gray-100 dark:bg-gray-800 py-8 border-gray-300 dark:border-gray-200 xl:border-r rounded-tl xl:rounded-bl rounded-tr xl:rounded-tr-none lg:border-r-2 border-b xl:border-b-0 flex justify-center items-center">
                        <div className="flex flex-col items-center">
                            <div className=" w-24 rounded-full mb-3">
                                <img className="h-full w-full object-cover rounded-full shadow" src={img1} />
                            </div>
                            <p className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">Shane Doe</p>
                            <p className="mb-6 text-sm text-gray-700 dark:text-gray-400">guptah605@gmail.com</p>

                            <div className="flex justify-start flex-wrap pt-5 gap-4 socials px-3">

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

                            </div>
                        </div>
                    </div>
                    <div className="xl:w-3/5 lg:w-3/5 px-6 py-8">
                        <div className="flex flex-wrap justify-between">
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Birthday</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">29 Jan, 1982</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Gender</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">Female</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Designation</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">Senior Heart Specialist</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Certificate</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">ABPS</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Current Plan</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">Pro Plan</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Total paid</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">400$</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Location</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">Jaipur, Raj, USA</p>
                                </div>
                            </div>
                            <div className="w-2/5 mb-8">
                                <div className="border-b pb-3">
                                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400 font-medium">Phone Number</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">202-555-0191</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className="px-1 lg:px-6 py-5">
                <div className="bg-white dark:bg-gray-800 shadow rounded w-full ">
                    <div className="border rounded-lg border pb-6 border-gray-200 ">
                        <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
                            <p className="text-sm lg:text-xl font-semibold leading-tight text-[#452a72]">All Bought Plans</p>

                        </div>
                        <div className="px-6 pt-6 overflow-x-auto ">
                            <table className="w-full whitespace-nowrap">
                                <tbody  className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 pt-6 gap-8">
                                    <>
                                        <tr className="flex items-center">
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="bg-gray-100 rounded-sm p-2.5">
                                                        <img src="https://cdn.tuk.dev/assets/templates/olympus/projects.png" alt="" />
                                                    </div>
                                                    <div className="pl-3">
                                                        <div className="flex items-center text-sm leading-none">
                                                            <p className="font-semibold text-gray-800">Apple MacBook Pro 2020</p>
                                                            <p className="text-[#452a72] ml-3">(ID 879-10-940)</p>
                                                        </div>
                                                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">23/01/2023</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-16">
                                                <div>
                                                    <p className="text-sm font-semibold leading-none text-right text-gray-800">$2200</p>

                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="flex items-center">
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="bg-gray-100 rounded-sm p-2.5">
                                                        <img src="https://cdn.tuk.dev/assets/templates/olympus/projects.png" alt="" />
                                                    </div>
                                                    <div className="pl-3">
                                                        <div className="flex items-center text-sm leading-none">
                                                            <p className="font-semibold text-gray-800">Apple MacBook Pro 2020</p>
                                                            <p className="text-[#452a72] ml-3">(ID 879-10-940)</p>
                                                        </div>
                                                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">23/01/2023</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-16">
                                                <div>
                                                    <p className="text-sm font-semibold leading-none text-right text-gray-800">$2200</p>

                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="flex items-center">
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="bg-gray-100 rounded-sm p-2.5">
                                                        <img src="https://cdn.tuk.dev/assets/templates/olympus/projects.png" alt="" />
                                                    </div>
                                                    <div className="pl-3">
                                                        <div className="flex items-center text-sm leading-none">
                                                            <p className="font-semibold text-gray-800">Apple MacBook Pro 2020</p>
                                                            <p className="text-[#452a72] ml-3">(ID 879-10-940)</p>
                                                        </div>
                                                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">23/01/2023</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-16">
                                                <div>
                                                    <p className="text-sm font-semibold leading-none text-right text-gray-800">$2200</p>

                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="flex items-center">
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="bg-gray-100 rounded-sm p-2.5">
                                                        <img src="https://cdn.tuk.dev/assets/templates/olympus/projects.png" alt="" />
                                                    </div>
                                                    <div className="pl-3">
                                                        <div className="flex items-center text-sm leading-none">
                                                            <p className="font-semibold text-gray-800">Apple MacBook Pro 2020</p>
                                                            <p className="text-[#452a72] ml-3">(ID 879-10-940)</p>
                                                        </div>
                                                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">23/01/2023</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-16">
                                                <div>
                                                    <p className="text-sm font-semibold leading-none text-right text-gray-800">$2200</p>

                                                </div>
                                            </td>
                                        </tr>
                                    </>







                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>






        </>
    );
}


export default PaidSingleUser;
