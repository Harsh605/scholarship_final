// import React from 'react'
// import { FaLinkedinIn } from "react-icons/fa";
// import { FiTwitter } from "react-icons/fi";
// import { useNavigate } from 'react-router';
// import doctor1 from "../Images/Doctors/doctor1.webp"
// import doctor2 from "../Images/Doctors/doctor2.jpeg"
// import doctor3 from "../Images/Doctors/doctor3.webp"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import 'react-lazy-load-image-component/src/effects/blur.css';

// const teamMembers = [
//   {
//     name: 'Maria Smith',
//     role: 'Frontend Developer',
//     image: doctor1,
//     socialMedia: [
//       {
//         name: 'GitHub',
//         icon: 'https://example.com/github-icon.svg',
//         link: 'https://github.com/maria',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/maria',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://th.bing.com/th/id/OIP.rHUnyNRNkBKVEK4HlTzCgQAAAA?pid=ImgDet&rs=1',
//         link: 'https://linkedin.com/in/maria',
//       },
//       {
//         name: 'Facebook',
//         icon: 'https://www.flaticon.com/free-icon/facebook_4494475?term=social+media&page=1&position=6&origin=tag&related_id=4494475',
//         link: 'https://linkedin.com/in/maria',
//       },
//     ],
//   },
//   {
//     name: 'Darren Randolph',
//     role: 'Marketing expert',
//     image: doctor3,
//     socialMedia: [
//       {
//         name: 'Facebook',
//         icon: 'https://example.com/facebook-icon.svg',
//         link: 'https://facebook.com/darren',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/darren',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://example.com/linkedin-icon.svg',
//         link: 'https://linkedin.com/in/darren',
//       },
//     ],
//   },
//   {
//     name: 'Maria Smith',
//     role: 'Frontend Developer',
//     image: doctor2,
//     socialMedia: [
//       {
//         name: 'GitHub',
//         icon: 'https://example.com/github-icon.svg',
//         link: 'https://github.com/maria',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/maria',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://th.bing.com/th/id/OIP.rHUnyNRNkBKVEK4HlTzCgQAAAA?pid=ImgDet&rs=1',
//         link: 'https://linkedin.com/in/maria',
//       },
//       {
//         name: 'Facebook',
//         icon: 'https://www.flaticon.com/free-icon/facebook_4494475?term=social+media&page=1&position=6&origin=tag&related_id=4494475',
//         link: 'https://linkedin.com/in/maria',
//       },
//     ],
//   },
//   {
//     name: 'Darren Randolph',
//     role: 'Marketing expert',
//     image: doctor2,
//     socialMedia: [
//       {
//         name: 'Facebook',
//         icon: 'https://example.com/facebook-icon.svg',
//         link: 'https://facebook.com/darren',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/darren',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://example.com/linkedin-icon.svg',
//         link: 'https://linkedin.com/in/darren',
//       },
//     ],
//   },
//   {
//     name: 'Maria Smith',
//     role: 'Frontend Developer',
//     image: doctor3,
//     socialMedia: [
//       {
//         name: 'GitHub',
//         icon: 'https://example.com/github-icon.svg',
//         link: 'https://github.com/maria',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/maria',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://th.bing.com/th/id/OIP.rHUnyNRNkBKVEK4HlTzCgQAAAA?pid=ImgDet&rs=1',
//         link: 'https://linkedin.com/in/maria',
//       },
//       {
//         name: 'Facebook',
//         icon: 'https://www.flaticon.com/free-icon/facebook_4494475?term=social+media&page=1&position=6&origin=tag&related_id=4494475',
//         link: 'https://linkedin.com/in/maria',
//       },
//     ],
//   },
//   {
//     name: 'Darren Randolph',
//     role: 'Marketing expert',
//     image: doctor2,
//     socialMedia: [
//       {
//         name: 'Facebook',
//         icon: 'https://example.com/facebook-icon.svg',
//         link: 'https://facebook.com/darren',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/darren',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://example.com/linkedin-icon.svg',
//         link: 'https://linkedin.com/in/darren',
//       },
//     ],
//   },
//   {
//     name: 'Maria Smith',
//     role: 'Frontend Developer',
//     image: doctor1,
//     socialMedia: [
//       {
//         name: 'GitHub',
//         icon: 'https://example.com/github-icon.svg',
//         link: 'https://github.com/maria',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/maria',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://th.bing.com/th/id/OIP.rHUnyNRNkBKVEK4HlTzCgQAAAA?pid=ImgDet&rs=1',
//         link: 'https://linkedin.com/in/maria',
//       },
//       {
//         name: 'Facebook',
//         icon: 'https://www.flaticon.com/free-icon/facebook_4494475?term=social+media&page=1&position=6&origin=tag&related_id=4494475',
//         link: 'https://linkedin.com/in/maria',
//       },
//     ],
//   },
//   {
//     name: 'Darren Randolph',
//     role: 'Marketing expert',
//     image: doctor2,
//     socialMedia: [
//       {
//         name: 'Facebook',
//         icon: 'https://example.com/facebook-icon.svg',
//         link: 'https://facebook.com/darren',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/darren',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://example.com/linkedin-icon.svg',
//         link: 'https://linkedin.com/in/darren',
//       },
//     ],
//   },
//   {
//     name: 'Maria Smith',
//     role: 'Frontend Developer',
//     image: doctor1,
//     socialMedia: [
//       {
//         name: 'GitHub',
//         icon: 'https://example.com/github-icon.svg',
//         link: 'https://github.com/maria',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/maria',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://th.bing.com/th/id/OIP.rHUnyNRNkBKVEK4HlTzCgQAAAA?pid=ImgDet&rs=1',
//         link: 'https://linkedin.com/in/maria',
//       },
//       {
//         name: 'Facebook',
//         icon: 'https://www.flaticon.com/free-icon/facebook_4494475?term=social+media&page=1&position=6&origin=tag&related_id=4494475',
//         link: 'https://linkedin.com/in/maria',
//       },
//     ],
//   },
//   {
//     name: 'Darren Randolph',
//     role: 'Marketing expert',
//     image: doctor2,
//     socialMedia: [
//       {
//         name: 'Facebook',
//         icon: 'https://example.com/facebook-icon.svg',
//         link: 'https://facebook.com/darren',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/darren',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://example.com/linkedin-icon.svg',
//         link: 'https://linkedin.com/in/darren',
//       },
//     ],
//   },
//   {
//     name: 'Maria Smith',
//     role: 'Frontend Developer',
//     image: doctor1,
//     socialMedia: [
//       {
//         name: 'GitHub',
//         icon: 'https://example.com/github-icon.svg',
//         link: 'https://github.com/maria',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/maria',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://th.bing.com/th/id/OIP.rHUnyNRNkBKVEK4HlTzCgQAAAA?pid=ImgDet&rs=1',
//         link: 'https://linkedin.com/in/maria',
//       },
//       {
//         name: 'Facebook',
//         icon: 'https://www.flaticon.com/free-icon/facebook_4494475?term=social+media&page=1&position=6&origin=tag&related_id=4494475',
//         link: 'https://linkedin.com/in/maria',
//       },
//     ],
//   },
//   {
//     name: 'Darren Randolph',
//     role: 'Marketing expert',
//     image: doctor2,
//     socialMedia: [
//       {
//         name: 'Facebook',
//         icon: 'https://example.com/facebook-icon.svg',
//         link: 'https://facebook.com/darren',
//       },
//       {
//         name: 'Twitter',
//         icon: 'https://example.com/twitter-icon.svg',
//         link: 'https://twitter.com/darren',
//       },
//       {
//         name: 'LinkedIn',
//         icon: 'https://example.com/linkedin-icon.svg',
//         link: 'https://linkedin.com/in/darren',
//       },
//     ],
//   },

//   // Add more team members as needed
// ];

// const Doctors = () => {
//   const navigate = useNavigate()

//   return (
//     <>

//       <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
//         <div className="container my-24 mx-auto md:px-6">
//           <section className="mb-32 text-center">


//             <div className="grid gap-x-6 gap-y-5 md:gap-y-12 md:grid-cols-3 lg:gap-x-12">
//               {teamMembers.map((member, index) => (
//                 <div key={index} className="mb-6 lg:mb-0" onClick={() => navigate("/singleMember")}>
//                   <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
//                     <div className="relative overflow-hidden bg-cover bg-no-repeat" style={{ paddingBottom: "100%" }}>
//                       <LazyLoadImage src={member.image} effect='blur' className="absolute  object-cover rounded-t-lg" width="100%" height="100%" />

//                       <a>
//                         <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed"></div>
//                       </a>
//                       <svg
//                         className="absolute text-white dark:text-neutral-700 left-0 bottom-0"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 1440 320"
//                       >
//                         {/* <path
//               fill="currentColor"
//               d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
//             ></path> */}
//                       </svg>
//                     </div>
//                     <div className="p-4">
//                       <h3 className="mb-2 text-xl font-semibold">{member.name}</h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
//                       <div className="flex justify-center mt-4 space-x-4">
//                         <div className="flex justify-end pt-5 gap-4 socials">
//                           <div className="relative overflow-hidden block footer-div cursor-pointer">
//                             <span className="block">
//                               <a target="_blank" href="https://www.linkedin.com/in/buff-goofy-164bb027a">
//                                 <FaLinkedinIn className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
//                               </a>
//                             </span>
//                           </div>
//                           <div className="relative overflow-hidden block footer-div cursor-pointer">
//                             <span className="block">
//                               <a target="_blank" href="mailto:contact@buffgoofy.com">
//                                 <i className="social-links fa-solid fa-envelope text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
//                               </a>
//                             </span>
//                           </div>
//                           <div className="relative overflow-hidden block footer-div cursor-pointer">
//                             <span className="block">
//                               <a target="_blank" href="https://www.facebook.com/profile.php?id=100093479117440">
//                                 <i className=" social-links fa-brands fa-facebook text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"></i>
//                               </a>
//                             </span>
//                           </div>
//                           <div className="relative overflow-hidden block footer-div cursor-pointer">
//                             <span className="block">
//                               <a target="_blank" href="https://twitter.com/findoutsoon">
//                                 <FiTwitter className="social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8" />
//                               </a>
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </section>
//         </div>
//       </div>

//       <div className="mt-3 flex items-center justify-center">
//         <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//           <button className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300" disabled>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-3 w-3">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
//             </svg>
//             <span>Previous</span>
//           </button>
//           <button className="relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
//             <span>Next</span>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-3 w-3">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
//             </svg>
//           </button>
//         </nav>
//       </div>
//     </>




//   )
// }

// export default Doctors

import React, { useEffect, useState } from 'react'
import Collection from '../Components/Collection'
import { Link } from 'react-router-dom'
import "../generosity/css/less/layout.less"
import "../generosity/css/less/reset.less"
import "../generosity/css/less/mixins.less"
import "../generosity/css/less/variables.less"
import "../generosity/css/venobox.css"
import "../generosity/css/animate.css"
import "../generosity/css/font-awesome.min.css"
import "../generosity/css/styles.css"
import axios from 'axios'

const Blog = () => {
  const [blog, setBlog] = useState([])
  const getBlog = async () => {
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs`);
    if (data.data.success) {
      setBlog(data.data.data)
    }
  }

  useEffect(() => {
    getBlog()
  }, [])
  return (
    <div>

      <section className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-12">

              {blog && blog?.length > 0 && blog?.map((item, index) => {
                return (
                  // <Link to={`/blog/${item.id}`}>
                    <article className="post single-post">
                      <div className="single-post-content">
                        <a title href="#">
                          <img key={index} alt src={item.image} />
                        </a>
                      </div>
                      {/* end .bd-view  */}
                      <div className="single-post-title">
                        <h2>
                          <a href="#">
                            {item.title}
                          </a>
                        </h2>
                        {/*  end blog-post-title  */}
                        <p className="single-post-meta">
                          {/* <i className="fa fa-user" />
                          &nbsp; {item.name}
                          &nbsp;<i className="fa fa-book" />
                          &nbsp;<a title="View all posts" href="#">
                            {item.category}
                          </a> */}
                          &nbsp;<i className="fa fa-calendar" />
                          &nbsp; {item.createdAt}
                        </p>
                        <p dangerouslySetInnerHTML={{ __html: item.description }}>

                        </p>
                      </div>
                      {/* end col-sm-8  */}
                    </article>
                  // </Link>
                )
              })

              }
              {/*  end blog-pagination */}
            </div>
            {/*  end col-sm-8 */}
            <div className="col-md-4 col-sm-12">
              <div className="widget site-sidebar">
                <h2 className="widget-title">Search</h2>
                <form action="index.html" id="search-form" className="search-form" role="form" method="get">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search...." />
                    <span className="input-group-addon">
                      <i className="fa fa-search" />
                    </span>
                  </div>
                  <input type="hidden" defaultValue="submit" />
                </form>
                {/* end #search-form  */}
              </div>
              {/*  end .widget */}
              <div className="widget site-sidebar">
                <h2 className="widget-title">Categories</h2>
                <ul className="widget-post-category clearfix">
                  <li>
                    <a title="View all posts filed under Environment" href="#">Child Education</a>
                    <span className="pull-right badge">42</span>
                  </li>
                  <li>
                    <a title="View all posts filed under Technology" href="#">Happy Family</a>
                    <span className="pull-right badge">40</span>
                  </li>
                  <li>
                    <a title="View all posts filed under Health" href="#">Helpless Shelter</a>
                    <span className="pull-right badge">32</span>
                  </li>
                  <li>
                    <a title="View all posts filed under Disaster" href="#">Fundraising
                    </a>
                    <span className="pull-right badge">26</span>
                  </li>
                  <li>
                    <a title="View all posts filed under Environment Right" href="#">Direct Donation</a>
                    <span className="pull-right badge">18</span>
                  </li>
                  <li>
                    <a title="View all posts filed under Education" href="#">Join Now</a>
                    <span className="pull-right badge">12</span>
                  </li>
                </ul>
              </div>
              {/*  end .widget */}
              <div className="widget site-sidebar">
                <h2 className="widget-title">Recent Posts</h2>
                <div className="single-recent-post">
                  <a href="#">Zomato Commits to Making Food Delivery</a>
                  <span>
                    <i className="fa fa-calendar" />&nbsp; April 19, 2017</span>
                </div>
                <div className="single-recent-post">
                  <a href="#">Make Kalam's House A Knowledge Centre</a>
                  <span>
                    <i className="fa fa-calendar" />&nbsp; April 18, 2017</span>
                </div>
                <div className="single-recent-post">
                  <a href="#">Central Government Retracts Proposal</a>
                  <span>
                    <i className="fa fa-calendar" />&nbsp; April 17, 2017</span>
                </div>
              </div>
              {/*  end .widget */}
              <div className="widget site-sidebar">
                <h2 className="widget-title">Tags</h2>
                <ul className="widget-recent-tags clearfix">
                  <li>
                    <a href title>
                      claycold</a>
                  </li>
                  <li>
                    <a href title>
                      crushing</a>
                  </li>
                  <li>
                    <a href title>
                      chattels</a>
                  </li>
                  <li>
                    <a href title>
                      dinarchy</a>
                  </li>
                  <li>
                    <a href title>
                      cienaga</a>
                  </li>
                  <li>
                    <a href title>
                      doolie</a>
                  </li>
                </ul>
                {/*  end .widget-recent-tags */}
              </div>
              {/*  end .widget */}
            </div>
            {/* end .col-sm-4  */}
          </div>
          {/*  end row  */}
        </div>
        {/*  end container */}
      </section>




    </div>
  )
}

export default Blog;
