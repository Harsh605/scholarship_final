import React, { useEffect, useState } from 'react';
import Img1 from '../Images//Others/signIn.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const AdminLogin = () => {

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (data) => {
    const payload = {
      "email": data.email,
      "password": data.password
    }
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin-sign-in`, payload);
    if (result.data.success) {
      reset()
      localStorage.removeItem('token')
      localStorage.removeItem('adminToken')
      localStorage.removeItem('user')
      localStorage.removeItem('type')
      localStorage.setItem('adminToken', result.data.data.admin.jwtToken)
      localStorage.setItem('admin', JSON.stringify(result.data.data.admin))
      localStorage.setItem('type', 'admin')
      navigate('/admin/dashboard')
      setTimeout(() => {
        toast.success(result.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
      }, 500)
    } else {
      // alert(data.data.msg)
      if (result.data.msg === 'Your Account is not verified.') {
        navigate('/verify-otp', { state: { email: data.email } });
        toast.error(result.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-error'
        });
      }
      toast.error(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        className: 'toast-error'
      });
      // navigate('/login')
    }
  };

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    if (adminToken)
      navigate('/admin/dashboard')
  }, [])

  return (
    <>
      <div className="mt-24 container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
        <div className="relative hidden xl:block xl:w-1/2 h-full">
          <img
            className="absolute h-auto w-full object-cover"
            src={Img1}
            alt="my zomato"
            style={{
              height: '24rem'
            }}
          />
        </div>
        <section className="section-content-block">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="donation-form-wrapper">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="donation-form-info-2">
                      <h4>Admin sign in page</h4>
                      <div className="form-group">
                        <label htmlFor="email" className="col-sm-2 control-label">Email<span style={{ color: 'red' }}>*</span>:
                        </label>
                        <div className="col-md-6 col-sm-10">
                          <input
                            className="form-control"
                            id="email"
                            type="email"
                            placeholder="Your email address"
                            name='email'
                            {...register('email', {
                              required: 'Email is required.',
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address.',
                              },
                            })}
                          />
                          {errors?.email?.message && <ErrorMessage message={errors?.email?.message} />}

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
                            name='password'
                            placeholder="Your password"
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

                      <div className="checkbox">
                        <div className='flex justify-between'>
                          {/* <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded   focus:outline-none "
                />
                <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
              </div> */}
                          <Link
                            className="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
                            to="/admin-forgot-password"
                          >
                            Forgot Password
                          </Link>
                        </div>
                        {/* <label>
                            <input type="checkbox" defaultValue name="hide_name" />
                            Please do not publish my name. I would like to remain anonymous.
                          </label> */}
                      </div>
                    </div>
                    {/* end .donation-form-info-2  */}
                    <div className="donation-form-info-2">
                      <input type="submit" name="donate_now" defaultValue="Donate Now" className="btn btn-danger btn-lg btn-submit-donation" />
                    </div>
                    {/* <h1 className="text-2xl font-bold text-[#452a72]">
              Sign in to your account
            </h1>
            <div>
              <span className="text-gray-600 text-sm">Don't have an account? &nbsp; </span>
              <Link to="/register" className="text-gray-700 text-sm font-semibold">
                Sign up
              </Link>
            </div>
            <div className="mb-6 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email<span className="text-red-600">*</span>
              </label>
              <input
                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                id="email"
                type="email"
                placeholder="Your email address"
                name='email'
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address.',
                  },
                })}
              />
              {errors?.email?.message && <ErrorMessage message={errors?.email?.message} />}

            </div>
            <div className="mb-6 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password<span className="text-red-600">*</span>
              </label>
              <input
                className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10"
                id="password"
                type="password"
                name='password'
                placeholder="Your password"
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
            <div className='flex justify-between'>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded   focus:outline-none "
                />
                <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
              </div>
              <Link
                className="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>


            <div className="flex w-full mt-8">
              <button
                className="w-full bg-[#452a72]   hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                type="submit"
              >
                Sign in
              </button>
            </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div >
        </section >
        {/* <div className="w-full xl:w-1/2 pl-8 pr-8 pb-8 pt-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold text-[#452a72]">
              Admin sign in page
            </h1>
            <div className="mb-6 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email<span className="text-red-600">*</span>
              </label>
              <input
                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                id="email"
                type="email"
                placeholder="Your email address"
                name='email'
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address.',
                  },
                })}
              />
              {errors?.email?.message && <ErrorMessage message={errors?.email?.message} />}

            </div>
            <div className="mb-6 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password<span className="text-red-600">*</span>
              </label>
              <input
                className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10"
                id="password"
                type="password"
                name='password'
                placeholder="Your password"
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
            <div className='flex justify-between'>
              <div className="flex items-center space-x-2">
                <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
              </div>
              <Link
                className="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
                to="/admin-forgot-password"
              >
                Forgot Password?
              </Link>
            </div>


            <div className="flex w-full mt-8">
              <button
                className="w-full bg-[#452a72]   hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
        </div> */}
      </div >
      <ToastContainer />
    </>
  );
};

export default AdminLogin;
