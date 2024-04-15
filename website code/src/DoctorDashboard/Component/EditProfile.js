import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import { useForm } from 'react-hook-form';
import { AnnualIncomeDropDown, CityStateDropDown, ClassDropDown, CountryDropDown, handleUnAuthorized } from "../../hook/handleUnauthorized";
import ErrorMessage from "../../hook/ErrorMessage";

function EditProfile() {
  const navigate = useNavigate();
  const { register: profileRegister, handleSubmit: profileSubmit, reset: profileReset, formState: { errors: profileError } } = useForm();
  const { register: kycRegister, handleSubmit: kycSubmit, reset: kycReset, formState: { errors: kycError } } = useForm();
  const { register: eductaionRegister, handleSubmit: eductaionSubmit, reset: educationReset, formState: { errors: eductaionError } } = useForm();
  const { register: bankRegister, handleSubmit: bankSubmit, reset: bankReset, formState: { errors: bankError } } = useForm();
  const [user, setUser] = useState({});
  const [type, setType] = useState('student');
  const [address, setAddress] = useState({});
  const [pursuingClass, setPursuingClass] = useState(false);
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
    const token = localStorage.getItem('token') || ''
    if (token) {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-profile`, { headers: { Authorization: token } });
      if (data.data.success) {
        localStorage.setItem('user', JSON.stringify(data.data.data.user))
        profileReset(data.data.data.user)
        kycReset(data.data.data.kyc)
        educationReset(data.data.data.education)
        bankReset(data.data.data.bank)
        setUser(data.data.data.user)
        setAddress(data.data.data.address)
        setBank(data.data.data.bank)
        setKyc(data.data.data.kyc)
        setProfessional(data.data.data.professional)
        setEducation(data.data.data.education)
        setType(data.data.data.user.type)
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
    const token = localStorage.getItem('token') || ''
    if (token) {
      const form = new FormData();
      form.append('name', data.name)
      form.append('email', data.email)
      form.append('mobile', data.mobile)
      form.append('profile-pic', data.image[0])
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-profile`, form, { headers: { Authorization: token } });
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

  const addressEdit = async () => {
    if (!address.street || !address.pinCode || !address.city || !address.state || !address.country) {
      alert('Fill Address Detail Properly.')
      return
    }
    const token = localStorage.getItem('token') || ''
    if (token) {
      const payload = {
        street: address.street,
        pinCode: address.pinCode,
        city: address.city,
        state: address.state,
        country: address.country
      }
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-address`, payload, { headers: { Authorization: token } });
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

  const bankEdit = async (data) => {
    // if (!bank.bankName || !bank.accountHolderName || !bank.accountNo || !bank.ifsc) {
    //   alert('Fill Bank Detail Properly.')
    //   return
    // }
    const token = localStorage.getItem('token') || ''
    if (token) {
      const payload = {
        bankName: data.bankName,
        accountHolderName: data.accountHolderName,
        accountNo: data.accountNo,
        ifsc: data.ifsc
      }
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-bank`, payload, { headers: { Authorization: token } });
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

  const kycEdit = async (data) => {
    const token = localStorage.getItem('token') || ''
    if (token) {
      const form = new FormData();
      form.append('panNo', data.panNo)
      form.append('tanNo', data.tanNo)
      form.append('aadharNo', data.aadharNo)
      // if (typeof data.aadharFront === 'object')
      form.append('aadharFront', data.aadharFront[0])

      // if (typeof data.aadharBack === 'object')
      form.append('aadharBack', data.aadharBack[0])

      // if (typeof data.panImage === 'object')
      form.append('panImage', data.panImage[0])

      // if (typeof data.tanImage === 'object')
      form.append('tanImage', data.tanImage[0])

      const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-kyc`, form, { headers: { Authorization: token } });
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

  const professionalEdit = async () => {
    if (!professional.occupation || !professional.designation || !professional.annualIncome) {
      alert('Fill Professional Detail Properly.')
      return
    }
    const token = localStorage.getItem('token') || ''
    if (token) {
      const payload = {
        fatherName: professional.fatherName,
        occupation: professional.occupation,
        designation: professional.designation,
        annualIncome: professional.annualIncome
      }
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-professional`, payload, { headers: { Authorization: token } });
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

  const currentEductaionEdit = async (data) => {
    if (!education.pursuingClass) {
      setPursuingClass(true)
      return
    }
    const token = localStorage.getItem('token') || ''
    if (token) {
      const payload = {
        pursuingClass: education.pursuingClass,
        year: data.year
      }
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-eductaion-detail`, payload, { headers: { Authorization: token } });
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

  const handleProfile = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const handleAddress = (e) => setAddress({ ...address, [e.target.name]: e.target.value })

  const handleBank = (e) => setBank({ ...bank, [e.target.name]: e.target.value })

  const handleKYC = (e) => setKyc({ ...kyc, [e.target.name]: e.target.value })

  const handleProfessional = (e) => setProfessional({ ...professional, [e.target.name]: e.target.value })

  const handleCurrentEducation = (e) => setEducation({ ...education, [e.target.name]: e.target.value })

  useEffect(() => {
    profileGet()
  }, []);

  const handleBack = () => {
    navigate("/doctor/profile");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submit logic or API call here
  };

  return (
    <>
      <div className="px-0 py-0 ">
        <div className="flex flex-no-wrap items-start">
          <div className="w-full ">
            <div className="py-4 px-2">
              <div className="bg-white rounded shadow py-7">
                <div className="mt-10 px-7">
                  <form onSubmit={profileSubmit(profileEdit)} >
                    <p className="text-xl font-semibold leading-tight text-gray-800">
                      Update Your Profile Detail
                    </p>
                    <div className="img-out"></div>
                    <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-7 border p-3">
                      <div>
                        <p className="text-base font-medium leading-none text-gray-800">
                          Name<span className="text-red-600">*</span>
                        </p>
                        <input
                          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                          // value={user?.name}
                          name="name"
                          {...profileRegister('name', {
                            required: 'Name is required.',
                            maxLength: {
                              value: 35,
                              message: 'Name should be have 35 characters long.',
                            },
                            // onChange: (e) => handleProfile(e)
                          })}
                        // onChange={(e) => handleProfile(e)}
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
                          // value={user?.email}
                          name="email"
                          {...profileRegister('email', {
                            required: 'Email is required.',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Invalid email address.',
                            },
                            // onChange: (e) => handleProfile(e)
                          })}
                        // onChange={(e) => handleProfile(e)}
                        />
                        {profileError?.email?.message ? <ErrorMessage message={profileError?.email?.message} /> : <p className="mt-3 text-xs leading-[15px] text-gray-600">
                          Update Your Email
                        </p>}
                      </div>
                      <div>
                        <p className="text-base font-medium leading-none text-gray-800">
                          Phone Number<span className="text-red-600">*</span>
                        </p>
                        <input
                          type="number"
                          className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                          // value={user?.mobile}
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
                          {...profileRegister('mobile', {
                            required: 'Mobile no. is required.',
                            validate: (value) => {
                              if (value.length > 10 || value.length < 10) return 'Mobile no. should be 10 digit.'
                            },
                            // onChange: (e) => handleProfile(e)
                          })}
                        // onChange={(e) => {
                        //   if (e.target.value.length >= 11) return
                        //   handleProfile(e)
                        // }}
                        />
                        {profileError?.mobile?.message ? <ErrorMessage message={profileError?.mobile?.message} /> : <p className="mt-3 text-xs leading-3 text-gray-600">
                          Update Your Phone Number
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
                        // onChange={(e) => setUser({ ...user, ['image']: e.target.files[0] })}
                        />
                        <p className="mt-3 text-xs leading-[15px] text-gray-600">
                          Set Your Photo
                        </p>
                        {user?.image && <div className="img-panel">
                          <img className="img" src={user?.image} alt="kyc" style={{
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
                        onChange={(e) => handleAddress(e)}
                      />
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
                  {type === 'student' && (
                    <>
                      {/* ---------------------- Current Education Detail -------------------- */}
                      <form onSubmit={eductaionSubmit(currentEductaionEdit)}>
                        <p className="text-xl font-semibold leading-tight text-gray-800">
                          Update Your Current Education Detail
                        </p>
                        <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-7 border p-3">
                          {/* <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                              Pursing Class*
                            </p>
                            <input
                              type="text"
                              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                              name="pursuingClass"
                              value={education?.pursuingClass}
                              onChange={(e) => handleCurrentEducation(e)}
                            />
                            <p className="mt-3 text-xs leading-[15px] text-gray-600">
                              Update Your Pursuing Class
                            </p>
                          </div> */}
                          <ClassDropDown professional={education} setProfessional={setEducation} pursuingClass={pursuingClass} />
                          <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                              Year<span className="text-red-600">*</span>
                            </p>
                            <input
                              type="number"
                              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                              name="year"
                              {...eductaionRegister('year', {
                                required: 'Year is required.',
                                // maxLength: {
                                //     value: 35,
                                //     message: 'Name should be have 35 characters long.',
                                // },
                                // onChange: (e) => handleProfile(e)
                              })}
                            // value={education?.year}
                            // onChange={(e) => handleCurrentEducation(e)}
                            />
                            {eductaionError?.year?.message ? <ErrorMessage message={eductaionError?.year?.message} /> : <p className="mt-3 text-xs leading-3 text-gray-600">
                              Update Your Year
                            </p>}
                          </div>
                        </div>
                        <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-6 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                          <button
                            type="submit"
                            // onClick={() => currentEductaionEdit()}
                            className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[220px] w-full "
                          >
                            Update Current Education
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                  {/* ---------------------- Professional Detail -------------------- */}
                  <p className="text-xl font-semibold leading-tight text-gray-800">
                    Update Your Professional Detail
                  </p>
                  <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-7 border p-3">
                    {type === 'student' && <div>
                      <p className="text-base font-medium leading-none text-gray-800">
                        Father's Name<span className="text-red-600">*</span>
                      </p>
                      <input
                        type="text"
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                        name="fatherName"
                        value={professional?.fatherName}
                        onChange={(e) => handleProfessional(e)}
                      />
                      <p className="mt-3 text-xs leading-[15px] text-gray-600">
                        Update Your Father's Name
                      </p>
                    </div>}
                    <div>
                      <p className="text-base font-medium leading-none text-gray-800">
                        Occupation<span className="text-red-600">*</span>
                      </p>
                      <input
                        type="text"
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                        name="occupation"
                        value={professional?.occupation}
                        onChange={(e) => handleProfessional(e)}
                      />
                      <p className="mt-3 text-xs leading-[15px] text-gray-600">
                        Update Your Occupation
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium leading-none text-gray-800">
                        Designation<span className="text-red-600">*</span>
                      </p>
                      <input
                        type="text"
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                        name="designation"
                        value={professional?.designation}
                        onChange={(e) => handleProfessional(e)}
                      />
                      <p className="mt-3 text-xs leading-[15px] text-gray-600">
                        Update Your Designation
                      </p>
                    </div>
                    <AnnualIncomeDropDown professional={professional} setProfessional={setProfessional} />
                  </div>
                  <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-6 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                    <button
                      type="submit"
                      onClick={() => professionalEdit()}
                      className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[220px] w-full "
                    >
                      Update Professional Detail
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
                            Pan No.<span className="text-red-600">*</span>  {type === 'donar' && <div style={{ marginLeft: "7px", marginTop: "-15px", fontSize: "10px", fontWeight: "500", marginLeft: '73px' }}>If your are secret donar Please select pan card number XXXXX0000X</div>}
                          </p>
                          <input
                            type="number"
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                            name="panNo"
                            {...kycRegister('panNo', {
                              required: 'Pan number is required.',
                              // pattern: {
                              //     value: !/^[A-Z]{5}[0-9]{4}[A-Z]$/,
                              //     message: 'Invalid pan number.',
                              // },
                              validate: (value) => {
                                if (value.length > 16) return 'Pan number should be 16 digit.'
                              },
                              // onChange: (e) => handleProfile(e)
                            })}
                          // value={kyc?.panNo}
                          // onChange={(e) => { if (e.target.value.length >= 16) return; handleKYC(e) }}
                          />
                          {kycError?.panNo?.message ? <ErrorMessage message={kycError?.panNo?.message} /> : <p className="mt-3 text-xs leading-[15px] text-gray-600">
                            Update Your Pan No.
                          </p>}
                        </div>
                        <div>
                          <p className="text-base font-medium leading-none text-gray-800">
                            Upload Pan Card* ( PNG, JPG, PDF )
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
                            Update Your Pan Card
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
                            Tan Number<span className="text-red-600">*</span>
                          </p>
                          <input
                            type="number"
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                            name="tanNo"
                            {...kycRegister('tanNo', {
                              required: 'Tan number is required.',
                              // pattern: {
                              //     value: !/^[A-Z]{5}[0-9]{4}[A-Z]$/,
                              //     message: 'Invalid tan number.',
                              // },
                              validate: (value) => {
                                if (value.length > 16) return 'Tan number should be 16 digit.'
                              },
                              // onChange: (e) => handleProfile(e)
                            })}
                          // value={kyc?.tanNo}
                          // onChange={(e) => { if (e.target.value.length >= 16) return; handleKYC(e) }}
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
                            Update Your Pan Card<span className="text-red-600">*</span>
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
                      <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 border p-2 mt-2">
                        <div>
                          <p className="text-base font-medium leading-none text-gray-800">
                            Aadhar Card Number
                          </p>
                          <input
                            type="number"
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                            // value={kyc?.aadharNo}
                            name="aadharNo"
                            {...kycRegister('aadharNo', {
                              required: 'Aadhar number is required.',
                              validate: (value) => {
                                if (value.length > 16) return 'Aadhar number should be 16 digit.'
                              },
                              // onChange: (e) => handleProfile(e)
                            })}
                          // onChange={(e) => { if (e.target.value.length > 16) return; handleKYC(e) }}
                          />
                          {kycError?.aadharNo?.message ? <ErrorMessage message={kycError?.aadharNo?.message} /> : <p className="mt-3 text-xs leading-[15px] text-gray-600">
                            Update Your Aadhar Card No.
                          </p>}
                        </div>
                        <div>
                          <p className="text-base font-medium leading-none text-gray-800">
                            Upload Front Side  (PNG, JPG, PDF )
                          </p>
                          <input
                            // accept="image/*"
                            type="file"
                            name="image"
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                            // value={photo}
                            {...kycRegister('aadharFront', {
                            })}
                          // onChange={(e) => setKyc({ ...kyc, ['aadharFront']: e.target.files[0] })}
                          />
                          <p className="mt-3 text-xs leading-[15px] text-gray-600">
                            Update Your Adhar Front Side
                          </p>
                          {kyc?.aadharFront && <div className="img-panel">
                            <img className="img" src={kyc?.aadharFront} alt="kyc" style={{
                              borderRadius: '5px',
                              width: '2rem',
                              height: '2rem',
                            }}
                            />
                          </div>}
                        </div>
                        <div>
                          <p className="text-base font-medium leading-none text-gray-800">
                            Upload Back Side (PNG, JPG, PDF )
                          </p>
                          <input
                            // accept="image/*"
                            type="file"
                            name="image"
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                            // value={photo}
                            {...kycRegister('aadharBack', {
                            })}
                          // onChange={(e) => setKyc({ ...kyc, ['aadharBack']: e.target.files[0] })}
                          />
                          <p className="mt-3 text-xs leading-[15px] text-gray-600">
                            Update Your Adhar Back Side
                          </p>
                          {kyc?.aadharBack && <div className="img-panel">
                            <img className="img" src={kyc?.aadharBack} alt="kyc" style={{
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
                  {type === 'student' && (
                    <>
                      {/* ---------------------- Bank Detail -------------------- */}
                      <form onSubmit={bankSubmit(bankEdit)}>
                        <p className="text-xl font-semibold leading-tight text-gray-800">
                          Update Your Bank Detail
                        </p>
                        <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-7 mt-7 border p-3">
                          <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                              Bank Name<span className="text-red-600">*</span>
                            </p>
                            <input
                              type="text"
                              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                              name="bankName"
                              {...bankRegister('bankName', {
                                required: 'Bank name is required.',
                                // validate: (value) => {
                                //     if (value.length > 16) return 'Bank number should be 16 digit.'
                                // },
                                // onChange: (e) => handleProfile(e)
                              })}
                            // value={bank?.bankName}
                            // onChange={(e) => handleBank(e)}
                            />
                            {bankError?.bankName?.message ? <ErrorMessage message={bankError?.bankName?.message} /> : <p className="mt-3 text-xs leading-3 text-gray-600">
                              Update Your Bank Name
                            </p>}
                          </div>
                          <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                              Account Holder Name<span className="text-red-600">*</span>
                            </p>
                            <input
                              type="text"
                              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                              name="accountHolderName"
                              {...bankRegister('accountHolderName', {
                                required: 'Account holder name is required.',
                                // validate: (value) => {
                                //     if (value.length > 16) return 'Bank number should be 16 digit.'
                                // },
                                // onChange: (e) => handleProfile(e)
                              })}
                            // value={bank?.accountHolderName}
                            // onChange={(e) => handleBank(e)}
                            />
                            {bankError?.accountHolderName?.message ? <ErrorMessage message={bankError?.accountHolderName?.message} /> : <p className="mt-3 text-xs leading-3 text-gray-600">
                              Update Your Account Holder Name
                            </p>}
                          </div>
                          <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                              Account Number<span className="text-red-600">*</span>
                            </p>
                            <input
                              type="number"
                              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                              name="accountNo"
                              {...bankRegister('accountNo', {
                                required: 'Account number is required.',
                                validate: (value) => {
                                  if (value.length > 16) return 'Account number should be 16 digit.'
                                },
                                // onChange: (e) => handleProfile(e)
                              })}
                            // value={bank?.accountNo}
                            // onChange={(e) => handleBank(e)}
                            />
                            {bankError?.accountNo?.message ? <ErrorMessage message={bankError?.accountNo?.message} /> : <p className="mt-3 text-xs leading-3 text-gray-600">
                              Update Your Account Number
                            </p>}
                          </div>
                          <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                              IFSC<span className="text-red-600">*</span>
                            </p>
                            <input
                              type="text"
                              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                              // value={bank?.ifsc}
                              name="ifsc"
                              {...bankRegister('ifsc', {
                                required: 'IFSC is required.',
                                // validate: (value) => {
                                //     if (value.length > 16) return 'Bank number should be 16 digit.'
                                // },
                                //
                              })}
                            // onChange={(e) => handleBank(e)}
                            />
                            {bankError?.ifsc?.message ? <ErrorMessage message={bankError?.ifsc?.message} /> : <p className="mt-3 text-xs leading-3 text-gray-600">
                              Update your IFSC
                            </p>}
                          </div>
                        </div>
                        <div className="flex flex-col mt-4 flex-wrap items-center justify-center w-full px-6 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                          <button
                            type="submit"
                            // onClick={() => bankEdit()}
                            className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[160px] w-full "
                          >
                            Update Bank
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <ToastContainer />
    </>
  );
}

export default EditProfile;
