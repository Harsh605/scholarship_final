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
import PayNowModal from './PayNowModal';

const ScholarshipTable = () => {
    const [scheme, setScheme] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [item, setItem] = useState({});
    const [user, setUser] = useState({});
    const [search, setSearch] = useState({});
    const [payment, setPayment] = useState({});
    const [payNowModal, setPayNowModal] = useState(false);
    const [noOfStudent, setNoOfStudent] = useState([])
    const [duration, setDuration] = useState([])
    const [totalAmount, setTotalAmount] = useState([])
    const navigate = useNavigate()

    // const handleDltPost = () => { };

    // const handleEditPost = (id) => {
    //     navigate(`${id}/edit`)

    // };

    const SchemeList = async () => {
        const token = localStorage.getItem('token') || ''
        if (token) {
            let query = {
                schemeNames: search.schemeName,
                endDate: search.endDate,
                startDate: search.startDate,
                keyword: search.keyword,
                schemeFor: search.schemeFor
            }
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/scheme-list`, { params: query, headers: { Authorization: token } });
            if (data.data.success) {
                const arr = []
                const arr2 = []
                data.data.data.scheme?.map(data => {
                    if (data?.noOfStudent) arr.push(data?.noOfStudent)
                    else arr.push(1)
                })
                data.data.data.scheme?.map(data => {
                    if (data?.duration) arr2.push(data?.duration)
                    else arr2.push('1 month')
                })
                setNoOfStudent(arr)
                setDuration(arr2)
                setTotalAmount(data.data.data.scheme?.map(data => { return { amount: data.amount, real: data.amount, amount2: data.amount } }))
                setScheme(data.data.data.scheme)
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
            setPayNowModal(true)
            setItem({ ...item, studentId: user.id, studentName: user.name })
        } else {
            navigate('/login')
        }
    }

    const handleFunction = (type, value, index) => {
        if (type === 'student') {
            if (value <= 0)
                return
            const arr = [...noOfStudent]
            const arr2 = [...totalAmount]
            arr[index] = value;
            arr2[index].amount = arr2[index].amount2 * value;
            arr2[index].real = arr2[index].amount2 * value;
            setTotalAmount(arr2)
            setNoOfStudent(arr)
        } else {
            const arr = [...duration]
            const arr2 = [...totalAmount]
            if (value == '1 month') {
                arr2[index].amount = arr2[index].real * 1
            }

            if (value == '6 month') {
                arr2[index].amount = arr2[index].real * 6
            }
            if (value == '12 month') {
                arr2[index].amount = arr2[index].real * 12
            }
            arr[index] = value;
            setDuration(arr)
            setTotalAmount(arr2)
        }
    }

    const handleDonate = async (item, index) => {
        const token = localStorage.getItem('token') || ''
        let amount = 0;
        amount = totalAmount[index].amount2 * noOfStudent[index];
        if (duration[index] === '6 month') amount = amount * 6
        if (duration[index] === '12 month') amount = amount * 12
        if (+amount != +totalAmount[index].amount)
            window.location.reload()
        if (token) {
            const payload = {
                paymentReferenceId: '#' + Math.floor(Math.random() * 1000000008),
                schemeId: item.id,
                totalAmount: totalAmount[index].amount,
                amount: totalAmount[index].amount2
            }
            if(scheme[index]?.noOfStudent) payload.noOfStudent = scheme[index]?.noOfStudent
            if(scheme[index]?.duration) payload.duration = scheme[index]?.duration
            setPayment(payload)
            setPayNowModal(true)

        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
        SchemeList()
        const token = localStorage.getItem('token')
        if (token) {
            setUser(jwtDecode(token))
        } else {
            navigate('/login')
        }
    }, [search])

    return (
        <>
            {payNowModal && <PayNowModal open={payNowModal} setOpen={setPayNowModal} item={payment} />}
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
                            <th className="font-normal text-left pl-4">Scheme Name</th>
                            <th className="font-normal text-left pl-12">Scheme For</th>
                            <th className="font-normal text-left pl-12">Amount ( per Student/ Month.)</th>
                            <th className="font-normal text-left pl-12">No. of Students</th>
                            <th className="font-normal text-left pl-12">Duration</th>
                            <th className="font-normal text-left pl-12">Total Amount</th>
                            <th className="font-normal text-left pl-12">Pay Now</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {scheme && scheme?.length > 0 && scheme?.map((post, index) => (
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
                                        {post.name}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.className}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.amount}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        <input
                                            type="number"
                                            disabled={post?.type === 'generalDonation' && post?.noOfStudent}
                                            value={noOfStudent[index]}
                                            onChange={(e) => handleFunction('student', e.target.value, index)}
                                            placeholder="No. of student"
                                            className="px-4 py-0 h-[43px] w-[130px] mt-4 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#452a72] focus:border-[#452a72]"
                                        />
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        <select placeholder='Select City' disabled={post?.type === 'generalDonation' && post?.noOfStudent} onChange={(e) => handleFunction('duration', e.target.value, index)} className="px-4 py-0 h-[43px] w-[130px] mt-4 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#452a72] focus:border-[#452a72]">
                                            <option value="" disabled selected>Select Duration</option>
                                            {['1 month', '6 month', '12 month']?.map((data, index1) => (
                                                <option key={index} value={data} selected={duration[index] === data}>{data}</option>
                                            ))}
                                        </select>
                                    </p>
                                </td>

                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {totalAmount[index].amount}
                                    </p>
                                </td>
                                <td className="px-5 2xl:px-0">
                                    {/* {user.type === 'stident' ? <button style={{ padding: '10px', width: '150px', marginLeft: '50px' }} onClick={() => handleScheme(post)}>
                                        Apply
                                    </button> :  */}
                                    <button
                                        className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] focus:outline-none"
                                        style={{ padding: '10px', width: '150px', height: '50px', marginLeft: '50px' }} onClick={() => handleDonate(post, index)}
                                    >
                                        Pay Now
                                    </button>
                                    {/* } */}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {scheme.length === 0 && <div className='border p-2' style={{ textAlign: 'center' }}>
                    No Data Found.
                </div>}

            </div>
            <ToastContainer />
        </>
    );
};

export default ScholarshipTable;
