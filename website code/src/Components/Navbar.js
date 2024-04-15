

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Img1 from '../Images/Others/logo.jpg';
// import jwt_decode from "jwt-decode";


// function Navbar({ userData }) {
//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState({});
//   const navigate = useNavigate();

//   const handleMenuToggle = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   // useEffect(() => {
//   //   if (localStorage.getItem('token')) {
//   //     const token = localStorage.getItem('token');
//   //     setUser(jwt_decode(token));
//   //   } else
//   //     navigate('/login')

//   // }, [])

//   return (
//     <>
//       <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
//         <nav className="flex justify-center">
//           <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
//             <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
//               <Link
//                 className="px-5 py-2 text-sm font-medium text-gray-600  "
//                 to="/"
//               >
//                 Home
//               </Link>
//               <Link
//                 className="px-5 py-2 text-sm font-medium text-gray-600  "
//                 to="/about"
//               >
//                 About
//               </Link>
//               <Link
//                 className="px-5 py-2 text-sm font-medium text-gray-600  "
//                 to="/articles"
//               >
//                 Material
//               </Link>
//               <Link
//                 className="px-5 py-2 text-sm font-medium text-gray-600  "
//                 to="/pricing"
//               >
//                 Pricing
//               </Link>
//             </div>
//             <div className="flex w-full items-center justify-between md:w-auto">
//               <Link className="w-28 dark:hidden" to="/">
//                 <img
//                   alt="Logo"
//                   width="150"
//                   height="70"
//                   decoding="async"
//                   data-nimg="1"
//                   style={{ color: 'transparent' }}
//                   sizes="(max-width: 640px) 100vw, 200px"
//                   // src="https://bentlyfoundation.org/images/tesla.png"
//                   src={Img1}
//                 />
//               </Link>
//               <button
//                 className="order-2 ml-2 md:hidden focus:outline-none"
//                 onClick={handleMenuToggle}
//               >
//                 <svg
//                   className="w-6 h-6 text-gray-600 dark:text-gray-300"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="order-3 hidden w-full md:flex md:w-auto md:order-none md:justify-end">
//               <Link className="px-5 py-2 text-sm font-medium text-gray-600  " target="" rel="" to="/doctors">Doctors</Link>
//               {/* <Link className="px-5 py-2 text-sm font-medium text-gray-600  " target="" rel="" to="/QuestionsPage">Q/A</Link> */}
//               <Link className="px-5 py-2 text-sm font-medium text-gray-600  " target="" rel="" to="/contact">Contact</Link>
//               {/* <Link className="px-5 py-2 text-sm font-medium text-gray-600  " to={Object.keys(user).length > 0 ? `/${userData.role}/dashboard` : '/login'}>Dashboard</Link> */}
//               <Link className="px-5 py-2 text-sm font-medium text-gray-600  " to="/admin-login">Admin Login</Link>
//               <Link className="px-5 py-2 text-sm font-medium text-gray-600  " to="/login">Login</Link>
//             </div>

//             <div
//               style={{ zIndex: "100" }}
//               className={`fixed left-0 top-0 h-full w-[100vw] bg-white  transform transition-transform ease-in-out duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
//                 } md:hidden`}
//             >
//               <div className="flex flex-col h-full justify-start items-center py-8 px-4">
//                 <Link
//                   className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
//                   to="/"
//                   onClick={handleMenuToggle}
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
//                   to="/about"
//                   onClick={handleMenuToggle}
//                 >
//                   About
//                 </Link>
//                 <Link
//                   className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
//                   to="/articles"
//                   onClick={handleMenuToggle}
//                 >
//                   Material
//                 </Link>
//                 <Link
//                   className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
//                   to="/pricing"
//                   onClick={handleMenuToggle}
//                 >
//                   Pricing
//                 </Link>
//                 <Link
//                   className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
//                   to="/doctors"
//                   onClick={handleMenuToggle}
//                 >
//                   Doctors
//                 </Link>

//                 <Link
//                   className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
//                   to="/contact"
//                   onClick={handleMenuToggle}
//                 >
//                   Contact
//                 </Link>
//                 <Link
//                   className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
//                   to={`/${userData.role}/dashboard`}
//                   onClick={handleMenuToggle}
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   className="my-2 px-5 py-2 text-sm font-medium text-gray-600  "
//                   to="/login"
//                   onClick={handleMenuToggle}
//                 >
//                   Login
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// }

// export default Navbar;


import React, { useEffect, useState } from 'react'
import "./Header.css"
import '@fortawesome/fontawesome-free/css/all.css';
import { useLocation, useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [path, setPath] = useState('')
  useEffect(() => {
    setPath(location.pathname)
  }, [location.pathname])

  return (
    <div>


      <header className="main-header clearfix" data-sticky_header="true">
        <section className="header-wrapper navgiation-wrapper">
          <div className="main-top-header clearfix">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 text-left hidden-sm hidden-xs">
                  <div className="top-bar-social">
                    <a >
                      <i class="fa-brands fa-facebook"></i>
                    </a>
                    <a >
                      <i class="fa-brands fa-x-twitter"></i>
                    </a>
                    <a >
                      <i class="fa-brands fa-pinterest"></i>
                    </a>
                    <a >
                      <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a >
                      <i class="fa-brands fa-youtube"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 text-right hidden-sm hidden-xs">
                  <div className="top-bar-link">

                    <a onClick={() => navigate('/Contact')}>Support</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-top">
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-sm-12 header-col-logo">
                  <div className="header-logo logo">
                    <a onClick={() => navigate("/")}>
                      <img src="./logo2.jpg.png" alt="Logo" />
                    </a>
                  </div>
                  {/* end .logo  */}
                </div>
                {/* end .col-md-3  */}
                <div className="col-md-8 hidden-xs">
                  <div className="row">
                    <div className="col-md-4 col-sm-4 info-separotor">
                      <div className="header-icon-boxs">
                        <div className="icon-container">
                          <i className="fa fa-phone" />
                        </div>
                        <div className="text">
                          <span className="head-heading">Get In Touch</span>
                          <span className="head-content">
                            msntrust2023@gmail.com
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* end .col-md-4  */}
                    <div className="col-md-4 col-sm-4 info-separotor">
                      <div className="header-icon-box">
                        <div className="icon-container">
                          <i className="fa fa-home" />
                        </div>
                        <div className="text">
                          <span className="head-heading">Office Address</span>
                          <span className="head-content">
                            4-H-9, Indira Gandhi Nagar Jagatpura, Jaipur
                          </span>
                        </div>
                      </div>
                      {/* end .repair-icon-box  */}
                    </div>
                    {/* end .col-md-4  */}
                    <div className="col-md-4 col-sm-4 info-separotor">
                      <div className="header-icon-box">
                        <div className="icon-container">
                          <i className="fa fa-clock-o" />
                        </div>
                        <div className="text">
                          <span className="head-heading">Opening Hour</span>
                          <span className="head-content">
                            10.00 - 18.00 UTC+06
                          </span>
                        </div>
                      </div>
                      {/* end .header-icon-box  */}
                    </div>
                    {/* end .col-md-4  */}
                  </div>
                  {/* end .row  */}
                </div>
                {/* end .col-md-8  */}
              </div>
              {/* end .row  */}
            </div>
            {/* end .container  */}
          </div>
          {/* end header-top  */}
          <div className="navbar navbar-default">
            <div className="container clearfix">
              <div className="navbar-collapse collapse pull-left">
                <ul className="nav navbar-nav">
                  <li onClick={() => navigate("/")} className="drop">
                    <a title="Home Layout 01" className={path === '/' && "link-active"}>Home</a>
                    <ul className="drop-down">


                    </ul>
                  </li>
                  <li onClick={() => navigate("/about")}>
                    <a title="About Us" className={path === '/about' && "link-active"}>About Us</a>

                  </li>
                  <li onClick={() => navigate("/portfolio")} className="drop">
                    <a title='Portfolio' className={path === '/portfolio' && "link-active"}>Portfolio</a>
                    <ul className="drop-down">

                    </ul>
                  </li>
                  <li className="drop" onClick={() => navigate('/blog')}>
                    <a title="Blog" className={path === '/blog' && "link-active"}>Blog</a>
                  </li>
                  <li className="drop" onClick={() => navigate('/login')}>
                    <a title="Blog" className={path === '/login' && "link-active"}>Login</a>
                  </li>
                  <li>
                    <a  >others</a>
                    <ul className="drop-down">
                      {/* <li onClick={() => navigate("/login")}>
                        <a>login</a>
                      </li>
                      <li onClick={() => navigate("/admin-login")}>
                        <a  >admin login</a>
                      </li> */}
                      <li onClick={() => navigate("/contact")}>
                        <a  >contact us</a>
                      </li>
                      <li onClick={() => navigate("/faq")}>
                        <a >faq</a>
                      </li>
                      <li onClick={() => navigate("/howitworks")}>
                        <a >How it works</a>
                      </li>
                      <li onClick={() => navigate("/terms&condition")}>
                        <a >terms & condition</a>
                      </li>
                      <li onClick={() => navigate("/privacyPolicy")}>
                        <a >privacy policy</a>
                      </li>
                    </ul>
                  </li>


                </ul>
                {/* end .nav .navbar-nav  */}
              </div>
              <div className="navbar-header pull-right">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <div className="navbar-contact hidden-sm hidden-xs">
                  <ul>
                    <li onClick={() => navigate("/donation")}><a className="btn btn-theme" title="Donate Now">Donate Now</a></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* end .container  */}
          </div>
          {/* end .navbar .navbar-default  */}
        </section>
      </header>



    </div>
  )
}

export default Header
