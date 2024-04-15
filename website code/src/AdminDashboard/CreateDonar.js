import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import TextEditor from "../Pages/Text";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { handleUnAuthorized } from "../hook/handleUnauthorized";
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';
import ErrorMessage from "../hook/ErrorMessage";

function CreateDonar() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
    const [donar, setDonar] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => setDonar({ ...donar, [e.target.name]: e.target.value })

    const handleFormSubmit = async (data) => {
        // e.preventDefault();
        // if (donar.name === '' || donar.email === '' || donar.mobile === '' || donar.password === '' || donar.confirmPassword === '') {
        //     alert("Please fill all details.")
        //     return
        // }

        // if (donar.password !== donar.confirmPassword) {
        //     alert("Confirm password should not matched with password.")
        //     return
        // }
        // if (donar.mobile.length > 10 || donar.mobile.length < 10) {
        //     alert("Mobile no. should be 10 digits.")
        //     return
        // }

        const payload = {
            "type": 'donar',
            "create": 'admin',
            "name": data.name,
            "email": data.email,
            "password": data.password,
            "mobile": data.mobile
        }
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/sign-up`, payload);
        if (result.data.success) {
            setDonar({})
            navigate('/admin/donars')
            setTimeout(() => {
                toast.success(result.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            }, 500)
        } else {
            handleUnAuthorized(result.data.msg, navigate)
        }
    };

    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (!adminToken)
            navigate('/admin-login')
    }, [])




    return (
        <>
            <div className="px-0 py-0 ">
                <div className="flex flex-no-wrap items-start">
                    <div className="w-full ">
                        <div className="py-4 px-2">
                            <div className="bg-white rounded shadow mt-7 py-7">
                                <div className="mt-10 px-7">
                                    <p className="text-xl font-semibold leading-tight text-gray-800">
                                        Create New Donar
                                    </p>
                                    <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Full Name<span className="text-red-600">*</span>
                                            </p>
                                            <input
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                // value={donar.name}
                                                name="name"
                                                {...register('name', {
                                                    required: 'Name is required.',
                                                    maxLength: {
                                                        value: 35,
                                                        message: 'Name should be have 35 characters long.',
                                                    },
                                                    // onChange: (e) => handleProfile(e)
                                                })}
                                            // onChange={(e) => handleChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-3 text-gray-600">
                                                Set a simple and precise name
                                            </p> */}
                                            {errors?.name?.message && <ErrorMessage message={errors?.name?.message} />}

                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Email<span className="text-red-600">*</span>
                                            </p>
                                            <input
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                // value={donar.email}
                                                name="email"
                                                {...register('email', {
                                                    required: 'Email is required.',
                                                    pattern: {
                                                        value: /^\S+@\S+$/i,
                                                        message: 'Invalid email address.',
                                                    },
                                                    // onChange: (e) => handleProfile(e)
                                                })}
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {/* <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Set Slug that is related to the Post
                                            </p> */}
                                            {errors?.email?.message && <ErrorMessage message={errors?.email?.message} />}
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Mobile No.<span className="text-red-600">*</span>
                                            </p>
                                            <input
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                // value={donar.mobile}
                                                name="mobile"
                                                onKeyDown={event => {
                                                    if (
                                                        !['Backspace', 'Delete', 'Tab'].includes(
                                                            event.key
                                                        ) &&
                                                        !/[0-9]/.test(event.key)
                                                    ) {
                                                        event.preventDefault()
                                                    }
                                                }}
                                                {...register('mobile', {
                                                    required: 'Mobile no. is required.',
                                                    validate: (value) => {
                                                        if (value.length > 10) return 'Mobile no. should be 10 digit.'
                                                        if (value.length < 10) return 'Mobile no. should be 10 digit.'
                                                    },
                                                    // onChange: (e) => handleProfile(e)
                                                })}
                                            // onChange={(e) => { if (e.target.value.length === 11) return; handleChange(e) }}
                                            />
                                            {errors?.mobile?.message && <ErrorMessage message={errors?.mobile?.message} />}
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Password<span className="text-red-600">*</span>
                                            </p>
                                            <input
                                                type="password"
                                                name="password"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                {...register('password', {
                                                    required: 'Please enter password.',
                                                    validate: value => {
                                                        if (value === '') {
                                                            return true
                                                        }
                                                        if (!!value.trim()) {
                                                            return true
                                                        }
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/,
                                                        message:
                                                            'Password must contain lowercase, uppercase characters, numbers, special character and must be 8 characters long.'
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message: 'Maximum length must be 16.'
                                                    }
                                                })}
                                            // onChange={(e) => handleChange(e)}
                                            />
                                            {errors?.password?.message && <ErrorMessage message={errors?.password?.message} />}

                                            {/* <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Set the main image for the Post with a 1:1 Ratio
                                            </p> */}
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Confirm Password<span className="text-red-600">*</span>
                                            </p>
                                            <input
                                                type="password"
                                                // value={donar.confirmPassword}
                                                name="confirmPassword"
                                                {...register('confirmPassword', {
                                                    required: {
                                                        value: true,
                                                        message: 'Please enter confirm password.'
                                                    },
                                                    validate: val => {
                                                        if (watch('password') !== val) {
                                                            return 'Your passwords do not match.'
                                                        }
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message: 'Maximum length must be 16.'
                                                    }
                                                })}
                                                onChange={e => {
                                                    setValue('confirmPassword', e.target.value, {
                                                        shouldValidate: true
                                                    })
                                                }}
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                            // onChange={(e) => handleChange(e)}
                                            />
                                            {errors?.confirmPassword?.message && <ErrorMessage message={errors?.confirmPassword?.message} />}

                                            {/* <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Set a high-quality image for your post
                                            </p> */}
                                        </div>

                                    </div>
                                </div>

                                <hr className="h-[1px] bg-gray-100 my-14" />
                                <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                    <button
                                        onClick={() => navigate("/admin/donars")}
                                        className="bg-white border-[#452a72] rounded hover:bg-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-[#452a72] hover:text-white border lg:max-w-[95px]  w-full "
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        // onClick={(e) => {
                                        //     e.preventDefault();
                                        //     // if (donar.name === '' || donar.email === '' || donar.mobile === '' || donar.password === '' || donar.confirmPassword === '') {
                                        //     //     alert("Please fill all details.")
                                        //     //     return
                                        //     // }

                                        //     // if (donar.password !== donar.confirmPassword) {
                                        //     //     alert("Confirm password should not matched with password.")
                                        //     //     return
                                        //     // }
                                        //     // if (donar.mobile.length > 10 || donar.mobile.length < 10) {
                                        //     //     alert("Mobile no. should be 10 digits.")
                                        //     //     return
                                        //     // }
                                        //     Swal.fire({
                                        //         title: 'Are you sure?',
                                        //         text: 'Donar create',
                                        //         icon: 'warning',
                                        //         showCancelButton: true,
                                        //         confirmButtonColor: '#3085d6',
                                        //         cancelButtonColor: '#d33',
                                        //         confirmButtonText: 'Donar create!',
                                        //     }).then((result) => {
                                        //         if (result.isConfirmed) {
                                        //             handleFormSubmit(e)
                                        //             // Perform your action after confirmation
                                        //         }
                                        //     });
                                        // }}
                                        onClick={handleSubmit(handleFormSubmit)}
                                        className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[144px] w-full  "
                                    >
                                        Create
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

export default CreateDonar;

