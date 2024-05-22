import React from 'react'
import { Link } from 'react-router-dom'

function Aml_first() {
  return (
    <>
    <div
  
  className="section  overlay-opacity-8 bg-cover lazy "
  data-loaded="true"
>
  <div className="container"style={{paddingTop: '100px'}}>
    <div className="row text-center-md text-center-xs d-middle justify-content-start">
      <div
        className="col-12 col-lg-6 mb-5  text-white aos-init aos-animate"
        data-aos="fade-in"
        data-aos-delay={0}
        data-aos-offset={0}
      >
        <div className="col-md-12" style={{ color: "black" }}>
     
        </div>
        {/* main title */}
        <h1 className="display-4 fw-bold mb-0">
          <span className="d-inline-block color-29 ">
            <span className="about3span  font-ks lineh-16 font-16 weight-600 color-29 d-inline-block margin-b24">
              Protect Your Business with eCheck Screening Solutions
            </span>
            <p>
              Manage Risk with Streamlined ID Verification &amp; Authentication
              Services.
            </p>
          </span>
        </h1>
        {/* slogan */}
        <p className="h6 fw-normal color-29 pt-4  mb-0">
          We help firms comply with AML/CTF and sanctions regulations and <br />{" "}
          reduce their reputational risk by providing KYC and KYB screening
          solutions.
        </p>
        <div>
          <button className="loginbtn_mobile d-sm-block d-lg-none mt-4 btn btn-primary">
            <Link to="/loginaml" className=" weight-700 text-white">
            
              Login to eCheck
            </Link>
          </button>
        </div>
      </div>
      <div
        className="col-12 col-lg-6 pb-5 text-align-end text-center-md text-center-xs aos-init aos-animate"
        data-aos="fade-in"
        data-aos-delay={50}
        data-aos-offset={0}
      >
        <div className="d-inline-block  shadow-primary-xs rounded p-4 p-md-5 w-100 max-w-40 text-align-end ">
          <img src="/assets/images/sectionimg/4.gif" alt="" />
        </div>
      </div>
    </div>
  </div>
</div>


    
    
    </>
  )
}

export default Aml_first