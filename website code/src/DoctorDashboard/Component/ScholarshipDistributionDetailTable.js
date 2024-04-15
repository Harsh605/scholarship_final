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
import { AnnualIncome2DropDown, InputSearch, PercentageDropDown, SchemeNameDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';
import jwtDecode from 'jwt-decode';
import DonateScheme from './DonateScheme';

const ScholarshipDistributionDetailTable = () => {
    const [donation, setDonation] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [item, setItem] = useState({});
    const [user, setUser] = useState({});
    const [search, setSearch] = useState({});
    const [applyScheme, setApplyScheme] = useState(false);
    const navigate = useNavigate()

    // const handleDltPost = () => { };

    // const handleEditPost = (id) => {
    //     navigate(`${id}/edit`)

    // };

    const StudentDonationHistory = async () => {
        const token = localStorage.getItem('token') || ''
        if (token) {
            let query = {
                familyAnnualIncome: search.annualIncome,
                percentage: search.percentage,
                schemeName: search.schemeName,
                keyword: search.keyword
            }
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/donar-donation-history`, { params: query, headers: { Authorization: token } });
            if (data.data.success) {
                setDonation(data.data.data.studentsList)
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

    useEffect(() => {
        StudentDonationHistory()
        const token = localStorage.getItem('token')
        if (token) {
            setUser(jwtDecode(token))
        } else {
            navigate('/login')
        }
    }, [search])

    return (
        <>
            {/* {applyScheme && <ApplyScheme open={applyScheme} setOpen={setApplyScheme} item={item} />} */}
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                <div className="mb-4 flex justify-end">
                    <AnnualIncome2DropDown search={search} setSearch={setSearch} msg={"Select Family Annual Income"} />
                    <PercentageDropDown search={search} setSearch={setSearch} msg={"Select Higher Class Percentage"} />
                    <SchemeNameDropDown search={search} setSearch={setSearch} />
                    <InputSearch search={search} setSearch={setSearch} msg={"Search..."} />
                </div>
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="h-16 w-full text-sm leading-none text-gray-800">
                            <th className="font-normal text-left pl-4">S.No.</th>
                            <th className="font-normal text-left pl-4">Type</th>
                            <th className="font-normal text-left pl-4">Scheme Name</th>
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
                            <th className="font-normal text-left pl-12">Duration</th>
                            <th className="font-normal text-left pl-12">Amount</th>
                            <th className="font-normal text-left pl-12">Date</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {donation?.map((post, index) => (
                            <tr
                                key={post.id}
                                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                            >
                               
                                <td className="pl-4" style={{}}>
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {index+1}
                                    </p>
                                </td>
                                <td className="pl-4">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.mode === 'manual' ? 'Manual' : 'Automatic'}
                                    </p>
                                </td>
                                <td className="pl-4">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.schemeName}
                                    </p>
                                </td>
                                {/* <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.schemeFor}
                                    </p>
                                </td> */}
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.studentName}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.studentId}
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
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.duration}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.amount}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.createdAt}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {donation.length === 0 && <div className='border p-2' style={{ textAlign: 'center' }}>
                    No Data Found.
                </div>}

            </div>
            <ToastContainer />
        </>
    );
};

export default ScholarshipDistributionDetailTable;
