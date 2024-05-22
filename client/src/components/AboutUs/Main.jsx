import React from "react";
import { Link } from "react-router-dom";

function Main() {
  const email = "habeeb@ebmc.ae";

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <>
      <div className="about3-section-area section-padding5" >
        <div className="container" style={{marginTop:'70px'}}>
          <div className="row ">
            <div className="col-lg-6">
              <div className="about3-images1">
                <img
                  id="building"
                  src="/assets/images/sectionimg/building.webp"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about3-textarea1">
                <span className="about3span font-ks lineh-16 font-16 weight-600 color-29 d-inline-block margin-b24">
                  About Us
                </span>
                <h1
                  style={{ fontFamily: '"Lexend Deca", sans-serif' }}
                  className="font-lora font-48 lineh-56 weight-600 color-29 margin-b20"
                >
                  SHORT STORY ABOUT OUR COMPANY
                </h1>
                <p style={{ textAlign: "justify" }}>
                  Welcome to Etihad Business and Management Consultancy LLC
                  (EBMC), where a dynamic team of seasoned professionals is
                  dedicated to delivering unparalleled excellence in a
                  comprehensive range of professional services. Our commitment
                  spans diverse fields, including Accounting, Bookkeeping,
                  Auditing, Feasibility Studies, Taxation, AML Compliance, and
                  Screening Services. At EBMC, we pride ourselves on efficiently
                  understanding the unique needs of our clients.
                </p>
                <br />
                <p style={{ textAlign: "justify" }}>
                  Our foundation is built upon a set of core values encapsulated
                  in our eight pillars of success: quality, honesty, integrity,
                  openness, availability, reliability, responsiveness, and
                  pro-activeness. These pillars serve as the guiding principles
                  that underscore every facet of our service delivery, ensuring
                  that each client receives value-added services of the highest
                  caliber.
                </p>
                <span id="dots">
                  <br />
                </span>
                <span id="more">
                  <br />
                  <p style={{ textAlign: "justify" }}>
                    {" "}
                    What sets EBMC apart is our team of talented and
                    professionally qualified individuals. Our roster includes
                    highly experienced accountants, auditors, and consultants
                    who bring a wealth of expertise to every client engagement.
                    Committed to staying abreast of industry best practices and
                    regulatory changes, our team is well-equipped to navigate
                    the complexities of modern business environments.
                  </p>
                  <br />
                  <p style={{ textAlign: "justify" }}>
                    {" "}
                    Whether you seek meticulous financial management, rigorous
                    auditing, strategic tax planning, or expert AML compliance,
                    EBMC stands as your trusted partner. Our professionals
                    leverage their skills and knowledge to tailor solutions that
                    meet the unique requirements of your business.
                  </p>
                  <br />
                  <p style={{ textAlign: "justify" }}>
                    {" "}
                    As you explore the world of EBMC, rest assured that our
                    focus on quality, precision, and client-centric service
                    remains unwavering. Join us on a journey of success, where
                    your business objectives become our mission, and together,
                    we forge a path towards prosperity.
                  </p>
                </span>

                <div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 box-margin">
                      <div className=" text-center margin-b20 margin-t32">
                        <div className="4-boxarea4 box1">
                          <h1
                            style={{ fontFamily: '"Lexend Deca", sans-serif' }}
                            className=" font-40 lineh-40 color-29 margin-b weight-500"
                          >
                            <span className="">100</span>%
                          </h1>
                          <p className="font-ks font-16 lineh-40 weight-500 color-30 ">
                            Vat Registration
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 box-margin">
                      <div className=" text-center margin-b20 margin-t32">
                        <div className="4-boxarea4 box1">
                          <h1
                            style={{ fontFamily: '"Lexend Deca", sans-serif' }}
                            className=" font-40 lineh-40 color-29 margin-b weight-500"
                          >
                            <span className="">100</span>%
                          </h1>
                          <p className="font-ks font-16 lineh-40 weight-500 color-30 ">
                            E-Filling
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 box-margin">
                      <div className=" text-center margin-b20 margin-t32">
                        <div className="4-boxarea4 box1">
                          <h1
                            style={{ fontFamily: '"Lexend Deca", sans-serif' }}
                            className=" font-40 lineh-40 color-29 margin-b weight-500"
                          >
                            <span className="">100</span>%
                          </h1>
                          <p className="font-ks font-16 lineh-40 weight-500 color-30 ">
                            Financial Analysis
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 box-margin">
                      <div className=" text-center margin-b20 margin-t32">
                        <div className="4-boxarea4 box1">
                          <h1
                            style={{ fontFamily: '"Lexend Deca", sans-serif' }}
                            className=" font-40 lineh-40 color-29 margin-b weight-500"
                          >
                            <span className="">100</span>%
                          </h1>
                          <p className="font-ks font-16 lineh-40 weight-500 color-30 ">
                            Payroll Services
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*===== ABOUT END=======*/}
      {/*===== LAW PROVIDE STARTS =======*/}
      <div className="lawprovide-section-area section-padding5">
        <img
          src="assets/images/elementor/elementor23.png"
          alt=""
          className="elementor24"
        />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="lawprovide-textarea">
                <h1
                  style={{
                    fontFamily: '"Lexend Deca", sans-serif',
                    color: "#0e0e0e",
                  }}
                  className="font-lora font-48 lineh-56 weight-600 color-29 margin-b20 "
                >
                  {" "}
                  Why Choose Us:
                  <br />
                </h1>{" "}
                <h2>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#d56e00",
                      textAlign: "justify",
                    }}
                  >
                    "Unlock Financial Success with Expertise &amp; Personalized
                    Service."
                  </span>
                </h2>{" "}
                <br />
                <p
                  style={{ textAlign: "justify" }}
                  className="font-ks font-16 weight-500 lineh-26 margin-b20 color-30"
                >
                  We are Service Focused, building a relationship that allows us
                  to ask the tough questions of you and your business
                  consistently. We are responsive to our clients’ needs, whilst
                  being proactive rather than reactive to situations. We believe
                  in communicating with our clients on a regular basis, making
                  us your business partner rather than your accountant once a
                  year.
                </p>
                {/* <p class="font-ks font-16 weight-500 lineh-26 color-30">Our team of seasoned legal professionals brings a wealth of experience across various practice areas. You can trust us to provide accurate, up-to-date, and effective legal advice.</p> */}
                <Link to="/services"
                 
                  className="theme6-btn6 font-ks lineh-16 weight-700 color font-16 margin-t32"
                >
                  Explore our Services{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="lawprovide-boaxrea margin-b30">
                <div className="guidiance-boxarea">
                  <img
                    src="assets/images/icons/gudeiance1.svg"
                    alt=""
                    className="ts"
                  />
                </div>
                <div className="lax-conultingprovide">
                  <Link to="/services" className="color-29">
                    <h1
                      style={{ fontFamily: '"Lexend Deca", sans-serif' }}
                      className="font-lora font-24 lineh-24 weight-600 color-29 margin-b14 ts"
                    >
                      Improving Efficiency
                    </h1>
                  </Link>
                  <p className="font-ks lineh-26 weight-500 color-30 font-16 ts">
                    Streamlining Financial Operations: Elevating Efficiency in
                    Accounting, Taxation, Auditing, and Compliance.
                  </p>
                </div>
              </div>
              <div className="lawprovide-boaxrea margin-b30">
                <div className="guidiance-boxarea">
                  <img
                    src="assets/images/icons/consulting1.svg"
                    alt=""
                    className="ts"
                  />
                </div>
                <div className="lax-conultingprovide">
                  <Link to="/services" className="color-29">
                    <h1
                      style={{ fontFamily: '"Lexend Deca", sans-serif' }}
                      className="font-lora font-24 lineh-24 weight-600 color-29 margin-b14 ts"
                    >
                      Client Education
                    </h1>
                  </Link>
                  <p className="font-ks lineh-26 weight-500 color-30 font-16 ts">
                    Empowering Businesses Through Numbers: Bridging the
                    Knowledge Gap for Informed Decision-Making.
                  </p>
                </div>
              </div>
              <div className="lawprovide-boaxrea">
                <div className="guidiance-boxarea">
                  <img
                    src="assets/images/icons/support1.svg"
                    alt=""
                    className="ts"
                  />
                </div>
                <div className="lax-conultingprovide">
                  <Link to="/services" className="color-29">
                    <h1
                      style={{ fontFamily: '"Lexend Deca", sans-serif' }}
                      className="font-lora font-24 lineh-24 weight-600 color-29 margin-b14 ts"
                    >
                      High-Level Expertise
                    </h1>
                  </Link>
                  <p className="font-ks lineh-26 weight-500 color-30 font-16 ts">
                    Strategic Insights, Tactical Solutions: Applying Proven
                    Expertise to Optimize Your Business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="assets/images/elementor/elementor23.png"
          alt=""
          className="elementor25"
        />
      </div>

      <div className="mission-area-starts section-padding5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="missionimg">
                <img
                  src="assets/images/sectionimg/about img 2.jpeg"
                  alt=""
                  className="missionimg2"
                />
                <img
                  src="assets/images/elementor/elementor17.png"
                  alt=""
                  className="elementor-9 keyframe3"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="missiontextarea">
                <h1
                  style={{ fontFamily: '"Lexend Deca", sans-serif' }}
                  className="font-lora font-48 lineh-56 weight-600 color-29 margin-b20"
                >
                  Our Mission
                </h1>
                <p
                  style={{ textAlign: "justify" }}
                  className="font-ks font-16 lineh-26 weight-500 color-30 margin-b"
                >
                  At EBMC, our mission is to empower businesses with
                  unparalleled professional services, guided by a commitment to
                  quality, integrity, and client-centric solutions. We strive to
                  be a catalyst for success, fostering innovation,
                  sustainability, and growth for our clients and our team.
                </p>
                <p
                  style={{ textAlign: "justify" }}
                  className="font-ks font-16 lineh-26 weight-500 color-30 margin-b"
                >
                  {" "}
                  Through our expertise and dedication, we aim to redefine
                  excellence in business consultancy, making a lasting positive
                  impact on the industries we serve.
                </p>
                <ul className="mission-points">
                  <li className="font-ks font-16 lineh-16 weight-600 color-17 margin-b20">
                    <span>
                      <img src="assets/images/icons/check1.png" alt="" />
                    </span>
                    Client-Focused Solutions and Results
                  </li>
                  <li className="font-ks font-16 lineh-16 weight-600 color-17 margin-b20">
                    <span>
                      <img src="assets/images/icons/check1.png" alt="" />
                    </span>
                    Flexible, Value Driven Approach
                  </li>
                  <li className="font-ks font-16 lineh-16 weight-600 color-17 margin-b20">
                    <span>
                      <img src="assets/images/icons/check1.png" alt="" />
                    </span>
                    Warning of updated legal risks for customers
                  </li>
                  <li className="font-ks font-16 lineh-16 weight-600 color-17 margin-b20">
                    <span>
                      <img src="assets/images/icons/check1.png" alt="" />
                    </span>
                    We serve around 15,000 customers every year
                  </li>
                </ul>
                <Link to='/services'
                  
                  className="theme6-btn6 font-ks lineh-16 weight-700 color font-16 margin-t32"
                >
                  Learn More{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="welcomeabout-area">
        <div className="row">
          <div className="col-lg-12">
            <div className="welcomeaboiut2 text-center">
              <h5 className="font-lora font-60 lineh-64 weight-500 color margin-b24">
                Team Details
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="team-details-sectionarea section-padding5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="team-detailsimg">
                <img src="assets/images/TEAM1/chairman1_img.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="team-detailsarea">
                <h1 className="font-lora font-48 lineh-54 weight-600 color-29 margin-b">
                  Habeeb Rahman
                </h1>
                <p
                  style={{ textAlign: "justify" }}
                  className="font-16 lineh-26 weight-500 color-30 font-ks"
                >
                  As the Managing Director of EBMC, I lead with a vision for
                  excellence, guiding our dynamic team to deliver top-notch
                  professional services across various domains. With a wealth of
                  experience and a commitment to client success, I drive the
                  company's mission of providing innovative solutions and
                  fostering growth in the business consultancy landscape.{" "}
                </p>
                <div className="team-details-location margin-t32">
                  <div className="team-detailsemail">
                    <img src="assets/images/icons/email3.svg" alt="" />
                  </div>
                  <div className="team-deatilstextarea">
                    <span className="font-ks font-16 lineh-16 weight-500 color-26 d-inline-block margin-b">
                      Quick Email
                    </span>
                    <h4
                      style={{
                        cursor: "pointer",

                        color: "black",
                      }}
                      onClick={handleEmailClick}
                    >
                      {email}
                    </h4>
                  </div>
                </div>
                <div className="team-details-location margin-t32">
                  <div className="team-detailsemail">
                    <img src="assets/images/icons/phone10.svg" alt="" />
                  </div>
                  <div className="team-deatilstextarea">
                    <span className="font-ks font-16 lineh-16 weight-500 color-26 d-inline-block margin-b">
                      Phone Number
                    </span>
                    <br />
                     <a
                  rel="noreferrer"
                  href="https://wa.link/o4ztme"
                  target="_blank"
                  className="font-20 lineh-26 weight-700 color-29 font-ks d-block"
                >
                    <h4>+971562424776</h4>

                  <span>
                  </span>
                </a>
                  </div>
                </div>
                <div className="team-details-location margin-t32">
                  <div className="team-detailsemail">
                    <img src="assets/images/icons/location4.svg" alt="" />
                  </div>
                  <div className="team-deatilstextarea">
                    <span className="font-ks font-16 lineh-16 weight-500 color-26 d-inline-block margin-b">
                      Office Location
                    </span>
                    <a
                      href="https://www.google.com/maps/search/?q=Horizon Towers,Block-D Al Rashidiya 1, Ajman, UAE"
                      className="font-20 lineh-26 weight-700 color-29 font-ks d-block"
                    >
                      603, -D Block -Horizon Towers
                      <br /> Al Rashidiya 1, Ajman, UAE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="skills-section-area section-padding5">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-10"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <div className="profesiional-skill">
                <h1
                  className="font-lora font-48 lineh-56 weight-600 color-29 margin-b20"
                  style={{ textAlign: "center", marginBottom: 50 }}
                >
                  Chairman's Message
                </h1>
                <p
                  className="font-ks font-16 lineh-26 weight-500 color-30 margin-b"
                  style={{ textAlign: "justify" }}
                >
                  Dear Esteemed Clients, Collaborators, and Stakeholders, I am
                  delighted to extend a warm welcome to you on behalf of Etihad
                  Business and Management Consultancy LLC (EBMC), a leading
                  business and management consultancy firm that specializes in
                  audits, taxation, accounts, AML services, and comprehensive
                  management consultancy. As the head of this distinguished
                  organization, it is my honour to share our commitment to
                  excellence and innovation with you. In a business landscape
                  where regulatory compliance, financial precision, and
                  strategic foresight are paramount, EBMC stands as a beacon of
                  reliability and proficiency. Our dedicated team of
                  professionals brings a wealth of experience in audits,
                  accounts, anti-money laundering (AML) services, and broader
                  management consultancy. Our commitment goes beyond the
                  numbers; we aim to empower your business with actionable
                  insights and strategic guidance. By leveraging our expertise
                  in audits, accounts, AML services, and management consultancy,
                  we strive to enhance your operational efficiency, mitigate
                  risks, and drive sustainable growth. Here's to a future of
                  financial resilience, regulatory excellence, and strategic
                  brilliance!{" "}
                </p>
                <br />
                <p style={{ textAlign: "right" }}>
                  {" "}
                  Warm regards,
                  <br />
                  Habeeb Rahman
                  <br />
                  (Managing&nbsp;Director)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
