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

export default function PayNowModal({ open, setOpen, item }) {

    const navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);

    const handleDonate = async (type) => {
        const token = localStorage.getItem('token') || '';
        item.mode = type;
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/donar-pay`, item, { headers: { Authorization: token } });
        if (data.data.success) {
            if (type === 'manual')
                navigate('/user/scholarship-distribution-preferences')
            else
                navigate('/user/scholarship-list')

            setOpen(false)
            setTimeout(() => {
                toast.success(data.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            }, 500)
        } else {
            handleUnAuthorized(data.data.msg, navigate)
        }
    }



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
                        Scholarship Distribution Preferences
                    </BootstrapDialogTitle>
                    <form >
                        <DialogContent dividers className='grid grid-row-1 gap-6' style={{ height: '6rem', width: '35rem' }}>
                            <div>
                                Do You Like Distribute Donation by Himself?
                            </div>

                            {error && <Typography color="red">"New Password and Confirm Password must be the same.</Typography>}
                        </DialogContent>
                        <DialogActions>
                            <button
                                type='submit'
                                onClick={() => handleDonate('auto')}
                                className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] focus:outline-none"
                            >
                                No
                            </button>
                            <button
                                type='submit'
                                onClick={() => handleDonate('manual')}
                                className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] focus:outline-none"
                            >
                                Yes
                            </button>
                        </DialogActions>
                    </form>
                </BootstrapDialog>
            </div>
            <ToastContainer />
        </>
    );
}
