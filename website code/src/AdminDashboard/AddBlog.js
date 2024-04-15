import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import TextEditor from "../Pages/Text";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { handleUnAuthorized } from "../hook/handleUnauthorized";
import ReactQuill from 'react-quill'

function AddBlog() {
    const navigate = useNavigate();
    const [blogDetail, setBlogDetail] = useState({
        title: '',
        description: '',
        image: ''
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const adminToken = localStorage.getItem('adminToken') || ''

        const form = new FormData();
        if (blogDetail.image)
            form.append('image', blogDetail.image)
        if (blogDetail.title)
            form.append('title', blogDetail.title)
        if (blogDetail.description)
            form.append('description', blogDetail.description)

        const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/add-blog-manager`, form, { headers: { Authorization: adminToken } });
        if (data.data.success) {
            // setBlogDetail({
            //     title: '',
            //     description: '',
            //     image: ''
            // })
            navigate('/admin/blog')
            setTimeout(() => {
                toast.success(data.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            }, 500)

        } else {
            handleUnAuthorized(data.data.msg, navigate)
        }
    };

    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (!adminToken)
            navigate('/admin-login')
    }, [])

    const handleImageChange = (e) => setBlogDetail({ ...blogDetail, [e.target.name]: e.target.files[0] })
    const handleChange = (e) => setBlogDetail({ ...blogDetail, [e.target.name]: e.target.value })


    return (
        <>
            <div className="px-0 py-0 ">
                <div className="flex flex-no-wrap items-start">
                    <div className="w-full ">
                        <div className="px-2">
                            <div className="bg-white rounded shadow mt-3 py-7">
                                <div className=" px-7">
                                    <p className="text-xl font-semibold leading-tight text-gray-800">
                                        Add Blog
                                    </p>
                                    <div className="grid w-full grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-7 mt-7 ">
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Title<span className="text-red-600">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                value={blogDetail?.title}
                                                name="title"
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-3 text-gray-600">
                                                Set a simple and precise name
                                            </p> */}
                                        </div>
                                        <div className="mb-10">
                                            <p className="text-base font-medium leading-none text-gray-800 mb-3">
                                                Description<span className="text-red-600">*</span>
                                            </p>
                                            <ReactQuill value={blogDetail?.description} placeholder={'description*'} onChange={(e) => setBlogDetail({ ...blogDetail, description: e })} />
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Image<span className="text-red-600">*</span>
                                            </p>
                                            <input
                                                type="file"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                name="image"
                                                onChange={(e) => handleImageChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-3 text-gray-600">
                                                Set a simple and precise name
                                            </p> */}
                                        </div>
                                        {/* <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Amount
                                            </p>
                                            <input
                                                type="number"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                value={donar.amount}
                                                name="amount"
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Set Slug that is related to the Post
                                            </p>
                                        </div> */}

                                    </div>
                                </div>

                                <hr className="h-[1px] bg-gray-100 my-3" />
                                <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                    <button
                                        onClick={handleFormSubmit}
                                        className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[144px] w-full  "
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default AddBlog;

