// import React from 'react';

// function Footer() {
//   return (
//     <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 mt-10 border-t border-gray-100 dark:border-gray-800">
//       <div className="text-center text-sm">
//         Copyright © {/* */}2023{/* */} {/* */}Blogs{/* */}. All rights reserved.
//       </div>
//       <div className="mt-1 flex justify-center gap-1 text-center text-sm text-gray-500 dark:text-gray-600">
//         <span> Made For <a href="https://web3templates.com/?ref=stablo-template" rel="noopener" target="_blank">Donation Purpose</a></span>
//         <span>·</span>
//         <span> <a href="https://github.com/web3templates/stablo" rel="noopener" target="_blank"></a></span>
//       </div>
//       {/* <div className="mt-2 flex items-center justify-between">
//         <div className="mt-5">
//           <a href="https://vercel.com/?utm_source=web3templates&amp;utm_campaign=oss" target="_blank" rel="noopener" className="relative block w-44">
//             <img alt="Powered by Vercel" loading="lazy" width="150" height="25" decoding="async" data-nimg="1" style={{ color: "transparent" }} src="/_next/static/media/vercel.4f49caf1.svg" />
//           </a>
//         </div>

//       </div> */}

//     </div>
//   );
// }

// export default Footer;

import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div>

      <footer onClick={window.scrollTo(0, 0)}>
        <section className="footer-widget-area footer-widget-area-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="footer-widget clearfix">
                  <div className="sidebar-widget-wrapper">
                    <div className="footer-widget-header clearfix">
                      <h3>Pages</h3>
                    </div>
                    {/*  end .footer-widget-header */}
                    <ul className="footer-useful-links">
                      <li>
                        <a onClick={() => navigate('/')}>
                          <i className="fa fa-angle-double-right fa-footer" />
                          Home
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate('/about')} >
                          <i className="fa fa-angle-double-right fa-footer" />
                          About
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate('/portfolio')} >
                          <i className="fa fa-angle-double-right fa-footer" />
                          Portfolio
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate('/blog')} >
                          <i className="fa fa-angle-double-right fa-footer" />
                          Blog
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/*  end .footer-widget  */}
                </div>
                {/*  end .footer-widget  */}
              </div>
              {/*  end .col-md-3 col-sm-6 */}
              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <div className="footer-widget clearfix">
                  <div className="sidebar-widget-wrapper">
                    <div className="footer-widget-header clearfix">
                      <h3>Others</h3>
                    </div>
                    {/*  end .footer-widget-header */}
                    <ul className="footer-useful-links">
                      <li>
                        <a onClick={() => navigate('/faq')}>
                          <i className="fa fa-angle-double-right fa-footer" />
                          Faq
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate('/howitworks')} >
                          <i className="fa fa-angle-double-right fa-footer" />
                          How it works
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate('/terms&condition')}>
                          <i className="fa fa-angle-double-right fa-footer" />
                          Terms and condition
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate('/privacyPolicy')}>
                          <i className="fa fa-angle-double-right fa-footer" />
                          Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                  {/*  end .footer-widget  */}
                </div>
                {/*  end .footer-widget  */}
              </div>
              {/*  end .col-md-4 col-sm-12 */}
              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <div className="footer-widget clearfix">
                  <div className="sidebar-widget-wrapper">
                    <div className="footer-widget-header clearfix">
                      <h3>Contact</h3>
                    </div>
                    {/*  end .footer-widget-header */}
                    <ul className="footer-useful-links">
                      <li>
                        <a onClick={() => navigate('/contact')}>
                          <i className="fa fa-angle-double-right fa-footer" />
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate('/Donation')}>
                          <i className="fa fa-angle-double-right fa-footer" />
                          Donate Now
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/*  end .footer-widget  */}
                </div>
                {/*  end .footer-widget  */}
              </div>
              {/*  end .col-md-4 col-sm-12 */}
              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <div className="footer-widget">
                  <div className="sidebar-widget-wrapper">
                    <div className="footer-widget-header clearfix">
                      <h3>Donate Here</h3>
                    </div>
                    {/*  end .footer-widget-header */}
                    <img src="./Scanner.jpg" alt="" />
                  </div>
                  {/*  end .footer-widget  */}
                </div>
                {/*  end .footer-widget  */}
              </div>
              {/*  end .col-md-4 col-sm-12 */}
            </div>
            {/* end row  */}
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="footer-widget">
                  <div className="sidebar-widget-wrapper">
                    <div className="textwidget contact-us">
                      <span className="fa fa-location-arrow" />
                      <p>
                        4-H-9, Indira Gandhi Nagar
                        Jagatpura, Jaipur

                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="footer-widget">
                  <div className="sidebar-widget-wrapper">
                    <div className="textwidget contact-us">
                      <span className="fa fa-envelope-o" />
                      <p>
                        <a >support  msntrust2023@gmail.com</a>

                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="footer-widget">
                  <div className="sidebar-widget-wrapper">
                    <div className="textwidget contact-us">
                      <span className="fa fa-phone" />
                      <p>
                        Phone <br />
                        +91-11- 2981812
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="footer-widget">
                  <div className="sidebar-widget-wrapper">
                    <div className="textwidget contact-us">
                      <span className="fa fa-mail-forward" />
                      <p>
                        Spreads The Words
                        <br />
                        <a className="footer-social-icon">
                          <span className="fa fa-facebook icon" />
                        </a>
                        <a className="footer-social-icon">
                          <span className="fa fa-twitter icon" />
                        </a>
                        <a className="footer-social-icon">
                          <span className="fa fa-pinterest icon" />
                        </a>
                        <a className="footer-social-icon">
                          <span className="fa fa-linkedin icon" />
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end .container  */}
        </section>
        {/*  end .footer-widget-area  */}
        {/*FOOTER CONTENT  */}
        <section className="footer-contents">
          <div className="container">
            <div className="row clearfix">
              <div className="col-md-12 col-sm-12 text-center">
                <p className="copyright-text">
                  Copyright © 2024. All right reserved by
                  <a href="https://metablocktechnologies.in/" target="_blank" className="color-primary"> MetaBlock Technologies</a>
                </p>
              </div>
              {/* end .col-sm-6  */}
            </div>
            {/* end .row  */}
          </div>
          {/*  end .container  */}
        </section>
        {/*  end .footer-content  */}
      </footer>





    </div>
  )
}

export default Footer

