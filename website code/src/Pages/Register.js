import React, { useState } from 'react';
import Img1 from '../Images/Others/signUp.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { Checkbox, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../hook/ErrorMessage';
import "../generosity/css/less/layout.less"
import "../generosity/css/less/reset.less"
import "../generosity/css/less/mixins.less"
import "../generosity/css/less/variables.less"
import "../generosity/css/venobox.css"
import "../generosity/css/animate.css"
import "../generosity/css/font-awesome.min.css"
import "../generosity/css/styles.css"

const Register = () => {
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();

    const [type, setType] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [checkboxError, setCheckboxError] = useState();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (type === '') {
            setCheckboxError("Please Select Type.")
            return
        }
        if (!checkbox) {
            setCheckboxError('Please read and accept the terms & conditions and privacy policy.')
            return
        }
        const payload = {
            "type": type,
            "name": data.name,
            "email": data.email,
            "password": data.password,
            "mobile": data.mobile
        }
        
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/sign-up`, payload);
        if (result.data.success) {
            reset()
            setType('');
            navigate('/verify-otp', { state: { email: data.email } })
            setTimeout(() => {
                toast.success(result.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            }, 500)
        } else {
            toast.error(result.data.msg, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-success'
            });
        }
    };

    return (
        <>
            <div className="w-full mx-auto">
                <div className="flex justify-center my-12">
                    {/* Row */}
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        {/* Col */}
                        <div
                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                            style={{
                                backgroundImage: `url(${Img1})`,
                            }}
                        ></div>
                        {/* Col */}
                        <section className="section-content-block">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="donation-form-wrapper">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="donation-form-info-2">
                                                    <h4>Sign up to your account</h4>
                                                    <div style={{ marginTop: '-1.4rem', marginBottom: '1.4rem' }}>
                                                        <span className="text-gray-600 text-sm">Already have an account? &nbsp; </span>
                                                        <Link to="/login" className="text-gray-700 text-sm font-semibold">
                                                            Sign in
                                                        </Link>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email" className="col-sm-2 control-label">Type<span style={{ color: 'red' }}>*</span>:
                                                        </label>
                                                        <div className="col-md-6 col-sm-10">
                                                            <input
                                                                id="student"
                                                                type="radio"
                                                                checked={type === 'student'}
                                                                onChange={() => setType('student')}
                                                                style={{ marginBottom: '3px'}}
                                                            /> &nbsp; <label for='student'>Student</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <input
                                                                id="donar"
                                                                type="radio"
                                                                checked={type === 'donar'}
                                                                onChange={() => setType('donar')}
                                                                style={{ marginBottom: '3px'}}
                                                            /> &nbsp;<label for='donar'>Donar</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="name" className="col-sm-2 control-label">Name<span style={{ color: 'red' }}>*</span>:
                                                        </label>
                                                        <div className="col-md-6 col-sm-10">
                                                            <input
                                                                className="form-control"
                                                                id="name"
                                                                type="text"
                                                                placeholder="Your Name"
                                                                name='name'
                                                                {...register('name', {
                                                                    required: 'Name is required.',
                                                                    maxLength: {
                                                                        value: 35,
                                                                        message: 'Name should be have 35 characters long.',
                                                                    },
                                                                })}
                                                                autoComplete='off'
                                                            />
                                                            {errors?.name?.message && <ErrorMessage message={errors?.name?.message} />}

                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email" className="col-sm-2 control-label">Email<span style={{ color: 'red' }}>*</span>:
                                                        </label>
                                                        <div className="col-md-6 col-sm-10">
                                                            <input
                                                                className="form-control"
                                                                id="email"
                                                                type="email"
                                                                placeholder="Your Email"
                                                                name='email'
                                                                {...register('email', {
                                                                    required: 'Email is required.',
                                                                    pattern: {
                                                                        value: /^\S+@\S+$/i,
                                                                        message: 'Invalid email address.',
                                                                    },
                                                                    // onChange: (e) => handleProfile(e)
                                                                })}
                                                                autoComplete='off'
                                                            />
                                                            {errors?.email?.message && <ErrorMessage message={errors?.email?.message} />}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="mobile" className="col-sm-2 control-label">Mobile No<span style={{ color: 'red' }}>*</span>:
                                                        </label>
                                                        <div className="col-md-6 col-sm-10">
                                                            <input
                                                                className="form-control"
                                                                id="mobile"
                                                                type="number"
                                                                placeholder="Mobile No"
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
                                                                        if (value.length > 10 || value.length < 10) return 'Mobile no. should be 10 digit.'
                                                                    },
                                                                    // onChange: (e) => handleProfile(e)
                                                                })}
                                                                autoComplete='off'
                                                            />
                                                            {errors?.mobile?.message && <ErrorMessage message={errors?.mobile?.message} />}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="password" className="col-sm-2 control-label">Password<span style={{ color: 'red' }}>*</span>:
                                                        </label>
                                                        <div className="col-md-6 col-sm-10">
                                                            <input
                                                                className="form-control"
                                                                id="password"
                                                                type="password"
                                                                placeholder="Password"
                                                                name='password'
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
                                                            />
                                                            {errors?.password?.message && <ErrorMessage message={errors?.password?.message} />}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="cpassword" className="col-sm-2 control-label">Confirm Password<span style={{ color: 'red' }}>*</span>:
                                                        </label>
                                                        <div className="col-md-6 col-sm-10">
                                                            <input
                                                                className="form-control"
                                                                id="cpassword"
                                                                type="password"
                                                                placeholder="Confirm password"
                                                                name='confirmpassword'
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
                                                            />
                                                            {errors?.confirmPassword?.message && <ErrorMessage message={errors?.confirmPassword?.message} />}
                                                        </div>
                                                    </div>

                                                    <div className="checkbox">
                                                        <label>
                                                            <input type="checkbox" defaultValue name="hide_name" onChange={(e) => { setCheckbox(!checkbox); setCheckboxError('') }} style={{ marginBottom: '-2px'}} />
                                                            I agree all statements in <Link to="/privacyPolicy" className="text-body"><u>Terms of service</u></Link>
                                                        </label>
                                                    </div>
                                                    {checkboxError && <div className='form-check flex justify-center items-center mx-auto' style={{ color: 'red' }}>{checkboxError}</div>}
                                                </div>
                                                <div className="donation-form-info-2">
                                                    <input type="submit" name="donate_now" defaultValue="Donate Now" className="btn btn-danger btn-lg btn-submit-donation" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* <div className="w-full xl:w-1/2 p-8">
                            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                                <h3 className="my-4 text-2xl font-semibold text-[#452a72]">Sign Up</h3>
                                <div>
                                    <span className="text-gray-600 text-sm">
                                        Already have an account? &nbsp;
                                    </span>
                                    <Link to="/login" className="text-gray-700 text-sm font-semibold">
                                        Sign in
                                    </Link>
                                </div>

                                <div className="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5 mb-4 mt-6">
                                    <div className="md:col-span-5">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="Name"
                                        >
                                            Type<span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            id="student"
                                            type="radio"
                                            checked={type === 'student'}
                                            onChange={() => setType('student')}
                                        />  <label for='student'>Student</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input
                                            id="donar"
                                            type="radio"
                                            checked={type === 'donar'}
                                            onChange={() => setType('donar')}
                                        /> <label for='donar'>Donar</label>
                                    </div>
                                    <div className="md:col-span-5">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="Name"
                                        >
                                            Name<span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                                            id="Name"
                                            type="text"
                                            placeholder="Your Name"
                                            name='name'
                                            {...register('name', {
                                                required: 'Name is required.',
                                                maxLength: {
                                                    value: 35,
                                                    message: 'Name should be have 35 characters long.',
                                                },
                                            })}
                                            autoComplete='off'
                                        />
                                        {errors?.name?.message && <ErrorMessage message={errors?.name?.message} />}
                                    </div>
                                    <div className="md:col-span-5">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="email"
                                        >
                                            Email<span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                                            id="email"
                                            type="email"
                                            placeholder="Your Email"
                                            name='email'
                                            {...register('email', {
                                                required: 'Email is required.',
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message: 'Invalid email address.',
                                                },
                                                // onChange: (e) => handleProfile(e)
                                            })}
                                            autoComplete='off'
                                        />
                                        {errors?.email?.message && <ErrorMessage message={errors?.email?.message} />}
                                    </div>
                                    <div className="md:col-span-5">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="mobile"
                                        >
                                            Mobile No<span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center  focus:outline-none h-10  mt-1  px-4 w-full bg-gray-50 border border-gray-200"
                                            id="mobile"
                                            type="number"
                                            placeholder="Mobile No"
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
                                                    if (value.length > 10 || value.length < 10) return 'Mobile no. should be 10 digit.'
                                                },
                                                // onChange: (e) => handleProfile(e)
                                            })}
                                            autoComplete='off'
                                        />
                                        {errors?.mobile?.message && <ErrorMessage message={errors?.mobile?.message} />}
                                    </div>
                                    <div className="md:col-span-5 ">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="password"
                                        >
                                            Password<span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50  leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            name='password'
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
                                        />
                                        {errors?.password?.message && <ErrorMessage message={errors?.password?.message} />}
                                    </div>
                                    <div className="md:col-span-5 ">
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="cpassword"
                                        >
                                            Confirm Password<span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50  leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200"
                                            id="cpassword"
                                            type="password"
                                            placeholder="confirm password"
                                            name='confirmpassword'
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
                                        />
                                        {errors?.confirmPassword?.message && <ErrorMessage message={errors?.confirmPassword?.message} />}
                                    </div>
                                    <div className="md:col-span-5">
                                        <div class="form-check flex justify-center items-center mx-auto">

                                            <input style={{ width: "15px", height: "15px" }} class="form-check-input me-2 " type="checkbox" value="" id="form2Example3cg" onChange={(e) => { setCheckbox(!checkbox); setCheckboxError('') }} />
                                            <label class="form-check-label" for="form2Example3cg">
                                                I agree all statements in <Link to="/privacyPolicy" className="text-body"><u>Terms of service</u></Link>
                                            </label>
                                        </div>
                                        {checkboxError && <div className='form-check flex justify-center items-center mx-auto' style={{ color: 'red' }}>{checkboxError}</div>}
                                    </div>

                                </div>
                                <div className="flex w-full mt-8">
                                    <button
                                        className="w-full bg-[#452a72]  text-white  hover:border hover:border-[#452a72] text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                                        type="submit"
                                    // disabled={!checkbox}
                                    >
                                        SignUp
                                    </button>
                                </div>
                            </form>

                        </div> */}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Register;
