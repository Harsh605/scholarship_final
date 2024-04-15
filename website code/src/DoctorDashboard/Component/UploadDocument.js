import React, { useState } from 'react';
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

export default function UploadDocument({ open, setOpen, DocumentList, data, classList }) {

    const navigate = useNavigate()

    const [schemeApply, setSchemeApply] = useState({});
    const [item, setItem] = useState({})
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!schemeApply.classId || !schemeApply.university || !schemeApply.collegeName || !schemeApply.rollNo || !schemeApply.percentage) {
            alert("Please fill the below details.")
        } else {
            const token = localStorage.getItem('token') || '';
            if (token) {
                const form = new FormData();
                form.append('studentId', data.studentId)
                form.append('studentName', data.studentName)
                form.append('classId', schemeApply.classId)
                form.append('collegeName', schemeApply.collegeName)
                form.append('university', schemeApply.university)
                form.append('rollNo', schemeApply.rollNo)
                form.append('percentage', schemeApply.percentage)
                form.append('docOne', schemeApply.docOne1)
                form.append('docTwo', schemeApply.docOne2)
                form.append('docThree', schemeApply.docOne3)
                form.append('docFour', schemeApply.docOne4)
                form.append('docFive', schemeApply.docOne5)
                const dataResult = await axios.post(`${process.env.REACT_APP_API_URL}/api/apply-documents`, form, { headers: { Authorization: token } });
                if (dataResult.data.success) {
                    setOpen(false)
                    DocumentList()
                    toast.success(dataResult.data.msg, {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-success'
                    });
                } else {
                    handleUnAuthorized(dataResult.data.msg, navigate)
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

    const handleSchemeApply = (e) => setSchemeApply({ ...schemeApply, [e.target.name]: e.target.value })

    return (
        <>
            <div>
                <BootstrapDialog
                    sx={{ zIndex: "11000" }}
                    onClose={() => setOpen(false)}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
                        Upload Document
                    </BootstrapDialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent dividers className='grid grid-row-1 gap-6'>
                            <div>
                                <select className="w-full p-3 border mb-4 border-gray-300 rounded outline-none focus:bg-gray-50" onChange={(e) => { setItem(JSON.parse((JSON.parse(e.target.value))?.document)); setSchemeApply({ ...schemeApply, ['classId']: (JSON.parse(e.target.value))?.id }) }}>
                                    <option selected disabled>Select Class</option>
                                    {classList && classList.length > 0 && classList?.map((data, index) => (
                                        <option value={data.documents} key={index}>{data.className}</option>
                                    ))}
                                </select>
                                <input
                                    placeholder='College/School Name'
                                    type="text"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={schemeApply.collegeName}
                                    name='collegeName'
                                    onChange={(e) => handleSchemeApply(e)}
                                />
                                <input
                                    placeholder='University Name'
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={schemeApply.university}
                                    name='university'
                                    onChange={(e) => handleSchemeApply(e)}
                                />
                                <input
                                    placeholder='Roll no.'
                                    type="number"
                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={schemeApply.rollNo}
                                    name='rollNo'
                                    onChange={(e) => { if (e.target.value.length >= 11) return; handleSchemeApply(e) }}
                                />
                                <input
                                    placeholder='Higher Class Percentage'
                                    type="number"
                                    className="w-full p-3 mt-4 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={schemeApply.percentage}
                                    name='percentage'
                                    onChange={(e) => { if (e.target.value.toString().length == 3) return; handleSchemeApply(e) }}
                                />
                                {item && item.length > 0 && item.map((data, index) => (
                                    <>
                                        <label key={index} style={{ fontWeight: 'bold' }}>
                                            {data.name || `Document${index}`}
                                        </label>
                                        <input
                                            key={index}
                                            placeholder={data.name}
                                            type="file"
                                            className="w-full p-3 mt-1 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                            // value={schemeApply.percentage}
                                            name={`docOne${index + 1}`}
                                            onChange={(e) => setSchemeApply({ ...schemeApply, [`docOne${index + 1}`]: e.target.files[0] })}
                                        />
                                        {!schemeApply[`docOne${index + 1}`] && data.isRequired && <Typography color="red">{data.name + ' is required'}</Typography>}
                                    </>
                                ))}
                                {/* <label style={{ fontWeight: 'bold' }}>
                                    Adhar Card Front
                                </label>
                                <input
                                    placeholder='Adhar Card Front'
                                    type="file"
                                    className="w-full p-3 mt-1 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    // value={schemeApply.percentage}
                                    name='docOne'
                                    onChange={(e) => setSchemeApply({ ...schemeApply, ['docOne']: e.target.files[0] })}
                                />
                                <label style={{ fontWeight: 'bold' }}>
                                    Adhar Card Back
                                </label>
                                <input
                                    placeholder='Adhar Card Back'
                                    type="file"
                                    className="w-full p-3 mt-1 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    // value={schemeApply.percentage}
                                    name='docTwo'
                                    onChange={(e) => setSchemeApply({ ...schemeApply, ['docTwo']: e.target.files[0] })}
                                />
                                <label style={{ fontWeight: 'bold' }}>
                                    Your Profile Photo
                                </label>
                                <input
                                    placeholder='Your Profile Photo'
                                    type="file"
                                    className="w-full p-3 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    // value={schemeApply.percentage}
                                    name='docThree'
                                    onChange={(e) => setSchemeApply({ ...schemeApply, ['docThree']: e.target.files[0] })}
                                /> */}
                            </div>


                        </DialogContent>
                        <DialogActions>
                            <button
                                type='submit'
                                className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white px-6 py-2 text-sm border border-[#452a72] focus:outline-none"
                            >
                                Apply here
                            </button>
                        </DialogActions>
                    </form>
                </BootstrapDialog>
            </div>
            <ToastContainer />
        </>
    );
}
