const jwt = require('jsonwebtoken')
const { signJWT, verifyJWT } = require('./utils')
const { generateOtp, randomString, utcDateTime } = require('../lib/util')
const mongoose = require('mongoose')
const { User, Admin, TempUser } = require('../models')
var request = require('request');
const bcrypt = require('bcrypt');


class AuthController {

    async signup(req, res, next) {
        const { type, name, email, mobile, password, create } = req.body;

        try {
            // Check if the user already exists
            let user = await TempUser.findOne({ where: { email: email } });
            let userDetail = await User.findOne({ where: { email: email } });
            let userMobileDetail = await User.findOne({ where: { mobile: mobile } });
            if (userDetail)
                return res.error({}, "This email already registered");
            if (userMobileDetail)
                return res.error({}, "This mobile number already registered");

            if (user && user.isVerified === 'Yes')
                return res.error({}, "This email already registered");

            if (user && user.isVerified === 'No')
                await TempUser.destroy({ where: { email: email } })
            // Create a new user
            // const hashedPassword = await bcrypt.hash(password, 10);
            const payload = {
                type,
                name,
                email,
                password,
                mobile,
                otp: "1234"
            }
            if (create === 'admin') {
                payload.isVerified = 'Yes'
                await User.create(payload);
            } else {
                await TempUser.create(payload);
            }


            if (create === 'admin')
                return res.success({}, "Donar create successfully.");

            return res.success({}, "Otp sent to your email.");
            // }
        } catch (err) {
            console.error(err);
            return next(err);
        }
    }

    async logIn(req, res, next) {
        try {
            const { password, email } = req.body;

            const user = await User.findOne({
                where: { email },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
            });

            if (!user) {
                return res.error({}, "Not found");
            }

            if (user.status !== 'active') {
                return res.error({}, "Your account is deactivated. Contact to Admin.");
            }

            if (user.isVerified !== 'Yes') {
                await User.update({
                    otp: '1234'
                }, {
                    where: {
                        email: email,
                        status: 'active'
                    },
                    individualHooks: true
                })
                return res.error({}, "Your Account is not verified.");
            }

            // const passwordMatch = await bcrypt.compare(password, user.password);
            const passwordMatch = user.password === password

            if (!passwordMatch) {
                return res.error({}, "Invalid email or password");
            }

            const jwttoken = signJWT({ ...user.dataValues });
            const payload = { ...user.dataValues, jwtToken: jwttoken }
            if (user.dataValues.image !== 'null' && user.dataValues.image !== null)
                payload.image = process.env.API_URL + user.dataValues.image
            else
                payload.image = ""
            delete payload.password

            return res.success({ user: payload }, 'Login Success');
        } catch (err) {
            return next(err);
        }
    }

    async verifyOtp(req, res, next) {
        const { otp, email, text } = req.body;
        try {
            if (text === 'forgot-password') {
                let user = await User.findOne({
                    where: {
                        email, status: 'active'
                    }
                })

                if (!user) {
                    return res.error({}, "UNAUTHORIZED");
                } else {
                    if ((user.dataValues.otp == otp)) {
                        await User.update({
                            otp: null
                        }, {
                            where: {
                                id: user.id,
                                email
                            },
                            individualHooks: true
                        });
                        const userJson = await User.findOne({
                            where: { email, id: user.id },
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "password", "otp"]
                            },
                        });

                        const jwttoken = signJWT(userJson.dataValues);
                        const payload = { ...userJson.dataValues, jwtToken: jwttoken }

                        return res.success({ user: payload }, 'OTP verified');
                    } else {
                        return res.error({}, 'Invalid OTP');
                    }
                }
            } else {
                let user = await TempUser.findOne({
                    where: {
                        email, status: 'active'
                    }
                })

                if (!user) {
                    return res.error({}, "UNAUTHORIZED");
                } else if (user && user.isVerified === 'Yes') {
                    return res.error({}, "This email already registered");
                } else {
                    if ((user.dataValues.otp == otp)) {
                        await TempUser.update({
                            isVerified: 'Yes',
                            otp: null
                        }, {
                            where: {
                                id: user.id,
                                email
                            },
                            individualHooks: true
                        });
                        const userJson = await TempUser.findOne({
                            where: { email, id: user.id },
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "password", "otp"]
                            },
                        });
                        const data = {
                            type: user.type,
                            name: user.name,
                            email: user.email,
                            password: user.password,
                            mobile: user.mobile,
                            otp: "",
                            isVerified: 'Yes'
                        }
                        await User.create(data)

                        const jwttoken = signJWT(userJson.dataValues);
                        const payload = { ...userJson.dataValues, jwtToken: jwttoken }

                        return res.success({ user: payload }, 'OTP verified');
                    } else {
                        return res.error({}, 'Invalid OTP');
                    }
                }
            }

        } catch (err) {
            return next(err)
        }
    }

    async resendOtp(req, res, next) {
        const { email, text } = req.body;
        try {
            if (text === 'forgot-password') {
                let userDetail = await User.findOne({ where: { email, status: 'active' } });

                if (!userDetail) { return res.error({}, "UNAUTHORIZED"); }
                if (userDetail) {
                    await User.update({
                        otp: "1234"
                    }, {
                        where: {
                            email: email,
                            status: 'active'
                        },
                        individualHooks: true
                    })

                    return res.success({}, "OTP resend successfully");
                }
            } else {
                let user = await TempUser.findOne({ where: { email, status: 'active' } });
                let userDetail = await User.findOne({ where: { email, status: 'active' } });

                if (!user) { return res.error({}, "UNAUTHORIZED"); }
                if (user && userDetail) {
                    const user = await TempUser.update({
                        otp: "1234"
                    }, {
                        where: {
                            email: email,
                            status: 'active'
                        },
                        individualHooks: true
                    })
                    await User.update({
                        otp: "1234"
                    }, {
                        where: {
                            email: email,
                            status: 'active'
                        },
                        individualHooks: true
                    })

                    return res.success({}, "OTP resend successfully");
                }
            }

        } catch (err) {
            return next(err)
        }
    }

    async changePassword(req, res, next) {
        const { currentPassword, cPassword } = req.body;
        try {
            let user = await User.findOne({ where: { email: req.user.email, status: 'active' } });

            if (!user) { return res.error({}, "User not found"); }
            if (user) {
                if (user.password !== currentPassword)
                    return res.error({}, "Old Password does not match.");
                await User.update({
                    password: cPassword
                }, {
                    where: {
                        email: req.user.email,
                        status: 'active'
                    },
                    individualHooks: true
                })

                return res.success({}, "Password changed successfully.");



            }
        } catch (err) {
            return next(err)
        }
    }

    async forgotPassword(req, res, next) {
        const { email } = req.body;
        try {
            let user = await User.findOne({ where: { email: email, status: 'active' } });

            if (!user) { return res.error({}, "User not found"); }
            if (user) {
                await User.update({
                    otp: '1234'
                }, {
                    where: {
                        email: email,
                        status: 'active'
                    },
                    individualHooks: true
                })

                return res.success({}, "Otp sent successfully.");



            }
        } catch (err) {
            return next(err)
        }
    }

    async updatePassword(req, res, next) {
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ where: { email: email, status: 'active' } });

            if (!user) { return res.error({}, "User not found"); }
            if (user) {
                await User.update({
                    otp: null,
                    password: password
                }, {
                    where: {
                        email: email,
                        status: 'active'
                    },
                    individualHooks: true
                })

                return res.success({}, "Password changed successfully.");



            }
        } catch (err) {
            return next(err)
        }
    }



    // Admin login

    async adminLogIn(req, res, next) {
        try {
            const { password, email } = req.body;

            const admin = await Admin.findOne({
                where: { email },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
            });

            if (!admin) {
                return res.error({}, "Admin Not found");
            }

            // const passwordMatch = await bcrypt.compare(password, user.password);
            const passwordMatch = admin.password === password

            if (!passwordMatch) {
                return res.error({}, "Invalid email or password");
            }

            if (admin.status !== 'active') {
                return res.error({}, "Your account is disable. Please contact to admin.");
            }

            const jwttoken = signJWT({ ...admin.dataValues, type: 'admin' });
            const payload = { ...admin.dataValues, jwtToken: jwttoken }
            delete payload.password

            if (admin.dataValues.image !== 'null' && admin.dataValues.image !== null)
                payload.image = process.env.API_URL + admin.dataValues.image
            else
                payload.image = ""

            return res.success({ admin: payload }, 'Login Success');
        } catch (err) {
            return next(err);
        }
    }

    async changeAdminPassword(req, res, next) {
        const { currentPassword, cPassword } = req.body;
        try {
            let user = await Admin.findOne({ where: { email: req.user.email, status: 'active' } });

            if (!user) { return res.error({}, "Admin not found"); }
            if (user) {
                if (user.password !== currentPassword)
                    return res.error({}, "Old Password does not match.");
                await Admin.update({
                    password: cPassword
                }, {
                    where: {
                        email: req.user.email,
                        status: 'active'
                    },
                    individualHooks: true
                })

                return res.success({}, "Password changed successfully.");



            }
        } catch (err) {
            return next(err)
        }
    }

    async forgotAdminPassword(req, res, next) {
        const { email } = req.body;
        try {
            let user = await Admin.findOne({ where: { email: email, status: 'active' } });

            if (!user) { return res.error({}, "Admin not found"); }
            if (user) {
                await Admin.update({
                    otp: '1234'
                }, {
                    where: {
                        email: email,
                        status: 'active'
                    },
                    individualHooks: true
                })

                return res.success({}, "Otp sent successfully.");



            }
        } catch (err) {
            return next(err)
        }
    }

    async adminVerifyOtp(req, res, next) {
        const { otp, email } = req.body;
        try {

            let user = await Admin.findOne({
                where: {
                    email, status: 'active'
                }
            })

            if (!user) {
                return res.error({}, "UNAUTHORIZED");
            } else {
                if ((user.dataValues.otp == otp)) {
                    await Admin.update({
                        otp: null
                    }, {
                        where: {
                            id: user.id,
                            email
                        },
                        individualHooks: true
                    });

                    return res.success({}, 'OTP verified');
                } else {
                    return res.error({}, 'Invalid OTP');
                }
            }
        } catch (err) {
            return next(err)
        }
    }

    async updateAdminPassword(req, res, next) {
        const { email, password } = req.body;
        try {
            let user = await Admin.findOne({ where: { email: email, status: 'active' } });

            if (!user) { return res.error({}, "Admin not found"); }
            if (user) {
                await Admin.update({
                    otp: null,
                    password: password
                }, {
                    where: {
                        email: email,
                        status: 'active'
                    },
                    individualHooks: true
                })

                return res.success({}, "Password changed successfully.");



            }
        } catch (err) {
            return next(err)
        }
    }

    //   async generateToken(req, res) {
    //       let _id = req.params._id;
    //       const user = await User.findOne({ _id });
    //       const platform = req.headers['x-hrms-platform'];
    //       const token = signJWT(user, platform);
    //       return res.success({
    //           token
    //       });
    //   }
    //   async logOut(req, res) {

    //       const { user } = req;
    //       user.authTokenIssuedAt = null;
    //       user.deviceToken = null;
    //       await user.save();
    //       return res.success({}, req.__('LOGOUT_SUCCESS'));
    //   }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */


    //   async resendOtp(req, res, next) {
    //       const { mobile, resetToken} = req.body;
    //       try {
    //           let user = await User.findOne({mobile, status: true});

    //           if (!user) { return res.status(401).json({msg:"UNAUTHORIZED"});}
    //           if (user) {
    //               if (user.resetToken === resetToken) {
    //                 //   let otp = generateOtp();
    //                 let otp = '1234';
    //                   user.otp = otp;
    //                   await user.save();

    //                   return res.success({resetToken,email}, "OTP sent successfully");

    //               } else {
    //                 return res.status(401).json({msg:"Invalid reset token"});
    //               }

    //           }
    //       } catch (err) {
    //           return next(err)
    //       }
    //   }
    /**
     * 
     * @param {email,password,deviceToken,deviceType} req 
     * @param {*} res 
     * @param {*} next 
     */
    //   async  signup(req, res, next) {
    //     const { email, password, name, mobile,lat,lng,deviceToken,deviceId,deviceType} = req.body;

    //     try {
    //         let user = await User.findOne({ email, mobile });

    //         if (user) {
    //             if (!user.isVerified) {
    //                 const otp = generateOtp();
    //                 const hashedPassword = await bcrypt.hash(password, 10);

    //                 user.email = email;
    //                 user.name = name;
    //                 user.password = hashedPassword;
    //                 user.mobile = mobile;
    //                 user.otp = otp;
    //                 user.loc = { coordinates: [lat, lng] };
    //                 user.deviceToken = deviceToken;
    //                 user.deviceId = deviceId;
    //                 user.deviceType = deviceType;
    //                 user.authTokenIssuedAt = utcDateTime().valueOf();
    //                 const resetToken = randomString(12);
    //                 user.resetToken = resetToken;
    //                 user.isVerified = false;

    //                 await user.save();

    //                 const options = {
    //                     url: process.env.FAST_URL,
    //                     method: 'POST',
    //                     headers: {
    //                         'content-type': 'application/son',
    //                         authorization: process.env.FAST_KEY
    //                     },
    //                     body: {
    //                         variables_values: user.otp,
    //                         route: 'otp',
    //                         numbers: mobile
    //                     },
    //                     json: true
    //                 };

    //                 const result = await sendOTP(options);

    //                 const userJson = user.toJSON();
    //                 ['password', 'authTokenIssuedAt', 'otp', 'resetToken', '__v'].forEach(key => delete userJson[key]);
    //                 return res.success({
    //                     resetToken,
    //                     user: userJson,
    //                 }, "Please verify otp to complete registration");
    //             } else {
    //                 return res.status(500).json({
    //                     success: false,
    //                     msg: 'Account already registered'
    //                 });
    //             }
    //         } else {
    //             let newUser = new User();
    //             const otp = generateOtp();
    //             const hashedPassword = await bcrypt.hash(password, 10);

    //             newUser.email = email;
    //             newUser.mobile = mobile;
    //             newUser.name = name;
    //             newUser.password = hashedPassword;
    //             newUser.otp = otp;
    //             newUser.deviceToken = deviceToken;
    //             newUser.deviceId = deviceId;
    //             newUser.deviceType = deviceType;
    //             newUser.loc = { coordinates: [lat, lng] };
    //             newUser.authTokenIssuedAt = utcDateTime().valueOf();
    //             const resetToken = randomString(12);
    //             newUser.resetToken = resetToken;
    //             newUser.isVerified = false;

    //             newUser = await newUser.save();

    //             const options = {
    //                 url: process.env.FAST_URL,
    //                 method: 'POST',
    //                 headers: {
    //                     'content-type': 'application/json',
    //                     authorization: process.env.FAST_KEY
    //                 },
    //                 body: {
    //                     variables_values: newUser.otp,
    //                     route: 'otp',
    //                     numbers: mobile
    //                 },
    //                 json: true
    //             };

    //             const result = await sendOTP(options);

    //             const userJson = newUser.toJSON();
    //             ['password', 'authTokenIssuedAt', 'otp', 'emailToken', '__v'].forEach(key => delete userJson[key]);
    //             return res.success({ resetToken, user: userJson }, "Please verify otp to complete registration");
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         return next(err);
    //     }
    // }

    // async  signup(req, res, next) {
    //     const { email, password, name,surName , alias,dob,le, lat, lng, deviceToken, deviceId, deviceType,city,zip,gender } = req.body;

    //     try {
    //         // Check if the user already exists
    //         let user = await User.findOne({ email, mobile });

    //         if (user) {
    //             if (!user.isVerified) {
    //                 const otp = generateOtp();
    //                 const hashedPassword = await bcrypt.hash(password, 10);

    //                 // Update user data
    //                 user.email = email;
    //                 user.name = name;
    //                 user.password = hashedPassword;
    //                 user.mobile = mobile;
    //                 user.otp = otp;
    //                 user.loc = { coordinates: [lat, lng] };
    //                 user.deviceToken = deviceToken;
    //                 user.deviceId = deviceId;
    //                 user.deviceType = deviceType;
    //                 user.authTokenIssuedAt = utcDateTime().valueOf();
    //                 const resetToken = randomString(12);
    //                 user.resetToken = resetToken;
    //                 user.isVerified = false;

    //                 // Save the updated user
    //                 await user.save();

    //                 // Send OTP asynchronously
    //                 const options = {
    //                     url: process.env.FAST_URL,
    //                     method: 'POST',
    //                     headers: {
    //                         'content-type': 'application/json',
    //                         authorization: process.env.FAST_KEY
    //                     },
    //                     body: {
    //                         variables_values: otp,
    //                         route: 'otp',
    //                         numbers: mobile
    //                     },
    //                     json: true
    //                 };

    //                 // Parallelize sending OTP and processing the response
    //                 const [result, userUpdateResult] = await Promise.all([
    //                     sendOTP(options),
    //                     user.save()
    //                 ]);

    //                 const userJson = userUpdateResult.toJSON();
    //                 ['password', 'authTokenIssuedAt', 'otp', 'resetToken', '__v'].forEach(key => delete userJson[key]);
    //                 return res.success({
    //                     resetToken,
    //                     user: userJson,
    //                 }, "Please verify OTP to complete registration");
    //             } else {
    //                 return res.status(500).json({
    //                     success: false,
    //                     msg: 'Account already registered'
    //                 });
    //             }
    //         } else {
    //             // Create a new user
    //             const otp = generateOtp();
    //             const hashedPassword = await bcrypt.hash(password, 10);

    //             const newUser = new User({
    //                 email,
    //                 mobile,
    //                 name,
    //                 password: hashedPassword,
    //                 otp,
    //                 deviceToken,
    //                 deviceId,
    //                 deviceType,
    //                 loc: { coordinates: [lat, lng] },
    //                 authTokenIssuedAt: utcDateTime().valueOf(),
    //                 resetToken: randomString(12),
    //                 isVerified: false
    //             });

    //             // Save the new user
    //             await newUser.save();

    //             // Send OTP asynchronously
    //             const options = {
    //                 url: process.env.FAST_URL,
    //                 method: 'POST',
    //                 headers: {
    //                     'content-type': 'application/json',
    //                     authorization: process.env.FAST_KEY
    //                 },
    //                 body: {
    //                     variables_values: otp,
    //                     route: 'otp',
    //                     numbers: mobile
    //                 },
    //                 json: true
    //             };

    //             // Parallelize sending OTP and processing the response
    //             const [result, newUserResult] = await Promise.all([
    //                 sendOTP(options),
    //                 newUser.save()
    //             ]);

    //             const userJson = newUserResult.toJSON();
    //             ['password', 'authTokenIssuedAt', 'otp', 'emailToken', '__v'].forEach(key => delete userJson[key]);
    //             return res.success({  user: userJson }, "Please verify OTP to complete registration");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         return next(err);
    //     }
    // }



    //   async  forgotPassword(req, res, next) {
    //     const { mobile } = req.body;
    //     try {
    //         const user = await User.findOne({
    //             mobile,
    //             status: true
    //         });

    //         if (!user) {
    //             return res.status(401).json({msg:"Not registered"});
    //         } else if (user) {
    //             const resetToken = randomString(10);
    //             const otp = generateOtp();

    //             user.resetToken = resetToken;
    //             user.otp = otp;
    //             user.authTokenIssuedAt = utcDateTime().valueOf();
    //             await user.save();

    //             const options = {
    //                 url: process.env.FAST_URL,
    //                 method: 'POST',
    //                 headers: {
    //                     'content-type': 'application/json',
    //                     authorization: process.env.FAST_KEY
    //                 },
    //                 body: {
    //                     variables_values: user.otp,
    //                     route: 'otp',
    //                     numbers: mobile
    //                 },
    //                 json: true
    //             };

    //             const result = await sendOTP(options);
    //             return res.success({ resetToken,mobile }, "OTP sent successfully");
    //         }
    //     } catch (err) {
    //         return next(err);
    //     }
    // }

    // async resetPassword(req, res, next) {
    //     const { password, cnfpassword } = req.body;

    //     try {
    //         const { _id } = req;
    //         const user = await User.findOne({ _id });

    //         if (!user) {
    //             return res.status(401).json({ msg: "UNAUTHORIZED" });
    //         }

    //         if (password === cnfpassword) {
    //             const hashedPassword = await bcrypt.hash(password, 10);
    //             user.password = hashedPassword;
    //             await user.save();
    //             return res.success({}, 'Password reset successfully');
    //         } else {
    //             return res.status(401).json({ msg: "Passwords do not match" });
    //         }
    //     } catch (err) {
    //         return next(err);
    //     }
    // }


}



module.exports = new AuthController()


