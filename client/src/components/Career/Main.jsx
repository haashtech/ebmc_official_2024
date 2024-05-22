import { useEffect, useState } from "react";
import axios from "axios";
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

if (!formData.resumelink.trim()) {
  newErrors.resumelink = 'Resume link field cannot be empty';
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

      formData.append("access_key", "3ff97420-84da-4e43-85b4-70c4da1363da");

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
        // console.log("Success", res);
        Swal.fire({
          icon: "success",
          title: "Message sent",
          text: "The message has been sent Successfully, we will get back to you soon",
        });
      }
    } else {
      console.error("Form is invalid:", errors);
    }
  };

  const [career, SetCareer] = useState([]);
  const [careerCount, setCareerCount] = useState([]);

  const fetchCareer = async () => {
    try {
      const response = await axios.get("/user/viewcareers");
      // console.log(response);

      const sortedCareer = response.data.career;
      const count = response.data.careerCount;

      // console.log(count);

      SetCareer(sortedCareer);
      setCareerCount(count);
    } catch (error) {
      console.error("Error in fetching career", error);
    }
  };

  useEffect(() => {
    fetchCareer();
  }, []);


  const errorStyle = {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '5px'
};

  return (
    <>
      <>
        {/*===== WElCOME STARTS=======*/}
        <div className="welcomeabout-area">
          <div className="row">
            <div className="col-lg-12">
              <div className="welcomeaboiut2 text-center">
                <h1 className="font-lora font-60 lineh-64 weight-500 color margin-b24">
                  Career
                </h1>
                <p className="font-20 weight-500 font-ks lineh-20 color">
                  <a href="index.html" className="color">
                    Home
                  </a>
                  <span>
                    <i className="fa-solid fa-angle-right" />
                  </span>
                  Career
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*===== WElCOME END=======*/}
        {/*===== CONTACT STARTS=======*/}
        <section className="cotactinner-section-area section-padding5 section">
          <div className="container ">
            <h1 className="font-outfit text-center font-44 lineh-52 color37 weight-600 margin-b20">
              We are Hiring..
            </h1>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col">
                  <p className="font-ks pt-3 section-padding8  font-16 weight-500 lineh-26 color-30 text-justify">
                    Explore limitless opportunities and carve out your path
                    forward with EBMC. We are actively inviting energetic
                    individuals ready to bring their expertise and enthusiasm to
                    our dynamic team. Embrace cutting-edge ideas, encourage
                    teamwork, and become a driving force for transformative
                    impact. Become part of a community that appreciates your
                    abilities and supports your career ambitions. Propel your
                    professional trajectory with us.
                  </p>
                </div>
              </div>
            </div>
            <br />
            <span className="about3span  font-ks lineh-16 font-16 weight-600 color-29 d-inline-block margin-b24">
              Total Job Openings : {careerCount}
            </span>
            <div className="filter-result">
              {career && career.length > 0 ? (
                career
                  .slice()
                  .reverse()
                  .map((careerItem) => (
                    <div
                      className="job-box d-md-flex align-items-center justify-content-between mb-30"
                      key={careerItem._id}
                    >
                      <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                        <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                          EBMC
                        </div>
                        <div className="job-content p-4">
                          <h5 className=" text-md-left">{careerItem.title}</h5>
                          <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                            <li className="mr-md-4">
                              <i className="zmdi zmdi-pin mr-2" />{" "}
                              {careerItem.description}
                            </li>
                            {/* <li className="mr-md-4">
                  <i className="zmdi zmdi-money mr-2" /> 2500-3500 AED
                </li>
                <li className="mr-md-4">
                  <i className="zmdi zmdi-time mr-2" /> Full Time
                </li> */}
                          </ul>
                        </div>
                      </div>
                      <div className="job-right my-4 flex-shrink-0">
                        <a
                          href="#join-with-us"
                          className="btn d-block w-100 d-sm-inline-block btn-light"
                        >
                          Apply now
                        </a>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center">
                  <h2>No Hiring updates Available</h2>
                  <p>Check back later for more updates.</p>
                </div>
              )}
            </div>
          </div>
        </section>
        <div className="cotactinner-section-area section-padding4">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="contcat5-textarea5">
                  <span className="about3span font-ks lineh-16 font-16 weight-600 color-29 d-inline-block margin-b24">
                    Connect with Us
                  </span>
                  <h1 className="font-lora font-48 lineh-56 weight-600 color-29 margin-b20 clienth2">
                    Join With Our Family
                  </h1>
                  <p
                    style={{ textAlign: "justify" }}
                    className="font-ks font-16 weight-500 lineh-26 color-30"
                  >
                    Embark on a rewarding career with EBMC, a leading provider
                    of professional services. Join our dynamic team and explore
                    opportunities to contribute to innovation and excellence. At
                    EBMC, we value professional growth and offer a platform for
                    your career journey to flourish. Your exciting career awaits
                    at EBMC, where you can make a meaningful impact and thrive
                    in a vibrant and supportive work environment.
                  </p>
                  <div className="phone7-textarea margin-t32 contactinnerbg">
                    <div className="phone7-icon">
                      <img src="assets/images/icons/phone8.png" alt="" />
                    </div>
                    <div className="phone7-text">
                      <p className="font-16 lineh-16 weight-500 font-ks color-30 margin-b">
                        Gives us a Call
                      </p>
                      <a
                        href="tel:97165292913"
                        className="font-lora font-24 weight-700 lineh-24 color-29"
                      >
                        {" "}
                        +97165292913
                      </a>
                    </div>
                  </div>
                  <div className="phone7-textarea margin-t contactinnerbg">
                    <div className="phone7-icon">
                      <img src="assets/images/icons/email7.png" alt="" />
                    </div>
                    <div className="phone7-text">
                      <p className="font-16 lineh-16 weight-500 font-ks color-30 margin-b">
                        Send me Mail
                      </p>
                      <a
                        href="mailto:hr@ebmc.ae"
                        className="font-lora font-24 weight-700 lineh-24 color-29"
                      >
                        hr@ebmc.ae
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact5-main-section">
                  <div className="contact-main-text" id="join-with-us">
                    <h1 className="font-lora font-24 lineh-24 weight-600 color">
                      Join with Us
                    </h1>
                    <p className="font-ks font-16 lineh-26 weight-500 color margin-t">
                      We're Seeking Talented Candidates! Join our dynamic team
                      and be part of something exceptional. Explore
                      opportunities that align with your skills and aspirations.
                    </p>
                  </div>
                  <div className="contac5-input5area">
                    <form onSubmit={onSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="input-5area margin-t32">
                            <input
                              type="text"
                              placeholder="Designation"
                              name="text"
                              value={formData.text}
                              onChange={handleChange}
                            />
                            {errors.text && <div style={errorStyle}>{errors.text}</div>}
                            
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-5area margin-t32">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          {errors.email && <div style={errorStyle}>{errors.email}</div>}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-5area margin-t">
                            <input
                              type="text"
                              placeholder="Resumelink"
                              name="resumelink"
                              value={formData.resumelink}
                              onChange={handleChange}
                            />
                           {errors.resumelink && <div style={errorStyle}>{errors.resumelink}</div>}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-5area margin-t">
                            <textarea
                              name="message"
                              placeholder="Message"
                              value={formData.message}
                              onChange={handleChange}
                            ></textarea>
                           {errors.message && <div style={errorStyle}>{errors.message}</div>}
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="contact5-btn5">
                            <button
                              className="font-ks font-16 lineh-16 weight-700 color margin-t32 contcat5"
                              type="submit"
                            >
                              Submit Now{" "}
                              <span>
                                <i className="fa-solid fa-arrow-right" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===== CONTACT  END=======*/}
      </>
    </>
  );
}

export default Main;
