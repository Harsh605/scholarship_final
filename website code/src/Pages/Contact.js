// import React from 'react'

// const Contact = () => {
//   return (
//     <>
//     <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
//       <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">Contact</h1>
//       <div className="text-center">
//         <p className="text-lg">We are here to help.</p>
//       </div>
//       <div className="grid my-10 md:grid-cols-2">
//         <div className="my-10">
//           <h2 className="text-2xl font-semibold dark:text-white">Contact Blog</h2>
//           <p className="max-w-sm mt-5">Have something to say? We are here to help. Fill up the form or send an email or call.</p>
//           <div className="mt-5">
//             <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
//               </svg>
//               <span>1734 San Francisco, CA 12345</span>
//             </div>
//             <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
//               </svg>
//               <a href="mailto:hello@stablotemplate.com">hello@Demo.com</a>
//             </div>
//             <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path>
//               </svg>
//               <a href="tel:+1 (987) 4587 899">+1 (988) 4687 899</a>
//             </div>
//           </div>
//         </div>
//         <div>
//           <form className="my-10">
//             <input type="checkbox" id="" className="hidden" name="botcheck" style={{ display: 'none' }} />
//             <div className="mb-5">
//               <input type="text" placeholder="Full Name" autoComplete="off" className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0" name="name" />
//             </div>
//             <div className="mb-5">
//               <label htmlFor="email_address" className="sr-only">Email Address</label>
//               <input id="email_address" type="email" placeholder="Email Address" name="email" autoComplete="off" className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0" />
//             </div>
//             <div className="mb-3">
//               <textarea name="message" placeholder="Your Message" className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900 rounded-md outline-none h-36 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"></textarea>
//             </div>
//             <button type="submit" className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black">Send Message</button>
//           </form>
//         </div>
//       </div>
//     </div>
//     </>
    

//   );
// }

// export default Contact;

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
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate("")
  const states = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  const Countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  return (
    <div>

      <section className="page-header" data-stellar-background-ratio="0.1" style={{ backgroundPosition: '50% 50%' }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h3>
                Contact
              </h3>
              <p className="page-breadcrumb">
                <a href="#">Home</a>
                /
                <a href="#">Contact</a>

              </p>
            </div>
          </div>
          {/* end .row  */}
        </div>
        {/* end .container  */}
      </section>


      <section className="section-content-block section-contact-block">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 wow fadeInLeft animated" style={{ visibility: 'visible', animationName: 'fadeInLeft' }}>
              <div className="contact-form-block">
                <h2 className="contact-title">Say hello to us</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                </p>
                <form role="form" action="#" method="post" id="contact-form">
                  <div className="form-group">
                    <input type="text" className="form-control" id="user_name" name="user_name" placeholder="Name" data-msg="Please Write Your Name" />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="user_aadhar" name="user_aadhar" placeholder="Aadhar Number" data-msg="Please Write Your Aadhar Number" />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" id="user_email" name="user_email" placeholder="Email" data-msg="Please Write Your Valid Email" />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="user_phone" name="user_phone" placeholder="Phone Number" data-msg="Please Write Your Valid Phone Number" />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="user_Address" name="user_Address" placeholder="Street" data-msg="Please Write Your Address" />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="user_Address" name="user_Address" placeholder="City" data-msg="Please Write Your Address" />
                  </div>
                  <div className="form-group">
                    <select className="form-control" id="user_phone" name="user_phone" placeholder="Phone Number" data-msg="Please Write Your State">
                      <option value="">Select State</option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      type="text"
                      className="form-control"
                      id="user_Country"
                      name="user_Country"
                      placeholder="Country"
                      data-msg="Please Write Your Country"
                    >
                      <option value="">Select Country</option>
                      {Countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="user_pin" name="user_pin" placeholder="Pin Code" data-msg="Please Write Your Valid Pin Code" />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="user_ip" name="user_ip" placeholder="IP Address" data-msg="Please Write Your IP Address" />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-custom">Send Now</button>
                  </div>
                </form>
              </div>
              {/* end .contact-form-block  */}
            </div>
            {/*  end col-sm-6  */}
            <div className="col-sm-6 wow fadeInRight animated" style={{ visibility: 'visible', animationName: 'fadeInRight' }}>
              <div className="col-md-12">
                <h2 className="contact-title">Contact us</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                </p>
              </div>
              <div className="col-md-12">
                <ul className="contact-info">
                  <li>
                    <span className="icon-container">
                      <i className="fa fa-home" />
                    </span>
                    <address>4-H-9, Indira Gandhi Nagar Jagatpura, Jaipur</address>
                  </li>
                  <li>
                    <span className="icon-container">
                      <i className="fa fa-phone" />
                    </span>
                    <address>
                      <a href="#">+91-11- 2981812</a>
                    </address>
                  </li>
                  <li>
                    <span className="icon-container">
                      <i className="fa fa-envelope" />
                    </span>
                    <address>
                      <a href="mailto:">msntrust2023@gmail.com</a>
                    </address>
                  </li>
                  <li>


                  </li>
                </ul>
              </div>
            </div>

            {/*  end col-sm-6  */}
          </div>
          {/* end row  */}
        </div>
        {/*  end .container */}
      </section>




    </div>
  )
}

export default Contact

