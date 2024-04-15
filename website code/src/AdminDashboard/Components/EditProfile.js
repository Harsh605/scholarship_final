import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import './style.css';
import { CityStateDropDown, CountryDropDown, handleUnAuthorized, preventMaxInput } from "../../hook/handleUnauthorized";
import ErrorMessage from "../../hook/ErrorMessage";

function EditProfile() {
    const navigate = useNavigate();
    const { register: profileRegister, handleSubmit: profileSubmit, reset: profileReset, formState: { errors: profileError } } = useForm();
    const { register: kycRegister, handleSubmit: kycSubmit, reset: kycReset, formState: { errors: kycError } } = useForm();
    const { register: addressRegister, handleSubmit: addressSubmit, formState: { errors: addressError } } = useForm();
    const [admin, setAdmin] = useState({});
    const [type, setType] = useState('student');
    const [address, setAddress] = useState({});
    const [bank, setBank] = useState({});
    const [kyc, setKyc] = useState({});
    const [professional, setProfessional] = useState({});
    const [education, setEducation] = useState({});

    function imageViewer() {
        let imgs = document.getElementsByClassName("img"),
            out = document.getElementsByClassName("img-out")[0];
        for (let i = 0; i < imgs.length; i++) {

            if (!imgs[i].classList.contains("el")) {

                imgs[i].classList.add("el");
                imgs[i].addEventListener("click", lightImage);
                function lightImage() {
                    let container = document.getElementsByClassName("img-panel")[i];
                    container.classList.toggle("img-panel__selct");
                };

                imgs[i].addEventListener("click", openImage);
                function openImage() {
                    let imgElement = document.createElement("img"),
                        imgWrapper = document.createElement("div"),
                        imgClose = document.createElement("div"),
                        container = document.getElementsByClassName("img-panel")[i];
                    container.classList.add("img-panel__selct");
                    imgElement.setAttribute("class", "image__selected");
                    imgElement.src = imgs[i].src;
                    imgWrapper.setAttribute("class", "img-wrapper");
                    imgClose.setAttribute("class", "img-close");
                    imgWrapper.appendChild(imgElement);
                    imgWrapper.appendChild(imgClose);


                    setTimeout(
                        function () {
                            imgWrapper.classList.add("img-wrapper__initial");
                            imgElement.classList.add("img-selected-initial");
                        }, 50);

                    out.appendChild(imgWrapper);
                    imgClose.addEventListener("click", function () {
                        container.classList.remove("img-panel__selct");
                        out.removeChild(imgWrapper);
                    });
                }
            }
        }
    }

    const profileGet = async () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-admin-profile`, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                localStorage.setItem('admin', JSON.stringify(data.data.data.admin))
                profileReset(data.data.data.admin)
                kycReset(data.data.data.kyc)
                setAdmin(data.data.data.admin)
                setAddress(data.data.data.address)
                setKyc(data.data.data.kyc)
                setType(data.data.data.admin.type)
                imageViewer()
            } else {
                handleUnAuthorized(data.data.msg, navigate)
            }
            // setUser(jwt_decode(token));
        } else {
            navigate('/login')
            // localStorage.removeItem('token')
        }
    }

    const profileEdit = async (data) => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const form = new FormData();
            form.append('name', data.name)
            form.append('email', data.email)
            form.append('mobile', data.mobile)
            form.append('profile-pic', data.image[0])
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-admin-profile`, form, { headers: { Authorization: adminToken } });
            if (result.data.success) {
                localStorage.removeItem('token')
                localStorage.removeItem('adminToken')
                localStorage.removeItem('user')
                localStorage.removeItem('type')
                localStorage.setItem('adminToken', result.data.data.data.jwtToken)
                localStorage.setItem('admin', JSON.stringify(result.data.data.data))
                localStorage.setItem('type', 'admin')
                // profileGet()
                // alert(data.data.msg)
                toast.success(result.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            } else {
                handleUnAuthorized(result.data.msg, navigate)
            }
        } else {
            navigate('/login')
        }
    }

    const addressEdit = async () => {
        if (!address.street || !address.pinCode || !address.city || !address.state || !address.country) {
            alert('Fill Address Detail Properly.')
            return
        }
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const payload = {
                street: address.street,
                pinCode: address.pinCode,
                city: address.city,
                state: address.state,
                country: address.country
            }
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-admin-address`, payload, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                profileGet()
                // alert(data.data.msg)
                toast.success(data.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            } else {
                handleUnAuthorized(data.data.msg, navigate)
            }
        } else {
            navigate('/login')
        }
    }

    const kycEdit = async (data) => {
        // if (!kyc.panNo || !kyc.tanNo || !kyc.panImage || !kyc.tanImage) {
        //     alert('Fill KYC Detail Properly.')
        //     return
        // }
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            const form = new FormData();
            form.append('panNo', data.panNo)
            form.append('tanNo', data.tanNo)
            // form.append('aadharNo', data.aadharNo)
            // if (typeof kyc.panImage === 'object')
            form.append('panImage', data.panImage[0])

            // if (typeof kyc.tanImage === 'object')
            form.append('tanImage', data.tanImage[0])

            const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-admin-kyc`, form, { headers: { Authorization: adminToken } });
            if (result.data.success) {
                profileGet()
                // alert(data.data.msg)
                toast.success(result.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            } else {
                handleUnAuthorized(result.data.msg, navigate)
            }
        } else {
            navigate('/login')
        }
    }

    const handleProfile = (e) => setAdmin({ ...admin, [e.target.name]: e.target.value })

    const handleAddress = (e) => setAddress({ ...address, [e.target.name]: e.target.value })

    const handleKYC = (e) => setKyc({ ...kyc, [e.target.name]: e.target.value })

    useEffect(() => {
        profileGet()
    }, []);



    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Perform submit logic or API call here
    // };

    return (
        <>
            <div className="px-0 py-0 ">
                <div className="flex flex-no-wrap items-start">
                    <div className="w-full ">
                        <div className="py-4 px-2">
                            <div className="bg-white rounded shadow py-7">
                                <div className="mt-10 px-7">
                                    {/* <form> */}
                                    <p className="text-xl font-semibold leading-tight text-gray-800">
                                        Update Your Profile Detail
                                    </p>
                                    <div className="img-out"></div>
                                    <form onSubmit={profileSubmit(profileEdit)}>
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-7 border p-3">
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Name<span className="text-red-600">*</span>
                                                </p>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={admin?.name}
                                                    name="name"
                                                    onInput={e => preventMaxInput(e, 35)}
                                                    {...profileRegister('name', {
                                                        required: 'Name is required.',
                                                        maxLength: {
                                                            value: 35,
                                                            message: 'Name should be have 35 characters long.',
                                                        },
                                                        // onChange: (e) => handleProfile(e)
                                                    })}

                                                />


                                                {profileError?.name?.message ? <ErrorMessage message={profileError?.name?.message} /> : <p className="mt-3 text-xs leading-3 text-gray-600">
                                                    Update Your Name
                                                </p>}
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Email<span className="text-red-600">*</span>
                                                </p>
                                                <input
                                                    type="email"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={admin?.email}
                                                    name="email"
                                                    {...profileRegister('email', {
                                                        required: 'Email is required.',
                                                        pattern: {
                                                            value: /^\S+@\S+$/i,
                                                            message: 'Invalid email address.',
                                                        },
                                                        // onChange: (e) => handleProfile(e)
                                                    })}
                                                />


                                                {profileError?.email?.message ? <ErrorMessage message={profileError?.email?.message} /> : <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Update Your Email
                                                </p>}
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Phone No<span className="text-red-600">*</span>
                                                </p>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={admin?.mobile}
                                                    name="mobile"
                                                    // maxLength={10}
                                                    {...profileRegister('mobile', {
                                                        required: 'Mobile no. is required.',
                                                        validate: (value) => {
                                                            if (value.length > 10) return 'Mobile no. should be 10 digit.'
                                                        },
                                                        // onChange: (e) => handleProfile(e)
                                                    })}
                                                />
                                                {profileError?.mobile?.message ? <ErrorMessage message={profileError?.mobile?.message} /> : <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Update Your Phone No
                                                </p>}
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Your Photo
                                                </p>
                                                <input
                                                    // accept="image/*"
                                                    type="file"
                                                    name="image"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    // value={photo}
                                                    {...profileRegister('image', {
                                                    })}
                                                // onChange={(e) => setAdmin({ ...admin, ['image']: e.target.files[0] })}
                                                />
                                                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Set Your Photo
                                                </p>
                                                {admin?.image && <div className="img-panel">
                                                    <img className="img" src={admin?.image} alt="kyc" style={{
                                                        borderRadius: '5px',
                                                        width: '2rem',
                                                        height: '2rem',
                                                    }}
                                                    />
                                                </div>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                            <button
                                                type="submit"
                                                // onClick={() => profileEdit()}
                                                className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[144px] w-full "
                                            >
                                                Update Profile
                                            </button>
                                        </div>
                                    </form>
                                    {/* ---------------------- Address Detail -------------------- */}
                                    <p className="text-xl font-semibold leading-tight text-gray-800">
                                        Update Your Address Detail
                                    </p>
                                    <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-7 border p-3">
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                Street Address<span className="text-red-600">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                name="street"
                                                value={address?.street}
                                                onChange={(e) => handleAddress(e)}
                                            />
                                            <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Update Your Street
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-base font-medium leading-none text-gray-800">
                                                PinCode<span className="text-red-600">*</span>
                                            </p>
                                            <input
                                                type="number"
                                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                name="pinCode"
                                                value={address?.pinCode}
                                                onChange={(e) => { if (!/^[0-9]+$/.test(e.target.value)) return; handleAddress(e) }}
                                            />
                                            {console.log(address, "address")}
                                            <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                Update Your PinCode
                                            </p>
                                        </div>
                                        {/* <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    City
                                                </p>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    name="city"
                                                    value={address?.city}
                                                    onChange={(e) => handleAddress(e)}
                                                />
                                                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Update Your City
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    State/Province
                                                </p>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                    value={address?.state}
                                                    name="state"
                                                    onChange={(e) => handleAddress(e)}
                                                />
                                                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                    Update your State/Province
                                                </p>
                                            </div> */}
                                        <CityStateDropDown address={address} setAddress={setAddress} type={'city'} />
                                        <CityStateDropDown address={address} setAddress={setAddress} type={'state'} />
                                        <CountryDropDown address={address} setAddress={setAddress} />
                                        {/* <div>
                        <p className="text-base font-medium leading-none text-gray-800">
                          Country
                        </p>
                        <input
                          type="text"
                          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                          name="country"
                          value={address?.country}
                          onChange={(e) => handleAddress(e)}
                        />
                        <p className="mt-3 text-xs leading-[15px] text-gray-600">
                          Update Your Country
                        </p>
                      </div> */}
                                    </div>
                                    <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-6 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                        <button
                                            type="submit"
                                            onClick={() => addressEdit()}
                                            className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[160px] w-full "
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                    {/* ---------------------- KYC Detail -------------------- */}
                                    <form onSubmit={kycSubmit(kycEdit)}>
                                        <p className="text-xl font-semibold leading-tight text-gray-800">
                                            Update Your KYC Detail
                                        </p>
                                        <div className=" mt-7 border p-3">
                                            <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 border p-2">
                                                <div>
                                                    <p className="text-base font-medium leading-none text-gray-800">
                                                        Pan No.<span className="text-red-600">*</span>
                                                    </p>
                                                    <input
                                                        type="number"
                                                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                        name="panNo"
                                                        {...kycRegister('panNo', {
                                                            required: 'Pan number is required.',
                                                            validate: (value) => {
                                                                if (value.length > 16) return 'Pan number should be 16 digit.'
                                                            },
                                                            // onChange: (e) => handleProfile(e)
                                                        })}
                                                    // value={kyc?.panNo}
                                                    // onChange={(e) => handleKYC(e)}
                                                    />
                                                    {kycError?.panNo?.message ? <ErrorMessage message={kycError?.panNo?.message} /> : <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                        Update Your Pan No.
                                                    </p>}
                                                </div>
                                                <div>
                                                    <p className="text-base font-medium leading-none text-gray-800">
                                                        Upload Pan Card ( PNG, JPG, PDF )
                                                    </p>
                                                    <input
                                                        // accept="image/*"
                                                        type="file"
                                                        name="image"
                                                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                        // value={photo}
                                                        {...kycRegister('panImage', {
                                                        })}
                                                    // onChange={(e) => setKyc({ ...kyc, ['panImage']: e.target.files[0] })}
                                                    />
                                                    <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                        Update Your Pan Card Image
                                                    </p>
                                                    {kyc?.panImage && <div className="img-panel">
                                                        <img className="img" src={kyc?.panImage} alt="kyc" style={{
                                                            borderRadius: '5px',
                                                            width: '2rem',
                                                            height: '2rem',
                                                        }}
                                                        />
                                                    </div>}
                                                </div>
                                            </div>
                                            <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 border p-2 mt-2">
                                                <div>
                                                    <p className="text-base font-medium leading-none text-gray-800">
                                                        Tan No.<span className="text-red-600">*</span>
                                                    </p>
                                                    <input
                                                        type="number"
                                                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                        name="tanNo"
                                                        {...kycRegister('tanNo', {
                                                            required: 'Tan number is required.',
                                                            validate: (value) => {
                                                                if (value.length > 16) return 'Tan number should be 16 digit.'
                                                            },
                                                            // onChange: (e) => handleProfile(e)
                                                        })}
                                                    // value={kyc?.tanNo}
                                                    // onChange={(e) => handleKYC(e)}
                                                    />
                                                    {kycError?.tanNo?.message ? <ErrorMessage message={kycError?.tanNo?.message} /> : <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                        Update Your Tan No.
                                                    </p>}
                                                </div>
                                                <div>
                                                    <p className="text-base font-medium leading-none text-gray-800">
                                                        Upload Tan No (PNG, JPG, PDF )
                                                    </p>
                                                    <input
                                                        // accept="image/*"
                                                        type="file"
                                                        name="image"
                                                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                                        // value={photo}
                                                        {...kycRegister('tanImage', {
                                                        })}
                                                    // onChange={(e) => setKyc({ ...kyc, ['tanImage']: e.target.files[0] })}
                                                    />
                                                    <p className="mt-3 text-xs leading-[15px] text-gray-600">
                                                        Update Your Tan Card Image
                                                    </p>
                                                    {kyc?.tanImage && <div className="img-panel">
                                                        <img className="img" src={kyc?.tanImage} alt="kyc" style={{
                                                            borderRadius: '5px',
                                                            width: '2rem',
                                                            height: '2rem',
                                                        }}
                                                        />
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-6 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                            <button
                                                type="submit"
                                                // onClick={() => kycEdit()}
                                                className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[160px] w-full "
                                            >
                                                Update KYC
                                            </button>
                                        </div>
                                    </form>
                                    {/* </form> */}
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

export default EditProfile;
