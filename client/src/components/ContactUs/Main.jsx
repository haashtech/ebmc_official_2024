import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";


function Main() {


  const [formData, setFormData] = useState({
    text: "",
    email: "",
    resumelink: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
  }
  };

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!formData.text.trim()) {
      newErrors.text = 'Text field cannot be empty';
      formIsValid = false;
  }

  if (!formData.email.trim()) {
    newErrors.email = 'Email field cannot be empty';
    formIsValid = false;
} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is not valid';
    formIsValid = false;
}




if (!formData.message.trim()) {
  newErrors.message = 'Message field cannot be empty';
  formIsValid = false;
}

setErrors(newErrors);
return formIsValid;
  };

  

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData(event.target);

      formData.append("access_key", "6b009f9f-6629-447c-9081-85079d196cb0");

      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        Swal.fire({
          icon: "success",
          title: "Message sent",
          text: "The message has been sent Successfully, we will get back to you soon",
        });
      }
    } else {
      console.log("Form is invalid:", errors);
    }
  };






  












  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const errorStyle = {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '5px'
};


  

  return (
    <>
      <div className="welcomeabout-area">
        <div className="row">
          <div className="col-lg-12">
            <div className="welcomeaboiut2 text-center">
              <h1 className="font-lora font-60 lineh-64 weight-500 color margin-b24">
                Contact
              </h1>
              <p className="font-20 weight-500 font-ks lineh-20 color">
                <a href="index.html" className="color">
                  Home
                </a>
                <span>
                  <i className="fa-solid fa-angle-right" />
                </span>
                Contact
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="contcatinner2-scetio-area section-padding5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact2-all-contact contact2inner">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="contact2-maincontact">
                      <h1 className="font-24 font-lora lineh-24 color-29 weight-600 margin-b">
                        Send Us A Message
                      </h1>
                      <p className="font-16 font-ks lineh-26 weight-500 color-30 margin-b24">
                        Our response time is within 30 minutes during business
                        hours
                      </p>
                      <div className="contact-from-area">
                       <form  onSubmit={onSubmit}>


                       <div className="row">
                          <div className="col-lg-6">
                            <div className="first-input">
                              <input
                                type="text"
                                placeholder="Name"
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                              />
                            {errors.text && <div style={errorStyle}>{errors.text}</div>}

                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="first-input">
                              <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={formData.email}
                              onChange={handleChange}
                              />
                          {errors.email && <div style={errorStyle}>{errors.email}</div>}

                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="textarea">
                              <textarea
                                name="message"
                                cols={30}
                                rows={10}
                                placeholder="Message"
                                defaultValue={""}
                                value={formData.message}
                                onChange={handleChange}
                              />
                           {errors.message && <div style={errorStyle}>{errors.message}</div>}

                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="contact5-btn5 text-left">
                              <button
                                className="font-ks font-16 lineh-16 weight-700 color margin-t32 contcat5"
                                type="submit"
                              >
                                Schedule Consultation{" "}
                                <span>
                                  <i className="fa-solid fa-arrow-right-long" />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                       </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-padding">
                      <div className="contact2-auhtor-section contacrtblogbg">
                        <div className="clock-area">
                          <img src="assets/images/icons/clock1.svg" alt="" />
                        </div>
                        <div className="contact-location">
                          <h1 className="font-20 font-lora lineh-24 color-29 weight-600 margin-b">
                            We are at
                          </h1>
                          <a href="https://www.google.com/maps/search/?q=Horizon Towers,Block-D Al Rashidiya 1, Ajman, UAE">
                            <p className="font-ks font-16 lineh-26 color-30 weight-500 ">
                              603, -D Block -Horizon Towers
                              <br /> Al Rashidiya 1, Ajman, UAE
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="contact-padding margin-t ">
                      <div className="contact2-auhtor-section contacrtblogbg">
                        <div className="clock-area ">
                          <img
                            className="color-17"
                            src="assets/images/icons/phone11.png"
                            alt=""
                          />
                        </div>
                        <div className="contact-location">
                          <h1 className="font-20 font-lora lineh-24 color-29 weight-600 margin-b">
                            Call or text
                          </h1>
                          <p className="font-ks font-16 lineh-26 color-30 weight-400 ">
                            {" "}
                            <a href="tel:97165292913" className="color-17">
                              {" "}
                              +97165292913
                            </a>
                          </p>
                          <p />
                        </div>
                      </div>
                    </div>
                    <div className="contact-padding margin-t ">
                      <div className="contact2-auhtor-section contacrtblogbg">
                        <div className="clock-area">
                          <img src="assets/images/icons/email3.svg" alt="" />
                        </div>
                        <div className="contact-location">
                          <h1 className="font-20 font-lora lineh-24 color-29 weight-600 margin-b">
                            Email us today
                          </h1>
                          <p className="font-ks font-16 lineh-26 color-30 weight-400 ">
                            <a href="mailto:info@ebmc.ae" className="color-17">
                              info@ebmc.ae
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 margin-t60">
              <div className="map-section-area">
                <div className="mapouter"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-section-area section-padding5">
        <img
          src="assets/images/elementor/elementor23.png"
          alt=""
          className="elementor24"
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-7 m-auto">
              <div className="faq-textarea margin-b60">
                <h1 className="font-lora font-48 lineh-52 color-29 weight-600 margin-b">
                  Frequently Asked Questions
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="accordian-area accourbutton">
                <div className="accordion accordian4" id="accordionExample">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="accordion-item bordernone">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Why should i have to pay VAT when i have not much
                            sales ?
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p className="font-ks font-16 lineh-26 weight-500 color-22 ">
                              <br />
                              Once Registered with FTA and gained TRN , All the
                              companies in UAE should file VAT return on every
                              allotted Filing quarters. Weather its Zero or
                              whatever the VAT Output &amp; Input.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item bordernone">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Do we have to Register For Corporate tax ?
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p className="font-ks font-16 lineh-26 weight-500 color-30 ">
                              Every Company Registered In The UAE, Needs To
                              Register &amp; file Corporate tax filing , weather
                              it meets the threshold or not . only if the net
                              profit above The Threshold of 375,000.00 AED, The
                              companies Required to pay 9 % The Tax For the
                              Profit above Threshold.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item bordernone">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            Why should we have to Register for VAT ?
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p className="font-ks font-16 lineh-26 weight-500 color-30 ">
                              Registering for VAT ensures that businesses comply
                              with the tax laws of their respective
                              jurisdictions. Failure to register when required
                              can lead to penalties and legal consequences.
                              Being registered for VAT can enhance the
                              credibility and professionalism of a business. It
                              may also make the business more attractive to
                              other businesses that prefer to deal with
                              VAT-registered suppliers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="accordian-area accourbutton">
                        <div className="accordion accordian4">
                          <div className="accordion-item bordernone">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseFive"
                                aria-expanded="true"
                                aria-controls="collapseFive"
                              >
                                How do I know if my business needs to register
                                for VAT ?
                              </button>
                            </h2>
                            <div
                              id="collapseFive"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <p className="font-ks font-16 lineh-26 weight-500 color-22 ">
                                  Check your annual turnover against the
                                  threshold set by UAE tax authorities
                                  (voluntary Threshold 187,500 AED &amp;
                                  Mandatory Threshold 365,000.00 AED). If it
                                  exceeds the threshold, you are required to
                                  register for VAT. it's essential to stay
                                  updated with the latest regulations.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item bordernone">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseSix"
                                aria-expanded="false"
                                aria-controls="collapseSix"
                              >
                                What records should I maintain for Corporate Tax
                                purposes?
                              </button>
                            </h2>
                            <div
                              id="collapseSix"
                              className="accordion-collapse collapse"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <p className="font-ks font-16 lineh-26 weight-500 color-30 ">
                                  Maintain accurate records of financial
                                  transactions, receipts, and other relevant
                                  documents. This includes income statements,
                                  balance sheets, and supporting documents for
                                  deductions. Proper record-keeping is crucial
                                  for Corporate Tax compliance.{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item bordernone">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseSeven"
                                aria-expanded="false"
                                aria-controls="collapseSeven"
                              >
                                What is Corporate Tax ?
                              </button>
                            </h2>
                            <div
                              id="collapseSeven"
                              className="accordion-collapse collapse"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <p className="font-ks font-16 lineh-26 weight-500 color-30 ">
                                  Corporate tax is a tax imposed on the profits
                                  of a business entity. It is levied by the
                                  government on the income generated by
                                  corporations, partnerships, and other business
                                  structures.{" "}
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
          </div>
        </div>
        <img
          src="assets/images/elementor/elementor23.png"
          alt=""
          className="elementor25"
        />
      </div>
      {/*===== FAQ END=======*/}
    </>
  );
}

export default Main;
