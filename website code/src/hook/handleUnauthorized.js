import { useNavigate } from "react-router"
import { ToastContainer, toast } from 'react-toastify';
import { countryList, annualIncomeList, cityList, stateList } from "./countryList";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";


const handleUnAuthorized = (msg, callback) => {
    console.log("handleUnAuthorized11")
    if (msg === "Token is expired") {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken')
        localStorage.removeItem('type')
        localStorage.removeItem('user')
        callback('/login')
        setTimeout(() => {
            toast.error(msg, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error'
            });
        }, 500)
    } else if (msg === "Admin not found") {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken')
        localStorage.removeItem('type')
        localStorage.removeItem('user')
        callback('/admin-login')
        setTimeout(() => {
            toast.error(msg, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error'
            });
        }, 500)
    } else if (msg === "User not found" || msg === "Your account is not verified" || msg === "Admin has deactivated your account") {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken')
        localStorage.removeItem('type')
        localStorage.removeItem('user')
        callback('/login')
        setTimeout(() => {
            toast.error(msg, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error'
            });
        }, 500)
    } else {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-error'
        });
    }

}

function CountryDropDown({ address, setAddress }) {
    const [value, setValue] = useState('');

    const onHandleChange = (val) => {
        setValue(val);
        setAddress({ ...address, country: val })
    }

    useEffect(() => {
        address && address?.country && setValue(address.country)
    })
    return (
        <>
            <div>
                <p className="text-base font-medium leading-none text-gray-800">
                    Select Country<span className="text-red-600">*</span>
                </p>
                <select placeholder='Select Country' onChange={(e) => onHandleChange(e.target.value)} className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                    <option value="" disabled selected>Select Country</option>
                    {countryList && countryList.length > 0 && countryList?.map((data, index) => (
                        <option key={index} value={data?.name} selected={value === data?.name}>{data?.name}</option>
                    ))}
                </select>
                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                    Update Your Country
                </p>
            </div>
        </>
    )
}

function AnnualIncomeDropDown({ professional, setProfessional, msg }) {
    const [value, setValue] = useState('');

    const onHandleChange = (val) => {
        setValue(val);
        setProfessional({ ...professional, annualIncome: val })
    }

    useEffect(() => {
        professional && professional?.annualIncome && setValue(professional.annualIncome)
    })
    return (
        <>
            <div>
                <p className="text-base font-medium leading-none text-gray-800">
                    Select Annual Income
                </p>
                <select placeholder='Select Annual Income' onChange={(e) => onHandleChange(e.target.value)} className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                    <option value="" disabled selected>Select Annual Income</option>
                    {annualIncomeList && annualIncomeList.length > 0 && annualIncomeList?.map((data, index) => (
                        <option key={index} value={data?.name} selected={value === data?.name}>{data?.name}</option>
                    ))}
                </select>
                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                    Update Your Annual Income
                </p>
            </div>
        </>
    )
}

function ClassDropDown({ professional, setProfessional, pursuingClass }) {
    const navigate = useNavigate()
    const [value, setValue] = useState('');
    const [classList, setClassList] = useState([]);

    const onHandleChange = (val) => {
        setValue(val);
        setProfessional({ ...professional, pursuingClass: val })
    }

    const getClass = async () => {
        const adminToken = localStorage.getItem('token') || localStorage.getItem('adminToken')
        if (adminToken) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/all-class-list`, { headers: { Authorization: adminToken } });
            if (data.data.success) {
                setClassList(data.data.data.allClassList)
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
        professional && professional?.pursuingClass && setValue(professional.pursuingClass)
        getClass()
    }, [])
    return (
        <>
            <div>
                <p className="text-base font-medium leading-none text-gray-800">
                    Pursing Class<span className="text-red-600">*</span>
                </p>
                <select placeholder='Select Class' onChange={(e) => onHandleChange(e.target.value)} className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                    <option value="" disabled selected>Select Class</option>
                    {classList && classList.length > 0 && classList?.map((data, index) => (
                        <option key={index} value={data?.name} selected={(value || professional.pursuingClass) == data?.name}>{data?.name}</option>
                    ))}
                </select>
                {(!professional.pursuingClass && pursuingClass) ? <ErrorMessage message={'Select pursuing class.'} /> : <p className="mt-3 text-xs leading-[15px] text-gray-600">
                    Update Your Pursuing Class
                </p>}


            </div>
        </>
    )
}

function CityStateDropDown({ address, setAddress, type }) {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const onHandleChange = (val, type) => {
        if (type === 'city') {
            setCity(val);
            setAddress({ ...address, city: val })
        } else {
            setState(val);
            setAddress({ ...address, state: val })
        }
    }

    useEffect(() => {
        address && address?.city && setCity(address.city)
        address && address?.state && setState(address.state)
    })
    return (
        <>
            {type === 'city' && <div>
                <p className="text-base font-medium leading-none text-gray-800">
                    Select City<span className="text-red-600">*</span>
                </p>
                <select placeholder='Select City' onChange={(e) => onHandleChange(e.target.value, 'city')} className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                    <option value="" disabled selected>Select City</option>
                    {cityList && cityList.length > 0 && cityList?.map((data, index) => (
                        <option key={index} value={data?.name} selected={city === data?.name}>{data?.name}</option>
                    ))}
                </select>
                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                    Update Your City
                </p>
            </div>}
            {type === 'state' && <div>
                <p className="text-base font-medium leading-none text-gray-800">
                    Select State/Province<span className="text-red-600">*</span>
                </p>
                <select placeholder='Select State' onChange={(e) => onHandleChange(e.target.value, 'state')} className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                    <option value="" disabled selected>Select State</option>
                    {stateList && stateList.length > 0 && stateList?.map((data, index) => (
                        <option key={index} value={data?.name} selected={state === data?.name}>{data?.name}</option>
                    ))}
                </select>
                <p className="mt-3 text-xs leading-[15px] text-gray-600">
                    Update Your State/Province
                </p>
            </div>}

        </>
    )
}

function SchemeNameDropDown({ search, setSearch }) {
    const navigate = useNavigate()
    const [value, setValue] = useState('');
    const [scheme, setScheme] = useState([])
    const getScheme = async () => {
        const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token')
        // if (adminToken) {
        const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin-scheme-list`, { headers: { Authorization: adminToken } });
        if (data.data.success) {
            setScheme(data.data.data.scheme)
        } else {
            handleUnAuthorized(data.data.msg, navigate)
        }
        // setUser(jwt_decode(token));
        // } else {
        //     navigate('/login')
        //     // localStorage.removeItem('token')
        // }
    }

    const onHandleChange = (val) => {
        setValue(val);
        setSearch({ ...search, schemeName: val })
    }

    useEffect(() => {
        getScheme()
    }, [])
    return (
        <>
            {/* <div>
                <p className="text-base font-medium leading-none text-gray-800">
                    Select Scheme Name
                </p> */}
            <select placeholder='Select Scheme Name' onChange={(e) => onHandleChange(e.target.value)} className="ml-2 w-[200px] p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                <option value="" disabled selected>Select Scheme Name</option>
                {scheme && scheme.length > 0 && scheme?.map((data, index) => (
                    <option key={index} value={data?.name} selected={search.schemeName === data?.name}>{data?.name}</option>
                ))}
            </select>
            {/* </div> */}
        </>
    )
}

function SchemeForDropDown({ search, setSearch }) {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [scheme, setScheme] = useState([])

    const onHandleChange = (val) => {
        setValue(val);
        setSearch({ ...search, schemeFor: val })
    }

    const getScheme = async () => {
        const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token')
        // if (adminToken) {
        const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin-scheme-list`, { headers: { Authorization: adminToken } });
        if (data.data.success) {
            setScheme(data.data.data.scheme)
        } else {
            handleUnAuthorized(data.data.msg, navigate)
        }
        // setUser(jwt_decode(token));
        // } else {
        // navigate('/login')
        // localStorage.removeItem('token')
        // }
    }

    useEffect(() => {
        getScheme()
    }, [])
    return (
        <>
            <select placeholder='Select Scheme For' onChange={(e) => onHandleChange(e.target.value)} className="ml-2 w-[200px] p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                <option value="" disabled selected>Select Scheme For</option>
                {scheme && scheme.length > 0 && scheme?.map((data, index) => (
                    <option key={index} value={data?.schemeFor} selected={search?.schemeFor === data?.schemeFor}>{data?.schemeFor}</option>
                ))}
            </select>
        </>
    )
}

function ResetButton({ search, setSearch }) {
    return (
        <>
            <button className="px-3 py-2 mt-4 border rounded-md bg-[#452a72] text-white h-[47px] w-[110px] mr-5" type="button" onClick={() => setSearch({})}>Reset</button>
        </>
    )
}
function DatePicker({ search, setSearch }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const onHandleStartDate = (val) => {
        setStartDate(val);
        setSearch({ ...search, startDate: val })
    }
    const onHandleEndDate = (val) => {
        setEndDate(val);
        setSearch({ ...search, endDate: val })
    }
    return (
        <>
            <input
                type="date"
                className="border p-2 h-[50px] w-[190px] ml-2 mr-2 mt-4"
                id="startDate"
                value={search.startDate || ''}
                placeholder="Hello"
                onChange={(e) => onHandleStartDate(e.target.value)}
            />
            <input
                type="date"
                className="border p-2 h-[50px] w-[190px] ml-2 mr-2 mt-4"
                id="endDate"
                value={search.endDate || ''}
                onChange={(e) => onHandleEndDate(e.target.value)}
            />
        </>
    )
}

function InputSearch({ search, setSearch, msg }) {
    const [value, setValue] = useState(search?.keyword || '');

    const onHandleChange = (val) => {
        setValue(val);
    }

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setSearch({ ...search, keyword: value })
        }, 1000)
        return () => clearTimeout(timeOut)

    }, [value])
    useEffect(() => setValue(search?.keyword || ''), [search?.keyword])
    return (
        <>
            <input
                type="text"
                value={value}
                onChange={(e) => onHandleChange(e.target.value)}
                placeholder={msg}
                className="px-4 py-0 h-[50px] w-[190px] mt-4 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#452a72] focus:border-[#452a72]"
            />
        </>
    )
}

function AnnualIncome2DropDown({ search, setSearch, msg }) {
    const [value, setValue] = useState('');

    const onHandleChange = (val) => {
        setValue(val);
        setSearch({ ...search, annualIncome: val })
    }

    useEffect(() => {
    })
    return (
        <>
            <select placeholder={msg} onChange={(e) => onHandleChange(e.target.value)} className=" p-3 mt-4 w-[230px] ml-2 mr-2 border border-gray-300 rounded outline-none focus:bg-gray-50">
                <option value="" disabled selected={(search.annualIncome || '') === ''}>{msg}</option>
                {annualIncomeList && annualIncomeList.length > 0 && annualIncomeList?.map((data, index) => (
                    <option key={index} value={data?.name} selected={search?.annualIncome === data?.name}>{data?.name}</option>
                ))}
            </select>
        </>
    )
}

function CityState2DropDown({ search, setSearch, type }) {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const onHandleChange = (val, type) => {
        if (type === 'city') {
            setCity(val);
            setSearch({ ...search, city: val })
        } else {
            setState(val);
            setSearch({ ...search, state: val })
        }
    }
    return (
        <>
            {type === 'city' &&
                <select placeholder='Select City' onChange={(e) => onHandleChange(e.target.value, 'city')} className="w-[160px] ml-2 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                    <option value="" disabled selected={(search.city || '') === ''}>Select City</option>
                    {cityList && cityList.length > 0 && cityList?.map((data, index) => (
                        <option key={index} value={data?.name} selected={search?.city === data?.name}>{data?.name}</option>
                    ))}
                </select>}
            {type === 'state' &&
                <select placeholder='Select State' onChange={(e) => onHandleChange(e.target.value, 'state')} className="w-[160px] ml-2 mr-2 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                    <option value="" disabled selected={(search.state || '') === ''}>Select State</option>
                    {stateList && stateList.length > 0 && stateList?.map((data, index) => (
                        <option key={index} value={data?.name} selected={search?.state === data?.name}>{data?.name}</option>
                    ))}
                </select>}

        </>
    )
}

function Country2DropDown({ search, setSearch }) {
    const [value, setValue] = useState('');

    const onHandleChange = (val) => {
        setValue(val);
        setSearch({ ...search, country: val })
    }

    useEffect(() => {
    })
    return (
        <>
            <select placeholder='Select Country' onChange={(e) => onHandleChange(e.target.value)} className="w-[190px] ml-2 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                <option value="" selected={(search.country || '') === ''} disabled>Select Country</option>
                {countryList && countryList.length > 0 && countryList?.map((data, index) => (
                    <option key={index} value={data?.name} selected={(search.country || '') === data?.name}>{data?.name}</option>
                ))}
            </select>
        </>
    )
}

function StatusDropDown({ search, setSearch }) {
    const [value, setValue] = useState('');
    const status = [
        // { label: 'All', value: '' },
        { label: 'Verified', value: 'verified' },
        { label: 'Unverified', value: 'unverified' },
        { label: 'Pending', value: 'pending' },
        { label: 'Block', value: 'block' }
    ]


    const onHandleChange = (val) => {
        setValue(val);
        setSearch({ ...search, status: val })
    }

    useEffect(() => {
    })
    return (
        <>
            <select placeholder='Select Status' onChange={(e) => onHandleChange(e.target.value)} className="w-[190px] ml-2 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                <option value="" disabled selected>Select Status</option>
                {status && status.length > 0 && status?.map((data, index) => (
                    <option key={index} value={data.value} selected={value === data.value}>{data.label}</option>
                ))}
            </select>
        </>
    )
}

function ScholarshipRecieveDropDown({ search, setSearch }) {
    const [value, setValue] = useState('');
    const status = [
        // { label: 'All', value: '' },
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
    ]

    const onHandleChange = (val) => {
        setValue(val);
        setSearch({ ...search, scholarshipRecieveStatus: val })
    }

    useEffect(() => {
    })
    return (
        <>
            <select placeholder='Select Scholarship Recieve' onChange={(e) => onHandleChange(e.target.value)} className="w-[221px] ml-2 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                <option value="" disabled selected>Select Scholarship Recieve</option>
                {status && status.length > 0 && status?.map((data, index) => (
                    <option key={index} value={data.value} selected={search?.scholarshipRecieveStatus === data.value}>{data.label}</option>
                ))}
            </select>
        </>
    )
}

function PercentageDropDown({ search, setSearch, msg }) {
    const [value, setValue] = useState('');
    const status = [
        // { label: 'All', value: '' },
        { label: 'below 60%', value: '20-60' },
        { label: '60-75%', value: '60-75' },
        { label: '75-90%', value: '75-90' },
        { label: 'Above 90%', value: '90-100' }
    ]

    const onHandleChange = (val) => {
        setValue(val);
        setSearch({ ...search, percentage: val })
    }

    useEffect(() => {
    })
    return (
        <>
            <select placeholder={msg} onChange={(e) => onHandleChange(e.target.value)} className="w-[230px] ml-2 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50">
                <option value="" disabled selected>{msg}</option>
                {status && status.length > 0 && status?.map((data, index) => (
                    <option key={index} value={data.value} selected={search?.percentage === data.value}>{data.label}</option>
                ))}
            </select>
        </>
    )
}

const preventMaxInput = (e, limit) => {
    e.target.value = e.target.value.trimStart()
    e.target.value = e.target.value.replace(/  +/g, ' ')
    if (e.target.value.length > limit) {
        e.target.value = e.target.value.slice(0, limit)
    }
}

export { ResetButton, ClassDropDown, preventMaxInput, CityStateDropDown, CityState2DropDown, handleUnAuthorized, CountryDropDown, AnnualIncomeDropDown, SchemeNameDropDown, SchemeForDropDown, DatePicker, InputSearch, AnnualIncome2DropDown, Country2DropDown, StatusDropDown, ScholarshipRecieveDropDown, PercentageDropDown }