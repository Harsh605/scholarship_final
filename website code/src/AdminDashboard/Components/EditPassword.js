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
import { useForm } from 'react-hook-form';

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

export default function EditPassword({ open, setOpen }) {

    const navigate = useNavigate()
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);

    const onSubmit = async (data) => {
        const adminToken = localStorage.getItem('adminToken') || '';
        if (adminToken) {
            const payload = {
                currentPassword: data.oldPassword,
                cPassword: data.newPassword
            }
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/change-admin-password`, payload, { headers: { Authorization: adminToken } });
            if (result.data.success) {
                setOpen(false)
                reset()
                toast.success(result.data.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-success'
                });
            } else {
                handleUnAuthorized(result.data.msg, navigate)
            }
            // setUser(jwt_decode(token));
        } else {
            navigate('/admin-login')
            // localStorage.removeItem('token')
        }
        setError(false);
        // Proceed with password update
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
                        Update Password
                    </BootstrapDialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogContent dividers className='grid grid-row-1 gap-6'>
                            <div>
                                <input
                                    placeholder='Current Password'
                                    type="password"
                                    name='oldPassword'
                                    className="w-full p-3 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    {...register('oldPassword', {
                                        required: 'Please enter old password.',
                                        validate: value => {
                                            if (value === '') {
                                                return true
                                            }
                                            if (!!value.trim()) {
                                                return true
                                            }
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: 'Maximum length must be 16.'
                                        }
                                    })}
                                />
                                <span className="mt-3 text-xs leading-3 text-red-600">{errors?.oldPassword?.message}</span>

                                <input
                                    placeholder='New Password'
                                    type="password"
                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    name='newPassword'
                                    {...register('newPassword', {
                                        required: 'Please enter new password.',
                                        validate: value => {
                                            if (watch('oldPassword') === value) {
                                                return "New and old password can't be same."
                                            }
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
                                <span className="mt-3 text-xs leading-3 text-red-600">{errors?.newPassword?.message}</span>

                                <input
                                    placeholder='Confirm Password'
                                    type="password"
                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    name='confirmPassword'
                                    {...register('confirmPassword', {
                                        required: {
                                            value: true,
                                            message: 'Please enter confirm password.'
                                        },
                                        validate: val => {
                                            if (watch('newPassword') !== val) {
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

                        </DialogContent>
                        <DialogActions>
                            <button
                                type='submit'
                                className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] focus:outline-none"
                            >
                                Save
                            </button>
                        </DialogActions>
                    </form>
                </BootstrapDialog>
            </div>
            <ToastContainer />
        </>
    );
}
