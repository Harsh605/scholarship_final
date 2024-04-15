import React, { useEffect, useState } from "react";
import { div, useLocation, useNavigate } from "react-router-dom";
import logo from '../Images/Others/logo.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleUnAuthorized } from "../hook/handleUnauthorized";
import axios from "axios";


export default function Sidebar(props) {
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [type, seType] = useState('');
    const [menu1, setMenu1] = useState(false);
    const [menu2, setMenu2] = useState(false);
    const [menu3, setMenu3] = useState(false);

    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        if (props?.permission?.type === "Admin") {
            navigate('/admin-login');
        } else {
            navigate('/login');
        }

        localStorage.removeItem('type')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('admin')
        localStorage.removeItem('adminToken')
        setTimeout(() => {
            toast.success('Logout Successfully', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-success'
            });
        }, 500)
    }

    const handleProfile = () => {
        if (type === "admin") {
            navigate("/admin/profile")
        } else {
            navigate("/user/profile")
        }
    }

    const routeArr = [
        { route: 'admin/dashboard', per: 'dashboard' },
        { route: 'admin/profile', per: 'profile' },
        { route: 'admin/donation-history', per: 'donationHistory' },
        { route: 'admin/donars', per: 'donar' },
        { route: 'admin/students', per: 'student' },
        { route: 'admin/all-admin', per: 'allAdmin' },
        { route: 'admin/scholarship-distribution-automatic', per: 'scholarshipDistributionAutomatic' },
        { route: 'admin/manual-scholarship-history', per: 'manualScholarshipHistory' },
        { route: 'admin/automatic-scholarship-history', per: 'automaticScholarshipHistory' },
        { route: 'admin/document-history', per: 'documentHistory' },
        { route: 'admin/master-document', per: 'masterDocument' },
        { route: 'admin/master-scholarship-scheme', per: 'masterScholarshipScheme' },
        { route: 'admin/blog', per: 'blog' },
        { route: 'admin/general-donation', per: 'generalDonation' }
    ]

    const handleRoute = (route) => {
        const routeFind = routeArr.find(item => item.route === route)?.per || ''
        return routeFind
    }

    const getProfile = async () => {
        const token = localStorage.getItem('token') || ''
            if (token) {
                const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-profile`, { headers: { Authorization: token } });
                if (data.data.success) {
                    setProfileData(data.data.data.user)
                } else {
                    handleUnAuthorized(data.data.msg, navigate)
                }
            } else {
                navigate('/login')
            }
    }
    const getAdminProfile = async () => {
        const token = localStorage.getItem('adminToken') || ''
            if (token) {
                const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-admin-profile`, { headers: { Authorization: token } });
                if (data.data.success) {
                    setProfileData(data.data.data.admin)
                } else {
                    handleUnAuthorized(data.data.msg, navigate)
                }
            } else {
                navigate('/admin-login')
            }
    }

    useEffect(() => {
        if(['admin/donar/create', 'admin/edit-donar', 'admin/class', 'admin/edit-permission', 'admin/profile/edit', 'admin/edit-student', 'admin/add-blog'].includes(location.pathname.slice(1))) {
            return
        }
        const permi = handleRoute(location.pathname.slice(1))
        if (!props.permission[permi] && Object.keys(props.permission).length > 0)
            navigate('/admin/dashboard')
    }, [props.permission, location.pathname])

    useEffect(() => {
        const type = localStorage.getItem('type');
        if (type === "user") {
            getProfile()
        } else {
            getAdminProfile()
        }
        if (type) seType(type)
    }, [])
    return (
        <>

            <div className="w-full h-full bg-gray-200" style={{ fontFamily: "-apple-system, BlinkMacSystemFont,Segoe UI, Roboto,Oxygen" }}>
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <div className="absolute lg:relative w-64  h-screen shadow bg-gray-100 hidden lg:block" >
                        <div className="h-16 w-full flex items-center px-8">

                            <img onClick={() => type === 'admin' ? navigate("/admin/dashboard") : navigate('/user/dashboard')} className="cursor-pointer" src={logo} alt="brand" />
                        </div>
                        <ul aria-orientation="vertical" className=" py-3">
                            {type === "user" ? (<>
                                <li onClick={() => navigate("/user/dashboard")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal pt-5 focus:text-[#452a72] focus:outline-none">
                                    <div className="flex items-center">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <rect x={4} y={4} width={6} height={6} rx={1} />
                                                <rect x={14} y={4} width={6} height={6} rx={1} />
                                                <rect x={4} y={14} width={6} height={6} rx={1} />
                                                <rect x={14} y={14} width={6} height={6} rx={1} />
                                            </svg>
                                        </div>
                                        <span className="ml-2">Dashboard</span>
                                    </div>
                                </li>

                                <li onClick={() => navigate("/user/profile")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mb-4 mt-4 py-2  focus:text-[#452a72] focus:outline-none">
                                    <div className="flex items-center">
                                        <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-id-card"></i>
                                        <span className="ml-2">Profile</span>
                                    </div>
                                </li>
                                {profileData.type === "student" && (
                                    <>
                                        <li onClick={() => navigate("/user/documents-required")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-4 mb-4 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-images"></i>

                                                <span className="ml-2">Document Required</span>
                                            </div>
                                        </li>


                                        <li onClick={() => navigate("/user/scholarship-history")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-4 mb-4 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-images"></i>

                                                <span className="ml-2">Scholarship History</span>
                                            </div>
                                        </li>
                                    </>
                                )}

                                {profileData.type === "donar" && (
                                    <>
                                        <li onClick={() => navigate("/user/donation-history")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-4 mb-4 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-images"></i>

                                                <span className="ml-2">Donation History</span>
                                            </div>
                                        </li>
                                        <li onClick={() => navigate("/user/scholarship-list")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-4 mb-4 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-images"></i>

                                                <span className="ml-2">Scholarship/Donation</span>
                                            </div>
                                        </li>
                                        <li onClick={() => navigate("/user/scholarship-distribution-preferences")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-4 mb-4 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-images"></i>

                                                <span className="ml-2" style={{ lineHeight: '20px' }}>Scholarship Distribution Preferences</span>
                                            </div>
                                        </li>
                                        <li onClick={() => navigate("/user/scholarship-distribution-details")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-4 mb-4 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-images"></i>

                                                <span className="ml-2" style={{ lineHeight: '20px' }}>Scholarship Distribution Details</span>
                                            </div>
                                        </li>
                                    </>
                                )}

                                <li className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-4 mb-4 py-2  focus:text-[#452a72] focus:outline-none">
                                    <div className="flex items-center" onClick={() => handleLogout()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                            <path d="M7 12h14l-3 -3m0 6l3 -3" />
                                        </svg>
                                        <span className="text-sm ml-2">Sign out</span>
                                    </div>
                                </li>

                                {/* <li onClick={() => navigate("/user/posts")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-4 mb-4 py-2  focus:text-[#452a72] focus:outline-none">
                                    <div className="flex items-center">
                                        <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-images"></i>

                                        <span className="ml-2">Posts</span>
                                    </div>
                                </li> */}
                                {/* <li onClick={() => navigate("/user/quickNotes")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mb-4 pt-2   focus:text-[#452a72] focus:outline-none">
                                    <div className="flex items-center">
                                        <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-pen"></i>
                                        <span className="ml-2">Notes</span>
                                    </div>
                                </li>
                                <li onClick={() => navigate("/user/questions")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-4 mb-4 py-2   focus:text-[#452a72] focus:outline-none">
                                    <div className="flex items-center">
                                        <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-question"></i>
                                        <span className="ml-2">Questions</span>
                                    </div>
                                </li>
                                <li onClick={() => navigate("/user/instagram")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 mb-4 py-2   focus:text-[#452a72] focus:outline-none">
                                    <div className="flex items-center">
                                        <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-brands fa-instagram"></i>
                                        <span className="ml-2">Instagram</span>
                                    </div>
                                </li>
                                <li onClick={() => navigate("/user/plan")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mb-2 pt-2  focus:text-[#452a72] focus:outline-none">
                                    <div className="flex items-center">
                                        <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-credit-card"></i>

                                        <span className="ml-2">Plan</span>
                                    </div>
                                </li> */}
                            </>
                            ) : type === "admin" || type === "subAdmin" ?
                                (
                                    <>
                                        {props.permission.dashboard && <li onClick={() => navigate("/admin/dashboard")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal pt-0 focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <rect x={4} y={4} width={6} height={6} rx={1} />
                                                        <rect x={14} y={4} width={6} height={6} rx={1} />
                                                        <rect x={4} y={14} width={6} height={6} rx={1} />
                                                        <rect x={14} y={14} width={6} height={6} rx={1} />
                                                    </svg>
                                                </div>
                                                <span className="ml-2">Dashboard</span>
                                            </div>
                                        </li>}
                                        {props.permission.profile && <li onClick={() => navigate("/admin/profile")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-id-card"></i>
                                                <span className="ml-2">Profile</span>
                                            </div>
                                        </li>}
                                        {props.permission.blog && <li onClick={() => navigate("/admin/blog")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-blog"></i>
                                                <span className="ml-2">Blog</span>
                                            </div>
                                        </li>}
                                        {props.permission.donationHistory && <li onClick={() => navigate("/admin/donation-history")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div

                                                className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-clock-rotate-left"></i>
                                                <span className="ml-3">Donation History</span>
                                            </div>
                                        </li>}
                                        {props.permission.donar && <li onClick={() => navigate("/admin/donars")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div

                                                className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-user"></i>
                                                <span className="ml-3">Donar</span>
                                            </div>
                                        </li>}
                                        {props.permission.student && <li onClick={() => navigate("/admin/students")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div

                                                className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-user"></i>
                                                <span className="ml-3">Student</span>
                                            </div>
                                        </li>}
                                        {props.permission.allAdmin && <li onClick={() => navigate("/admin/all-admin")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div

                                                className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-lock"></i>
                                                <span className="ml-3">Sub Admin</span>
                                            </div>
                                        </li>}
                                        {props.permission.scholarshipDistributionAutomatic && <li onClick={() => navigate("/admin/scholarship-distribution-automatic")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div

                                                className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-user"></i>
                                                <span className="ml-3" style={{ lineHeight: '20px' }}>Scholarship Distribution Automatic</span>
                                            </div>
                                        </li>}
                                        {props.permission.manualScholarshipHistory && <li onClick={() => navigate("/admin/manual-scholarship-history")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div

                                                className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-clock-rotate-left"></i>
                                                <span className="ml-2" style={{ lineHeight: '20px' }}>Manual Scholarship History</span>
                                            </div>
                                        </li>}
                                        {props.permission.automaticScholarshipHistory && <li onClick={() => navigate("/admin/automatic-scholarship-history")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 py-2   focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-clock-rotate-left"></i>
                                                <span className="ml-2" style={{ lineHeight: '20px' }}>Automatic Scholarship History</span>
                                            </div>
                                        </li>}
                                        {props.permission.documentHistory && <li onClick={() => navigate("/admin/document-history")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 py-2   focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-clock-rotate-left"></i>
                                                <span className="ml-2">Document History</span>
                                            </div>
                                        </li>}
                                        {props.permission.masterDocument && <li onClick={() => navigate("/admin/master-document")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 py-2   focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-images"></i>
                                                <span className="ml-2">Master Document</span>
                                            </div>
                                        </li>}
                                        {props.permission.generalDonation && <li onClick={() => navigate("/admin/general-donation")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2    focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-images"></i>
                                                <span className="ml-2" style={{ lineHeight: '20px' }}>General Donation</span>
                                            </div>
                                        </li>}
                                        {props.permission.masterScholarshipScheme && <li onClick={() => navigate("/admin/master-scholarship-scheme")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2    focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-images"></i>
                                                <span className="ml-2" style={{ lineHeight: '20px' }}>Master Scholarship Scheme</span>
                                            </div>
                                        </li>}





                                        {/* <li onClick={() => navigate("/admin/instagram")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 mb-4 py-2   focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-brands fa-instagram"></i>
                                                <span className="ml-2">Instagram</span>
                                            </div>
                                        </li>
                                        <li onClick={() => navigate("/admin/quickNotes")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mb-4 pt-2   focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-pen"></i>
                                                <span className="ml-2">Notes</span>
                                            </div>
                                        </li>
                                        <li onClick={() => navigate("/admin/profile")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mb-4 py-2   focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-id-card"></i>
                                                <span className="ml-2">Profile</span>
                                            </div>
                                        </li> */}
                                        {/* <li onClick={() => navigate("/admin/payments")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mb-4 py-2   focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-credit-card"></i>
                                                <span className="ml-2">Payments</span>
                                            </div>
                                        </li> */}
                                        {/* <li onClick={() => navigate("/admin/category")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mb-4 py-2   focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">
                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-plus"></i>
                                                <span className="ml-2">Category</span>
                                            </div>
                                        </li>
                                        <li onClick={() => navigate("/admin/setting")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mb-4 py-2  focus:text-[#452a72] focus:outline-none">
                                            <div className="flex items-center">

                                                <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-gear"></i>
                                                <span className="ml-2">Settings</span>
                                            </div>
                                        </li> */}
                                    </>
                                ) :
                                <>
                                    <li onClick={() => navigate("/patient/dashboard")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal pt-5 focus:text-[#452a72] focus:outline-none">
                                        <div className="flex items-center">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <rect x={4} y={4} width={6} height={6} rx={1} />
                                                    <rect x={14} y={4} width={6} height={6} rx={1} />
                                                    <rect x={4} y={14} width={6} height={6} rx={1} />
                                                    <rect x={14} y={14} width={6} height={6} rx={1} />
                                                </svg>
                                            </div>
                                            <span className="ml-2">Dashboard</span>
                                        </div>
                                    </li>
                                    <li onClick={() => navigate("/patient/questions")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mt-2 mb-4 py-2   focus:text-[#452a72] focus:outline-none">
                                        <div className="flex items-center">
                                            <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-question"></i>
                                            <span className="ml-2">Questions</span>
                                        </div>
                                    </li>
                                    <li onClick={() => navigate("/patient/profile")} className="pl-6 cursor-pointer text-[#7963a7] text-md leading-3 tracking-normal mb-4   focus:text-[#452a72] focus:outline-none">
                                        <div className="flex items-center">
                                            <i style={{ marginRight: "2px" }} width={20} height={20} className="fa-solid fa-id-card"></i>
                                            <span className="ml-2">Profile</span>
                                        </div>
                                    </li>
                                </>


                            }

                        </ul>
                    </div>
                    {/*Mobile responsive sidebar*/}
                    <div className={show ? "w-full h-full absolute z-40  transform  translate-x-0 " : "   w-full h-full absolute z-40  transform -translate-x-full"} id="mobile-nav">
                        <div className="bg-gray-800 opacity-50 absolute h-full w-full lg:hidden" onClick={() => setShow(!show)} />
                        <div className="absolute z-40 sm:relative w-64 md:w-96 shadow pb-4 bg-gray-100 lg:hidden transition duration-150 ease-in-out h-full">
                            <div className="flex flex-col justify-between h-full w-full">
                                <div>
                                    <div className="flex items-center justify-between px-8">
                                        <div className="h-16 w-full flex items-center">
                                            <img className="cursor-pointer" onClick={() => navigate("/")} src="https://bentlyfoundation.org/images/tesla.png" alt="brand" width={144} height={30} />

                                        </div>
                                        <div id="closeSideBar" className="flex items-center justify-center h-10 w-10" onClick={() => setShow(!show)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <line x1={18} y1={6} x2={6} y2={18} />
                                                <line x1={6} y1={6} x2={18} y2={18} />
                                            </svg>
                                        </div>
                                    </div>
                                    <ul aria-orientation="vertical" className=" py-6">


                                    </ul>
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-center mb-4 w-full px-6">
                                        <div className="relative w-full">
                                            <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth={1} stroke="#A0AEC0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <circle cx={10} cy={10} r={7} />
                                                    <line x1={21} y1={21} x2={15} y2={15} />
                                                </svg>
                                            </div>
                                            <input className="bg-gray-200 focus:outline-none rounded w-full text-sm text-gray-500  pl-10 py-2" type="text" placeholder="Search" />
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-300">
                                        <div className="w-full flex items-center justify-between px-6 pt-1">
                                            <div className="flex items-center">
                                                <img alt="profile-pic" src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png" className="w-8 h-8 rounded-md" />
                                                <p className="md:text-xl text-gray-800 text-base leading-4 ml-2">Jane22 Doe</p>
                                            </div>
                                            <ul className="flex">
                                                {/* <li className="cursor-pointer text-white pt-5 pb-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1} stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                                        <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                                                    </svg>
                                                </li> */}
                                                <li className="cursor-pointer text-white pt-5 pb-3 pl-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1} stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                                    </svg>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Mobile responsive sidebar*/}
                    {/* Sidebar ends */}
                    <div className="w-full">
                        {/* Navigation starts */}
                        <nav className="h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow relative z-10">
                            <div className="hidden lg:flex w-full pr-6">
                                <div className="w-1/2 h-full hidden lg:flex items-center pl-6 pr-24">
                                    <div className="relative w-full">
                                        {/* <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <circle cx={10} cy={10} r={7} />
                                                <line x1={21} y1={21} x2={15} y2={15} />
                                            </svg>
                                        </div>
                                        <input className="border border-gray-100 focus:outline-none focus:border-[#452a72] rounded w-full text-sm text-gray-500 bg-gray-100 pl-12 py-2" type="text" placeholder="Search" /> */}
                                    </div>
                                </div>
                                <div className="w-1/2 hidden lg:flex">
                                    <div className="w-full flex items-center pl-8 justify-end">
                                        {/* <div className="h-full w-20 flex items-center justify-center border-r border-l  mr-4">
                                            <div className="relative cursor-pointer text-[#7963a7] ">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell " width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                                    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                                </svg>
                                                <div className="w-2 h-2 rounded-full bg-red-400 border border-white absolute inset-0 mt-1 mr-1 m-auto" />
                                            </div>
                                        </div> */}
                                        {/* <div className="h-full w-20 flex items-center justify-center border-r mr-4 cursor-pointer text-[#7963a7]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                                            </svg>
                                        </div> */}
                                        <div className="flex items-center relative cursor-pointer" onClick={() => setProfile(!profile)}>
                                            <div className="rounded-full">
                                                {profile ? (
                                                    <ul className="p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-16 ">
                                                        <li className="flex w-full justify-between text-[#7963a7]  cursor-pointer items-center">
                                                            <div onClick={() => handleProfile()} className="flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                                    <circle cx={12} cy={7} r={4} />
                                                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                                </svg>
                                                                <span className="text-sm ml-2">My Profile</span>
                                                            </div>
                                                        </li>
                                                        <li className="flex w-full justify-between text-[#7963a7]  cursor-pointer items-center mt-2">
                                                            <div className="flex items-center" onClick={() => handleLogout()}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                                                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                                                                </svg>
                                                                <span className="text-sm ml-2">Log out</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="relative">
                                                    <img className="rounded-full h-10 w-10 object-cover" src={profileData?.image ? profileData.image : "https://tuk-cdn.s3.amazonaws.com/assets/components/sidebar_layout/sl_1.png"} alt="avatar" />
                                                    <div className="w-2 h-2 rounded-full bg-green-400 border border-white absolute inset-0 mb-0 mr-0 m-auto" />
                                                </div>
                                            </div>
                                            {type == "user" ? <p className="text-gray-800 text-sm mx-3">{profileData?.name}</p> : <p className="text-gray-800 text-sm mx-3">Admin</p>}
                                            <div className="cursor-pointer text-[#7963a7]">
                                                <svg aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-[#7963a7] mr-8 visible lg:hidden relative" onClick={() => setShow(!show)}>
                                {show ? (
                                    " "
                                ) : (
                                    <svg aria-label="Main Menu" aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu cursor-pointer" width={30} height={30} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={4} y1={8} x2={20} y2={8} />
                                        <line x1={4} y1={16} x2={20} y2={16} />
                                    </svg>
                                )}
                            </div>
                        </nav>
                        {/* Navigation ends */}

                        <div className="container mx-auto py-2 md:w-5/5 w-12/12 px-2" style={{ maxHeight: '85vh', overflowY: 'scroll', msOverflowStyle: 'none' }}>
                            <div className="w-full h-full rounded" >
                                <props.Outlet />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
