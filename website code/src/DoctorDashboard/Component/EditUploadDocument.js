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
import { startCase } from 'lodash';

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

export default function EditUploadDocument({ open, setOpen, item, DocumentList }) {

    const navigate = useNavigate()

    const [schemeApply, setSchemeApply] = useState({});
    const [document, setDocument] = useState([])
    const [error, setError] = useState(false);

    const status = ['docOneStatus', 'docTwoStatus', 'docThreeStatus', 'docFourStatus', 'docFiveStatus']
    const status2 = ['docOne', 'docTwo', 'docThree', 'docFour', 'docFive']

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!schemeApply.university || !schemeApply.collegeName || !schemeApply.rollNo || !schemeApply.percentage) {
            // toast.error('Confirm password and password does not match.', {
            //     position: toast.POSITION.TOP_RIGHT,
            //     className: 'toast-error'
            // });
            alert("Please fill the below details.")
        } else {
            const token = localStorage.getItem('token') || '';
            if (token) {
                const form = new FormData();
                form.append('id', item.id)
                form.append('collegeName', schemeApply.collegeName)
                form.append('university', schemeApply.university)
                form.append('rollNo', schemeApply.rollNo)
                form.append('percentage', schemeApply.percentage)
                form.append('documentLength', document.length)
                if (Object.keys(document?.[0] || {}).length > 0) form.append('docOne', schemeApply.docOne)
                if (Object.keys(document?.[1] || {}).length > 0) form.append('docTwo', schemeApply.docTwo)
                if (Object.keys(document?.[2] || {}).length > 0) form.append('docThree', schemeApply.docThree)
                if (Object.keys(document?.[3] || {}).length > 0) form.append('docFour', schemeApply.docFour)
                if (Object.keys(document?.[4] || {}).length > 0) form.append('docFive', schemeApply.docFive)
                const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/edit-apply-documents`, form, { headers: { Authorization: token } });
                if (data.data.success) {
                    setOpen(false)
                    DocumentList()
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

    const handleSchemeApply = (e) => setSchemeApply({ ...schemeApply, [e.target.name]: e.target.value })

    useEffect(() => {
        if (Object.keys(item).length > 0) {
            setSchemeApply({ ...schemeApply, classId: item.classId, collegeName: item.collegeName, university: item.university, rollNo: item.rollNo, percentage: item.percentage })
            setDocument(JSON.parse(item.documents))
        }
    }, [item])

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
                        Edit Documents
                    </BootstrapDialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent dividers className='grid grid-row-1 gap-6'>
                            <div>
                                <label style={{ fontWeight: 'bold' }}>
                                    Class Id
                                </label>
                                <input
                                    placeholder='College/School Name'
                                    type="text"
                                    className="w-full p-3 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={schemeApply.classId}
                                    name='classId'
                                    disabled
                                // onChange={(e) => handleSchemeApply(e)}
                                />
                                <label className='mt-4' style={{ fontWeight: 'bold' }}>
                                    College/School Name
                                </label>
                                <input
                                    placeholder='College/School Name'
                                    type="text"
                                    className="w-full p-3 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={schemeApply.collegeName}
                                    name='collegeName'
                                    onChange={(e) => handleSchemeApply(e)}
                                />
                                <label className='mt-4' style={{ fontWeight: 'bold' }}>
                                    University
                                </label>
                                <input
                                    placeholder='University'
                                    type="text"
                                    className="w-full p-3 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={schemeApply.university}
                                    name='university'
                                    onChange={(e) => handleSchemeApply(e)}
                                />
                                <label className='mt-4' style={{ fontWeight: 'bold' }}>Roll no.</label>
                                <input
                                    placeholder='Roll no.'
                                    type="text"
                                    className="w-full p-3 mb-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={schemeApply.rollNo}
                                    name='rollNo'
                                    onChange={(e) => handleSchemeApply(e)}
                                />
                                <label className='mt-4' style={{ fontWeight: 'bold' }}>Higher Class Percentage</label>
                                <input
                                    placeholder='Percentage'
                                    type="number"
                                    className="w-full p-3 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={schemeApply.percentage}
                                    name='percentage'
                                    onChange={(e) => { if(e.target.value.toString().length == 3) return;  handleSchemeApply(e) }}
                                />
                                {document && document.length > 0 && document?.map((data, index) => (
                                    <>
                                        <label style={{ fontWeight: 'bold' }}>
                                            {data.name || `Document${index}`} &nbsp; {item[status[index]] !== 'pending' && <span style={{ backgroundColor: item[status[index]] !== 'verified' ? 'red' : 'green', color: 'white', padding: '1px' }}>{startCase(item[status[index]])}</span>}
                                        </label>
                                        <input
                                            placeholder={data.name}
                                            type="file"
                                            className="w-full p-3 mt-1 mb-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                            // value={schemeApply.percentage}
                                            name='docOne'
                                            onChange={(e) => setSchemeApply({ ...schemeApply, [status2[index]]: e.target.files[0] })}
                                        />
                                    </>
                                ))}
                                {/* <label style={{ fontWeight: 'bold' }}>
                                    Adhar Card Front  &nbsp;<span style={{ backgroundColor: item.docOneStatus !== 'verified' ? 'red' : 'green', color: 'white', padding: '1px' }}>{startCase(item.docOneStatus)}</span>
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
                                    Adhar Card Back &nbsp;<span style={{ backgroundColor: item.docTwoStatus !== 'verified' ? 'red' : 'green', color: 'white', padding: '1px' }}>{startCase(item.docTwoStatus)}</span>
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
                                    Your Profile Photo &nbsp;<span style={{ backgroundColor: item.docThreeStatus !== 'verified' ? 'red' : 'green', color: 'white', padding: '1px' }}>{startCase(item.docThreeStatus)}</span>
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

                            {error && <Typography color="red">"New Password and Confirm Password must be the same.</Typography>}
                        </DialogContent>
                        <DialogActions>
                            <button
                                type='submit'
                                className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] focus:outline-none"
                            >
                                Edit form
                            </button>
                        </DialogActions>
                    </form>
                </BootstrapDialog>
            </div>
            <ToastContainer />
        </>
    );
}
