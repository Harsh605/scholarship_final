import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Input, TextField } from '@mui/material';
import '../../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Password } from '@mui/icons-material';
import { handleUnAuthorized } from '../../hook/handleUnauthorized';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <>
            <DialogTitle sx={{ m: 0, p: 2, color: "#452a72" }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: "#452a72",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        </>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function DonateScheme({ open, setOpen, item, profileGet }) {

    const navigate = useNavigate()

    const [userList, setUserList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [error, setError] = useState(false);
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
    const [noOfStudent, setNoOfStudent] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!type || !amount) {
            // toast.error('Confirm password and password does not match.', {
            //     position: toast.POSITION.TOP_RIGHT,
            //     className: 'toast-error'
            // });
            alert("Please fill the below details.")
        } else {
            const token = localStorage.getItem('token') || '';
            if (token) {
                const payload = {
                    donarId: item?.donarId,
                    schemeId: item.id,
                    type: type,
                    amount
                }
                if (type === 'manual') {
                    payload.user = userList
                } else {
                    payload.user = noOfStudent
                }
                const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/donar-pay`, payload, { headers: { Authorization: token } });
                if (data.data.success) {
                    profileGet()
                    setOpen(false)
                    toast.success(data.data.msg, {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-success'
                    });
                } else {
                    handleUnAuthorized(data.data.msg, navigate)
                }
                // setUser(jwt_decode(token));
            } else {
                navigate('/login')
                // localStorage.removeItem('token')
            }
            setError(false);
            // Proceed with password update
        }
    }

    const StudentList = async (classId) => {
        const token = localStorage.getItem('token') || ''
        if (token) {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin-student-list/${classId}`, { headers: { Authorization: token } });
            if (data.data.success) {
                setStudentList(data.data.data.userList?.map(data => {
                    return { id: data.id, name: data.name }
                }))
            } else {
                handleUnAuthorized(data.data.msg, navigate)
            }
        } else {
            navigate('/login')
        }
    }

    const handleSelect = (value) => {
        const userArr = [...userList];
        if (userArr.includes(value.toString())) {
            const index = userArr.findIndex(i => i.toString() === value.toString())
            userArr.splice(index, 1)
        } else {
            userArr.push(value.toString())
        }
        setAmount(userArr.length * item.amount)
        setUserList(userArr)
    }

    useEffect(() => {
        StudentList(item.classId)
        item?.amount && setAmount(+item.amount)
    }, [])

    return (
        <>
            <div>
                <BootstrapDialog
                    sx={{ zIndex: "11000" }}
                    onClose={() => setOpen(false)}
                    aria-labelledby="customized-dialog-title"
                    open={open}

                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)} style={{ width: "120rem" }}>
                        Donate Now
                    </BootstrapDialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent dividers className='grid grid-row-1 gap-6'>
                            <div>
                                <div className="md:col-span-6 mb-3">
                                    <label
                                        className="block text-gray-700 text-sm font-semibold mb-2"
                                        htmlFor="Name"
                                    >
                                        Donate
                                    </label>
                                    <input
                                        id="student"
                                        type="radio"
                                        checked={type === 'manual'}
                                        onChange={() => setType('manual')}
                                    />  <label for='student'>Manual</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input
                                        id="donar"
                                        type="radio"
                                        checked={type === 'auto'}
                                        onChange={() => setType('auto')}
                                    /> <label for='donar'>Automatic</label>
                                </div>

                                {type === 'manual' && <select className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" onChange={(e) => handleSelect(e.target.value)} value={userList}
                                    multiple={true}>
                                    <option selected disabled>Select Student</option>
                                    {studentList && studentList.length > 0 && studentList?.map((data, index) => (
                                        <option value={data.id.toString()}>{data.name}</option>
                                    ))}
                                    {studentList.length === 0 && (
                                        <option selected disabled>List is empty.</option>
                                    )}
                                </select>}

                                {type === 'auto' && (
                                    <>
                                        <label
                                            className="block text-gray-700 text-sm font-semibold mb-2"
                                            htmlFor="Name"
                                        >
                                            No Of Student
                                        </label>
                                        <input
                                            placeholder='noOfStudent'
                                            type="number"
                                            className="w-full p-3 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                            value={noOfStudent}
                                            name='noOfStudent'
                                            onChange={(e) => { setNoOfStudent(e.target.value); setAmount(+e.target.value * item.amount) }}
                                        />
                                    </>
                                )}
                                <label
                                    className="block text-gray-700 text-sm font-semibold mb-2"
                                    htmlFor="Name"
                                >
                                    Amount
                                </label>
                                <input
                                    placeholder='Amount'
                                    type="number"
                                    className="w-full p-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={amount}
                                    name='amount'
                                    disabled
                                // onChange={(e) => handleSchemeApply(e)}
                                />

                            </div>

                            {error && <Typography color="red">"New Password and Confirm Password must be the same.</Typography>}
                        </DialogContent>
                        <DialogActions>
                            <button
                                type='submit'
                                className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] focus:outline-none"
                            >
                                Pay now
                            </button>
                        </DialogActions>
                    </form>
                </BootstrapDialog>
            </div>
            <ToastContainer />
        </>
    );
}
