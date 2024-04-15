import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Loader from './Components/Loader';
import NotFound from './Components/404Page';
import EditProfile from './DoctorDashboard/Component/EditProfile';
import Profile from './AdminDashboard/Profile';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AdminEditProfile from './AdminDashboard/Components/EditProfile';
import AdminDonationHistory from './AdminDashboard/DonationHistory';
import ScholarshipDistributionAutomatic from './AdminDashboard/ScholarshipDistributionAutomatic';
import Donar from './AdminDashboard/Donar';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import ForgotPassword from './Pages/ForgotPassword';
import AdminForgotPassword from './Pages/AdminForgotPassword';
import UpdatePassword from './Pages/UpdatePassword';
import VerifyOtp from './Pages/VerifyOtp';
import Student from './AdminDashboard/Student';
import ManualScholarshipHistory from './AdminDashboard/ManualScholarshipHistory';
import AdminBlog from './AdminDashboard/Blog';
import AutomaticScholarshipHistory from './AdminDashboard/AutomaticScholarshipHistory';
import DocumentHistory from './AdminDashboard/DocumentHistory';
import ScholarshipPage from './DoctorDashboard/ScholarshipPage';
import MasterDocument from './AdminDashboard/MasterDocument';
import DonationHistory from './DoctorDashboard/DonationHistory';
import ScholarshipDistributionPrefernce from './DoctorDashboard/ScholarshipDistributionPrefernce';
import ScholarshipDistributionDetail from './DoctorDashboard/ScholarshipDistributionDetail';
import CreateDonar from './AdminDashboard/CreateDonar';
import MasterScholarshipScheme from './AdminDashboard/MasterScholarshipScheme';
import Class from './AdminDashboard/Class';
import EditDonar from './AdminDashboard/EditDonar';
import SubAdmin from './AdminDashboard/SubAdmin';
import EditPermission from './AdminDashboard/EditPermission';
import EditStudent from './AdminDashboard/EditStudent';
import Faq from './Pages/Faq';
import TermAndConditions from './Pages/TermsAndConditions';
import Howitworks from './Pages/Howitworks';
import Donation from './Pages/Donation';
import BlogId from './Pages/BlogId';
import AddBlog from './AdminDashboard/AddBlog';
import GeneralDonation from './AdminDashboard/GeneralDonation';

const Home = lazy(() => import('../src/Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));
const Portfolio = lazy(() => import('./Pages/Portfolio'));
const Blog = lazy(() => import('./Pages/Blog'));
const Login = lazy(() => import('./Pages/Login'));
const AdminLogin = lazy(() => import('./Pages/AdminLogin'));
const SingleMember = lazy(() => import('./Components/Members/SingleMember'));
const SinglePageArticles = lazy(() => import('./Components/Articles/SinglePageArticles/SinglePageArticls'));

const Pricing = lazy(() => import('./Pages/Pricing'));
const Register = lazy(() => import('./Pages/Register'));
const FreeRegister = lazy(() => import('./Pages/FreeRegister'));
const Dashboard = lazy(() => import('./DoctorDashboard/Dashboard'));
const Layout2 = lazy(() => import('./Layout/Layout2'));
const Layout = lazy(() => import('./Layout/Layout'));
const PostPage = lazy(() => import('./DoctorDashboard/PostPage'));
const DocumentRequired = lazy(() => import('./DoctorDashboard/DocumentRequired'));
const ScholarshipHistory = lazy(() => import('./DoctorDashboard/ScholarshipHistory'));
const Profilepage = lazy(() => import('./DoctorDashboard/Profilepage'));
const CreatePost = lazy(() => import('./DoctorDashboard/CreatePost'));
const PlanPage = lazy(() => import('./DoctorDashboard/PlanPage'));
const QuickNotes = lazy(() => import('./DoctorDashboard/QuickNotes'));

const App = () => {

  const userData = {
    role: localStorage.getItem('type') || ''
  }
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/*" element={<Layout userData={userData} />}>
            <Route path="" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="faq" element={<Faq />} />
            <Route path="login" element={<Login />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="register" element={<Register />} />
            <Route path="verify-otp" element={<VerifyOtp />} />
            <Route path="donation" element={<Donation />} />
            <Route path="blog/:id" element={<BlogId />} />

            {/* <Route path="register-as-a-user" element={<FreeRegister />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="singlePageArticles" element={<SinglePageArticles />} />
            <Route path="singleMember" element={<SingleMember />} /> */}
            <Route path="terms&condition" element={<TermAndConditions />} />
            <Route path="privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="howitworks" element={<Howitworks />} />
            {/* <Route path="QuestionsPage" element={<QuestionAnswerPage userData={userData} />} /> */}
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="admin-forgot-password" element={<AdminForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>




          {/* {
            userData && userData.role === "admin" ? */}
          <Route exact path={`/admin/*`} element={<Layout2 userData={userData} />}>
            <Route exact path="dashboard" element={<AdminDashboard />} />
            <Route exact path="profile" element={<Profile />} />
            <Route exact path='profile/edit' element={<AdminEditProfile />} />
            <Route exact path="donation-history" element={<AdminDonationHistory />} />
            <Route exact path="scholarship-distribution-automatic" element={<ScholarshipDistributionAutomatic />} />
            <Route exact path="donars" element={<Donar />} />
            <Route exact path="donar/create" element={<CreateDonar />} />
            <Route exact path="edit-donar" element={<EditDonar />} />
            <Route exact path="students" element={<Student />} />
            <Route exact path="edit-student" element={<EditStudent />} />
            <Route exact path="manual-scholarship-history" element={<ManualScholarshipHistory />} />
            <Route exact path="automatic-scholarship-history" element={<AutomaticScholarshipHistory />} />
            <Route exact path="document-history" element={<DocumentHistory />} />
            <Route exact path="master-document" element={<MasterDocument />} />
            <Route exact path="class" element={<Class />} />
            <Route exact path="blog" element={<AdminBlog />} />
            <Route exact path="add-blog" element={<AddBlog />} />
            <Route exact path="all-admin" element={<SubAdmin />} />
            <Route exact path="edit-permission" element={<EditPermission />} />
            <Route exact path="master-scholarship-scheme" element={<MasterScholarshipScheme />} />
            <Route exact path="general-donation" element={<GeneralDonation />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* : userData && userData.role === "user" ? */}
          <Route exact path={`/user/*`} element={<Layout2 userData={userData} />}>
            <Route exact path='dashboard' element={<Dashboard />} />
            <Route exact path='documents-required' element={<DocumentRequired />} />
            <Route exact path='scholarship-history' element={<ScholarshipHistory />} />

            <Route exact path='scholarship-list' element={<ScholarshipPage />} />
            <Route exact path='scholarship-distribution-preferences' element={<ScholarshipDistributionPrefernce />} />
            <Route exact path='scholarship-distribution-details' element={<ScholarshipDistributionDetail />} />
            <Route exact path='donation-history' element={<DonationHistory />} />
            <Route exact path='profile' element={<Profilepage />} />
            <Route exact path='profile/edit' element={<EditProfile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
