import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="welcome5-section-area">
      <img
        src="/assets/images/elementor/ball1.png"
        alt=""
        className="ball1 aniamtion-key-2"
      />
      <img
        src="/assets/images/elementor/ball2.png"
        alt=""
        className="ball2 aniamtion-key-4"
      />
      <img
        src="/assets/images/elementor/ball3.png"
        alt=""
        className="ball3 aniamtion-key-3"
      />
      <img
        src="/assets/images/elementor/ball4.png"
        alt=""
        className="ball4 aniamtion-key-2"
      />
      <img
        src="/assets/images/elementor/ball5.png"
        alt=""
        className="ball5 aniamtion-key-4"
      />
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="welcome5-author-area5">
              <span
                className="color font-outfit font-16 weight-500 color lineh-26 calculation d-inline-block margin-b24 animated-text"
                style={{ color: "black" }}
              >
                Maximize Your Potential with Free initial Consultation
              </span>

              <h1
                className="color font-out font-56 lineh-64 weight-700 color margin-b20"
                style={{ color: "black" }}
              >
                Solution at Your <br />
                Finger Tips
              </h1>
              <p
                className="color font-outfit font-16 weight-400 opacity1 lineh-26"
                style={{ color: "black" }}
              >
                We hold the conviction that every business possesses its own
                distinctive essence. Our consultants forge a close collaboration
                with you, delving into the depths of your goals, obstacles, and
                dreams.
              </p>
              <div className="animationcss">
                <div className="about5-authorarea margin-t32">
                  <div className="author0mages">
                    <img
                      src="/assets/images/icons/check1.png"
                      alt=""
                      className="ts"
                    />
                  </div>
                  <div className="about5-authortext">
                <Link to="/services" 
                      className="font-20 weight-600 color37 lineh-20 margin-b d-inline-block font-outfit ts" >Proven Tax and Business Solutions</Link>
                    <p className="font-outfit font-16 lineh-26 weight-400 color38 ts text-justify">
                      Maximize financial efficiency with our consultancy. We
                      streamline taxes and optimize business practices, ensuring
                      a path to success tailored to your unique needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="animationcss">
                <div className="about5-authorarea margin-t32">
                  <div className="author0mages">
                    <img
                      src="/assets/images/icons/check1.png"
                      alt=""
                      className="ts"
                    />
                  </div>
                  <div className="about5-authortext">
                  <Link to="/services" 
                      className="font-20 weight-600 color37 lineh-20 margin-b d-inline-block font-outfit ts" >Strategic Financial Insights</Link>
                    <p className="font-outfit font-16 lineh-26 weight-400 color38 team-section-textarea ts text-justify">
                      Empower your financial decision-making with our Strategic
                      Financial Insights. Uncover opportunities, mitigate risks,
                      and stay ahead of market trends, ensuring a resilient and
                      prosperous financial future for your business.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="welcome5-imags">
              <img
                src="/assets/images/sectionimg/out1.webp"
                alt=""
                className="welcome2-imas5"
              />
              <img
                src="/assets/images/elementor/elementor25.png"
                alt=""
                className=" elementors keyframe3"
              />
            </div>
          </div>
        </div>
      </div>
      <img
        src="src/assets/images/elementor/elementor24.png"
        alt=""
        className="elementors1"
      />
    </div>
  );
}

export default Welcome;
