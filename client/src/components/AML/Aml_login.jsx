import authStore from "../../store/user/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../Loader";

function Aml_login() {
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    setLoading(false); // Set loading to false after 2 seconds
  }, 1500);




  const [errorMessage, setErrorMessage] = useState("");
  const store = authStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await store.login();
      // console.log("secceessfully logged in");
      navigate("/dashboardaml");
    } catch (err) {
      // console.log("Login failed", err);
      setErrorMessage("Invalid email or password.please tryagain");
    }
  };

  const handleWhatsapp = () => {
    const phoneNumber = "+971562424776";
    const message = encodeURIComponent(
      "Hello team , I would like to setup an account on Etihad AML screening"
    );
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <section
      className="section 
 overlay-opacity-8 bg-cover lazy "
      data-loaded="true" 
    >
      <div className="container" >
        <div className="row text-center-md align-items-center text-center-xs d-middle " style={{paddingTop: '100px'}}  >
          <div
            className="col-12 col-lg-6 mb-3  text-white aos-init aos-animate"
            data-aos="fade-in"
            data-aos-delay={0}
            data-aos-offset={0}
          >
            <div style={{ width: "70%" }} className="loginImg  ">
              <img
                src="assets/images/Login/Login_keyblue.webp"
                alt="login"
                style={{ marginLeft: "80px" }}
              />
            </div>
            <p className="h6 fw-normal color-29 pt-2 mb-0 text-lg-center">
              We assist clients all over UAE comply with their PEP, Sanctions
              and Adverse Media screening obligations.
            </p>
          </div>
          <div
            className="col-12  col-lg-6 text-align-end text-center-md text-center-xs aos-init aos-animate"
            data-aos="fade-in"
            data-aos-delay={50}
            data-aos-offset={0}
          >
            <div className="d-inline-block sigin-block bg-white  shadow-primary-xs rounded p-4 p-md-5 w-100 max-w-450 text-align-start">
              <h2 className="h5 mb-3">
                <i className="fi fi-homeadvisor" />
                <span className="d-inline-block px-2">
                  Login in to your Account
                </span>
              </h2>
              <form onSubmit={handleLogin} className="bs-validate">
                <div className="form-floating mb-3">
                  <input
                    onChange={store.updateLoginForm}
                    value={store.loginForm.email}
                    placeholder="Enter your email"
                    id="s_email"
                    type="email"
                    name="email"
                    autoComplete="on"
                    className="form-control"
                  />
                  <label htmlFor="s_email">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={store.updateLoginForm}
                    value={store.loginForm.password}
                    placeholder="Enter password"
                    id="s_password"
                    type="password"
                    name="password"
                    autoComplete="on"
                    className="form-control"
                  />
                  <label htmlFor="s_password">Password</label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100 btn-lg bg-gradient-danger"
                >
                  <i className="fi fi-search" />
                  {loading ? "Logging in ..." : "Login"}
                </button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </form>
              <h2 className="h6 fpassword pt-4">
                <i className="" />
                <span className="d-inline-block">
                  If you do not have an account, please{" "}
                  <button
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      border: "none",
                      fontSize: "22px",
                      fontFamily: "serif",
                      background: "none",
                      animationName: "blinking",
                      animationDuration: "5s",
                      animationIterationCount: "infinite",
                    }}
                    onClick={handleWhatsapp}
                  >
                    contact our team
                  </button>{" "}
                  to set one up.
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aml_login;
