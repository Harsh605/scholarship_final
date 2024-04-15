import React from 'react';
// import "../component/Header.css";
// import "../generosity/css/less/layout.less"
// import "../generosity/css/less/reset.less"
// import "../generosity/css/less/mixins.less"
// import "../generosity/css/less/variables.less"
// import "../generosity/css/venobox.css"
// import "../generosity/css/animate.css"
// import "../generosity/css/font-awesome.min.css"
// import "../generosity/css/styles.css"



const Donation = () => {
    return (
        <div>

            <section className="page-header" data-stellar-background-ratio="0.1" style={{ backgroundPosition: '50% 50%' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <h3>
                                Donation
                            </h3>
                            <p className="page-breadcrumb">
                                <a href="#">Home</a>
                                /
                                <a href="#">donation</a>

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
                        <div className="col-sm-12">
                            <div className="donation-form-wrapper">
                                <form action="#" method="post" name="donation_form" className="donation_form " id="donation_form">
                                    <div className="donation-form-info-1 scanner-donation">
                                        <div>
                                            <h4>Donation Information</h4>
                                            <p>I would like to make a donation in the amount of:</p>
                                            <label className="radio-inline">
                                                <input type="radio" defaultValue={1000} id="amount_1" name="inlineRadioOptions" />
                                                $1,000
                                            </label>
                                            <label className="radio-inline">
                                                <input type="radio" defaultValue={500} id="amount_2" name="inlineRadioOptions" />
                                                $500
                                            </label>
                                            <label className="radio-inline">
                                                <input type="radio" defaultValue={100} id="amount_3" name="inlineRadioOptions" />
                                                $100
                                            </label>
                                            <label className="radio-inline">
                                                <input type="radio" defaultValue={50} id="amount_4" name="inlineRadioOptions" />
                                                $50
                                            </label>
                                            <div className="radio">
                                                <label>
                                                    <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                                                    Other:
                                                    <input style={{ marginLeft: "10px" }} placeholder='Other Amount' type="text" name="other_amount" />
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <img style={{ width: '300px' }} src="/Scanner.jpg" alt="" />
                                        </div>
                                    </div>
                                    {/* end .donation-form-info-1  */}
                                    <div className="donation-form-info-2">
                                        <h4>Donor Information</h4>
                                        <div className="form-group">
                                            <label htmlFor="first_name" className="col-sm-2 control-label">First Name:
                                            </label>
                                            <div className="col-md-6 col-sm-10">
                                                <input placeholder='First Name' type="text" className="form-control" id="first_name" name="first_name" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="last_name" className="col-sm-2 control-label">Last Name:
                                            </label>
                                            <div className="col-md-6 col-sm-10">
                                                <input placeholder='Last Name' type="text" className="form-control" id="last_name" name="last_name" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="address" className="col-sm-2 control-label">Address:
                                            </label>
                                            <div className="col-md-6 col-sm-10">
                                                <input placeholder='Address...' type="text" className="form-control" id="address" name="address" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="city" className="col-sm-2 control-label">City:
                                            </label>
                                            <div className="col-md-6 col-sm-10">
                                                <input placeholder=' Enter City' type="text" className="form-control" id="city" name="city" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="state" className="col-sm-2 control-label">State:
                                            </label>
                                            <div className="col-md-6 col-sm-10">
                                                <input placeholder='State' type="text" className="form-control" id="state" name="state" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="country" className="col-sm-2 control-label">Country:
                                            </label>
                                            <div className="col-sm-10">
                                                <select id="country" name="country">
                                                    <option selected="selected" value>Your country</option>
                                                    <option value="afghanistan">Afghanistan</option>
                                                    <option value="albania">Albania</option>
                                                    <option value="algeria">Algeria</option>
                                                    <option value="american samoa">American Samoa</option>
                                                    <option value="andorra">Andorra</option>
                                                    <option value="angola">Angola</option>
                                                    <option value="anguilla">Anguilla</option>
                                                    <option value="antarctica">Antarctica</option>
                                                    <option value="antigua and barbuda">Antigua and Barbuda</option>
                                                    <option value="argentina">Argentina</option>
                                                    <option value="armenia">Armenia</option>
                                                    <option value="aruba">Aruba</option>
                                                    <option value="australia">Australia</option>
                                                    <option value="austria">Austria</option>
                                                    <option value="azerbaijan">Azerbaijan</option>
                                                    <option value="bahamas">Bahamas</option>
                                                    <option value="bahrain">Bahrain</option>
                                                    <option value="bangladesh">Bangladesh</option>
                                                    <option value="barbados">Barbados</option>
                                                    <option value="belarus">Belarus</option>
                                                    <option value="belgium">Belgium</option>
                                                    <option value="belize">Belize</option>
                                                    <option value="benin">Benin</option>
                                                    <option value="bermuda">Bermuda</option>
                                                    <option value="bhutan">Bhutan</option>
                                                    <option value="bolivia">Bolivia</option>
                                                    <option value="bosnia and herzegowina">Bosnia and Herzegowina</option>
                                                    <option value="botswana">Botswana</option>
                                                    <option value="bouvet island">Bouvet Island</option>
                                                    <option value="brazil">Brazil</option>
                                                    <option value="british indian ocean territory">British Indian Ocean Territory</option>
                                                    <option value="brunei darussalam">Brunei Darussalam</option>
                                                    <option value="bulgaria">Bulgaria</option>
                                                    <option value="burkina faso">Burkina Faso</option>
                                                    <option value="burundi">Burundi</option>
                                                    <option value="cambodia">Cambodia</option>
                                                    <option value="cameroon">Cameroon</option>
                                                    <option value="canada">Canada</option>
                                                    <option value="cape verde">Cape Verde</option>
                                                    <option value="cayman islands">Cayman Islands</option>
                                                    <option value="central african republic">Central African Republic</option>
                                                    <option value="chad">Chad</option>
                                                    <option value="chile">Chile</option>
                                                    <option value="china">China</option>
                                                    <option value="christmas island">Christmas Island</option>
                                                    <option value="cocos (keeling) islands">Cocos (Keeling) Islands</option>
                                                    <option value="colombia">Colombia</option>
                                                    <option value="comoros">Comoros</option>
                                                    <option value="congo">Congo</option>
                                                    <option value="congo, the democratic republic of the">Congo, the Democratic Republic of the</option>
                                                    <option value="cook islands">Cook Islands</option>
                                                    <option value="costa rica">Costa Rica</option>
                                                    <option value="cote d'ivoire">Cote d'Ivoire</option>
                                                    <option value="croatia (hrvatska)">Croatia (Hrvatska)</option>
                                                    <option value="cuba">Cuba</option>
                                                    <option value="cyprus">Cyprus</option>
                                                    <option value="czech republic">Czech Republic</option>
                                                    <option value="denmark">Denmark</option>
                                                    <option value="djibouti">Djibouti</option>
                                                    <option value="dominica">Dominica</option>
                                                    <option value="dominican republic">Dominican Republic</option>
                                                    <option value="east timor">East Timor</option>
                                                    <option value="ecuador">Ecuador</option>
                                                    <option value="egypt">Egypt</option>
                                                    <option value="el salvador">El Salvador</option>
                                                    <option value="equatorial guinea">Equatorial Guinea</option>
                                                    <option value="eritrea">Eritrea</option>
                                                    <option value="estonia">Estonia</option>
                                                    <option value="ethiopia">Ethiopia</option>
                                                    <option value="falkland islands (malvinas)">Falkland Islands (Malvinas)</option>
                                                    <option value="faroe islands">Faroe Islands</option>
                                                    <option value="fiji">Fiji</option>
                                                    <option value="finland">Finland</option>
                                                    <option value="france">France</option>
                                                    <option value="france metropolitan">France Metropolitan</option>
                                                    <option value="french guiana">French Guiana</option>
                                                    <option value="french polynesia">French Polynesia</option>
                                                    <option value="french southern territories">French Southern Territories</option>
                                                    <option value="gabon">Gabon</option>
                                                    <option value="gambia">Gambia</option>
                                                    <option value="georgia">Georgia</option>
                                                    <option value="germany">Germany</option>
                                                    <option value="ghana">Ghana</option>
                                                    <option value="gibraltar">Gibraltar</option>
                                                    <option value="greece">Greece</option>
                                                    <option value="greenland">Greenland</option>
                                                    <option value="grenada">Grenada</option>
                                                    <option value="guadeloupe">Guadeloupe</option>
                                                    <option value="guam">Guam</option>
                                                    <option value="guatemala">Guatemala</option>
                                                    <option value="guinea">Guinea</option>
                                                    <option value="guinea-bissau">Guinea-Bissau</option>
                                                    <option value="guyana">Guyana</option>
                                                    <option value="haiti">Haiti</option>
                                                    <option value="heard and mc donald islands">Heard and Mc Donald Islands</option>
                                                    <option value="holy see (vatican city state)">Holy See (Vatican City State)</option>
                                                    <option value="honduras">Honduras</option>
                                                    <option value="hong kong">Hong Kong</option>
                                                    <option value="hungary">Hungary</option>
                                                    <option value="iceland">Iceland</option>
                                                    <option value="india">India</option>
                                                    <option value="indonesia">Indonesia</option>
                                                    <option value="iran (islamic republic of)">Iran (Islamic Republic of)</option>
                                                    <option value="iraq">Iraq</option>
                                                    <option value="ireland">Ireland</option>
                                                    <option value="israel">Israel</option>
                                                    <option value="italy">Italy</option>
                                                    <option value="jamaica">Jamaica</option>
                                                    <option value="japan">Japan</option>
                                                    <option value="jordan">Jordan</option>
                                                    <option value="kazakhstan">Kazakhstan</option>
                                                    <option value="kenya">Kenya</option>
                                                    <option value="kiribati">Kiribati</option>
                                                    <option value="korea, democratic people's republic of">Korea, Democratic People's Republic of</option>
                                                    <option value="korea, republic of">Korea, Republic of</option>
                                                    <option value="kuwait">Kuwait</option>
                                                    <option value="kyrgyzstan">Kyrgyzstan</option>
                                                    <option value="lao, people's democratic republic">Lao, People's Democratic Republic</option>
                                                    <option value="latvia">Latvia</option>
                                                    <option value="lebanon">Lebanon</option>
                                                    <option value="lesotho">Lesotho</option>
                                                    <option value="liberia">Liberia</option>
                                                    <option value="libyan arab jamahiriya">Libyan Arab Jamahiriya</option>
                                                    <option value="liechtenstein">Liechtenstein</option>
                                                    <option value="lithuania">Lithuania</option>
                                                    <option value="luxembourg">Luxembourg</option>
                                                    <option value="macau">Macau</option>
                                                    <option value="macedonia, the former yugoslav republic of">Macedonia, The Former Yugoslav Republic of</option>
                                                    <option value="madagascar">Madagascar</option>
                                                    <option value="malawi">Malawi</option>
                                                    <option value="malaysia">Malaysia</option>
                                                    <option value="maldives">Maldives</option>
                                                    <option value="mali">Mali</option>
                                                    <option value="malta">Malta</option>
                                                    <option value="marshall islands">Marshall Islands</option>
                                                    <option value="martinique">Martinique</option>
                                                    <option value="mauritania">Mauritania</option>
                                                    <option value="mauritius">Mauritius</option>
                                                    <option value="mayotte">Mayotte</option>
                                                    <option value="mexico">Mexico</option>
                                                    <option value="micronesia, federated states of">Micronesia, Federated States of</option>
                                                    <option value="moldova, republic of">Moldova, Republic of</option>
                                                    <option value="monaco">Monaco</option>
                                                    <option value="mongolia">Mongolia</option>
                                                    <option value="montserrat">Montserrat</option>
                                                    <option value="morocco">Morocco</option>
                                                    <option value="mozambique">Mozambique</option>
                                                    <option value="myanmar">Myanmar</option>
                                                    <option value="namibia">Namibia</option>
                                                    <option value="nauru">Nauru</option>
                                                    <option value="nepal">Nepal</option>
                                                    <option value="netherlands">Netherlands</option>
                                                    <option value="netherlands antilles">Netherlands Antilles</option>
                                                    <option value="new caledonia">New Caledonia</option>
                                                    <option value="new zealand">New Zealand</option>
                                                    <option value="nicaragua">Nicaragua</option>
                                                    <option value="niger">Niger</option>
                                                    <option value="nigeria">Nigeria</option>
                                                    <option value="niue">Niue</option>
                                                    <option value="norfolk island">Norfolk Island</option>
                                                    <option value="northern mariana islands">Northern Mariana Islands</option>
                                                    <option value="norway">Norway</option>
                                                    <option value="oman">Oman</option>
                                                    <option value="pakistan">Pakistan</option>
                                                    <option value="palau">Palau</option>
                                                    <option value="panama">Panama</option>
                                                    <option value="papua new guinea">Papua New Guinea</option>
                                                    <option value="paraguay">Paraguay</option>
                                                    <option value="peru">Peru</option>
                                                    <option value="philippines">Philippines</option>
                                                    <option value="pitcairn">Pitcairn</option>
                                                    <option value="poland">Poland</option>
                                                    <option value="portugal">Portugal</option>
                                                    <option value="puerto rico">Puerto Rico</option>
                                                    <option value="qatar">Qatar</option>
                                                    <option value="reunion">Reunion</option>
                                                    <option value="romania">Romania</option>
                                                    <option value="russian federation">Russian Federation</option>
                                                    <option value="rwanda">Rwanda</option>
                                                    <option value="saint kitts and nevis">Saint Kitts and Nevis</option>
                                                    <option value="saint lucia">Saint Lucia</option>
                                                    <option value="saint vincent and the grenadines">Saint Vincent and the Grenadines</option>
                                                    <option value="samoa">Samoa</option>
                                                    <option value="san marino">San Marino</option>
                                                    <option value="sao tome and principe">Sao Tome and Principe</option>
                                                    <option value="saudi arabia">Saudi Arabia</option>
                                                    <option value="senegal">Senegal</option>
                                                    <option value="seychelles">Seychelles</option>
                                                    <option value="sierra leone">Sierra Leone</option>
                                                    <option value="singapore">Singapore</option>
                                                    <option value="slovakia (slovak republic)">Slovakia (Slovak Republic)</option>
                                                    <option value="slovenia">Slovenia</option>
                                                    <option value="solomon islands">Solomon Islands</option>
                                                    <option value="somalia">Somalia</option>
                                                    <option value="south africa">South Africa</option>
                                                    <option value="south georgia and the south sandwich islands">South Georgia and the South Sandwich Islands</option>
                                                    <option value="spain">Spain</option>
                                                    <option value="sri lanka">Sri Lanka</option>
                                                    <option value="st. helena">St. Helena</option>
                                                    <option value="st. pierre and miquelon">St. Pierre and Miquelon</option>
                                                    <option value="sudan">Sudan</option>
                                                    <option value="suriname">Suriname</option>
                                                    <option value="svalbard and jan mayen islands">Svalbard and Jan Mayen Islands</option>
                                                    <option value="swaziland">Swaziland</option>
                                                    <option value="sweden">Sweden</option>
                                                    <option value="switzerland">Switzerland</option>
                                                    <option value="syrian arab republic">Syrian Arab Republic</option>
                                                    <option value="taiwan, province of china">Taiwan, Province of China</option>
                                                    <option value="tajikistan">Tajikistan</option>
                                                    <option value="tanzania, united republic of">Tanzania, United Republic of</option>
                                                    <option value="thailand">Thailand</option>
                                                    <option value="togo">Togo</option>
                                                    <option value="tokelau">Tokelau</option>
                                                    <option value="tonga">Tonga</option>
                                                    <option value="trinidad and tobago">Trinidad and Tobago</option>
                                                    <option value="tunisia">Tunisia</option>
                                                    <option value="turkey">Turkey</option>
                                                    <option value="turkmenistan">Turkmenistan</option>
                                                    <option value="turks and caicos islands">Turks and Caicos Islands</option>
                                                    <option value="tuvalu">Tuvalu</option>
                                                    <option value="uganda">Uganda</option>
                                                    <option value="ukraine">Ukraine</option>
                                                    <option value="united arab emirates">United Arab Emirates</option>
                                                    <option value="united kingdom">United Kingdom</option>
                                                    <option value="united states">United States</option>
                                                    <option value="united states minor outlying islands">United States Minor Outlying Islands</option>
                                                    <option value="uruguay">Uruguay</option>
                                                    <option value="uzbekistan">Uzbekistan</option>
                                                    <option value="vanuatu">Vanuatu</option>
                                                    <option value="venezuela">Venezuela</option>
                                                    <option value="vietnam">Vietnam</option>
                                                    <option value="virgin islands (british)">Virgin Islands (British)</option>
                                                    <option value="virgin islands (u.s.)">Virgin Islands (U.S.)</option>
                                                    <option value="wallis and futuna islands">Wallis and Futuna Islands</option>
                                                    <option value="western sahara">Western Sahara</option>
                                                    <option value="yemen">Yemen</option>
                                                    <option value="yugoslavia">Yugoslavia</option>
                                                    <option value="zambia">Zambia</option>
                                                    <option value="zimbabwe">Zimbabwe</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="country" className="col-sm-2 control-label">Payment By:
                                            </label>
                                            <div className="col-sm-10">
                                                <select id="country" name="country">
                                                    <option selected="selected" value>Payment Method</option>
                                                    <option>UPI</option>
                                                    <option>Bank Account</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" defaultValue name="hide_name" />
                                                Please do not publish my name. I would like to remain anonymous.
                                            </label>
                                        </div>
                                    </div>
                                    {/* end .donation-form-info-2  */}
                                    <div className="donation-form-info-2">
                                        <input type="submit" name="donate_now" defaultValue="Donate Now" className="btn btn-danger btn-lg btn-submit-donation" />
                                    </div>
                                    {/* end .donation-form-info-4   */}
                                </form>
                            </div>
                            {/*  end .donation-form-wrapper */}
                        </div>
                        {/*  end col-sm-12  */}
                    </div>
                    {/* end row  */}
                </div>
                {/*  end container */}
            </section>




            <section className="section-content-block section-secondary-bg">
                <div className="container">
                    <div className="row section-heading-wrapper">
                        <div className="col-md-12 col-sm-12 text-center">
                            <h2>Our Sponsors</h2>
                            <h4>The tender loving care of human beings will never become obsolete.</h4>
                        </div>
                        {/* end .col-sm-10  */}
                    </div>
                    {/* end .row  */}
                    <div className="row">
                        <div className="logo-items-1 logo-layout-1 owl-carousel">
                            <div className="client-logo">
                                <img src="images/logo_1.jpg" alt />
                            </div>
                            <div className="client-logo">
                                <img src="images/logo_2.jpg" alt />
                            </div>
                            <div className="client-logo">
                                <img src="images/logo_3.jpg" alt />
                            </div>
                            <div className="client-logo">
                                <img src="images/logo_4.jpg" alt />
                            </div>
                            <div className="client-logo">
                                <img src="images/logo_5.jpg" alt />
                            </div>
                            <div className="client-logo">
                                <img src="images/logo_6.jpg" alt />
                            </div>
                            <div className="client-logo">
                                <img src="images/logo_7.jpg" alt />
                            </div>
                            <div className="client-logo">
                                <img src="images/logo_8.jpg" alt />
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

export default Donation
