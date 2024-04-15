import React, { useState } from 'react';
import Img1 from '../Images/Doctors/article1.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../hook/ErrorMessage';

const AdminForgotPassword = () => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const payload = {
      "email": data.email
    }
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/forgot-admin-password`, payload);
    if (result.data.success) {
      reset()

      navigate('/verify-otp', { state: { email: data.email, text: 'admin-forgot-password' } })
      setTimeout(() => {
        toast.success(result.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
      }, 500)
    } else {
      toast.error(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        className: 'toast-error'
      });
    }
  };

  return (
    <>
      <div className="mt-24 container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
        <div className="relative hidden xl:block xl:w-1/2 h-full">
          <img
            className="absolute h-auto w-full object-cover"
            src={Img1}
            alt="my zomato"
          />
        </div>
        <section className="section-content-block">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="donation-form-wrapper">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="donation-form-info-2">
                      <h4>Forgot Password</h4>
                      {/* <div style={{ marginTop: '-1.4rem', marginBottom: '1.4rem' }}>
                        <span className="text-gray-600 text-sm">Don't have an account? &nbsp; </span>
                        <Link to="/register" className="text-gray-700 text-sm font-semibold">
                          Sign up
                        </Link>
                      </div> */}
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

                      <div className="checkbox">
                        {/* <label>
                            <input type="checkbox" defaultValue name="hide_name" />
                            Please do not publish my name. I would like to remain anonymous.
                          </label> */}
                      </div>
                    </div>
                    {/* end .donation-form-info-2  */}
                    <div className="donation-form-info-2">
                      <input type="submit" name="donate_now" value="Send" className="btn btn-danger btn-lg btn-submit-donation" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="w-full xl:w-1/2 pl-8 pr-8 pb-8 pt-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold text-[#452a72]">
              Forgot Password
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

            <div className="flex w-full mt-8">
              <button
                className="w-full bg-[#452a72]   hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminForgotPassword;
