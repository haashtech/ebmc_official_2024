import { Link } from "react-router-dom";

import React from "react";

function Footer() {
  return (
    <>
      <div className="cta5-section-area section-padding4">
        <img
          src="assets/images/elementor/elementor72.png"
          alt=""
          className="elementors72"
        />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="cta5-auhtor6-area">
                <h1 className="font-ks font-48 lineh-52 color weight-600 margin-b text-capitalize">
                  Optimize investments with tailored tax and business management
                  strategies for financial success.
                </h1>
                <p className="font-ks font-16 lineh-26 weight-500 color-21">
                  Informed clients make better financial decisions. Our service
                  includes educational resources and workshops for your benefit.
                </p>
              </div>
            </div>
            <div className="col-lg-2" />
            <div className="col-lg-4">
              <div className="cta5-btn5-sexction">
                <a
                  rel="noreferrer"
                  href="https://wa.link/o4ztme"
                  target="_blank"
                  className="theme6-btn6 bakgrnd5 font-ks lineh-16 weight-700 color font-16"
                >
                  Shedule a Consultation{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right" />
                  </span>
                </a>

                <Link
                  to="/contact"
                  className="theme6-btn6 backgrnd6 font-ks lineh-16 weight-700 color-29 font-16"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
        <img
          src="assets/images/elementor/elementor72.png"
          alt=""
          className="elementors73"
        />
      </div>

      <div className="footer5-section5-area5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-all-padding section-padding5">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="footer-logo2">
                      <img
                        style={{ height: 56 }}
                        src="assets/images/logo/Eth.svg"
                        alt=""
                      />
                      <p className="font-16 lineh-26  weight-400 font-outfit margin-b24 margin-t">
                        EBMC (Etihad Business and Management Consultancy LLC) is
                        a leading professional services firm offering expertise
                        in Accounting, Auditing, Taxation, and AML Compliance.
                        Guided by core values, EBMC's seasoned professionals
                        tailor solutions to meet unique business needs, ensuring
                        excellence and client success.
                      </p>
                      <div className="social2-links homelist">
                        <ul>
                          <li style={{ marginRight: '10px' }}>
                            <a href="https://www.facebook.com/eatcuae?mibextid=hu50Ix" target="_blank" rel="noopener noreferrer">
                              <i className="fa-brands fa-facebook-f" />
                            </a>
                          </li>
                          <li style={{ marginRight: '10px' }}>
                            <a href="https://www.instagram.com/ebmc.ae" target="_blank" rel="noopener noreferrer">
                              
                              <i className="fa-brands fa-instagram" />
                            </a>
                          </li>
                          <li style={{ marginRight: '10px' }}>
                            <a
                              href="https://www.linkedin.com/company/etihad-accounting-and-tax-consultancy/" target="_blank" rel="noopener noreferrer"
                              className="ml1"
                            >
                              <i className="fa-brands fa-linkedin-in" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-6">
                    <div className="our-service-area">
                      <h1
                        style={{ color: "black" }}
                        className="font-20 color-21 lineh-20 font-outfit margin-b24 weight-600"
                      >
                        Our services
                      </h1>
                      <div className="servicefooter-list">
                        <ul>
                          <li>
                            <Link
                              to="/services"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              Corporate Tax Services
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/aml"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              AML/CFT Services
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/services"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              Vat Registration &amp; Filling
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/services"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              Financial Statement
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/services"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              Internal Auditing
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/services"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              Staff Training Month-End Close Out
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/services"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              Financial Analysis
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1" />
                  <div className="col-lg-2 col-md-6">
                    <div className="our-service-area">
                      <h1 className="font-20 color-21 lineh-20 font-outfit margin-b24 weight-600 footerlist">
                        Useful Links
                      </h1>
                      <div className="servicefooter-list ">
                        <ul>
                          <li>
                            <Link
                              to="/"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              {" "}
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/about"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              {" "}
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/services"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              services{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/news"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              {" "}
                              Newsletter
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/career"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              {" "}
                              Career
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/contact"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              {" "}
                              FAQ's
                            </Link>
                          </li>
                          <li>
                            <a
                              href="/admin"
                              className="font-outfit font-16 color-21 lineh-16 weight-400 margin-t d-inline-block footerlist"
                            >
                              {" "}
                              Admin
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="contact-footer">
                      <h1 className="font-20 color-21 lineh-20 font-outfit margin-b24 weight-600 footerlist">
                        Contact Us
                      </h1>
                      <div className="email4">
                        <img src="assets/images/icons/email4.svg" alt="" />
                        <a
                          href="mailto:info@ebmc.ae"
                          className="font-16 lineh-24 color-21 weight-400 font-outfit footerlist"
                        >
                          info@ebmc.ae
                        </a>
                      </div>

                      <div className="email4 margin-t">
  <img src="assets/images/icons/location3.svg" alt="" />
  <a href="https://www.google.com/maps/search/?q=Horizon Towers,Block-D Al Rashidiya 1, Ajman, UAE" 
     target="_blank"
     rel="noopener noreferrer"
     className="font-16 lineh-24 color-21 weight-400 font-outfit footerlist">
    Office:603, -D Block -Horizon Towers, Al Rashidiya 1, Ajman, UAE
  </a>
</div>

                      <div className="email4 margin-t">
                        <img src="assets/images/icons/phone5.svg" alt="" />
                        <a href="tel: +97165292913"
                         
                          className="font-16 lineh-24 color-21 weight-400 font-outfit footerlist"
                        >
                          +97165292913
                        </a>{" "}
                        <br />
                        <a
                          href="tel:+971562424776 "
                          className="font-16 lineh-24 color-21 weight-400 font-outfit footerlist"
                        >
                          +971562424776
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-10" />
            <div className="copyright">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="copyright1">
                    <p className="font-outfit font-16 lineh-26 weight-400 ">
                      © 2024 Etihad Business and Managment Consultancy LLC. All
                      Rights Reserved Designed with ❤️{" "}
                     
                      <span className="Hashtechnologies">&lt;&gt;</span> <span className="Hashtechnologies"> HAASH.TECH</span> <span className="Hashtechnologies" >&lt;/&gt;</span>

                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="assets/images/elementor/elementor35.png"
          alt=""
          className="elementors4"
        />
      </div>
    </>
  );
}

export default Footer;
