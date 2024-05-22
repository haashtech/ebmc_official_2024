import { Link } from "react-router-dom";
import { useSidebar } from "../../ContextApi/SidebarContext";
import { useState } from "react";
import { useEffect } from "react";

function Header({ isButton }) {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  function closeSidebar() {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  }

  const [backgroundPositionX, setBackgroundPositionX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Mimic a continuous movement effect by updating the background position
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundPositionX((prevPosition) => (prevPosition + 1) % 100); // Circular motion for the background
    }, 50); // Update every 50 milliseconds

    return () => clearInterval(interval);
  }, []);

  // Styles for the button with dynamic glare and hover effects
  const buttonStyle = {
    background:
      "linear-gradient(to right, rgba(255,255,255,0) 10%, rgba(255,255,255,0.8) 10%, rgba(255,255,255,0) 10%)",
    backgroundSize: "200% 100%",
    backgroundPosition: `${backgroundPositionX}% 0`,
    transition: "transform 0.5s ease, background-position 0.7s linear",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    width: "90%",
    height: "90%",
  };

  // Container styles to encapsulate the button


  return (
    <>


      <header className="header about-bg d-none d-lg-block">
        <div className="header-area header header-sticky" id="header">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="header-elements">
                  <div className="site-logo">
                    <Link to="/">
                      <img
                        style={{ height: 56 }}
                        src="/assets/images/logo/Eth.svg"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="main-menu-ex homepage5 mainmenuex1">
                    <ul>
                      <li className="font-outfit font-18 weight-500 color-1">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="font-outfit font-18 weight-500 color-1">
                        <Link to="/about">About us</Link>
                      </li>
                      <li className="font-outfit font-18 weight-500 color-1">
                        <Link to="/services">Services</Link>
                      </li>
                      <li className="font-outfit font-18 weight-500 color-1">
                        <Link to="/news">Latest News</Link>
                      </li>
                      <li className="font-outfit font-18 weight-500 color-1">
                        <Link to="/career">Career</Link>
                      </li>
                      <li className="font-outfit font-18 weight-500 color-1">
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    {/* Main Div with Contact Information */}
                    <div className="contact-3 d-lg-block d-none">


                     <div>
                       <div
                       
                        style={{width:'230px'}}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                          >
                        <div style={{...buttonStyle,borderRadius: '28px'}} className="glareEffect" >
                          {isButton === 1 && (
                            <Link to="/aml">
                              <img
                              
                                src="/assets/images/Echeck/e_check 44.png"
                                alt=""
                                style={{ width: "100%", height: "100%" }}
                              />
                            </Link>
                          )}
                        </div>
                      </div>
                     </div>
                    </div>

                    
                  </div>
                  {isButton === 2 && (
                      <div
                        className="login-container"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          height: "100%",
                        }}
                      >
                        <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }} className="glareEffect">
                <Link to="/loginaml" style={{ position: 'relative', display: 'inline-block', textDecoration: 'none', margin: '10px 20px' }}>
                    <button className="button-light" style={{
                        padding: '10px 20px',
                        backgroundColor: '#3949AB',
                        color: '#ffffff',
                        borderRadius: '5px',
                        position: 'relative'
                    }}>
                        Login
                    </button>
                </Link>
            </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className="mobile-header mobile-header-4 d-block d-lg-none homepagesmall"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <div className="container-fluid">
          <div className="col-12">
            <div className="mobile-header-elements">
              <div className="mobile-logo">
                <Link to="/">
                  <img
                    style={{ height: 56 }}
                    src="/assets/images/logo/Eth.svg"
                    alt=""
                  />
                </Link>
              </div>
              <div
                className="mobile-nav-icon dots-menu"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-bars" onClick={toggleSidebar} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`mobile-sidebar ${
          isSidebarOpen ? "mobile-menu-active" : ""
        }`}
      >
        <div className="logoicons-area">
          <div className="logos">
            <img src="/assets/images/logo/ehihad logo as.png" alt="" />
          </div>
          <div className="menu-close" onClick={closeSidebar}>
            <i className="fa-solid fa-xmark" />
          </div>
        </div>
        <div className="mobile-nav">
          <ul className="mobile-nav-list">
            <li>
              <Link
                to="/"
                onClick={closeSidebar}
                className="font-outfit font-16 weight-500 color"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={closeSidebar}
                className="font-outfit font-16 weight-500 color"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                onClick={closeSidebar}
                className="font-outfit font-16 weight-500 color"
              >
                Service
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                onClick={closeSidebar}
                className="font-outfit font-16 weight-500 color"
              >
                Latest News
              </Link>
            </li>
            <li>
              <Link
                to="/career"
                onClick={closeSidebar}
                className="font-outfit font-16 weight-500 color"
              >
                Career
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={closeSidebar}
                className="font-outfit font-16 weight-500 color"
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="allmobilesection">
            <Link
              to="/aml"
              onClick={closeSidebar}
              className="font-outfit  font-18 lineh-18 weight-700 color mobilemenubtn"
            >
              eCheck Screening
            </Link>
            <div className="single-footer single-footer-menu single-footer4">
              <h3 className="font-outfit font-24 lineh-24 weight-600 color margin-b margin-t24">
                Contact Info
              </h3>
              <div className="footer4-contact-info">
                <div className="contact-info-single">
                  <div className="contact-info-icon">
                    <img src="/assets/images/icons/phone2.png" alt="" />
                  </div>
                  <div className="contact-info-text">
                    <a
                      href="tel:+971562424776"
                      className="font-outfit font-16 lineh-26 weight-500 color-21"
                    >
                      +971562424776
                    </a>
                    <br />
                    <a
                      href="tel: +971 652 929 13"
                      className="font-outfit font-16 lineh-26 weight-500 color-21"
                    >
                      +971 652 929 13
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
