import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
// import ApplyScheme from './ApplyScheme';
import { AnnualIncome2DropDown, InputSearch, PercentageDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';
import jwtDecode from 'jwt-decode';
import DonateScheme from './DonateScheme';

const ScholarshipDistributionPreferenceTable = () => {
    const [studentList, setStudentList] = useState([]);
    const [item, setItem] = useState({});
    const [user, setUser] = useState({});
    const [search, setSearch] = useState({});
    const [applyScheme, setApplyScheme] = useState(false);
    const [totalStudent, setTotalStudent] = useState([])
    const [totalStudentData, setTotalStudentData] = useState(0)
    const [checkedStudent, setCheckedStudent] = useState([])
    const navigate = useNavigate()

    // const handleDltPost = () => { };

    // const handleEditPost = (id) => {
    //     navigate(`${id}/edit`)

    // };

    const StudentList = async () => {
        const token = localStorage.getItem('token') || ''
        if (token) {
            let query = {
                familyAnnualIncome: search.annualIncome,
                percentage: search.percentage,
                keyword: search.keyword
            }
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/eligible-student-list`, {params: query, headers: { Authorization: token } });
            if (data.data.success) {
                setStudentList(data.data.data.studentsList)
                setTotalStudent(data.data.data.totalStudentDetail)
            } else {
                handleUnAuthorized(data.data.msg, navigate)
            }
        } else {
            navigate('/login')
        }
    }



    const handleScheme = (item) => {
        let user = localStorage.getItem('user') || ''
        if (user) {
            user = JSON.parse(user);
            setApplyScheme(true)
            setItem({ ...item, studentId: user.id, studentName: user.name })
        } else {
            navigate('/login')
        }
    }

    const handleChecked = async (value, id) => {
        const arr = [...checkedStudent];
        if (arr.includes(id.toString())) {
            const i = arr.findIndex(data => data.toString() === id.toString())
            arr.splice(i, 1)
        } else {
            if (totalStudentData > arr.length) {
                arr.push(id.toString())
            } else {
                toast.error(`You only ${totalStudentData} student has donate`, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-error'
                });
            }
        }
        setCheckedStudent(arr)
    }

    useEffect(() => {
        StudentList()
        const token = localStorage.getItem('token')
        if (token) {
            setUser(jwtDecode(token))
        } else {
            navigate('/login')
        }
    }, [search])

    useEffect(() => {
        if (totalStudent.length) {
            const obj = {
                totalStudent: 0
            };
            totalStudent?.map(data => {
                obj.totalStudent += data.totalStudent;
            })
            setTotalStudentData(obj.totalStudent)
            // setTotalStudentData(1)
        }
    }, [totalStudent])

    const handleDonation = async () => {
        const token = localStorage.getItem('token') || ''
        if (token) {
            const payload = {
                donationDetail: totalStudent,
                studentList: checkedStudent
            }
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/student-donation-by-donar`, payload, { headers: { Authorization: token } });
            if (data.data.success) {
                StudentList()
                setCheckedStudent([])
                toast.success(data.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            } else {
                handleUnAuthorized(data.data.msg, navigate)
            }
        } else {
            navigate('/login')
        }
    }

    return (
        <>
            {/* {applyScheme && <ApplyScheme open={applyScheme} setOpen={setApplyScheme} item={item} />} */}
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                <div className="mb-4 flex justify-end">
                    {checkedStudent && checkedStudent.length > 0 && <button onClick={() => handleDonation()} style={{ marginTop: '1rem' }} className="inline-flex text-white sm:ml-3 mt-4 sm:mt-0 items-center justify-center px-6 py-3 bg-[#452a72] border border-[#452a72]  focus:outline-none rounded">
                        <p className="text-sm font-medium leading-none">Donate Now</p>
                    </button>}
                    <AnnualIncome2DropDown search={search} setSearch={setSearch} msg={"Select Family Annual Income"} />
                    <PercentageDropDown search={search} setSearch={setSearch} msg={"Select Higher Class Percentage"} />
                    <InputSearch search={search} setSearch={setSearch} msg={"Search..."} />

                </div>
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="h-16 w-full text-sm leading-none text-gray-800">
                            <th className="font-normal text-left pl-4">S.No.</th>
                            <th className="font-normal text-left pl-4">Check box</th>
                            <th className="font-normal text-left pl-12">Student Name</th>
                            <th className="font-normal text-left pl-12">Student ID</th>
                            <th className="font-normal text-left pl-12">Mobile No.</th>
                            <th className="font-normal text-left pl-12">Email Id</th>
                            <th className="font-normal text-left pl-12">City</th>
                            <th className="font-normal text-left pl-12">State</th>
                            <th className="font-normal text-left pl-12">Country</th>
                            <th className="font-normal text-left pl-12">Higher Class Percentage</th>
                            <th className="font-normal text-left pl-12">Pursing Class</th>
                            <th className="font-normal text-left pl-12">Year</th>
                            <th className="font-normal text-left pl-12">Family Annual Income</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {studentList?.map((post, index) => (
                            <tr
                                key={post.id}
                                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                            >
                                <td className="pl-4">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {index + 1}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            checked={checkedStudent.includes(post.id.toString())}
                                            onChange={(e) => handleChecked(e.target.checked, post.id)}
                                            className="w-4 h-4 transition duration-300 rounded   focus:outline-none "
                                        />
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.name}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.id}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.mobile}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.email}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.city}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.state}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.country}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.higherClassPercentage}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.pursuingClass}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.year}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.familyANnualIncome}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {studentList.length === 0 && <div className='border p-2' style={{ textAlign: 'center' }}>
                    No Data Found.
                </div>}

            </div>
            <ToastContainer />
        </>
    );
};

export default ScholarshipDistributionPreferenceTable;
