const { User, AddressDetail, KYCDetail, BankDetail, SchemeDetail, Admin, ClassDetail, EducationDetail, ClassDocumentDetail, StudentDocumentVerification, DonationDetail, StudentDonation, ProfessionalDetail, Blog } = require('../models')
// const { Category, Slider1, Slider2,Product } = require('../models/product.model')
const { uploadImageAPI } = require('../lib/util')
const { signJWT, verifyJWT } = require('./utils')
const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config()
const _ = require('lodash')
const moment = require('moment')
const path = require('path')
const mongoose = require("mongoose");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { SANDBOX_HOST, API_KEY, VERSION } = process.env;

class UserController {


    async getProfile(req, res, next) {

        try {
            const user = await User.findOne({
                where: {
                    email: req.user.email,
                    status: 'active'
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
                }
            });
            const address = await AddressDetail.findOne({ where: { userId: user?.id } })
            const bank = await BankDetail.findOne({ where: { userId: user?.id } })
            const kyc = await KYCDetail.findOne({ where: { userId: user?.id } })
            const professional = await ProfessionalDetail.findOne({ where: { userId: user?.id } })
            const education = await EducationDetail.findOne({ where: { userId: user?.id } })
            const studentDonation = await StudentDonation.findOne({ where: { studentId: user?.id } })
            if (!user) {
                return res.error({}, 'User not found');
            }
            const payload = { ...user.dataValues };
            const kycPayload = { ...kyc?.dataValues };
            payload.image = imageUrl(user?.dataValues?.image)

            kycPayload.panImage = imageUrl(kyc?.dataValues?.panImage)
            kycPayload.tanImage = imageUrl(kyc?.dataValues?.tanImage)
            kycPayload.aadharFront = imageUrl(kyc?.dataValues?.aadharFront)
            kycPayload.aadharBack = imageUrl(kyc?.dataValues?.aadharBack)
            return res.success({ user: payload, address: address?.dataValues || {}, bank: bank?.dataValues || {}, kyc: kycPayload || {}, professional: professional?.dataValues || {}, education: education?.dataValues || {}, studentDonation: studentDonation || {} }, 'Success');
        } catch (err) {
            console.error(err);
            return next(err);
        }
    }

    async getDashboardDetail(req, res, next) {

        try {
            const totalStudent = (await User.findAll({
                where: {
                    type: 'student'
                }
            })).length;
            const totalStudentVerified = (await User.findAll({
                where: {
                    type: 'student',
                    isVerified: 'Yes'
                }
            })).length;
            const totalStudentUnVerfied = (await User.findAll({
                where: {
                    type: 'student',
                    isVerified: 'No'
                }
            })).length;
            const totalStudentActive = (await User.findAll({
                where: {
                    type: 'student',
                    status: 'active'
                }
            })).length;
            const totalStudentInactive = (await User.findAll({
                where: {
                    type: 'student',
                    status: 'inactive'
                }
            })).length;

            const totalDonar = (await User.findAll({
                where: {
                    type: 'donar'
                }
            })).length;
            const totalDonarVerified = (await User.findAll({
                where: {
                    type: 'donar',
                    isVerified: 'Yes'
                }
            })).length;
            const totalDonarUnVerfied = (await User.findAll({
                where: {
                    type: 'donar',
                    isVerified: 'No'
                }
            })).length;
            const totalDonarActive = (await User.findAll({
                where: {
                    type: 'donar',
                    status: 'active'
                }
            })).length;
            const totalDonarInactive = (await User.findAll({
                where: {
                    type: 'donar',
                    status: 'inactive'
                }
            })).length;

            const allSubAdmin = (await Admin.findAll({
                where: {
                    type: 'subAdmin'
                }
            })).length

            const totalDocument = (await StudentDocumentVerification.findAll({})).length
            const totalDocumentVerified = (await StudentDocumentVerification.findAll({
                where: {
                    status: 'verified'
                }
            })).length
            const totalDocumentUnverified = (await StudentDocumentVerification.findAll({
                where: {
                    status: 'pending'
                }
            })).length

            const totalScholarship = await StudentDonation.findAll({ status: 'active' });
            const manualScholarship = await StudentDonation.findAll({ mode: 'manual', status: 'active' });
            const automaticScholarship = await StudentDonation.findAll({ mode: 'auto', status: 'active' });
            let totalScholarshipAmount = 0, manualScholarshipAmount = 0, automaticScholarshipAmount = 0, totalDonationAmount = 0, totalDonationDistribute = 0, remainingDonationAmount = 0;
            totalScholarshipAmount = totalScholarship?.map(item => item.amount)?.reduce((a, b) => a + b, 0)
            manualScholarshipAmount = manualScholarship?.map(item => item.amount)?.reduce((a, b) => a + b, 0)
            automaticScholarshipAmount = automaticScholarship?.map(item => item.amount)?.reduce((a, b) => a + b, 0)
            const totalDonation = await DonationDetail.findAll({});

            totalDonationAmount = totalDonation?.map(item => item?.totalAmount)?.reduce((a, b) => a + b, 0)

            for (let i = 0; i < totalDonation.length; i++) {
                const donat = totalDonation[i];
                const totalStudentDona = (await StudentDonation.findAll({
                    where: {
                        donationId: donat.id
                    }
                })).length;
                totalDonationDistribute += totalStudentDona * donat?.amount;
                remainingDonationAmount += (donat?.noOfStudent - totalStudentDona) * donat?.amount;
            }

            const payload = {
                totalStudent,
                totalStudentVerified,
                totalStudentUnVerfied,
                totalStudentActive,
                totalStudentInactive,
                totalDonar,
                totalDonarVerified,
                totalDonarUnVerfied,
                totalDonarActive,
                totalDonarInactive,
                allSubAdmin,
                totalDocument,
                totalDocumentVerified,
                totalDocumentUnverified,
                totalScholarship: totalScholarshipAmount,
                manualScholarship: manualScholarshipAmount,
                automaticScholarship: automaticScholarshipAmount,
                totalDonation: totalDonationAmount,
                totalDonationDistribute,
                remainingDonationAmount
            }
            return res.success(payload, 'Success');
        } catch (err) {
            console.error(err);
            return next(err);
        }
    }

    async saveAddress(req, res, next) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { houseNumber, route, wardNumber, city, state, zipCode, country } = req.body;

            await updateDefaultAddress(req._id, session);

            const newAddress = new Address({
                houseNumber,
                route,
                wardNumber,
                city,
                state,
                zipCode,
                country,
                userId: req._id
            });

            await newAddress.save({ session });

            await session.commitTransaction();
            session.endSession();

            return res.success({ newAddress }, 'Address added successfully');
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            console.error(err);
            return next(err);
        }
    }


    async Test(req, res, next) {
        try {
            console.log(req.body);
            return res.success({});

        } catch (err) {
            return next(err);
        }
    }

    async editProfile(req, res, next) {
        try {
            const { name, email, mobile } = req.body;
            const payload = {}
            let id;
            if (req.user.type === 'admin')
                id = req.query.id;
            else
                id = req.user.id
            const userDetail = await User.findOne({ where: { id: id } });
            const type = userDetail?.type === 'student' ? 'Student' : 'Donar'

            if (name) payload.name = name;
            if (email) payload.email = email;
            if (mobile) payload.mobile = mobile;
            if (req.file)
                payload.image = req.file.filename

            if (!userDetail)
                return res.error({}, "User not found.")

            await User.update(payload, {
                where: {
                    id: id
                },
                individualHooks: true
            })

            if (req.user.type === 'admin')
                return res.success({}, `${type} profile update successfully.`)
            else
                return res.success({}, "Profile Update Successfully.")
        } catch (err) {
            return next(err);
        }
    }

    async editAddress(req, res, next) {
        try {
            const { street, pinCode, city, state, country } = req.body;
            const payload = {}
            let id;
            if (req.user.type === 'admin')
                id = req.query.id;
            else
                id = req.user.id
            const userDetail = await User.findOne({ where: { id: id } });
            const type = userDetail?.type === 'student' ? 'Student' : 'Donar'
            const addressDetail = await AddressDetail.findOne({ where: { userId: id } });

            if (street) payload.street = street;
            if (pinCode) payload.pinCode = pinCode;
            if (city) payload.city = city;
            if (state) payload.state = state;
            if (country) payload.country = country;

            if (!addressDetail) {
                payload.userId = id;
                await AddressDetail.create(payload)
                if (req.user.type === 'admin')
                    return res.success({}, `${type} address update successfully.`)
                else
                    return res.success({}, "Address Update Successfully.")
            }

            await AddressDetail.update(payload, {
                where: {
                    userId: id
                },
                individualHooks: true
            })
            if (req.user.type === 'admin')
                return res.success({}, `${type} address update successfully.`)
            else
                return res.success({}, "Address Update Successfully.")
        } catch (err) {
            return next(err);
        }
    }

    async editBank(req, res, next) {
        try {
            const { bankName, accountHolderName, accountNo, ifsc } = req.body;
            const payload = {}
            let id;
            if (req.user.type === 'admin')
                id = req.query.id;
            else
                id = req.user.id
            const bankDetail = await BankDetail.findOne({ where: { userId: id } });

            if (bankName) payload.bankName = bankName;
            if (accountHolderName) payload.accountHolderName = accountHolderName;
            if (accountNo) payload.accountNo = accountNo;
            if (ifsc) payload.ifsc = ifsc;

            if (!bankDetail) {
                payload.userId = id;
                await BankDetail.create(payload)
                if (req.user.type === 'admin')
                    return res.success({}, "Student bank details update successfully.")
                else
                    return res.success({}, "Bank Update Successfully.")
            }

            await BankDetail.update(payload, {
                where: {
                    userId: id
                },
                individualHooks: true
            })

            if (req.user.type === 'admin')
                return res.success({}, "Student bank details update successfully.")
            else
                return res.success({}, "Bank Update Successfully.")
        } catch (err) {
            return next(err);
        }
    }

    async editKyc(req, res, next) {
        try {
            const { panNo, tanNo, aadharNo } = req.body;
            const payload = { panNo, tanNo, aadharNo };
            let id;
            if (req.user.type === 'admin')
                id = req.query.id;
            else
                id = req.user.id

            const userDetail = await User.findOne({ where: { id: id } });
            const type = userDetail?.type === 'student' ? 'Student' : 'Donar'
            const kycDetail = await KYCDetail.findOne({ where: { userId: id } })
            if (req.files.panImage && req.files.panImage[0]) payload.panImage = req.files.panImage[0].filename;
            if (req.files.tanImage && req.files.tanImage[0]) payload.tanImage = req.files.tanImage[0].filename;
            if (req.files.aadharFront && req.files.aadharFront[0]) payload.aadharFront = req.files.aadharFront[0].filename;
            if (req.files.aadharBack && req.files.aadharBack[0]) payload.aadharBack = req.files.aadharBack[0].filename;


            if (!kycDetail) {
                payload.userId = id;
                await KYCDetail.create(payload)
                if (req.user.type === 'admin')
                    return res.success({}, `${type} KYC update successfully.`)
                else
                    return res.success({}, "KYC Update Successfully.")
            }

            await KYCDetail.update(payload, {
                where: {
                    userId: id
                },
                individualHooks: true
            })
            if (req.user.type === 'admin')
                return res.success({}, `${type} KYC update successfully.`)
            else
                return res.success({}, "KYC Update Successfully.")
        } catch (err) {
            return next(err);
        }
    }

    async editProfessional(req, res, next) {
        try {
            const { fatherName, occupation, designation, annualIncome } = req.body;
            const payload = {}
            let id;
            if (req.user.type === 'admin')
                id = req.query.id;
            else
                id = req.user.id
            const userDetail = await User.findOne({ where: { id: id } });
            const type = userDetail?.type === 'student' ? 'Student' : 'Donar'
            const professionalDetail = await ProfessionalDetail.findOne({ where: { userId: id } });

            if (fatherName) payload.fatherName = fatherName;
            if (occupation) payload.occupation = occupation;
            if (designation) payload.designation = designation;
            if (annualIncome) payload.annualIncome = annualIncome;

            if (!professionalDetail) {
                payload.userId = id;
                await ProfessionalDetail.create(payload)
                if (req.user.type === 'admin')
                    return res.success({}, `${type} professional detail update successfully.`)
                else
                    return res.success({}, "Professional Detail Update Successfully.")
            }

            await ProfessionalDetail.update(payload, {
                where: {
                    userId: id
                },
                individualHooks: true
            })
            if (req.user.type === 'admin')
                return res.success({}, `${type} professional detail update successfully.`)
            else
                return res.success({}, "Professional Detail Update Successfully.")

        } catch (err) {
            return next(err);
        }
    }

    async editEducationDetail(req, res, next) {
        try {
            const { pursuingClass, year } = req.body;
            const payload = {}
            let id;
            if (req.user.type === 'admin')
                id = req.query.id;
            else
                id = req.user.id
            const educationDetail = await EducationDetail.findOne({ where: { userId: id } });

            if (pursuingClass) payload.pursuingClass = pursuingClass;
            if (year) payload.year = year;

            if (!educationDetail) {
                payload.userId = id;
                await EducationDetail.create(payload)
                if (req.user.type === 'admin')
                    return res.success({}, "Student education detail update successfully.")
                else
                    return res.success({}, "Education Detail Update Successfully.")
            }

            await EducationDetail.update(payload, {
                where: {
                    userId: id
                },
                individualHooks: true
            })
            if (req.user.type === 'admin')
                return res.success({}, "Student education detail update successfully.")
            else
                return res.success({}, "Education Detail Update Successfully.")
        } catch (err) {
            return next(err);
        }
    }

    async allScholarshipScheme(req, res, next) {
        try {
            const scheme = await SchemeDetail.findAll();
            let arr = [];
            for (let i = 0; i < scheme.length; i++) {
                const classDetail = await ClassDetail.findOne({ where: { id: scheme[i].classId } });
                if (req.user.type === 'donar') {
                    const donate = await DonationDetail.findOne({
                        where: {
                            donarId: req.user.id,
                            schemeId: scheme[i].id
                        }
                    })
                    if (!donate) {
                        arr.push({ ...scheme[i].dataValues, className: classDetail?.name })
                    }
                }
                if (req.user.type === 'student') {
                    const donate = await SchemeStudentDetail.findOne({
                        where: {
                            studentId: req.user.id,
                            schemeId: scheme[i].id
                        }
                    })
                    if (!donate) {
                        arr.push({ ...scheme[i].dataValues, className: classDetail?.name })
                    }
                }

            }
            return res.success({ scheme: arr || [] }, 'All Scheme Scholarship.')
        } catch (err) {
            return next(err);
        }
    }

    async applyDocuments(req, res, next) {
        try {
            const { classId, studentId, studentName, collegeName, university, rollNo, percentage } = req.body;
            const payload = { classId, studentId, studentName, university, collegeName, rollNo, percentage };
            if (req?.files?.docOne && req.files.docOne[0]) payload.docOne = req.files.docOne[0].filename;
            if (req?.files?.docTwo && req.files.docTwo[0]) payload.docTwo = req.files.docTwo[0].filename;
            if (req?.files?.docThree && req.files.docThree[0]) payload.docThree = req.files.docThree[0].filename;
            if (req?.files?.docFour && req.files.docFour[0]) payload.docFour = req.files.docFour[0].filename;
            if (req?.files?.docFive && req.files.docFive[0]) payload.docFive = req.files.docFive[0].filename;

            await StudentDocumentVerification.create(payload)
            return res.success({}, 'Document Submit successfully.')
        } catch (err) {
            return next(err);
        }
    }

    async DocumentsList(req, res, next) {
        try {
            const documentList = await StudentDocumentVerification.findAll({
                where: { studentId: req.user.id },
                order: [['createdAt', 'DESC']]
            })
            let arr = [];
            if (documentList) {
                for (let i = 0; i < documentList.length; i++) {
                    let payload;
                    payload = { ...documentList[i].dataValues }
                    const classDocument = await ClassDocumentDetail.findOne({ where: { classId: payload.classId } })
                    const classDetail = await ClassDetail.findOne({ where: { id: payload.classId } })
                    payload.documents = classDocument.dataValues.documents;
                    payload.className = classDetail.dataValues.name;
                    payload.docOne = await imageUrl(payload.docOne);
                    payload.docTwo = await imageUrl(payload.docTwo);
                    payload.docThree = await imageUrl(payload.docThree);
                    payload.docFour = await imageUrl(payload.docFour);
                    payload.docFive = await imageUrl(payload.docFive);
                    arr.push(payload)
                }

            }

            return res.success({ documentList: arr }, 'ALl document List..')
        } catch (err) {
            next(err)
        }
    }

    async editApplyDocument(req, res, next) {
        try {
            const { id, collegeName, university, rollNo, percentage, documentLength } = req.body;
            const payload = { collegeName, university, rollNo, percentage };
            const status = ['docOneStatus', 'docTwoStatus', 'docThreeStatus', 'docFourStatus', 'docFiveStatus']
            if (req.files.docOne && req.files.docOne[0]) payload.docOne = req.files.docOne[0].filename;
            if (req.files.docTwo && req.files.docTwo[0]) payload.docTwo = req.files.docTwo[0].filename;
            if (req.files.docThree && req.files.docThree[0]) payload.docThree = req.files.docThree[0].filename;
            if (req.files.docFour && req.files.docFour[0]) payload.docFour = req.files.docFour[0].filename;
            if (req.files.docFive && req.files.docFive[0]) payload.docFive = req.files.docFive[0].filename;
            payload.status = 'pending';
            for (let i = 0; i < documentLength; i++) {
                payload[status[i]] = 'pending';
            }
            await User.update({
                scholarshipStatus: 'pending'
            }, {
                where: {
                    id: req.user.id
                },
                individualHooks: true
            })

            const existScheme = await StudentDocumentVerification.findOne({ where: { id } });

            if (!existScheme)
                return res.error({}, 'Document not found.')
            await StudentDocumentVerification.update(payload, { where: { id }, individualHooks: true })
            return res.success({}, 'Edit Document successfully.')
        } catch (err) {
            console.log("err", err.message)
            return next(err);
        }
    }

    async applySchemeList(req, res, next) {
        try {
            const { keyword } = req.query;
            const query = {
                studentId: req.user.id
            };
            // if (type) query.type = type;
            if (keyword) query[Op.or] = [{ collegeName: { [Op.regexp]: keyword.trim() } }, { studentName: { [Op.regexp]: keyword.trim() } }];
            // if (keyword) query.email = { [Op.regexp]: keyword.trim() };
            // const applySchemeList = await SchemeStudentDetail.findAll({
            // where: query,
            // attributes: {
            //     exclude: ["updatedAt", "password"]
            // }
            // });
            let arr = [];
            for (let i = 0; i < applySchemeList.length; i++) {
                const payload = { ...applySchemeList[i].dataValues }
                const classDetail = await ClassDetail.findOne({
                    where: {
                        id: applySchemeList[i].classId
                    }
                })
                const schemeDetail = await SchemeDetail.findOne({
                    where: {
                        id: applySchemeList[i].schemeId
                    }
                })
                if (classDetail?.name)
                    payload.className = classDetail?.name
                if (schemeDetail?.name)
                    payload.schemeName = schemeDetail?.name
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docOne = process.env.API_URL + applySchemeList[i].dataValues.docOne;
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docTwo = process.env.API_URL + applySchemeList[i].dataValues.docTwo;
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docThree = process.env.API_URL + applySchemeList[i].dataValues.docThree;
                arr.push(payload)
            }

            return res.success({ applySchemeList: arr || [] }, 'All Apply Scheme List.')
        } catch (err) {
            return next(err);
        }
    }

    async donarPay(req, res, next) {
        try {
            const { paymentReferenceId, totalAmount, noOfStudent, duration, schemeId, amount, mode } = req.body;

            // const userLength = type === 'manual' ? user?.length : user;
            // let donarCreate = {}, totalAmount = Number(amount / userLength);
            await DonationDetail.create({ donarId: req.user.id, paymentReferenceId, totalAmount, noOfStudent, duration, schemeId, amount, mode })

            return res.success({}, 'Donation donate Successfully.')
        } catch (err) {
            return next(err);
        }
    }

    async donationList(req, res, next) {
        try {
            const query = await handleQuery(req);
            const donation = await DonationDetail.findAll({ where: { ...query, donarId: req.user.id } });
            let arr = [];
            for (let i = 0; i < donation.length; i++) {
                const payload = { ...donation[i].dataValues }
                const schemeDetail = await SchemeDetail.findOne({ where: { id: payload.schemeId } });
                payload.schemeName = schemeDetail.name;
                payload.classId = schemeDetail.className;
                payload.amount = schemeDetail.amount;
                arr.push(payload)
            }
            arr = await handleKeyword(req, arr, 'name');
            return res.success({ donationList: arr || [] }, 'All Donation List.')
        } catch (err) {
            return next(err);
        }
    }

    async eligibleStudentList(req, res, next) {
        try {
            let arr = [], students = [];
            const arr2 = []
            const donarDetail = await DonationDetail.findAll({ where: { mode: 'manual' } })
            for (let i = 0; i < donarDetail.length; i++) {
                const obj = {}
                const studentDonate = await StudentDonation.findAll({ where: { donationId: donarDetail[i].dataValues.id, mode: 'manual' } });
                const studentDetail = await User.findAll({ where: { scholarshipStatus: 'verified', scholarshipRecieve: 'no' } });
                const schemeDet = await SchemeDetail.findOne({ where: { id: donarDetail[i].schemeId } })
                for (let j = 0; j < studentDetail.length; j++) {
                    const documentVerifyDetail = await StudentDocumentVerification.findOne({ order: [['createdAt', 'DESC']] })
                    if (+schemeDet.classId === +documentVerifyDetail.classId) {
                        students.push(studentDetail[j])
                    }
                }
                obj.donationId = donarDetail[i].dataValues.id
                obj.donarId = donarDetail[i].dataValues.donarId
                obj.totalStudent = donarDetail[i].dataValues.noOfStudent - studentDonate.length;
                obj.noOfStudent = donarDetail[i].dataValues.noOfStudent;
                obj.amount = donarDetail[i].dataValues.totalAmount;
                obj.totalAmount = donarDetail[i].dataValues.amount;
                arr2.push(obj)
            }
            for (let i = 0; i < students.length; i++) {
                const payload = { ...students[i].dataValues }
                const addressDetail = await AddressDetail.findOne({ where: { userId: payload.id } });
                const educationDetailDetail = await EducationDetail.findOne({ where: { userId: payload.id } });
                const studentDocument = await StudentDocumentVerification.findOne({ where: { studentId: payload.id } })
                const professionalDocument = await ProfessionalDetail.findOne({ where: { userId: payload.id } })
                payload.city = addressDetail?.city || 'N/A';
                payload.state = addressDetail?.state || 'N/A';
                payload.country = addressDetail?.country || 'N/A';
                payload.pursuingClass = educationDetailDetail?.pursuingClass || 'N/A';
                payload.year = educationDetailDetail?.year || 'N/A';
                payload.higherClassPercentage = studentDocument?.percentage || 'N/A';
                payload.familyANnualIncome = professionalDocument?.annualIncome || 'N/A';
                arr.push(payload)
            }
            arr = await handleKeyword(req, arr, 'studentName', 'higherClassPercentage');
            return res.success({ studentsList: arr || [], totalStudentDetail: arr2 }, 'All Student List.')
        } catch (err) {
            return next(err);
        }
    }

    async studentDonationByDonar(req, res, next) {
        try {
            const { studentList, donationDetail } = req.body;
            let donationDetails = donationDetail;
            if (req.user.type === 'donar') {
                for (let i = 0; i < studentList.length; i++) {
                    const students = await User.findAll({ where: { id: studentList[i], scholarshipStatus: 'verified', scholarshipRecieve: 'no' } });
                    if (students) {
                        // for(let j=0;i<donationDetail.length; j++) {
                        //     for(let k=0;i<donationDetail[j].totalStudent; k++) {

                        //     }
                        // }
                        if (donationDetails[i].totalStudent > 0) {
                            await StudentDonation.create({ studentId: studentList[i], donarId: req.user.id, donationId: donationDetails[i].donationId, amount: donationDetails[i].amount / donationDetails[i].noOfStudent, mode: 'manual' })
                            await User.update({ scholarshipRecieve: 'yes' }, { where: { id: studentList[i] }, individualHooks: true })
                            donationDetails[i].totalStudent = --donationDetails[i].totalStudent;
                        }
                    } else {
                        return res.error({}, 'Not Found.')
                    }
                }
                return res.success({}, 'Manual Student Donation Successfully.')
            } else {
                return res.error({}, 'Something went wrong.')
            }
        } catch (err) {
            return next(err);
        }
    }

    async donarDonationHistory(req, res, next) {
        try {
            const students = await StudentDonation.findAll({ where: { donarId: req.user.id } });
            let arr = []
            for (let i = 0; i < students.length; i++) {
                const payload = { ...students[i].dataValues }
                const userDetail = await User.findOne({ where: { id: payload.studentId } });
                const addressDetail = await AddressDetail.findOne({ where: { userId: payload.studentId } });
                const educationDetail = await EducationDetail.findOne({ where: { userId: payload.studentId } });
                const studentDocument = await StudentDocumentVerification.findOne({ where: { studentId: payload.studentId } })
                const professionalDocument = await ProfessionalDetail.findOne({ where: { userId: payload.studentId } })
                const donationDocument = await DonationDetail.findOne({ where: { id: payload.donationId, donarId: req.user.id } })
                const schemeDetail = await SchemeDetail.findOne({ where: { id: donationDocument?.schemeId } })
                payload.studentName = userDetail?.name || 'N/A';
                payload.email = userDetail?.email || 'N/A';
                payload.mobile = userDetail?.mobile || 'N/A';
                payload.studentId = userDetail?.id || 'N/A';
                payload.city = addressDetail?.city || 'N/A';
                payload.state = addressDetail?.state || 'N/A';
                payload.country = addressDetail?.country || 'N/A';
                payload.pursuingClass = educationDetail?.pursuingClass || 'N/A';
                payload.year = educationDetail?.year || 'N/A';
                payload.higherClassPercentage = studentDocument?.percentage || 'N/A';
                payload.schemeName = schemeDetail?.name || 'N/A';
                payload.duration = donationDocument?.duration || 'N/A';
                payload.familyANnualIncome = professionalDocument?.annualIncome || 'N/A';
                arr.push(payload)
            }
            arr = await handleKeyword(req, arr, 'studentName', 'higherClassPercentage');
            return res.success({ studentsList: arr }, 'All Student Donation List.')
        } catch (err) {
            return next(err);
        }
    }

    async studentDonationHistory(req, res, next) {
        try {
            const students = await StudentDonation.findAll({ where: { studentId: req.user.id } });
            let arr = []
            for (let i = 0; i < students.length; i++) {
                const payload = { ...students[i].dataValues }
                const userDetail = await User.findOne({ where: { id: payload.studentId } });
                const educationDetail = await EducationDetail.findOne({ where: { userId: payload.studentId } });
                const studentDocument = await StudentDocumentVerification.findOne({ where: { studentId: payload.studentId } })
                const professionalDocument = await ProfessionalDetail.findOne({ where: { userId: payload.studentId } })
                const donationDocument = await DonationDetail.findOne({ where: { id: payload.donationId } })
                const schemeDetail = await SchemeDetail.findOne({ where: { id: donationDocument.schemeId } })
                payload.studentName = userDetail?.name || 'N/A';
                payload.email = userDetail?.email || 'N/A';
                payload.mobile = userDetail?.mobile || 'N/A';
                payload.studentId = userDetail?.id || 'N/A';
                payload.pursuingClass = educationDetail?.pursuingClass || 'N/A';
                payload.year = educationDetail?.year || 'N/A';
                payload.higherClassPercentage = studentDocument?.percentage || 'N/A';
                payload.schemeName = schemeDetail?.name || 'N/A';
                payload.duration = donationDocument?.duration || 'N/A';
                payload.familyANnualIncome = professionalDocument?.annualIncome || 'N/A';
                arr.push(payload)
            }
            return res.success({ studentsList: arr }, 'All Student Donation List.')
        } catch (err) {
            return next(err);
        }
    }

    async changeUserStatus(req, res, next) {
        try {
            const { userId } = req.params;
            const { status } = req.body;
            const user = await User.findOne({ where: { id: userId } });
            if (user) {
                await User.update({ status }, {
                    where: {
                        id: userId
                    },
                    individualHooks: true
                })
                if (user.type === 'donar') {
                    return res.success({}, 'Donar status change successfully.')
                } else {
                    return res.success({}, 'Student status change successfully.')
                }
            } else {
                return res.error({}, 'User not found.')
            }

        } catch (err) {
            return next(err);
        }
    }





    // Admin----------------------
    async createClass(req, res, next) {
        try {
            const { className } = req.body;
            const scheme = await ClassDetail.create({ name: className });
            return res.success({ scheme: scheme || [] }, 'Class create successfully.')
        } catch (err) {
            return next(err);
        }
    }

    async getAdminProfile(req, res, next) {

        try {
            const user = await Admin.findOne({
                where: {
                    email: req.user.email,
                    status: 'active'
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
                }
            });
            const address = await AddressDetail.findOne({ where: { adminId: req.user?.id } })
            const kyc = await KYCDetail.findOne({ where: { adminId: req.user?.id } })

            if (!user) {
                return res.error({}, 'Admin not found.');
            }
            const payload = { ...user.dataValues };
            const kycPayload = { ...kyc?.dataValues };
            payload.image = imageUrl(user?.dataValues?.image)

            kycPayload.panImage = imageUrl(kyc?.dataValues?.panImage)
            kycPayload.tanImage = imageUrl(kyc?.dataValues?.tanImage)
            kycPayload.aadharFront = imageUrl(kyc?.dataValues?.aadharFront)
            kycPayload.aadharBack = imageUrl(kyc?.dataValues?.aadharBack)
            payload.type = 'admin';
            return res.success({ admin: payload, address: address?.dataValues || {}, kyc: kycPayload }, 'Success');
        } catch (err) {
            console.error(err);
            return next(err);
        }
    }

    async editAdminProfile(req, res, next) {
        try {
            const { name, email, mobile } = req.body;
            const payload = {}
            const userDetail = await Admin.findOne({ where: { id: req.user.id } });

            if (name) payload.name = name;
            if (email) payload.email = email;
            if (mobile) payload.mobile = mobile;
            if (req.file)
                payload.image = req.file.filename

            if (!userDetail)
                return res.error({}, "User not found.")

            await Admin.update(payload, {
                where: {
                    id: req.user.id
                },
                individualHooks: true
            })
            const adminDetail = await Admin.findOne({ where: { id: req.user.id } });

            const jwttoken = signJWT({ ...adminDetail.dataValues });
            const payload2 = { ...adminDetail.dataValues, jwtToken: jwttoken }
            if (adminDetail.dataValues.image !== 'null' && adminDetail.dataValues.image !== null)
                payload.image = process.env.API_URL + adminDetail.dataValues.image
            else
                payload.image = ""
            delete payload.password

            return res.success({ data: payload2 }, "Profile Update Successfully.")
        } catch (err) {
            return next(err);
        }
    }

    async editAdminAddress(req, res, next) {
        try {
            const { street, pinCode, city, state, country } = req.body;
            const payload = {}
            const addressDetail = await AddressDetail.findOne({ where: { adminId: req.user.id } });

            if (street) payload.street = street;
            if (pinCode) payload.pinCode = pinCode;
            if (city) payload.city = city;
            if (state) payload.state = state;
            if (country) payload.country = country;

            if (!addressDetail) {
                payload.adminId = req.user.id;
                await AddressDetail.create(payload)
                return res.success({}, "Address Update Successfully.")
            }

            await AddressDetail.update(payload, {
                where: {
                    adminId: req.user.id
                },
                individualHooks: true
            })

            return res.success({}, "Address Update Successfully.")
        } catch (err) {
            return next(err);
        }
    }

    async editAdminKyc(req, res, next) {
        try {
            const { panNo, tanNo } = req.body;
            const payload = { panNo, tanNo };
            const kycDetail = await KYCDetail.findOne({ where: { adminId: req.user.id } })
            if (req.files.panImage && req.files.panImage[0]) payload.panImage = req.files.panImage[0].filename;
            if (req.files.tanImage && req.files.tanImage[0]) payload.tanImage = req.files.tanImage[0].filename;


            if (!kycDetail) {
                payload.adminId = req.user.id;
                await KYCDetail.create(payload)
                return res.success({}, "KYC Update Successfully.")
            }

            await KYCDetail.update(payload, {
                where: {
                    adminId: req.user.id
                },
                individualHooks: true
            })
            return res.success({}, 'KYC Update Successfully.')
        } catch (err) {
            return next(err);
        }
    }

    async createClassDocument(req, res, next) {
        try {
            const { classId, documents } = req.body;
            const classExist = await ClassDocumentDetail.findOne({ where: { classId: classId } })
            if (classExist)
                return res.error({}, 'This class you select is already added.')

            await ClassDocumentDetail.create({ classId, documents });
            return res.success({}, 'Documents create successfully.')
        } catch (err) {
            return next(err);
        }
    }

    async editClassDocument(req, res, next) {
        try {
            const { classId, documents } = req.body;
            const classExist = await ClassDocumentDetail.findOne({ where: { id: req.params.id } })
            if (!classExist)
                return res.error({}, 'No document is found.')

            await ClassDocumentDetail.update({ classId, documents }, {
                where: {
                    id: req.params.id
                },
                individualHooks: true
            });
            return res.success({}, 'Documents edit successfully.')
        } catch (err) {
            return next(err);
        }
    }

    async classDocumentList(req, res, next) {
        try {
            const classList = await ClassDocumentDetail.findAll();
            let arr = []
            for (let i = 0; i < classList.length; i++) {
                const payload = { ...classList[i].dataValues };
                const classDetail = await ClassDetail.findOne({ where: { id: payload.classId } })
                payload.className = classDetail.name
                arr.push(payload)
            }
            const csvWriter = createCsvWriter({
                path: path.join(__dirname, '../pdf/class_document_list.csv'),
                header: [
                    { id: 'classId', title: 'Class ID' },
                    { id: 'documents', title: 'No. of Document' },
                    { id: 'createdAt', title: 'Date' }
                ],
            });

            csvWriter.writeRecords(classList)
                .then(() => {
                })
                .catch((error) => {
                    console.error('Error writing CSV:', error);
                    // res.status(500).send('Error generating the CSV file');
                });
            arr = await dynamicSort(req, arr)
            return res.success({ classDocumentList: arr || [] }, 'All Class Document List.')
        } catch (err) {
            return next(err);
        }
    }

    async adminClassDocumentList(req, res, next) {
        try {
            const classList = await ClassDocumentDetail.findAll();
            let arr = []
            for (let i = 0; i < classList.length; i++) {
                let obj = { ...classList[i].dataValues };
                const classDet = await ClassDetail.findOne({ where: { id: classList[i].classId } })
                obj.className = classDet.name;
                arr.push(obj)
            }
            return res.success({ adminClassDocumentList: arr || [] }, 'All Class Document List.')
        } catch (err) {
            return next(err);
        }
    }

    async classList(req, res, next) {
        try {
            const classList = await ClassDetail.findAll();
            return res.success({ classList: classList || [] }, 'All Class List.')
        } catch (err) {
            return next(err);
        }
    }

    async schemeList(req, res, next) {
        try {

            // const { keyword } = req.query;
            const query = await handleQuery(req);
            // if (keyword) query[Op.or] = [{ name: { [Op.regexp]: keyword.trim() } }];
            const scheme = await SchemeDetail.findAll({
                where: query
            });
            let arr = [];
            let obj = {}
            for (let i = 0; i < scheme.length; i++) {
                // const classDetail = await ClassDetail.findOne({ where: { id: scheme[i].classId } });
                if (scheme[i].dataValues.type === 'generalDonation') {
                    obj = scheme[i].dataValues
                } else
                    arr.push({ ...scheme[i].dataValues })
            }
            if (Object.keys(obj).length > 0) {
                arr.unshift(obj)
            }
            const csvWriter = createCsvWriter({
                path: path.join(__dirname, '../pdf/scheme_list.csv'),
                header: [
                    { id: 'name', title: 'Scheme Name' },
                    { id: 'className', title: 'Class' },
                    { id: 'amount', title: 'Amount ( per Student/ Month.)' }
                ],
            });

            csvWriter.writeRecords(arr)
                .then(() => {
                })
                .catch((error) => {
                    console.error('Error writing CSV:', error);
                    // res.status(500).send('Error generating the CSV file');
                });
            arr = await handleKeyword(req, arr, 'name');
            arr = await dynamicSort(req, arr)
            return res.success({ scheme: arr || [] }, 'All Scheme Scholarship.')
        } catch (err) {
            return next(err);
        }
    }

    async adminSchemeList(req, res, next) {
        try {
            const scheme = await SchemeDetail.findAll({
            });

            return res.success({ scheme: scheme || [] }, 'All Scheme List.')
        } catch (err) {
            return next(err);
        }
    }

    async adminGeneralDonationSchemeList(req, res, next) {
        try {
            const scheme = await SchemeDetail.findAll({ where: { type: 'generalDonation' } });

            return res.success({ scheme: scheme || [] }, 'All General Donation Scheme List.')
        } catch (err) {
            return next(err);
        }
    }

    async adminDocumentsList(req, res, next) {
        try {
            const documentList = await StudentDocumentVerification.findAll({
                order: [['createdAt', 'DESC']]
            })
            let arr = []
            for (let item of documentList) {
                let payload = { ...item.dataValues }
                const classDocument = await ClassDocumentDetail.findOne({ where: { classId: payload.classId } })
                const classDetail = await ClassDetail.findOne({ where: { id: payload.classId } })
                payload.documents = classDocument.documents;
                payload.className = classDetail.name;
                payload.docOne = await imageUrl(payload.docOne);
                payload.docTwo = await imageUrl(payload.docTwo);
                payload.docThree = await imageUrl(payload.docThree);
                payload.docFour = await imageUrl(payload.docFour);
                payload.docFive = await imageUrl(payload.docFive);
                arr.push(payload)
            }
            const csvWriter = createCsvWriter({
                path: path.join(__dirname, '../pdf/document_list.csv'),
                header: [
                    { id: 'studentId', title: 'Student ID' },
                    { id: 'studentName', title: 'Student Name' },
                    { id: 'classId', title: 'Class ID' },
                    { id: 'collegeName', title: 'Name of college' },
                    { id: 'university', title: 'University' },
                    { id: 'rollNo', title: 'Roll No' },
                    { id: 'percentage', title: 'Percantage' },
                    { id: 'docOneStatus', title: 'Document 1' },
                    { id: 'docTwoStatus', title: 'Document 2' },
                    { id: 'docThreeStatus', title: 'Document 3' },
                    { id: 'docFourStatus', title: 'Document 4' },
                    { id: 'docFiveStatus', title: 'Document 5' },
                    { id: 'status', title: 'Status' },
                    { id: 'createdAt', title: 'Date' },
                ],
            });

            csvWriter.writeRecords(arr)
                .then(() => {
                })
                .catch((error) => {
                    console.error('Error writing CSV:', error);
                    // res.status(500).send('Error generating the CSV file');
                });
            arr = await handleKeyword(req, arr, 'studentName');
            arr = await dynamicSort(req, arr)
            return res.success({ documentList: arr }, 'ALl document List..')
        } catch (err) {
            next(err)
        }
    }

    async createScheme(req, res, next) {
        try {
            const { name, classId, className, amount } = req.body;
            const scheme = await SchemeDetail.create({ name, classId, className, amount, type: 'normal' });
            return res.success({ scheme: scheme || [] }, 'Scheme create successfully.')
        } catch (err) {
            return next(err);
        }
    }
    async createGeneralScheme(req, res, next) {
        try {
            const { name, classId, className, amount, noOfStudent, duration } = req.body;
            const scheme = await SchemeDetail.create({ name, classId, className, amount, noOfStudent, duration, type: 'generalDonation' });
            return res.success({ scheme: scheme || [] }, 'Scheme create successfully.')
        } catch (err) {
            return next(err);
        }
    }

    async editScheme(req, res, next) {
        try {
            const { name, schemeFor, classId, amount, id } = req.body;
            await SchemeDetail.update({
                name,
                schemeFor,
                classId,
                amount
            }, {
                where: {
                    id: id,
                },
                individualHooks: true
            })
            return res.success({}, 'Scheme update successfully.')
        } catch (err) {
            return next(err);
        }
    }

    async allClassList(req, res, next) {
        try {
            const classList = await ClassDetail.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "status"]
                }
            });
            return res.success({ allClassList: classList || [] }, 'All Class List.')
        } catch (err) {
            return next(err);
        }
    }

    async studentList(req, res, next) {
        try {
            const query = await handleQuery(req);
            query.type = 'student'
            const userList = await User.findAll({
                where: query,
                attributes: {
                    exclude: ["updatedAt", "password"]
                },
                order: [['createdAt', 'DESC']]
            });
            let arr = [];
            for (let i = 0; i < userList.length; i++) {
                let obj = { ...userList[i].dataValues }
                const address = await AddressDetail.findOne({
                    where: { userId: userList[i].id },
                    attributes: {
                        exclude: ["updatedAt", "password"]
                    },
                    order: [['createdAt', 'DESC']]
                });
                const professional = await ProfessionalDetail.findOne({
                    where: { userId: userList[i].id },
                    attributes: {
                        exclude: ["updatedAt", "password"]
                    },
                    order: [['createdAt', 'DESC']]
                });
                const education = await EducationDetail.findOne({
                    where: { userId: userList[i].id },
                    attributes: {
                        exclude: ["updatedAt", "password"]
                    },
                    order: [['createdAt', 'DESC']]
                });
                const studentDocument = await StudentDocumentVerification.findOne({ where: { studentId: obj.id } })
                obj.state = address?.state || '';
                obj.city = address?.city || '';
                obj.country = address?.country || '';
                obj.occupation = professional?.occupation || '';
                obj.designation = professional?.designation || '';
                obj.annualIncome = professional?.annualIncome || '';
                obj.pursuingClass = education?.pursuingClass || '';
                obj.year = education?.year || '';
                // obj.scholarshipStatus = 'unverified' || '';
                obj.higherClassPercentage = studentDocument?.percentage || 0;
                // obj.higherClassPercentage = '';
                arr.push(obj)
            }
            const csvWriter = createCsvWriter({
                path: path.join(__dirname, '../pdf/student_list.csv'),
                header: [
                    { id: 'id', title: 'Student ID' },
                    { id: 'name', title: 'Student Name' },
                    { id: 'mobile', title: 'Mobile No.' },
                    { id: 'email', title: 'Email Id' },
                    { id: 'city', title: 'City' },
                    { id: 'state', title: 'State' },
                    { id: 'country', title: 'Country' },
                    { id: 'higherClassPercentage', title: 'Higher Class Percentage' },
                    { id: 'pursuingClass', title: 'Pursing Class' },
                    { id: 'year', title: 'Year' },
                    { id: 'annualIncome', title: 'Family Annual Income' },
                    { id: 'scholarshipStatus', title: 'Status' },
                    { id: 'scholarshipRecieve', title: 'Scholorship Receive' },
                    { id: 'createdAt', title: 'Date' },
                    { id: 'status', title: 'Block user' }
                ],
            });

            csvWriter.writeRecords(arr)
                .then(() => {
                })
                .catch((error) => {
                    console.error('Error writing CSV:', error);
                    // res.status(500).send('Error generating the CSV file');
                });
            arr = await handleKeyword(req, arr, 'name', 'higherClassPercentage');
            arr = await dynamicSort(req, arr)
            return res.success({ userList: arr || [] }, 'All User List.')
        } catch (err) {
            return next(err);
        }
    }

    async adminStudentList(req, res, next) {
        try {
            const userList = await User.findAll({
                where: { type: 'student' },
                attributes: {
                    exclude: ["updatedAt", "password"]
                },
                order: [['createdAt', 'DESC']]
            });
            let arr = [];
            for (let i = 0; i < userList.length; i++) {
                // const exist = await SchemeStudentDetail.findOne({
                //     where: {
                //         studentId: userList[i].id,
                //         classId: req.params.classId,
                //         status: "verified"
                //     }
                // })
                if (exist) {
                    arr.push(userList[i])
                }
            }
            return res.success({ userList: arr || [] }, 'All User List.')
        } catch (err) {
            return next(err);
        }
    }

    async donarList(req, res, next) {
        try {
            const query = await handleQuery(req);
            query.type = 'donar';

            const userList = await User.findAll({
                where: query,
                attributes: {
                    exclude: ["updatedAt", "password"]
                },
                order: [['createdAt', 'DESC']]
            });
            let arr = [];
            for (let i = 0; i < userList.length; i++) {
                let obj = { ...userList[i].dataValues }
                const address = await AddressDetail.findOne({
                    where: { userId: userList[i].id },
                    attributes: {
                        exclude: ["updatedAt", "password"]
                    },
                    order: [['createdAt', 'DESC']]
                });
                const professional = await ProfessionalDetail.findOne({
                    where: { userId: userList[i].id },
                    attributes: {
                        exclude: ["updatedAt", "password"]
                    },
                    order: [['createdAt', 'DESC']]
                });
                obj.state = address?.state || '';
                obj.city = address?.city || '';
                obj.country = address?.country || '';
                obj.occupation = professional?.occupation || '';
                obj.designation = professional?.designation || '';
                obj.annualIncome = professional?.annualIncome || '';
                arr.push(obj)
            }
            const csvWriter = createCsvWriter({
                path: path.join(__dirname, '../pdf/donar_list.csv'),
                header: [
                    { id: 'id', title: 'Donor ID' },
                    { id: 'name', title: 'Donor Name' },
                    { id: 'mobile', title: 'Mobile No.' },
                    { id: 'email', title: 'Email Id' },
                    { id: 'city', title: 'City' },
                    { id: 'state', title: 'State' },
                    { id: 'country', title: 'Country' },
                    { id: 'occupation', title: 'Occuption' },
                    { id: 'designation', title: 'Designation' },
                    { id: 'annualIncome', title: 'Annual Income' },
                    { id: 'createdAt', title: 'Date' },
                    { id: 'status', title: 'Status ( Block / unblock )' }
                ],
            });

            csvWriter.writeRecords(arr)
                .then(() => {
                })
                .catch((error) => {
                    console.error('Error writing CSV:', error);
                    // res.status(500).send('Error generating the CSV file');
                });
            arr = await handleKeyword(req, arr, 'name');
            arr = await dynamicSort(req, arr)
            return res.success({ userList: arr || [] }, 'All User List.')
        } catch (err) {
            return next(err);
        }
    }

    async studentPendingSchemeList(req, res, next) {
        try {
            const { keyword } = req.query;
            const query = {
                status: 'pending'
            };
            // if (type) query.type = type;
            if (keyword) query[Op.or] = [{ collegeName: { [Op.regexp]: keyword.trim() } }, { studentName: { [Op.regexp]: keyword.trim() } }];
            // if (keyword) query.email = { [Op.regexp]: keyword.trim() };
            // const applySchemeList = await SchemeStudentDetail.findAll({
            //     where: query,
            //     attributes: {
            //         exclude: ["updatedAt", "password"]
            //     }
            // });
            let arr = [];
            for (let i = 0; i < applySchemeList.length; i++) {
                const payload = { ...applySchemeList[i].dataValues }
                const classDetail = await ClassDetail.findOne({
                    where: {
                        id: applySchemeList[i].classId
                    }
                })
                const schemeDetail = await SchemeDetail.findOne({
                    where: {
                        id: applySchemeList[i].schemeId
                    }
                })
                if (classDetail?.name)
                    payload.className = classDetail?.name
                if (schemeDetail?.name)
                    payload.schemeName = schemeDetail?.name
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docOne = process.env.API_URL + applySchemeList[i].dataValues.docOne;
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docTwo = process.env.API_URL + applySchemeList[i].dataValues.docTwo;
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docThree = process.env.API_URL + applySchemeList[i].dataValues.docThree;
                arr.push(payload)
            }

            return res.success({ applySchemeList: arr || [] }, 'All Apply Scheme List.')
        } catch (err) {
            return next(err);
        }
    }

    async studentRejectedSchemeList(req, res, next) {
        try {
            const { keyword } = req.query;
            const query = {
                status: 'rejected'
            };
            // if (type) query.type = type;
            if (keyword) query[Op.or] = [{ collegeName: { [Op.regexp]: keyword.trim() } }, { studentName: { [Op.regexp]: keyword.trim() } }];
            // if (keyword) query.email = { [Op.regexp]: keyword.trim() };
            // const applySchemeList = await SchemeStudentDetail.findAll({
            //     where: query,
            //     attributes: {
            //         exclude: ["updatedAt", "password"]
            //     }
            // });
            let arr = [];
            for (let i = 0; i < applySchemeList.length; i++) {
                const payload = { ...applySchemeList[i].dataValues }
                const classDetail = await ClassDetail.findOne({
                    where: {
                        id: applySchemeList[i].classId
                    }
                })
                const schemeDetail = await SchemeDetail.findOne({
                    where: {
                        id: applySchemeList[i].schemeId
                    }
                })
                if (classDetail?.name)
                    payload.className = classDetail?.name
                if (schemeDetail?.name)
                    payload.schemeName = schemeDetail?.name
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docOne = process.env.API_URL + applySchemeList[i].dataValues.docOne;
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docTwo = process.env.API_URL + applySchemeList[i].dataValues.docTwo;
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docThree = process.env.API_URL + applySchemeList[i].dataValues.docThree;
                arr.push(payload)
            }

            return res.success({ applySchemeList: arr || [] }, 'All Apply Scheme List.')
        } catch (err) {
            return next(err);
        }
    }

    async studentApplySchemeList(req, res, next) {
        try {
            const { keyword } = req.query;
            const query = {
                status: 'verified'
            };
            // if (type) query.type = type;
            if (keyword) query[Op.or] = [{ collegeName: { [Op.regexp]: keyword.trim() } }, { studentName: { [Op.regexp]: keyword.trim() } }];
            // if (keyword) query.email = { [Op.regexp]: keyword.trim() };
            // const applySchemeList = await SchemeStudentDetail.findAll({
            //     where: query,
            //     attributes: {
            //         exclude: ["updatedAt", "password"]
            //     }
            // });
            let arr = [];
            for (let i = 0; i < applySchemeList.length; i++) {
                const payload = { ...applySchemeList[i].dataValues }
                const classDetail = await ClassDetail.findOne({
                    where: {
                        id: applySchemeList[i].classId
                    }
                })
                const schemeDetail = await SchemeDetail.findOne({
                    where: {
                        id: applySchemeList[i].schemeId
                    }
                })
                if (classDetail?.name)
                    payload.className = classDetail?.name
                if (schemeDetail?.name)
                    payload.schemeName = schemeDetail?.name
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docOne = process.env.API_URL + applySchemeList[i].dataValues.docOne;
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docTwo = process.env.API_URL + applySchemeList[i].dataValues.docTwo;
                if (applySchemeList[i]?.dataValues?.docOne)
                    payload.docThree = process.env.API_URL + applySchemeList[i].dataValues.docThree;
                arr.push(payload)
            }

            return res.success({ applySchemeList: arr || [] }, 'All Apply Scheme List.')
        } catch (err) {
            return next(err);
        }
    }

    async changeStatusScholarship(req, res, next) {
        try {
            const { sId, status, docStatus } = req.params;
            const documentStatus = ['docOneStatus', 'docTwoStatus', 'docThreeStatus', 'docFourStatus', 'docFiveStatus']
            let finalStatus = true;
            if (['verified', 'rejected'].includes(status)) {
                await StudentDocumentVerification.update({
                    [docStatus]: status
                }, {
                    where: {
                        id: sId
                    },
                    individualHooks: true
                })
                const sStudentExist = await StudentDocumentVerification.findOne({
                    where: {
                        id: sId
                    }
                })
                const userDetail = await User.findOne({ where: { id: sStudentExist?.studentId } })
                const classDocumentExist = await ClassDocumentDetail.findOne({ where: { classId: +sStudentExist?.classId } })
                if (classDocumentExist) {
                    for (let i = 0; i < JSON.parse(classDocumentExist.documents).length; i++) {
                        if (sStudentExist[documentStatus[i]] !== "verified") {
                            finalStatus = false
                        }
                    }
                }
                if (finalStatus) {
                    await StudentDocumentVerification.update({
                        status: 'verified'
                    }, {
                        where: {
                            id: sId
                        },
                        individualHooks: true
                    })
                    if (userDetail?.scholarshipStatus !== 'verified')
                        await User.update({
                            scholarshipStatus: 'verified'
                        }, {
                            where: {
                                id: sStudentExist?.studentId
                            },
                            individualHooks: true
                        })
                }
                if (!finalStatus) {
                    await StudentDocumentVerification.update({
                        status: 'rejected'
                    }, {
                        where: {
                            id: sId
                        },
                        individualHooks: true
                    })
                }
                if (status === 'verified')
                    return res.success({}, `${_.startCase(docStatus)} accept successfully.`)
                else
                    return res.success({}, `${_.startCase(docStatus)} reject successfully.`)
            } else {
                return res.error({}, 'Status type is invalid.')
            }

        } catch (err) {
            return next(err);
        }
    }

    async donationListAdmin(req, res, next) {
        try {
            const query = await handleQuery(req);
            const donation = await DonationDetail.findAll({ where: query, order: [['createdAt', 'DESC']] });
            let arr = [];
            for (let i = 0; i < donation.length; i++) {
                const payload = { ...donation[i].dataValues }
                const schemeDetail = await SchemeDetail.findOne({ where: { id: donation[i].schemeId } });
                const donarDetail = await User.findOne({ where: { id: donation[i]?.donarId } })
                payload.schemeName = schemeDetail?.name;
                payload.classId = schemeDetail?.className;
                payload.amount = schemeDetail?.amount;
                payload.donarName = donarDetail?.name;
                payload.donarEmail = donarDetail?.email;
                arr.push(payload)
            }
            const csvWriter = createCsvWriter({
                path: path.join(__dirname, '../pdf/donation_history.csv'),
                header: [
                    { id: 'donarId', title: 'Donor ID' },
                    { id: 'donarName', title: 'Donor Name' },
                    { id: 'createdAt', title: 'Date' },
                    { id: 'schemeName', title: 'Scheme Name' },
                    { id: 'classId', title: 'Class' },
                    { id: 'amount', title: 'Amount ( per Student/ Month.)' },
                    { id: 'duration', title: 'Duration' },
                    { id: 'noOfStudent', title: 'No. of Students' },
                    { id: 'totalAmount', title: 'Total Donation Amount' },
                    { id: 'paymentReferenceId', title: 'Payment reference id' }
                ],
            });

            csvWriter.writeRecords(arr)
                .then(() => {
                })
                .catch((error) => {
                    console.error('Error writing CSV:', error);
                    // res.status(500).send('Error generating the CSV file');
                });
            arr = await handleKeyword(req, arr, 'donarName');
            arr = await dynamicSort(req, arr)
            return res.success({ donationList: arr || [] }, 'All Donation List.')
        } catch (err) {
            console.log('err.message :>> ', err.message);
            return next(err);
        }
    }

    async donationApprove(req, res, next) {
        try {
            const { id, type, status, user } = req.body;
            const donationExist = await DonationDetail.findOne({ where: { id: id } })
            if (!donationExist)
                return res.error({}, 'Not found.')
            if (type == 'manual') {
                const donationMultiple = await StudentDonation.findAll({
                    where: {
                        donationId: id,
                        donarId: donationExist.donarId,
                        status: 'inactive'
                    }
                })
                await DonationDetail.update({
                    status: 'active'
                }, {
                    where: {
                        id: id
                    },
                    individualHooks: true
                })
                for (let i = 0; i < donationMultiple.length; i++) {
                    await StudentDonation.update({
                        status: 'active'
                    }, {
                        where: {
                            id: donationMultiple[i].id
                        },
                        individualHooks: true
                    })
                    // await SchemeStudentDetail.update({
                    //     status: 'gotScholarship'
                    // }, {
                    //     where: {
                    //         studentId: donationMultiple[i].studentId,
                    //         status: 'verified'
                    //     },
                    //     individualHooks: true
                    // })
                }

                return res.success({}, 'Approve Successfully.')
            } else if (type === "auto") {
                await DonationDetail.update({
                    status: 'active'
                }, {
                    where: {
                        id: id
                    },
                    individualHooks: true
                })
                for (let i = 0; i < user.length; i++) {
                    await StudentDonation.create({ donarId: donationExist.donarId, donationId: donationExist.id, amount: donationExist.amount, mode: type, studentId: +user[i], status: 'active' })
                    // await SchemeStudentDetail.update({
                    //     status: 'gotScholarship'
                    // }, {
                    //     where: {
                    //         studentId: +user[i],
                    //         status: 'verified'
                    //     },
                    //     individualHooks: true
                    // })
                }
                return res.success({}, 'Approve Successfully.')
            }
        } catch (err) {
            return next(err);
        }
    }

    async manualDonationHistory(req, res, next) {
        try {
            const students = await StudentDonation.findAll({ where: { mode: 'manual' } });
            let arr = []
            for (let i = 0; i < students.length; i++) {
                const payload = { ...students[i].dataValues }
                const userDetail = await User.findOne({ where: { id: payload.studentId } });
                const donarDetail = await User.findOne({ where: { id: payload.donarId } });
                const addressDetail = await AddressDetail.findOne({ where: { userId: payload.studentId } });
                const educationDetail = await EducationDetail.findOne({ where: { userId: payload.studentId } });
                const studentDocument = await StudentDocumentVerification.findOne({ where: { studentId: payload.studentId } })
                const professionalDocument = await ProfessionalDetail.findOne({ where: { userId: payload.studentId } })
                const donationDocument = await DonationDetail.findOne({ where: { id: payload.donationId } })
                const schemeDetail = await SchemeDetail.findOne({ where: { id: donationDocument.schemeId } })
                payload.donarName = donarDetail?.name || 'N/A';
                payload.donarId = donarDetail?.id || 'N/A';
                payload.studentName = userDetail?.name || 'N/A';
                payload.email = userDetail?.email || 'N/A';
                payload.mobile = userDetail?.mobile || 'N/A';
                payload.studentId = userDetail?.id || 'N/A';
                payload.city = addressDetail?.city || 'N/A';
                payload.state = addressDetail?.state || 'N/A';
                payload.country = addressDetail?.country || 'N/A';
                payload.pursuingClass = educationDetail?.pursuingClass || 'N/A';
                payload.year = educationDetail?.year || 'N/A';
                payload.higherClassPercentage = studentDocument?.percentage || 'N/A';
                payload.schemeName = schemeDetail?.name || 'N/A';
                payload.duration = donationDocument?.duration || 'N/A';
                payload.familyANnualIncome = professionalDocument?.annualIncome || 'N/A';
                arr.push(payload)
            }
            const csvWriter = createCsvWriter({
                path: path.join(__dirname, '../pdf/manual_scholarship_history_list.csv'),
                header: [
                    { id: 'donarId', title: 'Donor ID' },
                    { id: 'donarName', title: 'Donor Name' },
                    { id: 'schemeName', title: 'Scheme Name' },
                    { id: 'studentName', title: 'Student Name' },
                    { id: 'studentId', title: 'Student ID' },
                    { id: 'mobile', title: 'Mobile No.' },
                    { id: 'email', title: 'Email Id' },
                    { id: 'city', title: 'City' },
                    { id: 'state', title: 'State' },
                    { id: 'country', title: 'Country' },
                    { id: 'higherClassPercentage', title: 'Higher Class Percentage' },
                    { id: 'pursuingClass', title: 'Pursing Class' },
                    { id: 'year', title: 'Year' },
                    { id: 'familyANnualIncome', title: 'Family Annual Income' },
                    { id: 'duration', title: 'Duration' },
                    { id: 'amount', title: 'Amount' },
                    { id: 'createdAt', title: 'Date' },
                    { id: 'status', title: 'Status' }
                ],
            });

            csvWriter.writeRecords(arr)
                .then(() => {
                })
                .catch((error) => {
                    console.error('Error writing CSV:', error);
                    // res.status(500).send('Error generating the CSV file');
                });
            arr = await handleKeyword(req, arr, 'donarName', 'higherClassPercentage');
            arr = await dynamicSort(req, arr)
            return res.success({ studentsList: arr }, 'All Student Donation List.')
        } catch (err) {
            return next(err);
        }
    }

    async automaticDonationHistory(req, res, next) {
        try {
            const students = await StudentDonation.findAll({ where: { mode: 'auto' } });
            let arr = []
            for (let i = 0; i < students.length; i++) {
                const payload = { ...students[i].dataValues }
                const userDetail = await User.findOne({ where: { id: payload.studentId } });
                const donarDetail = await User.findOne({ where: { id: payload.donarId } });
                const addressDetail = await AddressDetail.findOne({ where: { userId: payload.studentId } });
                const educationDetail = await EducationDetail.findOne({ where: { userId: payload.studentId } });
                const studentDocument = await StudentDocumentVerification.findOne({ where: { studentId: payload.studentId } })
                const professionalDocument = await ProfessionalDetail.findOne({ where: { userId: payload.studentId } })
                const donationDocument = await DonationDetail.findOne({ where: { id: payload.donationId } })
                const schemeDetail = await SchemeDetail.findOne({ where: { id: donationDocument.schemeId } })
                payload.donarName = donarDetail?.name || 'N/A';
                payload.donarId = donarDetail?.id || 'N/A';
                payload.studentName = userDetail?.name || 'N/A';
                payload.email = userDetail?.email || 'N/A';
                payload.mobile = userDetail?.mobile || 'N/A';
                payload.studentId = userDetail?.id || 'N/A';
                payload.city = addressDetail?.city || 'N/A';
                payload.state = addressDetail?.state || 'N/A';
                payload.country = addressDetail?.country || 'N/A';
                payload.pursuingClass = educationDetail?.pursuingClass || 'N/A';
                payload.year = educationDetail?.year || 'N/A';
                payload.higherClassPercentage = studentDocument?.percentage || 'N/A';
                payload.schemeName = schemeDetail?.name || 'N/A';
                payload.duration = donationDocument?.duration || 'N/A';
                payload.familyANnualIncome = professionalDocument?.annualIncome || 'N/A';
                arr.push(payload)
            }
            const csvWriter = createCsvWriter({
                path: path.join(__dirname, '../pdf/automatic_scholarship_history_list.csv'),
                header: [
                    { id: 'donarId', title: 'Donor ID' },
                    { id: 'donarName', title: 'Donor Name' },
                    { id: 'schemeName', title: 'Scheme Name' },
                    { id: 'studentName', title: 'Student Name' },
                    { id: 'studentId', title: 'Student ID' },
                    { id: 'mobile', title: 'Mobile No.' },
                    { id: 'email', title: 'Email Id' },
                    { id: 'city', title: 'City' },
                    { id: 'state', title: 'State' },
                    { id: 'country', title: 'Country' },
                    { id: 'higherClassPercentage', title: 'Higher Class Percentage' },
                    { id: 'pursuingClass', title: 'Pursing Class' },
                    { id: 'year', title: 'Year' },
                    { id: 'familyANnualIncome', title: 'Family Annual Income' },
                    { id: 'duration', title: 'Duration' },
                    { id: 'amount', title: 'Amount' },
                    { id: 'createdAt', title: 'Date' },
                    { id: 'status', title: 'Status' }
                ],
            });

            csvWriter.writeRecords(arr)
                .then(() => {
                })
                .catch((error) => {
                    console.error('Error writing CSV:', error);
                    // res.status(500).send('Error generating the CSV file');
                });
            arr = await handleKeyword(req, arr, 'donarName', 'higherClassPercentage');
            arr = await dynamicSort(req, arr)
            return res.success({ studentsList: arr }, 'All Student Donation List.')
        } catch (err) {
            return next(err);
        }
    }

    async studentDonationByAdmin(req, res, next) {
        try {
            const { studentList, donationDetail } = req.body;
            let donationDetails = donationDetail;
            // if (req.user.type === 'donar') {
            for (let i = 0; i < studentList.length; i++) {
                const students = await User.findAll({ where: { id: studentList[i], scholarshipStatus: 'verified', scholarshipRecieve: 'no' } });
                if (students) {
                    // for(let j=0;i<donationDetail.length; j++) {
                    //     for(let k=0;i<donationDetail[j].totalStudent; k++) {

                    //     }
                    // }
                    if (donationDetails[i].totalStudent > 0) {
                        await StudentDonation.create({ studentId: studentList[i], donarId: donationDetails[i].donarId, donationId: donationDetails[i].donationId, amount: donationDetails[i].amount / donationDetails[i].noOfStudent, mode: 'auto' })
                        await User.update({ scholarshipRecieve: 'yes' }, { where: { id: studentList[i] }, individualHooks: true })
                        donationDetails[i].totalStudent = --donationDetails[i].totalStudent;
                    }
                } else {
                    return res.error({}, 'Not Found.')
                }
            }
            return res.success({}, 'Automatic Student Donation Successfully.')
            // } else {
            //     return res.error({}, 'Something went wrong.')
            // }
        } catch (err) {
            return next(err);
        }
    }

    async adminEligibleStudentList(req, res, next) {
        try {
            const query = await handleQuery(req)

            let arr = [], students = [];
            const arr2 = []
            const donarDetail = await DonationDetail.findAll({ where: { mode: 'auto' } })
            for (let i = 0; i < donarDetail.length; i++) {
                const obj = {}
                const studentDonate = await StudentDonation.findAll({ where: { donationId: donarDetail[i].dataValues.id, mode: 'auto' } });
                const studentDetail = await User.findAll({ where: { ...query, scholarshipStatus: 'verified', scholarshipRecieve: 'no' } });
                const schemeDet = await SchemeDetail.findOne({ where: { id: donarDetail[i].schemeId } })
                for (let j = 0; j < studentDetail.length; j++) {
                    const documentVerifyDetail = await StudentDocumentVerification.findOne({ order: [['createdAt', 'DESC']] })
                    if (+schemeDet.classId === +documentVerifyDetail.classId) {
                        students.push(studentDetail[j])
                    }
                }
                obj.donationId = donarDetail[i].dataValues.id
                obj.donarId = donarDetail[i].dataValues.donarId
                obj.totalStudent = donarDetail[i].dataValues.noOfStudent - studentDonate.length;
                obj.noOfStudent = donarDetail[i].dataValues.noOfStudent;
                obj.amount = donarDetail[i].dataValues.totalAmount;
                obj.totalAmount = donarDetail[i].dataValues.amount;
                arr2.push(obj)
            }
            for (let i = 0; i < students.length; i++) {
                const payload = { ...students[i].dataValues }
                const findDet = arr.filter(item => item.id == payload.id)
                const addressDetail = await AddressDetail.findOne({ where: { userId: payload.id } });
                const educationDetailDetail = await EducationDetail.findOne({ where: { userId: payload.id } });
                const studentDocument = await StudentDocumentVerification.findOne({ where: { studentId: payload.id } })
                const professionalDocument = await ProfessionalDetail.findOne({ where: { userId: payload.id } })
                payload.city = addressDetail?.city || 'N/A';
                payload.state = addressDetail?.state || 'N/A';
                payload.country = addressDetail?.country || 'N/A';
                payload.pursuingClass = educationDetailDetail?.pursuingClass || 'N/A';
                payload.year = educationDetailDetail?.year || 'N/A';
                payload.higherClassPercentage = studentDocument?.percentage || 'N/A';
                payload.familyANnualIncome = professionalDocument?.annualIncome || 'N/A';
                if (findDet.length === 0)
                    arr.push(payload)
            }
            const csvWriter = createCsvWriter({
                path: path.join(__dirname, '../pdf/scholarship_distribution_automatic_list.csv'),
                header: [
                    { id: 'id', title: 'Student ID' },
                    { id: 'name', title: 'Student Name' },
                    { id: 'mobile', title: 'Mobile No.' },
                    { id: 'email', title: 'Email Id' },
                    { id: 'city', title: 'City' },
                    { id: 'state', title: 'State' },
                    { id: 'country', title: 'Country' },
                    { id: 'higherClassPercentage', title: 'Higher Class Percentage' },
                    { id: 'pursuingClass', title: 'Pursing Class' },
                    { id: 'year', title: 'Year' },
                    { id: 'familyANnualIncome', title: 'Family Annual Income' }
                ],
            });

            csvWriter.writeRecords(arr)
                .then(() => {
                })
                .catch((error) => {
                    console.error('Error writing CSV:', error);
                    // res.status(500).send('Error generating the CSV file');
                });
            arr = await handleKeyword(req, arr, 'donarName', 'higherClassPercentage');
            arr = await dynamicSort(req, arr)
            return res.success({ studentsList: arr || [], totalStudentDetail: arr2 }, 'All Student List.')
        } catch (err) {
            return next(err);
        }
    }

    async userGetProfile(req, res, next) {

        try {
            const id = req.params.id;
            const user = await User.findOne({
                where: {
                    id,
                    status: 'active'
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
                }
            });
            const bankDetail = await BankDetail.findOne({
                where: {
                    userId: user?.id
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            });
            const address = await AddressDetail.findOne({ where: { userId: user?.id } })
            const kyc = await KYCDetail.findOne({ where: { userId: user?.id } })
            const professional = await ProfessionalDetail.findOne({ where: { userId: user?.id } })
            const education = await EducationDetail.findOne({ where: { userId: user?.id } })
            if (!user) {
                return res.error({}, 'User not found');
            }
            const payload = { ...user.dataValues };
            const kycPayload = { ...kyc?.dataValues };
            payload.image = imageUrl(user?.dataValues?.image)

            kycPayload.panImage = imageUrl(kyc?.dataValues?.panImage)
            kycPayload.tanImage = imageUrl(kyc?.dataValues?.tanImage)
            kycPayload.aadharFront = imageUrl(kyc?.dataValues?.aadharFront)
            kycPayload.aadharBack = imageUrl(kyc?.dataValues?.aadharBack)
            return res.success({ user: payload, address: address?.dataValues || {}, kyc: kycPayload || {}, professional: professional?.dataValues || {}, education: education?.dataValues || {}, bank: bankDetail?.dataValues || {} }, 'Success');
        } catch (err) {
            console.error(err);
            return next(err);
        }
    }

    async grantPermission(req, res) {
        try {
            const permission =
                [
                    { Permission: 'donationHistory', Status: false },
                    { Permission: 'donar', Status: false },
                    { Permission: 'student', Status: false },
                    { Permission: 'allAdmin', Status: false },
                    { Permission: 'scholarshipDistributionAutomatic', Status: false },
                    { Permission: 'manualScholarshipHistory', Status: false },
                    { Permission: 'automaticScholarshipHistory', Status: false },
                    { Permission: 'documentHistory', Status: false },
                    { Permission: 'masterDocument', Status: false },
                    { Permission: 'masterScholarshipScheme', Status: false },
                    { Permission: 'blog', Status: false },
                    { Permission: 'generalDonation', Status: false }
                ];
            await Admin.update({ permission: JSON.stringify(permission) }, {
                where: {
                    id: req.params.id
                },
                individualHooks: true
            })
            const data = await Admin.findOne({
                where: {
                    id: req.params.id
                }
            })
            return res.success(data, 'Success');
        } catch (e) {
            res.send(e)
            console.log(e);
        }

    }

    async giveAccess(req, res) {
        try {
            const data = await Admin.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!data) {
                return res.error({}, 'SudAdmin not found.');
            }
            let permission = JSON.parse(data.dataValues.permission)
            let perm = []
            permission = permission.map(data => {
                if (data.Permission === req.body.Status) {
                    data.Status = !data.Status
                }
                perm.push(data)
            })
            console.log(perm)
            await Admin.update({ permission: JSON.stringify(perm) }, {
                where: {
                    id: req.params.id
                },
                individualHooks: true
            })
            const updateResult = await Admin.findOne({
                where: {
                    id: req.params.id
                }
            })
            return res.success(updateResult.dataValues, 'Success');
        } catch (e) {
            res.send(e)
            console.log(e);
        }

    }

    async me(req, res, next) {
        try {
            const adminExist = await Admin.findOne({
                where: {
                    email: req.user.email,
                    id: req.user.id
                }
            })
            if (adminExist) {
                const payload = { ...adminExist.dataValues }
                payload.image = imageUrl(adminExist?.dataValues?.image)
                return res.success({ ...payload }, 'Get Details..')
            } else {
                return res.error({}, 'Something went wrong.')
            }

        } catch (err) {
            return next(err);
        }
    }

    async csvDonationHistoryFile(req, res, next) {
        try {
            const url = process.env.API_URL + '/donation_history.csv'
            return res.success({ url }, 'CSV Download file successfully.')
        } catch (err) {
            return next(err);
        }
    }

    async csvDonarHistoryFile(req, res, next) {
        try {
            const url = process.env.API_URL + '/donar_list.csv'
            return res.success({ url }, 'CSV Download file successfully.')
        } catch (err) {
            return next(err);
        }
    }
    async csvStudentHistoryFile(req, res, next) {
        try {
            const url = process.env.API_URL + '/student_list.csv'
            return res.success({ url }, 'CSV Download file successfully.')
        } catch (err) {
            return next(err);
        }
    }
    async csvScholarshipDistributionAutomaticFile(req, res, next) {
        try {
            const url = process.env.API_URL + '/scholarship_distribution_automatic_list.csv'
            return res.success({ url }, 'CSV Download file successfully.')
        } catch (err) {
            return next(err);
        }
    }
    async csvManualScholarshipHistoryFile(req, res, next) {
        try {
            const url = process.env.API_URL + '/manual_scholarship_history_list.csv'
            return res.success({ url }, 'CSV Download file successfully.')
        } catch (err) {
            return next(err);
        }
    }
    async csvAutomaticScholarshipHistoryFile(req, res, next) {
        try {
            const url = process.env.API_URL + '/automatic_scholarship_history_list.csv'
            return res.success({ url }, 'CSV Download file successfully.')
        } catch (err) {
            return next(err);
        }
    }
    async csvDocumentListFile(req, res, next) {
        try {
            const url = process.env.API_URL + '/document_list.csv'
            return res.success({ url }, 'CSV Download file successfully.')
        } catch (err) {
            return next(err);
        }
    }
    async csvClassDocumentListFile(req, res, next) {
        try {
            const url = process.env.API_URL + '/class_document_list.csv'
            return res.success({ url }, 'CSV Download file successfully.')
        } catch (err) {
            return next(err);
        }
    }
    async csvSchemeListFile(req, res, next) {
        try {
            const url = process.env.API_URL + '/scheme_list.csv'
            return res.success({ url }, 'CSV Download file successfully.')
        } catch (err) {
            return next(err);
        }
    }



    // dynamic create data through postman
    async createScholarShip(req, res, next) {
        try {
            const { name, class: classExam, schemeFor, amount } = req.body;
            const scheme = await SchemeDetail.create({ name, class: classExam, schemeFor, amount });
            return res.success({ ...scheme }, 'Scheme Scholarship create successfully.')
        } catch (err) {
            return next(err);
        }
    }

    async createAdmin(req, res, next) {
        try {
            const { name, password, email, mobile, type } = req.body;
            const emailExist = await Admin.findOne({
                where: {
                    email: email
                }
            })
            const mobileExist = await Admin.findOne({
                where: {
                    mobile: mobile
                }
            })
            if (emailExist) {
                return res.error({}, 'Email already exist.')
            }
            if (mobileExist) {
                return res.error({}, 'Mobile already exist.')
            }
            const payload = {
                name,
                password,
                email,
                mobile
            }
            if (type) payload.type = type
            const scheme = await Admin.create(payload);
            if (type) return res.success({ ...scheme }, 'SubAdmin create successfully.')
            return res.success({ ...scheme }, 'Admin create successfully.')
        } catch (err) {
            return next(err);
        }
    }

    async subAdminList(req, res, next) {
        try {
            let arr = await Admin.findAll({ where: { type: 'subAdmin' } })
            arr = await dynamicSort(req, arr)
            return res.success({ subAdminList: arr }, 'All Sub Admin List.')
        } catch (err) {
            return next(err);
        }
    }
    async subAdmin(req, res, next) {
        try {
            let arr = await Admin.findOne({ where: { type: 'subAdmin', id: req.params.id } })
            return res.success({ subAdmin: arr?.dataValues || {} }, 'Sub Admin.')
        } catch (err) {
            return next(err);
        }
    }

    async addBlogManager(req, res, next) {
        try {
            const { title, description } = req.body;
            const payload = {
                title,
                description
            }
            if (req?.file) {
                payload.image = req?.file?.filename;
            }
            console.log(payload, "payload")
            await Blog.create(payload)

            return res.success({}, "Blog add successfully.");

        } catch (err) {
            console.log("err", err)
            return next(err);
        }
    }

    async blogList(req, res, next) {
        try {

            const allBlog = await Blog.findAll({})
            let allBlogs = allBlog
            allBlogs = allBlogs.map(item => {
                item.image = imageUrl(item.image)
                return item
            })

            return res.success(allBlogs, "Blog fetch successfully.");

        } catch (err) {
            console.log("err", err)
            return next(err);
        }
    }

    async particularBlog(req, res, next) {
        try {
            const { id } = req.params;
            const allBlog = await Blog.findOne({
                where: {
                    id: id
                }
            })
            if (!allBlog) {
                return res.error({}, "Blog not found.");
            }
            const blogDetail = allBlog
            blogDetail.image = imageUrl(blogDetail.image)

            return res.success(blogDetail, "Blog fetch successfully.");

        } catch (err) {
            console.log("err", err)
            return next(err);
        }
    }

}

module.exports = new UserController()
async function updateDefaultAddress(userId, session) {
    await Address.updateMany({ userId }, { default: false }, { session });
}

function imageUrl(value) {
    let img = ''
    if (value !== 'null' && value !== null && value !== '' && value !== undefined)
        img = process.env.API_URL + value
    else
        img = ""

    return img
}

async function handleQuery(req, obj = {}) {
    const { startDate, endDate } = req.query;
    const enddate = moment(endDate).endOf('day')

    if (startDate && endDate) {
        obj.createdAt = {
            [Op.gte]: new Date(startDate),
            [Op.lte]: new Date(enddate)
        }

    } else if (startDate && !endDate) {
        obj.createdAt = {
            [Op.gte]: new Date(startDate),
            [Op.lte]: new Date(Date.now())
        }
    } else if (!startDate && endDate) {
        obj.createdAt = {
            [Op.lte]: new Date(enddate)
        }
    }

    return obj;
}

async function handleKeyword(req, arr, keyName, percentageKey) {
    const { keyword, schemeName, schemeNames, schemeFors, schemeFor, country, city, state, annualIncome, familyAnnualIncome, scholarshipRecieveStatus, status, documentStatus, percentage } = req.query;

    if (keyword) {
        arr = searchByName(arr, keyword, keyName)
    }
    if (schemeName) {
        arr = searchByName(arr, schemeName, 'schemeName')
    }
    if (schemeNames) {
        arr = searchByName(arr, schemeNames, 'name')
    }
    if (schemeFor) {
        arr = searchByName(arr, schemeFor, 'schemeFor')
    }
    if (state) {
        arr = searchByName(arr, state, 'state')
    }
    if (country) {
        arr = searchByName(arr, country, 'country')
    }
    if (city) {
        arr = searchByName(arr, city, 'city')
    }
    if (annualIncome) {
        arr = searchByName(arr, annualIncome, 'annualIncome')
    }
    if (familyAnnualIncome) {
        arr = searchByName(arr, familyAnnualIncome, 'familyANnualIncome')
    }
    if (scholarshipRecieveStatus) {
        arr = searchByName(arr, scholarshipRecieveStatus, 'scholarshipRecieve')
    }
    if (status) {
        arr = searchByName(arr, status, 'scholarshipStatus')
    }
    if (documentStatus) {
        arr = searchByName(arr, documentStatus, 'status')
    }

    if (percentage) {
        arr = searchByPercentage(arr, percentage, percentageKey)
    }
    return arr

}

function searchByName(array, keyword, keyName) {
    if (keyName === 'scholarshipStatus' && (keyword === 'verified' || keyword === 'unverified')) {
        return array.filter(obj => obj[keyName] === keyword);
    }
    if (keyword) {
        const searchPattern = new RegExp(keyword, 'i'); // Case-insensitive regex pattern
        return array.filter(obj => searchPattern.test(obj[keyName]));
    }
    return array
}
function searchByPercentage(array, keyword, keyName) {
    if (keyword) {
        keyword = keyword.split('-');

        array = array.filter(obj => +keyword[0] <= obj[keyName]);
        if (+keyword[1]) {
            array = array.filter(obj => +keyword[1] >= obj[keyName]);
        }
        return array
    }
    return array
}

function dynamicSort(req, array,) {
    const { sortType, sortKey } = req.query;
    const sortCondition = {
        createdAt: -1
    }

    if (sortType && sortKey) {
        delete sortCondition.createdAt
        sortCondition[sortKey] = sortType === 'desc' ? -1 : 1;
    }
    console.log(sortCondition, "sortCondition")
    // const modifier = sortOrder === 'desc' ? -1 : 1;

    return array.sort((a, b) => {
        const fieldA = a[Object.keys(sortCondition)[0]];
        const fieldB = b[Object.keys(sortCondition)[0]];

        // Handle cases where the field values may not be of the same type
        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
            return Object.values(sortCondition)[0] * fieldA.localeCompare(fieldB);
        } else {
            return Object.values(sortCondition)[0] * (fieldA - fieldB);
        }
    });
}