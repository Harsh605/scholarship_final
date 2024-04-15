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
import { DatePicker, InputSearch, SchemeForDropDown, SchemeNameDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';
import jwtDecode from 'jwt-decode';
import DonateScheme from './DonateScheme';

const DonationHistoryTable = () => {
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

    const getDonationList = async () => {
        const token = localStorage.getItem('token') || ''
        if (token) {
            let query = {
                schemeName: search.schemeName,
                endDate: search.endDate,
                startDate: search.startDate,
                keyword: search.keyword,
                schemeFor: search.schemeFor
            }
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/donation-list`, { params: query, headers: { Authorization: token } });
            if (data.data.success) {
                setDonation(data.data.data.donationList)
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
        getDonationList()
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
                    <DatePicker search={search} setSearch={setSearch} />
                    <SchemeNameDropDown search={search} setSearch={setSearch} />
                    {/* <SchemeForDropDown search={search} setSearch={setSearch} /> */}
                    <InputSearch search={search} setSearch={setSearch} msg={"Search..."} />
                </div>
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="h-16 w-full text-sm leading-none text-gray-800">
                            <th className="font-normal text-left pl-4">S.No.</th>
                            <th className="font-normal text-left pl-12 ml-12" style={{ paddingLeft: '5rem' }}>Date</th>
                            <th className="font-normal text-left pl-4" style={{ paddingLeft: '3rem' }}>Scheme Name</th>
                            <th className="font-normal text-left pl-4" style={{ paddingLeft: '3rem' }}>Class</th>
                            <th className="font-normal text-left pl-12">Amount ( per Student/ Month.)</th>
                            <th className="font-normal text-left pl-12">Duration</th>
                            <th className="font-normal text-left pl-12">No of Students</th>
                            <th className="font-normal text-left pl-12">Total Donation Amount</th>
                            <th className="font-normal text-left pl-12">Payment reference id</th>
                            <th className="font-normal text-left pl-12">Download 80G tax Certificate</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {donation?.map((post, index) => (
                            <tr
                                key={post.id}
                                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                            >
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {index + 1}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.createdAt}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.schemeName}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.classId}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.amount}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.duration}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.noOfStudent || 1}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.totalAmount}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.paymentReferenceId}
                                    </p>
                                </td>
                                {/* <td className="px-5 2xl:px-0">
                                    {user.type === 'stident' ? <button style={{ padding: '10px', width: '150px', marginLeft: '50px' }} onClick={() => handleScheme(post)}>
                                        Apply
                                    </button> : <button style={{ padding: '10px', width: '150px', marginLeft: '50px' }} onClick={() => handleDonate(post)}>
                                        Donate
                                    </button>}

                                </td> */}
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

export default DonationHistoryTable;
