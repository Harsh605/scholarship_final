import React, { useState } from 'react';
import Img1 from '../Images/Doctors/article1.jpeg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../hook/ErrorMessage';
// import "../generosity/css/less/layout.less"
// import "../generosity/css/less/reset.less"
// import "../generosity/css/less/mixins.less"
// import "../generosity/css/less/variables.less"
// import "../generosity/css/venobox.css"
// import "../generosity/css/animate.css"
// import "../generosity/css/font-awesome.min.css"
// import "../generosity/css/styles.css"

const UpdatePassword = () => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate()

  const onSubmit = async (data) => {

    const payload = {
      email: location.state.email,
      password: data.password
    }
    let apiUrl = ''
    if (location?.state?.text === 'admin-forgot-password')
      apiUrl = `${process.env.REACT_APP_API_URL}/api/update-admin-password`
    else
      apiUrl = `${process.env.REACT_APP_API_URL}/api/update-password`
    const result = await axios.post(apiUrl, payload);
    if (result.data.success) {
      reset()

      if (location?.state?.text === 'admin-forgot-password')
        navigate('/admin-login')
      else
        navigate('/login')
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
                      <h4>Update Password</h4>
                      {/* <div style={{ marginTop: '-1.4rem', marginBottom: '1.4rem' }}>
                        <span className="text-gray-600 text-sm">Don't have an account? &nbsp; </span>
                        <Link to="/register" className="text-gray-700 text-sm font-semibold">
                          Sign up
                        </Link>
                      </div> */}
                      <div className="form-group" style={{ marginTop: '1.5rem' }}>
                        <label htmlFor="password" className="col-sm-2 control-label">Password<span style={{ color: 'red' }}>*</span>:
                        </label>
                        <div className="col-md-6 col-sm-10">
                          <input
                            className="form-control"
                            id="password"
                            type="password"
                            placeholder="New Password"
                            name='password'
                            {...register('password', {
                              required: 'Please enter new password.',
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
                          <span className="mt-3 text-xs leading-3 text-red-600">{errors?.password?.message}</span>

                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="cPassword" className="col-sm-2 control-label">Confirm Password<span style={{ color: 'red' }}>*</span>:
                        </label>
                        <div className="col-md-6 col-sm-10">
                          <input
                            className="form-control"
                            id="cPassword"
                            type="password"
                            placeholder="Confirm Password"
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
                          <span className="mt-3 text-xs leading-3 text-red-600">{errors?.confirmPassword?.message}</span>

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
                      <input type="submit" name="donate_now" value="Update Password" className="btn btn-danger btn-lg btn-submit-donation" />
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
              Update Password
            </h1>


            <div className="mb-3 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password<span className="text-red-600">*</span>
              </label>
              <input
                className="mb-2 text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10"
                id="password"
                type="password"
                placeholder="New Password"
                name='password'
                {...register('password', {
                  required: 'Please enter new password.',
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
              <span className="mt-3 text-xs leading-3 text-red-600">{errors?.password?.message}</span>


            </div>

            <div className="mb-3 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="cPassword"
              >
                Confirm Password<span className="text-red-600">*</span>
              </label>
              <input
                className="mb-2 text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10"
                id="cPassword"
                type="password"
                placeholder="Confirm Password"
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
              <span className="mt-3 text-xs leading-3 text-red-600">{errors?.confirmPassword?.message}</span>

            </div>

            <div className="flex w-full mt-8">
              <button
                className="w-full bg-[#452a72]   hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdatePassword;
