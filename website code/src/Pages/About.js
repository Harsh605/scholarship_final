// import React from 'react'


// const About = () => {
//   return (

//     <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4" style={{fontFamily:"-apple-system, BlinkMacSystemFont,Segoe UI, Roboto,Oxygen"}}>
//     <p className="font-normal text-sm leading-3 text-[#7963a7]  cursor-pointer pb-2">About</p>
//     <div className="flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12">
//         <div className="w-full lg:w-6/12">
//             <h2 className="w-full font-bold lg:text-4xl text-3xl lg:leading-10 leading-9">We are here to make great design accessible and delightfull for everyone</h2>
//             <p className="font-normal text-base leading-6 text-[#757575] mt-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire,</p>
//         </div>
//         <div className="w-full lg:w-6/12">
//             <img className="lg:block hidden w-full" src="https://i.ibb.co/RjNH7QB/Rectangle-122-1.png" alt="people discussing on board" />
//             <img className="lg:hidden sm:block hidden w-full" src="https://i.ibb.co/16fPqrg/Rectangle-122-2.png" alt="people discussing on board" />
//             <img className="sm:hidden block w-full" src="https://i.ibb.co/Jxhpxh6/Rectangle-122.png" alt="people discussing on board" />
//         </div>
//     </div>

//     <div className="relative mt-24">
//         <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
//             <div className="z-20 w-12 h-12 bg-gray-800 rounded-full flex justify-center items-center">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M5 5V21" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                     <path d="M19 5V14" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                     <path d="M5 4.99984C5.93464 4.08371 7.19124 3.57056 8.5 3.57056C9.80876 3.57056 11.0654 4.08371 12 4.99984C12.9346 5.91598 14.1912 6.42913 15.5 6.42913C16.8088 6.42913 18.0654 5.91598 19 4.99984" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                     <path d="M5 14.0001C5.93464 13.084 7.19124 12.5708 8.5 12.5708C9.80876 12.5708 11.0654 13.084 12 14.0001C12.9346 14.9162 14.1912 15.4294 15.5 15.4294C16.8088 15.4294 18.0654 14.9162 19 14.0001" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//             </div>

//             <svg className="z-20" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <circle cx="24" cy="24" r="24" fill="#7963a7" />
//                 <path d="M26 15V19C26 19.2652 26.1054 19.5196 26.2929 19.7071C26.4804 19.8946 26.7348 20 27 20H31" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M31 30V31C31 31.5304 30.7893 32.0391 30.4142 32.4142C30.0391 32.7893 29.5304 33 29 33H19C18.4696 33 17.9609 32.7893 17.5858 32.4142C17.2107 32.0391 17 31.5304 17 31V30" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M30 26H33M15 26H18H15ZM22.5 26H25.5H22.5Z" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M17 22V17C17 16.4696 17.2107 15.9609 17.5858 15.5858C17.9609 15.2107 18.4696 15 19 15H26L31 20V22" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>

//             <svg className="z-20 sm:block hidden" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <circle cx="24" cy="24" r="24" fill="#7963a7" />
//                 <path d="M21 23C23.2091 23 25 21.2091 25 19C25 16.7909 23.2091 15 21 15C18.7909 15 17 16.7909 17 19C17 21.2091 18.7909 23 21 23Z" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M15 33V31C15 29.9391 15.4214 28.9217 16.1716 28.1716C16.9217 27.4214 17.9391 27 19 27H23C24.0609 27 25.0783 27.4214 25.8284 28.1716C26.5786 28.9217 27 29.9391 27 31V33" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M28 15.1301C28.8604 15.3504 29.623 15.8508 30.1676 16.5524C30.7122 17.254 31.0078 18.117 31.0078 19.0051C31.0078 19.8933 30.7122 20.7562 30.1676 21.4578C29.623 22.1594 28.8604 22.6598 28 22.8801" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M33 33.0001V31.0001C32.9949 30.1173 32.6979 29.2609 32.1553 28.5645C31.6126 27.8682 30.8548 27.3708 30 27.1501" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//         </div>
//         <hr className="z-10 absolute top-2/4 w-full bg-gray-200" />
//     </div>
//     <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
//         <div>
//             <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 mt-6">Founded</p>
//             <p className="font-normal text-base leading-6 text-[#757575] mt-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
//         </div>
//         <div>
//             <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 mt-6">50M montly enrichments</p>
//             <p className="font-normal text-base leading-6 text-[#757575] mt-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
//         </div>
//         <div className="sm:block hidden">
//             <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 mt-6">400k User</p>
//             <p className="font-normal text-base leading-6 text-[#757575] mt-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
//         </div>
//     </div>
//     <div className="sm:hidden block relative mt-8">
//         <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
//             <svg className="z-20" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <circle cx="24" cy="24" r="24" fill="#7963a7" />
//                 <path d="M21 23C23.2091 23 25 21.2091 25 19C25 16.7909 23.2091 15 21 15C18.7909 15 17 16.7909 17 19C17 21.2091 18.7909 23 21 23Z" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M15 33V31C15 29.9391 15.4214 28.9217 16.1716 28.1716C16.9217 27.4214 17.9391 27 19 27H23C24.0609 27 25.0783 27.4214 25.8284 28.1716C26.5786 28.9217 27 29.9391 27 31V33" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M28 15.1301C28.8604 15.3504 29.623 15.8508 30.1676 16.5524C30.7122 17.254 31.0078 18.117 31.0078 19.0051C31.0078 19.8933 30.7122 20.7562 30.1676 21.4578C29.623 22.1594 28.8604 22.6598 28 22.8801" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M33 33.0001V31.0001C32.9949 30.1173 32.6979 29.2609 32.1553 28.5645C31.6126 27.8682 30.8548 27.3708 30 27.1501" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//         </div>
//         <hr className="z-10 absolute top-2/4 w-full bg-gray-200" />
//     </div>
//     <div className="sm:hidden grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
//         <div>
//             <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 mt-6">400k User</p>
//             <p className="font-normal text-base leading-6 text-[#757575] mt-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
//         </div>
//     </div>

//     <div className="flex lg:flex-row flex-col md:gap-14 gap-16 justify-between lg:mt-20 mt-16">
//         <div className="w-full lg:w-6/12">
//             <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-[#000000]">Our Mission</h2>
//             <p className="font-normal text-base leading-6 text-[#757575] mt-6 w-full lg:w-11/12 xl:w-11/12">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from</p>
//         </div>
//         <div className="w-full lg:w-6/12">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 gap-10">
//                 {/* <!-- Team Card --> */}
//                 <div className="flex p-4 shadow-md">
//                     <div className="mr-6">
//                         <svg className="mr-6" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M18 15C20.4853 15 22.5 12.9853 22.5 10.5C22.5 8.01472 20.4853 6 18 6C15.5147 6 13.5 8.01472 13.5 10.5C13.5 12.9853 15.5147 15 18 15Z" stroke="#7963a7" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M25.5 28.5C27.9853 28.5 30 26.4853 30 24C30 21.5147 27.9853 19.5 25.5 19.5C23.0147 19.5 21 21.5147 21 24C21 26.4853 23.0147 28.5 25.5 28.5Z" stroke="#7963a7" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M10.5 28.5C12.9853 28.5 15 26.4853 15 24C15 21.5147 12.9853 19.5 10.5 19.5C8.01472 19.5 6 21.5147 6 24C6 26.4853 8.01472 28.5 10.5 28.5Z" stroke="#7963a7" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     </div>
//                     <div className="">
//                         <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800">Team</p>
//                         <p className="mt-2 font-normal text-base leading-6 text-[#757575]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
//                     </div>
//                 </div>

//                 {/* <!-- Board Card --> */}
//                 <div className="flex p-4 shadow-md">
//                     <div className="mr-6">
//                         <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M10.5 10.5C12.1569 10.5 13.5 9.15685 13.5 7.5C13.5 5.84315 12.1569 4.5 10.5 4.5C8.84315 4.5 7.5 5.84315 7.5 7.5C7.5 9.15685 8.84315 10.5 10.5 10.5Z" stroke="#7963a7" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M7.5 33V25.5L6 24V18C6 17.6022 6.15804 17.2206 6.43934 16.9393C6.72064 16.658 7.10218 16.5 7.5 16.5H13.5C13.8978 16.5 14.2794 16.658 14.5607 16.9393C14.842 17.2206 15 17.6022 15 18V24L13.5 25.5V33" stroke="#7963a7" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M25.5 10.5C27.1569 10.5 28.5 9.15685 28.5 7.5C28.5 5.84315 27.1569 4.5 25.5 4.5C23.8431 4.5 22.5 5.84315 22.5 7.5C22.5 9.15685 23.8431 10.5 25.5 10.5Z" stroke="#7963a7" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M22.5 33V27H19.5L22.5 18C22.5 17.6022 22.658 17.2206 22.9393 16.9393C23.2206 16.658 23.6022 16.5 24 16.5H27C27.3978 16.5 27.7794 16.658 28.0607 16.9393C28.342 17.2206 28.5 17.6022 28.5 18L31.5 27H28.5V33" stroke="#7963a7" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     </div>
//                     <div className="">
//                         <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800">Board</p>
//                         <p className="mt-2 font-normal text-base leading-6 text-[#757575]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
//                     </div>
//                 </div>

//                 {/* <!-- Press Card --> */}

//             </div>
//         </div>
//     </div>
// </div>

//   )
// }

// export default About

import React from 'react';
// import "../component/Header.css";
import "../generosity/css/less/layout.less"
import "../generosity/css/less/reset.less"
import "../generosity/css/less/mixins.less"
import "../generosity/css/less/variables.less"
import "../generosity/css/venobox.css"
import "../generosity/css/animate.css"
import "../generosity/css/font-awesome.min.css"
import "../generosity/css/styles.css"
import { useNavigate } from 'react-router';




const About = () => {
    const navigate = useNavigate()
    return (
        <div>

            <section className="page-header" data-stellar-background-ratio="0.1" style={{ backgroundPosition: '50% 50%' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <h3>
                                About
                            </h3>
                            <p className="page-breadcrumb">
                                <a >Home</a>
                                / About
                            </p>
                        </div>
                    </div>
                    {/* end .row  */}
                </div>
                {/* end .container  */}
            </section>



            <section className="section-content-block">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="section-heading-wrapper no-padding">
                                <h2>Our
                                    <span>Mission</span>
                                </h2>
                                <hr />
                                <p className="margin-top-20">
                                    The Alliance for Children's Rights is dedicated solely to protecting the rights of impoverished, abused and neglected children. By providing free legal services, the Alliance ensure that they have safe, stable homes, health care and the education they
                                    need to thrive.
                                </p>
                                <p>
                                    Since its founding in 1992, the Alliance has been a consistent safety net for more than 100,000 children and families.
                                </p>
                                <div className="info-separotor">
                                    <img src="/signature.png" alt />
                                    <p>
                                        <strong>Brandon Munson</strong>
                                        <br />CEO, Generosity Club
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <img src="/volunteers.jpg" alt />
                        </div>
                    </div>
                    {/*  end .row*/}
                    <div className="row no-gutter">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="about-highlight-1">
                                <i className="fa fa-users" />
                                <div className="about-content">
                                    <h3>
                                        <a href="#">Volunteering</a>
                                    </h3>
                                    <p className="about-text">We work to unite the geek community into a massive force to opportunity families and communities worldwide.</p>
                                </div>
                            </div>
                        </div>
                        {/*  end .col-lg-3 col-md-3 col-sm-12 col-xs-12  */}
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="about-highlight-1 about-featured-block">
                                <i className="fa fa-support" />
                                <div className="about-content">
                                    <h3>
                                        <a href="#">Fundraising</a>
                                    </h3>
                                    <p className="about-text">We work to unite the geek community into a massive force to opportunity families and communities worldwide.</p>
                                </div>
                            </div>
                        </div>
                        {/*  end .col-lg-3 col-md-3 col-sm-12 col-xs-12  */}
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="about-highlight-1">
                                <i className="fa fa-briefcase" />
                                <div className="about-content">
                                    <h3>
                                        <a href="#">Help &amp; Support</a>
                                    </h3>
                                    <p className="about-text">We work to unite the geek community into a massive force to opportunity families and communities worldwide.</p>
                                </div>
                            </div>
                        </div>
                        {/*  end .col-lg-3 col-md-3 col-sm-12 col-xs-12  */}
                    </div>
                    {/*  end .row*/}
                </div>
                {/*  end .container  */}
            </section>




            <section className="section-content-block section-counter  section-black-bg-overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="counter-block-1 text-center">
                                <span className="counter-icon fa fa-group" />
                                <h4>Volunteer</h4>
                                <span className="counter">2,019</span>
                            </div>
                        </div>
                        {/*  end col-lg-6 col-md-6 col-sm-6 col-xs-1 */}
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="counter-block-1 text-center">
                                <span className="counter-icon fa fa-briefcase" />
                                <h4>Projects</h4>
                                <span className="counter">5,061</span>
                            </div>
                        </div>
                        {/*  end col-lg-6 col-md-6 col-sm-6 col-xs-1 */}
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="counter-block-1 text-center">
                                <span className="counter-icon fa fa-hand-peace-o" />
                                <h4>Donors</h4>
                                <span className="counter">3,910</span>
                            </div>
                        </div>
                        {/*  end col-lg-6 col-md-6 col-sm-6 col-xs-1 */}
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="counter-block-1 text-center">
                                <span className="counter-icon fa fa-trophy" />
                                <h4>Awards</h4>
                                <span className="counter">1,910</span>
                            </div>
                        </div>
                        {/*  end col-lg-6 col-md-6 col-sm-6 col-xs-1 */}
                    </div>
                </div>
                {/*  end .container  */}
            </section>






            <section className="section-content-block">
                <div className="container">
                    <div className="row section-heading-wrapper">
                        <div className="col-lg-12 col-md-12 col-sm-12 text-left">
                            <h2>Our
                                <span>Volunteer</span>
                            </h2>
                            <h4>Volunteer also include community centers and settlement houses that provide integrated services.</h4>
                        </div>
                        {/* end .col-sm-12  */}
                    </div>
                    <div className="row wow fadeIn animated" style={{ visibility: 'visible', animationName: 'fadeIn' }}>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="team-layout-1">
                                <figure className="team-member">
                                    <a href="#" title="MELISSA MUNOZ">
                                        <img src="/13.webp" alt="MELISSA MUNOZ" />
                                    </a>
                                </figure>
                                {/* end. team-member  */}
                                <article className="team-info">
                                    <h3>
                                        Jhon Doe
                                        <span>/ Founder</span>
                                    </h3>
                                    <div className="team-social-share text-center clearfix">
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-facebook rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-twitter rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-pinterest rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-linkedin rectangle" />
                                        </a>
                                    </div>
                                    {/* end .author-social-box  */}
                                </article>
                            </div>
                            {/*  end team layout-1 */}
                        </div>
                        {/*  end .col-lg-3 col-md-3 col-sm-6 col-xs-12 */}
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="team-layout-1">
                                <figure className="team-member">
                                    <a href="#" title="ALEXANDER GARY">
                                        <img src="/14.webp" alt="ALEXANDER GARY" />
                                    </a>
                                </figure>
                                {/* end. team-member  */}
                                <article className="team-info">
                                    <h3>
                                        Jack Smith
                                        <span>/ Founder</span>
                                    </h3>
                                    <div className="team-social-share text-center clearfix">
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-facebook rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-twitter rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-pinterest rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-linkedin rectangle" />
                                        </a>
                                    </div>
                                    {/* end .author-social-box  */}
                                </article>
                            </div>
                            {/*  end team-layout-1 */}
                        </div>
                        {/*  end .col-lg-3 col-md-3 col-sm-6 col-xs-12  */}
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="team-layout-1">
                                <figure className="team-member">
                                    <a href="#" title="JOHN ABRAHAM">
                                        <img src="/15.webp" alt="JOHN ABRAHAM" />
                                    </a>
                                </figure>
                                {/* end. team-member  */}
                                <article className="team-info">
                                    <h3>
                                        James Lora
                                        <span>/ Founder</span>
                                    </h3>
                                    <div className="team-social-share text-center clearfix">
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-facebook rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-twitter rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-pinterest rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-linkedin rectangle" />
                                        </a>
                                    </div>
                                    {/* end .author-social-box  */}
                                </article>
                            </div>
                            {/*  end team-layout-1 */}
                        </div>
                        {/*  end .col-lg-3 col-md-3 col-sm-6 col-xs-12  */}
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="team-layout-1">
                                <figure className="team-member">
                                    <a href="#" title="JOHN ABRAHAM">
                                        <img src="/16.webp" alt="JOHN ABRAHAM" />
                                    </a>
                                </figure>
                                {/* end. team-member  */}
                                <article className="team-info">
                                    <h3>
                                        Jhon Doe
                                        <span>/ Founder</span>
                                    </h3>
                                    <div className="team-social-share text-center clearfix">
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-facebook rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-twitter rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-pinterest rectangle" />
                                        </a>
                                        <a href="#" title="Facebook">
                                            <i className="fa fa-linkedin rectangle" />
                                        </a>
                                    </div>
                                    {/* end .author-social-box  */}
                                </article>
                            </div>
                            {/*  end team-layout-1 */}
                        </div>
                        {/*  end .col-lg-3 col-md-3 col-sm-6 col-xs-12  */}
                    </div>
                    {/* end .row  */}
                </div>
                {/* end .container  */}
            </section>


            <section className="section-content-block section-cta">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="cta-content wow pulse animated" data-wow-iteration={2} data-wow-duration="0.3s" style={{ visibility: 'visible', animationDuration: '0.3s', animationIterationCount: 2, animationName: 'pulse' }}>
                                <h4>Awesome voluntary Work
                                </h4>
                                <h2>Join with us to provide
                                    <br />
                                    food for African Hungry People
                                </h2>
                                <a className="btn btn-custom" onClick={() => navigate('/Donation')}>Join With Us</a>
                            </div>
                            {/* end .cta-content  */}
                        </div>
                        {/* end .col-md-12 col-sm-12  */}
                    </div>
                    {/*  end .row */}
                </div>
                {/*  end .container  */}
            </section>




            <section className="section-content-block">
                <div className="container wow fadeIn animated" style={{ visibility: 'visible', animationName: 'fadeIn' }}>
                    <div className="row section-heading-wrapper">
                        <div className="col-lg-12 col-md-12 col-sm-12 text-left no-padding">
                            <h2>Our
                                <span>sponsors</span>
                            </h2>
                            <h4>Human service organizations promote volunteerism and provide wide range of direct services.</h4>
                        </div>
                        {/* end .col-sm-12  */}
                    </div>
                    <div className="row">
                        <div className="logo-layout-2">
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="client-logo">
                                    <img src="/logo_1.webp" alt />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="client-logo">
                                    <img src="/logo_2.webp" alt />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="client-logo">
                                    <img src="/logo_3.webp" alt />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="client-logo">
                                    <img src="/logo_4.webp" alt />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="client-logo">
                                    <img src="/logo_5.webp" alt />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="client-logo">
                                    <img src="/logo_6.webp" alt />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="client-logo">
                                    <img src="/logo_7.webp" alt />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="client-logo">
                                    <img src="/logo_8.webp" alt />
                                </div>
                            </div>
                        </div>
                        {/* end .logo-items  */}
                    </div>
                    {/* end row  */}
                </div>
                {/* end .container  */}
            </section>


        </div>
    )
}

export default About
