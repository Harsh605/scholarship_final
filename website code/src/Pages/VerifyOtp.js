import React, { useEffect, useState } from 'react';
import Img1 from '../Images/Doctors/doctor1.webp';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OTPInput from 'react-otp-input';
import '../styles/css/verifyOtp.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "../generosity/css/less/layout.less"
// import "../generosity/css/less/reset.less"
// import "../generosity/css/less/mixins.less"
// import "../generosity/css/less/variables.less"
// import "../generosity/css/venobox.css"
// import "../generosity/css/animate.css"
// import "../generosity/css/font-awesome.min.css"
// import "../generosity/css/styles.css"

const VerifyOtp = () => {

    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp === '') {
            alert("Please fill otp.")
            return
        }

        const payload = {
            email: location.state.email,
            otp: otp
        }
        if (location?.state?.text === 'forgot-password') {
            payload.text = 'forgot-password'
        }
        let apiUrl = ''
        if (location?.state?.text === 'admin-forgot-password')
            apiUrl = `${process.env.REACT_APP_API_URL}/api/admin-verify-otp`
        else
            apiUrl = `${process.env.REACT_APP_API_URL}/api/verify-otp`
        const data = await axios.post(apiUrl, payload);
        if (data.data.success) {
            if (location?.state?.text)
                navigate('/update-password', { state: { email: location.state.email, text: location?.state?.text } })
            else
                navigate('/login')

            setTimeout(() => {
                toast.success(data.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            }, 500)
        } else {
            toast.error(data.data.msg, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error'
            });
        }
    };

    const handleResendOtp = async (e) => {
        e.preventDefault();

        const payload = {
            email: location.state.email
        }
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/resend-otp`, payload);
        if (data.data.success) {
            // alert(data.data.msg)
            toast.success(data.data.msg, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-success'
            });
        } else {
            // alert(data.data.msg)
            toast.error(data.data.msg, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error'
            });
        }
    };

    function handleChange(otp) {
        setOtp(otp);
    }

    useEffect(() => {
        if (!location?.state?.email || location.state.email === '') navigate('/login')
    }, [])

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
                                            <form onSubmit={handleSubmit}>
                                                <div className="donation-form-info-2">
                                                    <h4>Verify OTP</h4>
                                                    <div className="otpElements">
                                                        <p className="p3" style={{ color: 'black', fontWeight: '700' }}>Enter your OTP here<span className="text-red-600">*</span></p>
                                                        <div className="otp">
                                                            <OTPInput
                                                                onChange={handleChange}
                                                                value={otp}
                                                                inputStyle="inputStyle"
                                                                numInputs={4}
                                                                separator={<span></span>}
                                                                renderInput={(props) => <input {...props} />}
                                                            />
                                                        </div>

                                                        <p className="p3" style={{ color: 'black', fontWeight: '500', marginTop: '10px' }}>Didn't receive the code?&nbsp;

                                                            <span className="" style={{ color: 'black', fontWeight: '700', cursor: 'pointer' }} onClick={(e) => handleResendOtp(e)}> Resend Otp</span>
                                                        </p>
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
                        {/* <div className="w-full xl:w-1/2 p-8">
                            <form method="post" action="#" onSubmit={handleSubmit}>
                                <h3 className="my-4 text-2xl font-semibold text-[#452a72]">Verify OTP</h3>
                              

                                <div className="otpElements">
                                    <p className="p3" style={{ color: 'black', fontWeight: '700' }}>Enter your OTP here<span className="text-red-600">*</span></p>
                                    <div className="otp">
                                        <OTPInput
                                            onChange={handleChange}
                                            value={otp}
                                            inputStyle="inputStyle"
                                            numInputs={4}
                                            separator={<span></span>}
                                            renderInput={(props) => <input {...props} />}
                                        />
                                    </div>

                                    <p className="p3" style={{ color: 'black', fontWeight: '500', marginTop: '10px' }}>Didn't receive the code?&nbsp;

                                        <span className="" style={{ color: 'black', fontWeight: '700', cursor: 'pointer' }} onClick={(e) => handleResendOtp(e)}> Resend Otp</span>
                                    </p>
                                </div>
                                <div className="flex w-full mt-8">
                                    <button
                                        className="w-full bg-[#452a72]  text-white  hover:border hover:border-[#452a72] text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                                        type="submit"
                                        disabled={!otp}
                                    >
                                        Verify
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

export default VerifyOtp;
