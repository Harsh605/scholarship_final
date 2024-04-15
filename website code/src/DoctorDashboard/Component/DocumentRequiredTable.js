import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { json, useNavigate } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import UploadDocument from './UploadDocument';
import { handleUnAuthorized } from '../../hook/handleUnauthorized';
import jwtDecode from 'jwt-decode';
import DonateScheme from './DonateScheme';
import EditUploadDocument from './EditUploadDocument';

const DocumentRequiredTable = ({ open, open2, setOpen, setOpen2 }) => {
    const [scheme, setScheme] = useState([]);
    const [classList, setClassList] = useState([]);
    const [documentList, setDocumentList] = useState([]);
    const [item, setItem] = useState({});
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState(false);
    const [applyScheme, setApplyScheme] = useState(false);
    const [donateScheme, setDonateScheme] = useState(false);
    const navigate = useNavigate()

    // const handleDltPost = () => { };

    const handleEdit = async (item) => {
        setEdit(true)
        setItem(item)
    }

    const profileGet = async () => {
        const token = localStorage.getItem('token') || ''
        if (token) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/scholarship-scheme`, { headers: { Authorization: token } });
            if (data.data.success) {
                setScheme(data.data.data.scheme)
            } else {
                handleUnAuthorized(data.data.msg, navigate)
            }
        } else {
            navigate('/login')
        }
    }



    const handleScheme = (item) => {
        // let user = localStorage.getItem('user') || ''
        // if (user) {
        //     user = JSON.parse(user);
        //     setApplyScheme(true)
        //     setItem({ ...item, studentId: user.id, studentName: user.name })
        // } else {
        //     navigate('/login')
        // }
    }

    const handleDonate = (item) => {
        let user = localStorage.getItem('user') || ''
        if (user) {
            user = JSON.parse(user);
            setDonateScheme(true)
            setItem({ ...item, donarId: user.id, donarName: user.name })
        } else {
            navigate('/login')
        }

    }

    const getClassDocumentList = async () => {
        const token = localStorage.getItem('token') || ''
        if (token) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin-class-document-list`, { headers: { Authorization: token } });
            if (data.data.success) {
                let arr = [];
                data.data.data.adminClassDocumentList?.map((data, index) => {
                    const obj = { ...data }
                    obj.documents = JSON.stringify({ id: data.classId, document: data.documents })
                    arr.push(obj)
                })
                setClassList(arr)
            } else {
                handleUnAuthorized(data.data.msg, navigate)
            }
            // setUser(jwt_decode(token));
        } else {
            navigate('/login')
            // localStorage.removeItem('token')
        }
    }

    const DocumentList = async () => {
        const token = localStorage.getItem('token') || ''
        if (token) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/document-list`, { headers: { Authorization: token } });
            if (data.data.success) {
                data.data.data.documentList.length > 0 ? setOpen(false) : setOpen(true);
                setDocumentList(data.data.data.documentList)
            } else {
                handleUnAuthorized(data.data.msg, navigate)
            }
            // setUser(jwt_decode(token));
        } else {
            navigate('/login')
            // localStorage.removeItem('token')
        }
    }

    useEffect(() => {
        getClassDocumentList()
        DocumentList()
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
        if (user.type === "student") {
            setUser(user)
            setItem({ studentId: user.id, studentName: user.name })
        } else {
            navigate('/login')
        }
    }, [])

    return (
        <>
            {open2 && <UploadDocument open={open2} setOpen={setOpen2} DocumentList={DocumentList} data={item} classList={classList} />}
            {edit && <EditUploadDocument open={edit} setOpen={setEdit} item={item} DocumentList={DocumentList} />}
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="h-16 w-full text-sm leading-none text-gray-800">
                            <th className="font-normal text-left pl-4">S.No.</th>
                            <th className="font-normal text-left pl-12">Class</th>
                            <th className="font-normal text-left pl-12">Name of college</th>
                            <th className="font-normal text-left pl-12">University</th>
                            <th className="font-normal text-left pl-12">Roll No</th>
                            <th className="font-normal text-left pl-12">Percentage</th>
                            {/* {documentList[0]?.docOne && <th className="font-normal text-left pl-12">DocStatusOne</th>}
                            {documentList[0]?.docTwo && <th className="font-normal text-left pl-12">DocStatusTwo</th>}
                            {documentList[0]?.docThree && <th className="font-normal text-left pl-12">DocStatusThree</th>}
                            {documentList[0]?.docFour && <th className="font-normal text-left pl-12">DocStatusFour</th>}
                            {documentList[0]?.docFive && <th className="font-normal text-left pl-12">DocStatusFive</th>} */}
                            <th className="font-normal text-left pl-12">DocStatusOne</th>
                            <th className="font-normal text-left pl-12">DocStatusTwo</th>
                            <th className="font-normal text-left pl-12">DocStatusThree</th>
                            <th className="font-normal text-left pl-12">DocStatusFour</th>
                            <th className="font-normal text-left pl-12">DocStatusFive</th>
                            <th className="font-normal text-left pl-12">Status</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {documentList?.map((data, index) => (
                            <tr
                                key={data.id}
                                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                            >
                                
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {index+1}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {data.className || 'N/A'}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {data.collegeName || 'N/A'}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {data.university || 'N/A'}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {data.rollNo || 'N/A'}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {data.percentage || 'N/A'}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        <span>{data.docOne !== '' ? data.docOneStatus : 'N/A'}</span>
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        <span></span>{data.docTwo !== '' ? data.docTwoStatus : 'N/A'}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        <span></span>{data.docThree !== '' ? data.docThreeStatus : 'N/A'}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        <span></span>{data.docFour !== '' ? data.docFourStatus : 'N/A'}
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        {data?.docFive !== '' ? data.docFiveStatus : 'N/A'}
                                    </p>
                                </td>

                                <td className="pl-12 pr-4">
                                    <p className="text-sm font-medium leading-none text-gray-800">
                                        <span style={{ padding: "5px", backgroundColor: data.status === 'verified' ? 'green' : data.status === 'rejected' ? 'red' : 'blue', color: 'white' }}>{data.status || 'N/A'}</span>
                                    </p>
                                </td>
                                 {data.status === "rejected" && <td className="pl-12">
                                    <div className="flex items-center">
                                        <div
                                            className="w-10 h-10"
                                        >
                                            <Tooltip content="View">
                                                <IconButton
                                                    variant="text"
                                                    color="blue-gray"
                                                    onClick={() => handleEdit(data)}
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </td>}
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                {documentList.length === 0 && <div className='border p-2' style={{ textAlign: 'center' }}>
                    No Data Found.
                </div>}

            </div>
            <ToastContainer />
        </>
    );
};

export default DocumentRequiredTable;
