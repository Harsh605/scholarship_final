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
import { Start } from '@mui/icons-material';
import { startCase } from 'lodash';
import { handleUnAuthorized } from '../../hook/handleUnauthorized';
// import EditApplyScheme from './EditApplyScheme';

const ScholarshipHistoryTable = () => {
    const [scheme, setScheme] = useState([]);
    const [edit, setEdit] = useState(false);
    const [item, setItem] = useState({});
    const navigate = useNavigate()

    // const handleDltPost = () => { };

    // const handleEditPost = (id) => {
    //     navigate(`${id}/edit`)

    // };

    const StudentDonationHistory = async () => {
        const token = localStorage.getItem('token') || ''
        if (token) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/student-donation-history`, { headers: { Authorization: token } });
            if (data.data.success) {
                setScheme(data.data.data.studentsList)
            } else {
                handleUnAuthorized(data.data.msg, navigate)
            }
        } else {
            navigate('/login')
        }
    }

    const handleEdit = async (item) => {
        setEdit(true)
        setItem(item)
    }

    useEffect(() => {
        StudentDonationHistory()
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
        if (user.type === "student") {
        } else {
            navigate('/login')
        }
    }, [])

    return (
        <>
            {/* <EditApplyScheme open={edit} setOpen={setEdit} item={item} ApplySchemeList={ApplySchemeList} /> */}
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="h-16 w-full text-sm leading-none text-gray-800">
                            <th className="font-normal text-left pl-4">S.No.</th>
                            <th className="font-normal text-left pl-4">Scheme Name</th>
                            <th className="font-normal text-left pl-12">Student Name</th>
                            <th className="font-normal text-left pl-12">Duration</th>
                            <th className="font-normal text-left pl-12">Amount</th>
                            <th className="font-normal text-left pl-12">Pursing Class</th>
                            <th className="font-normal text-left pl-12">Year</th>
                            <th className="font-normal text-left pl-12">Approve Date</th>
                            <th className="font-normal text-left pl-12">Remark</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {scheme?.map((post, index) => (
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
                                        {post.schemeName}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.studentName}
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
                                        {post.createdAt}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {post.remark}
                                    </p>
                                </td>
                                {/* {post.status === "rejected" && <td className="pl-12">
                                    <div className="flex items-center">
                                        <div
                                            className="w-10 h-10"
                                        >
                                            <Tooltip content="View">
                                                <IconButton
                                                    variant="text"
                                                    color="blue-gray"
                                                    onClick={() => handleEdit(post)}
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </td>} */}
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

export default ScholarshipHistoryTable;
