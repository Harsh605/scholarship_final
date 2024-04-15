const express = require('express')
const router = express.Router()
const { verifyJWT } = require('../controllers/utils')

const AuthController = require('../controllers/authController')
const UserController = require('../controllers/userController')
const { verify } = require('jsonwebtoken')

let multer = require("multer");
const userController = require('../controllers/userController')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      const suffix = file.mimetype.split('/');
      cb(null, `${file.fieldname}-${Date.now()}.${suffix[1]}`);
    },
  });
  
  const upload = multer({ storage });

router.post('/sign-up', AuthController.signup);
router.post('/sign-in', AuthController.logIn);
router.post('/verify-otp', AuthController.verifyOtp);
router.post('/resend-otp', AuthController.resendOtp);
router.post('/change-password', verifyJWT, AuthController.changePassword);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/update-password', AuthController.updatePassword);


// router.get('/generate-token/:_id',AuthController.generateToken);
// router.get('/log-out',verifyJWT,AuthController.logOut);
// router.post('/signup',AuthController.signup)
// router.post('/forgot-password',AuthController.forgotPassword)
// router.post('/reset-password',verifyJWT,AuthController.resetPassword)

router.get('/get-profile', verifyJWT, UserController.getProfile);
router.get('/get-dashboard-detail', verifyJWT, UserController.getDashboardDetail);
// Edit detail
router.post('/edit-profile', verifyJWT, upload.single('profile-pic'), UserController.editProfile)
router.post('/edit-address', verifyJWT, UserController.editAddress)
router.post('/edit-bank', verifyJWT, UserController.editBank)
router.post('/edit-kyc', verifyJWT, upload.fields([{ name: 'panImage', maxCount: 1 }, { name: 'tanImage', maxCount: 1 }, { name: 'aadharFront', maxCount: 1 }, { name: 'aadharBack', maxCount: 1 }]), UserController.editKyc);
router.post('/edit-professional', verifyJWT, UserController.editProfessional)
router.post('/edit-eductaion-detail', verifyJWT, UserController.editEducationDetail)

router.get('/scholarship-scheme', verifyJWT, UserController.allScholarshipScheme)

router.get("/document-list", verifyJWT, userController.DocumentsList)

router.post('/apply-documents', verifyJWT, upload.fields([{ name: 'docOne', maxCount: 1 }, { name: 'docTwo', maxCount: 1 }, { name: 'docThree', maxCount: 1 }, { name: 'docFour', maxCount: 1 }, { name: 'docFive', maxCount: 1 }]), UserController.applyDocuments);

router.post('/edit-apply-documents', verifyJWT, upload.fields([{ name: 'docOne', maxCount: 1 }, { name: 'docTwo', maxCount: 1 }, { name: 'docThree', maxCount: 1 }, { name: 'docFour', maxCount: 1 }, { name: 'docFive', maxCount: 1 }]), UserController.editApplyDocument);

router.get('/apply-scheme-list', verifyJWT, UserController.applySchemeList)

router.post('/donar-pay', verifyJWT, UserController.donarPay)

router.get('/donation-list', verifyJWT, UserController.donationList)

router.get('/eligible-student-list', verifyJWT, UserController.eligibleStudentList);

router.post('/student-donation-by-donar', verifyJWT, UserController.studentDonationByDonar)

router.get('/donar-donation-history', verifyJWT, UserController.donarDonationHistory);

router.get('/student-donation-history', verifyJWT, UserController.studentDonationHistory);

router.post('/change-user-status/:userId', verifyJWT, UserController.changeUserStatus);



// Admin details
router.post('/admin-sign-in', AuthController.adminLogIn);
router.post('/admin-verify-otp', AuthController.adminVerifyOtp);
router.post('/change-admin-password', verifyJWT, AuthController.changeAdminPassword);
router.post('/forgot-admin-password', AuthController.forgotAdminPassword);
router.post('/update-admin-password', AuthController.updateAdminPassword);

router.get('/get-admin-profile', verifyJWT, UserController.getAdminProfile);

router.post('/edit-admin-profile', verifyJWT, upload.single('profile-pic'), UserController.editAdminProfile)
router.post('/edit-admin-address', verifyJWT, UserController.editAdminAddress)
router.post('/edit-admin-kyc', verifyJWT, upload.fields([{ name: 'panImage', maxCount: 1 }, { name: 'tanImage', maxCount: 1 }]), UserController.editAdminKyc);

router.get('/class-list', verifyJWT, UserController.classList)

router.post('/create-class', verifyJWT, UserController.createClass)

router.get('/class-document-list', verifyJWT, UserController.classDocumentList)

router.get('/admin-class-document-list', verifyJWT, UserController.adminClassDocumentList)

router.get("/admin-document-list", verifyJWT, userController.adminDocumentsList)

router.post('/create-class-document', verifyJWT, UserController.createClassDocument)

router.post('/edit-class-document/:id', verifyJWT, UserController.editClassDocument)

router.get('/scheme-list', verifyJWT, UserController.schemeList)

router.get('/admin-scheme-list', verifyJWT, UserController.adminSchemeList)
router.get('/admin-general-donation-scheme-list', verifyJWT, UserController.adminGeneralDonationSchemeList)

router.post('/create-scheme', verifyJWT, UserController.createScheme)
router.post('/create-general-scheme', verifyJWT, UserController.createGeneralScheme)

router.post('/edit-scheme', verifyJWT, UserController.editScheme)

router.get('/all-class-list', verifyJWT, UserController.allClassList)

router.get('/student-list', verifyJWT, UserController.studentList)

router.get('/admin-student-list/:classId', verifyJWT, UserController.adminStudentList)

router.get('/donar-list', verifyJWT, UserController.donarList)

router.get('/student-pending-scheme-list', verifyJWT, UserController.studentPendingSchemeList)

router.get('/student-rejected-scheme-list', verifyJWT, UserController.studentRejectedSchemeList)

router.get('/student-apply-scheme-list', verifyJWT, UserController.studentApplySchemeList)

router.get('/change-status-verification/:sId/:docStatus/:status', verifyJWT, UserController.changeStatusScholarship)

router.get('/admin-donation-list', verifyJWT, UserController.donationListAdmin)

router.post('/donation-approve', verifyJWT, UserController.donationApprove)

router.get('/manual-donation-history', verifyJWT, UserController.manualDonationHistory);

router.get('/automatic-donation-history', verifyJWT, UserController.automaticDonationHistory);

router.post('/student-donation-by-admin', verifyJWT, UserController.studentDonationByAdmin)

router.get('/admin-eligible-student-list', verifyJWT, UserController.adminEligibleStudentList);

router.get('/user-get-profile/:id', verifyJWT, UserController.userGetProfile);

router.patch("/agent/permission/:id", verifyJWT, UserController.grantPermission);
router.post("/agent/permission/nested/:id", verifyJWT, UserController.giveAccess);

router.get('/me', verifyJWT, UserController.me)

// Download a csv file

router.get('/admin-donation-list-csv', verifyJWT, UserController.csvDonationHistoryFile)
router.get('/admin-donar-list-csv', verifyJWT, UserController.csvDonarHistoryFile)
router.get('/admin-student-list-csv', verifyJWT, UserController.csvStudentHistoryFile)
router.get('/admin-scholarship-distribution-automatic-list-csv', verifyJWT, UserController.csvScholarshipDistributionAutomaticFile)
router.get('/admin-manual-scholarship-history-list-csv', verifyJWT, UserController.csvManualScholarshipHistoryFile)
router.get('/admin-automatic-scholarship-history-list-csv', verifyJWT, UserController.csvAutomaticScholarshipHistoryFile)
router.get('/admin-document-list-csv', verifyJWT, UserController.csvDocumentListFile)
router.get('/admin-class-document-list-csv', verifyJWT, UserController.csvClassDocumentListFile)
router.get('/admin-scheme-list-csv', verifyJWT, UserController.csvSchemeListFile)


router.post('/admin-create', UserController.createAdmin)
router.get('/sub-admin-list', verifyJWT, UserController.subAdminList)
router.get('/sub-admin/:id', verifyJWT, UserController.subAdmin)
router.post('/scholarship-scheme', UserController.createScholarShip);

router.post('/add-blog-manager', verifyJWT, upload.single('image'), UserController.addBlogManager)
router.get('/blog-list', verifyJWT, UserController.blogList)
router.get('/blogs', UserController.blogList)
router.get('/blog/:id', UserController.particularBlog)

// router.post('/save-address',verifyJWT,UserController.saveAddress);
// // router.get('/user-profile',verifyJWT,UserController.Profile);
// // router.get('/user-profile',verifyJWT,UserController.Profile);
// router.post('/test',UserController.Test);


// router.get('/category-list',ProductController.CategoryList);
// router.get('/product-list',ProductController.ProductList);
// router.get('/product',ProductController.ProductDetails);
// router.post('/cancel-order',verifyJWT,ProductController.CancelOrder);
// router.post('/add-cart',verifyJWT,ProductController.addCart);
// router.post('/remove-cart',verifyJWT,ProductController.removeCart);
// router.get('/my-cart',verifyJWT,ProductController.MyCart);
// router.post('/buy-products',verifyJWT,ProductController.Buy);
// router.get('/order-history',verifyJWT,ProductController.OrderHistory);



module.exports = router
