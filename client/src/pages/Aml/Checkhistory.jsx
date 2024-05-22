import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import authStore from "../../store/user/authStore";
import Loader from "../../components/Loader";
import NewcheckButton from "./NewcheckButton";
// import Printbutton from "./Printbutton";
import handlePrint from "./Printbutton";
import { useSidebar } from "../../ContextApi/SidebarContext";
import { useRef } from "react";

function Checkhistory({ items }) {
  const [isButtonExpanded, setIsButtonExpanded] = useState(false);

  const handleButtonClick = () => {
    setIsButtonExpanded(!isButtonExpanded);
  };

  const PrintNosanction = () => {
    window.print();
  };

  const printRef = useRef();

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  function closeSidebar() {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  }

  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isIndividual, setIsIndividual] = useState(false);
  const [isCorporate, setIsCorporate] = useState(false);
  const [webhookUpdateData, setWebhookUpdateData] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/user/viewSearchhistory");
        // console.log("History response", response.data);
        setHistory(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error in fetching history");
      }
    };

    const fetchWebhookUpdates = async (sessionId) => {
      try {
        const response = await axios.get(
          `/user/getWebhookSessionUpdate/${sessionId}`
        );

        setWebhookUpdateData(response.data.sessionId);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };

    fetchHistory();
    fetchWebhookUpdates();
  }, []);

  const fetchSearchResults = () => {
    setIsLoading(true);

    const normalizedQuery = searchQuery.toLowerCase();
    const filtered = history.filter((entry) => {
      const companyName = (() => {
        try {
          const parsedQuery = JSON.parse(entry.query);

          if (parsedQuery.metadata) {
            return (
              parsedQuery.metadata.company_name ||
              parsedQuery.metadata.full_name ||
              parsedQuery.metadata.first_name ||
              "Unknown"
            ).toLowerCase();
          } else {
            return "unknown";
          }
        } catch (error) {
          console.error("Error parsing or accessing query", error);
          return "Unknown";
        }
      })();
      return companyName.includes(normalizedQuery);
    });
    setFilteredHistory(filtered);
  };

  const store = authStore();

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await store.logout();
      // console.log("User logged out successfully");
      navigate("/loginaml");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const fetchDetails = async (id) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/user/viewDetailhistory/${id}`);

      if (response && response.data) {
        const responseData = response.data;
        // console.log("Session id:", responseData.response.data.id);
        // console.log("Response Data:", responseData.response.data);
        setSelectedData(responseData);

        const queryData = JSON.parse(responseData.query);
        const type = queryData.metadata.Type;
        // console.log("Type", type);

        setIsIndividual(type === "individual");
        setIsCorporate(type === "corporate");
      } else {
        console.error("Empty or invalid response data received");
      }
    } catch (error) {
      console.error("Error in fetching details data", error);
    } finally {
      setIsLoading(false);
    }
  };

  //webhook updates fetching function

  const commonStyle = {
    fontFamily: "Arial, sans-serif",
    fontWeight: "normal",
    fontSize: "0.8em",
    margin: "0",
  };

  return isLoading ? (
    <>
      <Loader />
    </>
  ) : (
    <div className="main_container">
      {isIndividual && (
        <>
          <div
            style={{
              paddingTop: "30px",
              paddingLeft: "20px",
              marginLeft: "50px",
            }}
          >
            <Link to="/dashboardaml">
              <Button>Go back</Button>
            </Link>
          </div>

          <div
            style={{
              paddingBottom: "10px",
              marginLeft: "50px",
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "20px",
            }}
          >
            {selectedData &&
              selectedData.response &&
              selectedData.response.data && (
                <React.Fragment>
                  <h5
                    style={{
                      marginTop: "50px",
                    }}
                  >
                    SessionId: {selectedData.response.data.id}
                  </h5>
                  <div></div>
                  <div
                    style={{
                      position: "sticky",
                      top: "0",
                      zIndex: "100",
                      background: "#ffffff",
                      padding: "20px",
                      margin: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Link to="/dashboardaml">
                        {" "}
                        {/* <Button style={{ marginRight: "10px" }}>Go back</Button> */}
                      </Link>
                      {/* <Printbutton style={{ marginLeft: "auto" }} /> */}
                    </div>
                  </div>
                </React.Fragment>
              )}
          </div>
          <div ref={printRef}>
            {selectedData &&
            selectedData.response &&
            selectedData.response.data &&
            selectedData.response.data.result &&
            selectedData.response.data.result.matchedEntities === null ? (
              <div style={{ marginLeft: "130px", marginTop: "80px" }}>
                <div>
                  <div>
                    <img
                      className="img-fluid p-1"
                      style={{ height: "58px", width: "160px" }}
                      src="assets/images/logo/pnglogo-02-01 1.png"
                      alt=""
                    />
                    <span>
                      <img
                        className="img-fluid p-1"
                        style={{
                          height: "50px",
                          width: "150px",
                          marginLeft: "70%",
                        }}
                        src="assets/images/logo/powered by zain sec.png"
                        alt=""
                      />
                    </span>
                    <div style={{ paddingBottom: "20px" }}>
                      <b style={{ marginLeft: "32%", fontSize: "25px" }}>
                        Individual PEP sanction screening report
                      </b>
                    </div>
                  </div>
                </div>
                <h4 style={{ marginBottom: "50px" }}>
                  No match found for PEP and Sanctions.
                </h4>
                <button
                  type="button"
                  class="btn btn-dark"
                  onClick={() => PrintNosanction()}
                >
                  Print Report
                </button>
              </div>
            ) : null}
          </div>

          <div
            ref={printRef}
            style={{
              height:
                selectedData &&
                selectedData.response &&
                selectedData.response.data &&
                selectedData.response.data.result &&
                selectedData.response.data.result.matchedEntities != null
                  ? "100vh"
                  : ".8vh",
              overflow: "auto",
            }}
          >
            {selectedData &&
            selectedData.response &&
            selectedData.response.data &&
            selectedData.response.data.result &&
            selectedData.response.data.result.matchedEntities != null ? (
              selectedData.response.data.result.matchedEntities.map(
                (entity, index) => (
                  <div
                    key={index}
                    id={`print-section-${index}`}
                    style={{ width: "1350px", marginLeft: "50px" }}
                  >
                    <div>
                      {isButtonExpanded && (
                        <div>
                          <img
                            className="img-fluid p-1"
                            style={{ height: "58px", width: "160px" }}
                            src="assets/images/logo/pnglogo-02-01 1.png"
                            alt=""
                          />
                          <span>
                            <img
                              className="img-fluid p-1"
                              style={{
                                height: "50px",
                                width: "150px",
                                marginLeft: "70%",
                              }}
                              src="assets/images/logo/powered by zain sec.png"
                              alt=""
                            />
                          </span>
                          <div style={{ paddingBottom: "20px" }}>
                            <b style={{ marginLeft: "32%", fontSize: "25px" }}>
                              Individual PEP sanction screening report
                            </b>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className="accordion-item mb-2"
                      style={{
                        border: "2px solid grey ",
                        borderRadius: "15px",
                      }}
                    >
                      {/* <Button  onClick={() => handlePrint(`print-section-${index}`)}>Print</Button> */}
                      <button
                        style={{
                          justifyContent: "space-between",
                          borderRadius: 16,
                          display: "flex",
                          alignItems: "center", // Align items vertically
                        }}
                        className={`accordion-button ${
                          isButtonExpanded ? "expanded" : "collapsed"
                        } d-flex`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index}`}
                        aria-expanded={isButtonExpanded}
                        aria-controls={`collapse-${index}`}
                        onClick={handleButtonClick}
                      >
                        <div style={{ color: "var(--orange)" }}>{`Match ${
                          index + 1
                        }`}</div>
                        <div className="svgResult" style={{ width: "400px" }}>
                          {entity.firstName} {entity.lastName}
                        </div>
                        <div className="svgResult">{entity.dob}</div>
                        <div style={{ marginLeft: "auto" }}>
                          {" "}
                          {/* Move the print button to the right */}
                          {/* {isButtonExpanded && <Printbutton printRef={printRef} />} */}
                          {isButtonExpanded && (
                            //  <Button  onClick={() => handlePrint(`print-section-${index}`)}>Print Report</Button>
                            <button
                              type="button"
                              class="btn btn-dark"
                              onClick={() =>
                                handlePrint(`print-section-${index}`)
                              }
                            >
                              Print Report
                            </button>
                          )}
                        </div>
                      </button>

                      <div
                        id={`collapse-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading-${index}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body p-lg-5">
                          <div>
                            {entity.resultEntity.images &&
                              entity.resultEntity.images.length > 0 &&
                              entity.resultEntity.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={`profile image ${index + 1}`}
                                  style={{
                                    maxWidth: "10%",
                                    marginBottom: "10px",
                                  }}
                                />
                              ))}
                          </div>

                          <div className="row mb-2 accordion-row">
                            <div className="col-sm-4">
                              <h3 className="mb-3" style={{ fontWeight: 600 }}>
                                {entity.firstName} {entity.middleName}{" "}
                                {entity.lastName}
                              </h3>
                              <div
                                style={{
                                  fontWeight: 500,
                                  color: "var(--text)",
                                }}
                              >
                                <p className="p-0 m-0">
                                  First name: {entity.firstName}
                                </p>
                                <p className="p-0 m-0">
                                  Middle name: {entity.middleName}
                                </p>
                                <p className="p-0 m-0">
                                  Middle name: {entity.lastName}
                                </p>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <p>Date of birth:{entity.dob}</p>
                            </div>

                            <div className="col-sm-4">
                              {entity.resultEntity?.gender && (
                                <p>Gender: {entity.resultEntity.gender} </p>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-4">
                              <form className="formAccordings">
                                <div className="form-group row">
                                  <label
                                    htmlFor="firstName"
                                    className="col col-form-label"
                                  >
                                    Category:{entity.category}
                                  </label>

                                  <div className="col">
                                    <span
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      className="form-control-plaintext"
                                    ></span>
                                  </div>
                                </div>

                                <div className="form-group row">
                                  <label
                                    htmlFor="firstName"
                                    className="col col-form-label"
                                  >
                                    Categories:
                                  </label>

                                  <div className="col">
                                    {entity.resultEntity?.categories && (
                                      <span
                                        style={{
                                          fontWeight: 500,
                                        }}
                                      >
                                        {entity.resultEntity.categories
                                          .split(", ")
                                          .map((category, subIndex) => (
                                            <li key={subIndex}>{category}</li>
                                          ))}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="form-group row">
                                  <label
                                    htmlFor="lastName"
                                    className="col col-form-label"
                                  >
                                    {/* Category */}
                                  </label>
                                  <div className="col">
                                    <span
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      className="form-control-plaintext"
                                    >
                                      :
                                    </span>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="col-sm-4" style={{ fontSize: 14 }}>
                              <p>
                                Nationality:{" "}
                                {entity.resultEntity?.nationalities && (
                                  <span style={{ fontWeight: 500 }}>
                                    {entity.resultEntity.nationalities.map(
                                      (nationality, subIndex) => (
                                        <span key={subIndex}>
                                          {nationality}
                                        </span>
                                      )
                                    )}
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="col-sm-4">
                              <form style={{ fontSize: 14 }}>
                                <div className="form-group row">
                                  <div className="col"></div>
                                </div>

                                <div className="form-group row">
                                  <label
                                    htmlFor="firstName"
                                    className="col col-form-label"
                                  >
                                    Descriptions:
                                  </label>
                                  <div>
                                    {entity.resultEntity?.descriptions && (
                                      <ul
                                        style={{
                                          fontWeight: 500,
                                        }}
                                      >
                                        {Object.keys(
                                          entity.resultEntity.descriptions[0]
                                        ).map(
                                          (key, subIndex) =>
                                            entity.resultEntity.descriptions[0][
                                              key
                                            ] && (
                                              <li key={subIndex}>
                                                {key}:{" "}
                                                {
                                                  entity.resultEntity
                                                    .descriptions[0][key]
                                                }
                                              </li>
                                            )
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h5 className="accordion-header" id="gThree">
                              Other names :
                            </h5>
                            <div id="eThree" aria-labelledby="gThree">
                              <div className="accordion-body">
                                FirstName: {entity.firstName}
                              </div>
                              <div className="accordion-body">
                                MiddleName: {entity.middleName}
                              </div>
                              <div className="accordion-body">
                                lastName: {entity.lastName}
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-4">
                            <form className="linked-companies-form">
                              <div className="form-group row">
                                <div className="col"></div>
                              </div>

                              <div className="form-group row">
                                <label
                                  htmlFor="firstName"
                                  className="col col-form-label"
                                  style={{
                                    fontFamily: "Arial, sans-serif",
                                    fontWeight: "normal",
                                    fontSize: "0.8em", // Adjusted font size
                                  }}
                                >
                                  Linked Companies:
                                </label>
                                <div>
                                  {entity.resultEntity?.linkedCompanies &&
                                  entity.resultEntity.linkedCompanies.length >
                                    0 ? (
                                    <ul className="linked-companies-list">
                                      {entity.resultEntity.linkedCompanies.map(
                                        (company, index) => (
                                          <li
                                            key={index}
                                            className="linked-company-item"
                                            style={{
                                              fontFamily: "Arial, sans-serif",
                                              fontWeight: "normal",
                                              fontSize: "0.8em", // Adjusted font size
                                            }}
                                          >
                                            <div className="linked-company-info">
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                Category: {company.category}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                Description:{" "}
                                                {company.description}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                CompanyName : {company.name}
                                                {/* ID: {company.id} */}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                ID: {company.id}
                                              </p>

                                              {company.lastReviewed && (
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.8em",
                                                  }}
                                                >
                                                  Last Reviewed:{" "}
                                                  {company.lastReviewed}
                                                </p>
                                              )}
                                              {company.defaultingYear && (
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.8em",
                                                    marginTop: "8px",
                                                  }}
                                                >
                                                  Defaulting Year:{" "}
                                                  {company.defaultingYear}
                                                </p>
                                              )}
                                            </div>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  ) : (
                                    <p
                                      className="no-linked-companies-message"
                                      style={{
                                        fontSize: "0.8em",
                                      }}
                                    >
                                      No linked companies available.
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor="firstName"
                                  className="col col-form-label"
                                  style={{
                                    fontFamily: "Arial, sans-serif",
                                    fontWeight: "normal",
                                    fontSize: "0.8em", // Adjusted font size
                                  }}
                                >
                                  Linked Individuals:
                                </label>
                                <div>
                                  {entity.resultEntity?.linkedIndividuals &&
                                  entity.resultEntity.linkedIndividuals.length >
                                    0 ? (
                                    <ul className="linked-companies-list">
                                      {entity.resultEntity.linkedIndividuals.map(
                                        (individual, index) => (
                                          <li
                                            key={index}
                                            className="linked-company-item"
                                            style={{
                                              fontFamily: "Arial, sans-serif",
                                              fontWeight: "normal",
                                              fontSize: "0.8em", // Adjusted font size
                                            }}
                                          >
                                            <div className="linked-company-info">
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                Category: {individual.category}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                Description:{" "}
                                                {individual.description}
                                                {/* ID: {company.id} */}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                Firstname:{" "}
                                                {individual.first_name}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                Id : {individual.id}
                                                {/* ID: {company.id} */}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.2em",
                                                }}
                                              >
                                                LastName: {individual.last_name}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.2em",
                                                }}
                                              >
                                                MiddleName:{" "}
                                                {individual.middle_name}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.2em",
                                                }}
                                              >
                                                Subcategories:{" "}
                                                {individual.subcategories}
                                              </p>
                                            </div>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  ) : (
                                    <p
                                      className="no-linked-companies-message"
                                      style={{
                                        fontSize: "0.8em",
                                      }}
                                    >
                                      No linked Individuals available.
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor="firstName"
                                  className="col col-form-label"
                                  style={{
                                    fontFamily: "Arial, sans-serif",
                                    fontWeight: "normal",
                                    fontSize: "0.8em", // Adjusted font size
                                  }}
                                >
                                  Sources:
                                </label>
                                <div>
                                  {entity.resultEntity?.sources &&
                                  entity.resultEntity.sources.length > 0 ? (
                                    <ul className="linked-companies-list">
                                      {entity.resultEntity.sources.map(
                                        (sources, index) => (
                                          <li
                                            key={index}
                                            className="linked-company-item"
                                            style={{
                                              fontFamily: "Arial, sans-serif",
                                              fontWeight: "normal",
                                              fontSize: "0.8em", // Adjusted font size
                                            }}
                                          >
                                            <div className="linked-company-info">
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                cached_url: {sources.cached_url}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                Categories: {sources.categories}
                                                {/* ID: {company.id} */}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                dates: {sources.dates}
                                              </p>
                                              <p
                                                style={{
                                                  margin: "0",
                                                  fontSize: "0.8em",
                                                }}
                                              >
                                                Url :{" "}
                                                <a
                                                  href={sources.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  {sources.url}
                                                </a>
                                              </p>
                                            </div>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  ) : (
                                    <p
                                      className="no-linked-companies-message"
                                      style={{
                                        fontSize: "0.8em",
                                      }}
                                    >
                                      No Sources available.
                                    </p>
                                  )}
                                </div>
                              </div>
                            </form>
                          </div>

                          <div></div>

                          <div className="col-sm-4">
                            <form style={{ fontSize: 14 }}>
                              <div className="form-group row">
                                <div className="col"></div>
                              </div>
                            </form>
                          </div>

                          <div className="col-sm-4">
                            <form className="linked-companies-form">
                              <div className="form-group row">
                                <div className="col"></div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <h1>No result found</h1>
            )}
          </div>
        </>
      )}
      {isCorporate && (
        <>
          <div>
            <div
              style={{
                paddingTop: "30px",
                paddingLeft: "20px",
                marginLeft: "40px",
              }}
            >
              <Link to="/newcheckaml">
                <Button>Go back</Button>
              </Link>
            </div>
            <div
              style={{
                paddingBottom: "50px",
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "20px",
              }}
            >
              {" "}
              {selectedData &&
                selectedData.response &&
                selectedData.response.data && (
                  <React.Fragment>
                    <h5
                      style={{
                        marginTop: "50px",
                        marginLeft: "50px",
                      }}
                    >
                      SessionId: {selectedData.response.data.id}
                    </h5>

                    <div
                      style={{
                        position: "sticky",
                        top: "0",
                        zIndex: "100",
                        background: "#ffffff",
                        padding: "20px",
                        margin: "10px",
                      }}
                    ></div>
                  </React.Fragment>
                )}
            </div>
            <div ref={printRef}>
              {selectedData &&
              selectedData.response &&
              selectedData.response.data &&
              selectedData.response.data.result &&
              selectedData.response.data.result.matchedEntities === null ? (
                <div style={{ marginLeft: "130px", marginTop: "80px" }}>
                  <div>
                    <div>
                      <img
                        className="img-fluid p-1"
                        style={{ height: "58px", width: "160px" }}
                        src="assets/images/logo/pnglogo-02-01 1.png"
                        alt=""
                      />
                      <span>
                        <img
                          className="img-fluid p-1"
                          style={{
                            height: "50px",
                            width: "150px",
                            marginLeft: "70%",
                          }}
                          src="assets/images/logo/powered by zain sec.png"
                          alt=""
                        />
                      </span>
                      <div style={{ paddingBottom: "20px" }}>
                        <b style={{ marginLeft: "32%", fontSize: "25px" }}>
                          Corporate PEP sanction screening report
                        </b>
                      </div>
                    </div>
                  </div>

                  <h4 style={{ marginBottom: "50px" }}>
                  No match found for Sanctions and Adverse Media.
                  </h4>
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={() => PrintNosanction()}
                  >
                    Print Report
                  </button>
                </div>
              ) : null}
            </div>
            <div
              ref={printRef}
              style={{
                height:
                  selectedData &&
                  selectedData.response &&
                  selectedData.response.data &&
                  selectedData.response.data.result &&
                  selectedData.response.data.result.matchedEntities != null
                    ? "100vh"
                    : ".8vh",
                overflow: "auto",
              }}
            >
              {selectedData &&
              selectedData.response &&
              selectedData.response.data &&
              selectedData.response.data.result &&
              selectedData.response.data.result.matchedEntities != null ? (
                selectedData.response.data.result.matchedEntities.map(
                  (entity, index) => (
                    <div
                      key={index}
                      id={`print-section-${index}`}
                      style={{ width: "1350px", marginLeft: "50px" }}
                    >
                      <div>
                        {isButtonExpanded && (
                          <div>
                            <img
                              className="img-fluid p-1"
                              style={{ height: "58px", width: "160px" }}
                              src="assets/images/logo/pnglogo-02-01 1.png"
                              alt=""
                            />
                            <span>
                              <img
                                className="img-fluid p-1"
                                style={{
                                  height: "50px",
                                  width: "150px",
                                  marginLeft: "55%",
                                }}
                                src="assets/images/logo/powered by zain sec.png"
                                alt=""
                              />
                            </span>
                            <div style={{ paddingBottom: "20px" }}>
                              <b
                                style={{ marginLeft: "28%", fontSize: "25px" }}
                              >
                                Corporate PEP sanction screening report
                              </b>
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        className="accordion-item mb-2"
                        style={{
                          border: "2px solid grey ",
                          borderRadius: "15px",
                        }}
                      >
                        <button
                          style={{
                            justifyContent: "space-between",
                            borderRadius: 16,
                          }}
                          className={`accordion-button ${
                            isButtonExpanded ? "expanded" : "collapsed"
                          } d-flex`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${index}`}
                          aria-expanded={isButtonExpanded}
                          aria-controls={`collapse-${index}`}
                          onClick={handleButtonClick}
                        >
                          <div style={{ color: "var(--orange)" }}>{`Match ${
                            index + 1
                          }`}</div>
                          <div className="svgResult" style={{ width: "400px" }}>
                            {}
                          </div>

                          <div className="svgResult">{entity.name}</div>
                          <div className="svgResult"></div>
                          <div style={{ marginLeft: "auto" }}>
                            {isButtonExpanded && (
                              //  <Button  onClick={() => handlePrint(`print-section-${index}`)}>Print Report</Button>
                              <button
                                type="button"
                                class="btn btn-dark"
                                onClick={() =>
                                  handlePrint(`print-section-${index}`)
                                }
                              >
                                Print Report
                              </button>
                            )}
                          </div>
                        </button>

                        <div
                          id={`collapse-${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`heading-${index}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body p-lg-5">
                            <div>
                              {entity.resultEntity.images &&
                                entity.resultEntity.images.length > 0 &&
                                entity.resultEntity.images.map(
                                  (image, index) => (
                                    <img
                                      key={index}
                                      src={image}
                                      alt={`profile image ${index + 1}`}
                                      style={{
                                        maxWidth: "10%",
                                        marginBottom: "10px",
                                      }}
                                    />
                                  )
                                )}
                            </div>

                            <div className="row mb-2 accordion-row">
                              <div className="col-sm-4">
                                {entity.resultEntity.locations &&
                                  entity.resultEntity.locations.length > 0 && (
                                    <div>
                                      {entity.resultEntity.locations.map(
                                        (location, index) => (
                                          <div key={index}>
                                            <div
                                              style={{
                                                fontWeight: 500,
                                                color: "var(--text)",
                                              }}
                                            >
                                              <p className="p-0 m-0">
                                                Address: {location.address}
                                              </p>
                                              <p className="p-0 m-0">
                                                City: {location.city}
                                              </p>
                                              <p className="p-0 m-0">
                                                Country: {location.country}
                                              </p>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-4">
                                <form className="formAccordings">
                                  <div className="form-group row">
                                    <label
                                      htmlFor="firstName"
                                      className="col col-form-label"
                                    >
                                      Category:{entity.category}
                                    </label>

                                    <div className="col">
                                      <span
                                        style={{
                                          fontWeight: 500,
                                        }}
                                        className="form-control-plaintext"
                                      ></span>
                                    </div>
                                  </div>
                                  <div>
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        borderRadius: "5px",
                                        backgroundColor: "#f0f0f0",
                                        display: "block",
                                        width: "100%",
                                      }}
                                    >
                                      General info
                                    </span>
                                    <div
                                      style={{
                                        marginTop: "20px",
                                      }}
                                    >
                                      {entity.resultEntity?.generalInfo && (
                                        <ul
                                          style={{
                                            fontWeight: 500,
                                          }}
                                        >
                                          <li>
                                            {entity.resultEntity.generalInfo
                                              .entityName && (
                                              <span>
                                                {
                                                  entity.resultEntity
                                                    .generalInfo.entityName
                                                }
                                              </span>
                                            )}
                                          </li>

                                          <li>
                                            {entity.resultEntity.generalInfo
                                              .businessDescription && (
                                              <p
                                                style={{
                                                  maxWidth: "600px",
                                                }}
                                              >
                                                Business Description:{" "}
                                                {
                                                  entity.resultEntity
                                                    .generalInfo
                                                    .businessDescription
                                                }
                                              </p>
                                            )}
                                          </li>

                                          <li
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            {entity.resultEntity.generalInfo
                                              .website && (
                                              <p>
                                                Website:{" "}
                                                <a
                                                  href={
                                                    entity.resultEntity
                                                      .generalInfo.website
                                                  }
                                                >
                                                  {
                                                    entity.resultEntity
                                                      .generalInfo.website
                                                  }
                                                </a>
                                              </p>
                                            )}
                                          </li>
                                        </ul>
                                      )}
                                    </div>
                                  </div>

                                  <div className="form-group row">
                                    <label
                                      htmlFor="lastName"
                                      className="col col-form-label"
                                    >
                                      {/* Category */}
                                    </label>
                                    <div className="col">
                                      <span
                                        style={{
                                          fontWeight: 500,
                                        }}
                                        className="form-control-plaintext"
                                      ></span>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div
                                className="col-sm-4"
                                style={{ fontSize: 14 }}
                              >
                                {/* <p>
                                                Nationality:{" "}
                                                {entity.resultEntity
                                                  ?.nationalities && (
                                                  <span
                                                    style={{ fontWeight: 500 }}
                                                  >
                                                    {entity.resultEntity.nationalities.map(
                                                      (
                                                        nationality,
                                                        subIndex
                                                      ) => (
                                                        <span key={subIndex}>
                                                          {nationality}
                                                        </span>
                                                      )
                                                    )}
                                                  </span>
                                                )}
                                              </p> */}
                              </div>
                              <div className="col-sm-4">
                                <form style={{ fontSize: 14 }}>
                                  <div className="form-group row">
                                    <div className="col"></div>
                                  </div>

                                  <div className="form-group row">
                                    <label
                                      style={{
                                        fontWeight: "bold",
                                        borderRadius: "5px",
                                        backgroundColor: "#f0f0f0",
                                        display: "block",
                                        width: "100%",
                                      }}
                                      htmlFor="firstName"
                                      className="col col-form-label"
                                    >
                                      Descriptions:
                                    </label>

                                    <div>
                                      {entity.resultEntity?.descriptions && (
                                        <ul
                                          style={{
                                            fontWeight: 500,
                                          }}
                                        >
                                          {entity.resultEntity.descriptions.map(
                                            (description, index) => (
                                              <li key={index}>
                                                <ul>
                                                  {Object.entries(
                                                    description
                                                  ).map(
                                                    (
                                                      [
                                                        descriptionKey,
                                                        descriptionValue,
                                                      ],
                                                      subIndex
                                                    ) =>
                                                      descriptionValue && (
                                                        <li key={subIndex}>
                                                          {descriptionKey}:{" "}
                                                          {descriptionValue}
                                                        </li>
                                                      )
                                                  )}
                                                </ul>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      )}
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>

                            {/* <div>
                                            <button
                                              onClick={toggleDetails}
                                              style={{
                                                cursor: "pointer",
                                                fontWeight: "bold",
                                                border: "1px solid #ccc",
                                                padding: "10px",
                                                borderRadius: "5px",
                                                backgroundColor: "#f0f0f0",
                                                display: "block",
                                                width: "100%",
                                              }}
                                            >
                                              Other names
                                            </button>
                                            {showDetails &&
                                              entity.resultEntity
                                                ?.nameDetails && (
                                                <ul style={{ fontWeight: 500 }}>
                                                  {entity.resultEntity.nameDetails.map(
                                                    (description, index) => (
                                                      <li key={index}>
                                                        {description.entityName && (
                                                          <span>
                                                            {
                                                              description.entityName
                                                            }
                                                          </span>
                                                        )}
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              )}
                                          </div> */}

                            <div className="col-sm-4">
                              <form className="linked-companies-form">
                                <div className="form-group row">
                                  <div className="col"></div>
                                </div>

                                <div className="form-group row">
                                  <label
                                    htmlFor="firstName"
                                    className="col col-form-label"
                                    style={{
                                      fontFamily: "Arial, sans-serif",
                                      fontWeight: "normal",
                                      fontSize: "0.8em", // Adjusted font size
                                    }}
                                  >
                                    Linked Companies:
                                  </label>
                                  <div>
                                    {entity.resultEntity?.linked_companies &&
                                    entity.resultEntity.linked_companies
                                      .length > 0 ? (
                                      <ul className="linked-companies-list">
                                        {entity.resultEntity.linked_companies.map(
                                          (company, index) => (
                                            <li
                                              key={index}
                                              className="linked-company-item"
                                              style={{
                                                fontFamily: "Arial, sans-serif",
                                                fontWeight: "normal",
                                                fontSize: "0.8em", // Adjusted font size
                                              }}
                                            >
                                              <div className="linked-company-info">
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.8em",
                                                  }}
                                                >
                                                  Category:{" "}
                                                  {
                                                    // company.category
                                                  }
                                                </p>
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.8em",
                                                  }}
                                                >
                                                  Description:{" "}
                                                  {
                                                    // company.description
                                                  }
                                                </p>
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.8em",
                                                  }}
                                                >
                                                  {/* ID: {company.id} */}
                                                </p>
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.2em",
                                                  }}
                                                >
                                                  Name: {company.name}
                                                </p>
                                                {company.lastReviewed && (
                                                  <p
                                                    style={{
                                                      margin: "0",
                                                      fontSize: "0.8em",
                                                    }}
                                                  >
                                                    Last Reviewed:{" "}
                                                    {company.lastReviewed}
                                                  </p>
                                                )}
                                                {company.defaultingYear && (
                                                  <p
                                                    style={{
                                                      margin: "0",
                                                      fontSize: "0.8em",
                                                      marginTop: "8px",
                                                    }}
                                                  >
                                                    Defaulting Year:{" "}
                                                    {company.defaultingYear}
                                                  </p>
                                                )}
                                              </div>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : (
                                      <p
                                        className="no-linked-companies-message"
                                        style={{
                                          fontSize: "0.8em",
                                        }}
                                      >
                                        No linked companies available.
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label
                                    htmlFor="firstName"
                                    className="col col-form-label"
                                    style={{
                                      fontFamily: "Arial, sans-serif",
                                      fontWeight: "normal",
                                      fontSize: "0.8em", // Adjusted font size
                                    }}
                                  >
                                    Linked Individuals:
                                  </label>
                                  <div>
                                    {entity.resultEntity?.linked_individuals &&
                                    entity.resultEntity.linked_individuals
                                      .length > 0 ? (
                                      <ul className="linked-companies-list">
                                        {entity.resultEntity.linked_individuals.map(
                                          (individuals, index) => (
                                            <li
                                              key={index}
                                              className="linked-company-item"
                                              style={{
                                                fontFamily: "Arial, sans-serif",
                                                fontWeight: "normal",
                                                fontSize: "0.8em", // Adjusted font size
                                              }}
                                            >
                                              <div className="linked-company-info">
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.8em",
                                                  }}
                                                >
                                                  Category:
                                                  {individuals.category}
                                                  {
                                                    // company.category
                                                  }
                                                </p>
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.8em",
                                                  }}
                                                >
                                                  Description:
                                                  {individuals.description}
                                                  {
                                                    // company.description
                                                  }
                                                </p>
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.8em",
                                                  }}
                                                >
                                                  fiestname:{" "}
                                                  {individuals.first_name}
                                                </p>
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.2em",
                                                  }}
                                                >
                                                  Id: {individuals.id}
                                                </p>
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.2em",
                                                  }}
                                                >
                                                  lastname:{" "}
                                                  {individuals.last_name}
                                                </p>
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.2em",
                                                  }}
                                                >
                                                  middlename:{" "}
                                                  {individuals.middle_name}
                                                </p>
                                                <p
                                                  style={{
                                                    margin: "0",
                                                    fontSize: "0.2em",
                                                  }}
                                                >
                                                  subcategories :{" "}
                                                  {individuals.subcategories}
                                                </p>
                                              </div>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : (
                                      <p
                                        className="no-linked-companies-message"
                                        style={{
                                          fontSize: "0.8em",
                                        }}
                                      >
                                        No linked companies available.
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="form-group row">
                                  <label
                                    htmlFor="firstName"
                                    className="col col-form-label"
                                    style={commonStyle}
                                  >
                                    Sources:
                                  </label>
                                  <div>
                                    {entity.resultEntity?.sources &&
                                    entity.resultEntity.sources.length > 0 ? (
                                      <ul className="linked-companies-list">
                                        {entity.resultEntity.sources.map(
                                          (source, index) => (
                                            <li
                                              key={index}
                                              className="linked-company-item"
                                              style={commonStyle}
                                            >
                                              <div className="linked-company-info">
                                                <p style={commonStyle}>
                                                  Cached URL:{" "}
                                                  {source.cached_url}
                                                </p>
                                                <p style={commonStyle}>
                                                  Categories:{" "}
                                                  {source.categories}
                                                </p>
                                                <p style={commonStyle}>
                                                  Dates: {source.dates}
                                                </p>
                                                <p style={commonStyle}>
                                                  URL:
                                                  <a
                                                    href={source.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
                                                    {source.url}
                                                  </a>
                                                </p>
                                              </div>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : (
                                      <p
                                        className="no-linked-companies-message"
                                        style={commonStyle}
                                      >
                                        No Sources available.
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </form>
                            </div>

                            <div className="col-sm-4">
                              <form style={{ fontSize: 14 }}>
                                <div className="form-group row">
                                  <div className="col"></div>
                                </div>
                              </form>
                            </div>

                            <div className="col-sm-4">
                              <form className="linked-companies-form">
                                <div className="form-group row">
                                  <div className="col"></div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div>No result found</div>
              )}
            </div>
          </div>
        </>
      )}

      {isIndividual || isCorporate ? null : (
        <div className="container-fluid">
          <div className="row vh-100" style={{ position: "relative" }}>
            {/* mobile_header */}
            <div
              className="mobile-header mobile-header-4 d-block d-lg-none homepagesmall"
              style={{
                backgroundColor: "rgba(237, 237, 237, 0.978)",
                backdropFilter: "blur(10px)",
                position: "relative",
              }}
            >
              <div className="container-fluid">
                <div className="col-12">
                  <div className="mobile-header-elements">
                    <div className="mobile-logo">
                      <a href="index.html">
                        <img
                          className="img-fluid p-1"
                          style={{ height: "56px", width: "160px" }}
                          src="assets/images/logo/white_bglogo.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div
                      style={{ borderColor: "black", cursor: "pointer" }}
                      className="mobile-nav-icon dots-menu"
                      onClick={toggleSidebar}
                    >
                      <i
                        style={{ color: "black" }}
                        className="fa-solid fa-bars"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`mobile-sidebar pt-3 px-0 vh-100  ${
                isSidebarOpen ? "mobile-menu-active" : ""
              }`}
            >
              <div className="logoicons-area px-4">
                <div className="logos">
                  <img
                    className="img-fluid p-1"
                    style={{ height: 56 }}
                    src="/assets/images/logo/black_bg logo.jpg"
                    alt="logo"
                  />
                </div>
                <div onClick={closeSidebar}>
                  <i className="fa-solid fa-xmark" />
                </div>
              </div>
              <div className="nav flex-column mt-5 pt-5 nav-pills btn_sidebar">
                <hr className="m-0" />
                <Link to="/dashboardaml" className="m-0">
                  <button
                    className="meeem nav-link align-items-center d-flex py-4 pe-0 m-0 menu-close5"
                    style={{
                      color: "var(--orange)",
                      backgroundColor: "white",
                      width: "100%",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <i className="pe-3 fa-solid fa-dashboard" />
                      Dashboard
                    </div>
                  </button>
                </Link>
                <hr className="m-0" />
                <Link to="/profileaml" onClick={closeSidebar} className="m-0">
                  <button
                    className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4"
                    style={{ width: "100%", color: "var(--orange)" }}
                  >
                    <div className="d-flex align-items-center">
                      <i className="pe-3 fa-solid fa-user" />
                      Profile
                    </div>
                  </button>
                </Link>
                <hr className="m-0" />
                <Link to="/newcheckaml" onClick={closeSidebar} className="m-0">
                  <button
                    className="btnremove menu-close1 nav-link align-items-center d-flex py-4 pe-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    style={{ width: "100%", color: "var(--orange)" }}
                  >
                    <div className="d-flex align-items-center">
                      <i className="pe-3 fa-solid fa-plus" />
                      New Check
                    </div>
                  </button>
                </Link>
                <hr className="m-0" />
                <Link
                  to="/checkhistoryaml"
                  onClick={closeSidebar}
                  className="m-0"
                >
                  <button
                    className="meeem menu-close2 nav-link align-items-center d-flex py-4 pe-0"
                    style={{ width: "100%", color: "var(--orange)" }}
                  >
                    <div className="d-flex align-items-center">
                      <i className="pe-3 fa-solid fa-history" />
                      Check History
                    </div>
                  </button>
                </Link>
                <hr className="m-0" />
                <Link
                  to="/notificationaml"
                  onClick={closeSidebar}
                  className="m-0"
                >
                  <button
                    className="meeem menu-close3 nav-link align-items-center d-flex py-4 pe-0"
                    style={{ width: "100%", color: "var(--orange)" }}
                  >
                    <div className="d-flex align-items-center">
                      <i className="pe-3 fa-solid fa-bell" />
                      Notifications
                    </div>
                  </button>
                </Link>
                <hr className="m-0" />
              </div>
              <div
                className="col logout p-4"
                id="logout"
                style={{ paddingTop: 40 }}
              >
                <button class="btn btn-primary" onClick={handleLogout}>
                  {/* <img src="/asset/images/icons/logout_icon.svg" alt="" /> */}
                  Logout
                </button>
              </div>
            </div>
            {/* sidebar_start */}
            <div
              style={{ position: "relative" }}
              className="col-sm-2 bg1 p-0 container-fluid overflow-hidden sidebarmain"
            >
              <div className="row m-0">
                <div className="py-5 m-0 d-flex justify-content-center align-items-start logo_section1">
                  <img
                    style={{ height: 140 }}
                    src="https://haashtech.github.io/etihadAMLfrontend/Echeck%20Final%20Logo-01.svg"
                    alt=""
                  />
                </div>

                <div className="logo_section2 pe-0 container-fluid p-0">
                  <div className="row m-0">
                    <div className="p-0 m-0">
                      <div className="text-white py-4">
                        <div
                          style={{ width: "100%" }}
                          className="d-flex align-items-start"
                        >
                          <div
                            style={{ width: "100%", boxSizing: "border-box" }}
                            className="nav flex-column nav-pills btn_sidebar"
                            id="v-pills-tab1"
                            role="tablist"
                            aria-orientation="vertical"
                          >
                            <hr className="m-0" />

                            <Link to="/dashboardaml">
                              <button
                                className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4"
                                id="v-pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-profile"
                                aria-selected="false"
                                style={{ width: "100%" }}
                              >
                                <div
                                  id="btn_profile_tab "
                                  style={{ color: "black" }}
                                >
                                  <iconify-icon
                                    className="pe-3"
                                    icon="radix-icons:dashboard"
                                  />
                                  <span style={{ marginLeft: "8px" }}>
                                    Dashboard
                                  </span>
                                </div>
                              </button>
                            </Link>

                            <hr className="m-0" />
                            <Link to="/profileaml">
                              <button
                                className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4"
                                id="v-pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-profile"
                                aria-selected="false"
                                style={{ width: "100%" }}
                              >
                                <div
                                  id="btn_profile_tab "
                                  style={{ color: "black" }}
                                >
                                  <iconify-icon
                                    className="pe-3"
                                    icon="healthicons:ui-user-profile"
                                  />
                                  <span style={{ marginLeft: "8px" }}>
                                    Profile
                                  </span>
                                </div>
                              </button>
                            </Link>
                            <hr className="m-0" />
                            <Link to="/newcheckaml">
                              <button
                                className="btnremove menu-close1 nav-link align-items-center d-flex py-4 pe-0"
                                title="Choose Your action"
                                data-bs-html="true"
                                data-bs-content="
                           <a href='newcheck_individual.html' class='btn btn-success'>individual</a>
                            <a href='newcheck_corporate.html' class='btn btn-danger'>corporate</a>
                             "
                                id="newcheck_sidebar"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                style={{ width: "100%", color: "white" }}
                              >
                                <div
                                  type="button"
                                  role="tab"
                                  aria-controls="v-pills-profile"
                                  aria-selected="false"
                                  className="d-flex align-items-center"
                                  style={{
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    color: "black",
                                  }}
                                >
                                  <iconify-icon
                                    className="pe-3"
                                    icon="ic:round-plus"
                                  />
                                  <span style={{ marginLeft: "8px" }}>
                                    New Check
                                  </span>
                                </div>
                              </button>
                            </Link>
                            <hr className="m-0" />
                            <Link to="/checkhistoryaml">
                              <button
                                className="meeem menu-close2 nav-link align-items-center d-flex py-4 pe-0"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-checkHistory"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-profile"
                                aria-selected="false"
                                id="v-pills-home-tab"
                                style={{ width: "100%", color: "black" }}
                              >
                                <div
                                  className="d-flex align-items-center"
                                  style={{
                                    textDecoration: "none",
                                    fontWeight: 500,
                                  }}
                                  href="#"
                                >
                                  <iconify-icon
                                    className="pe-3"
                                    icon="material-symbols:history-rounded"
                                  />
                                  <span style={{ marginLeft: "8px" }}>
                                    Check History
                                  </span>
                                </div>
                              </button>
                            </Link>
                            <hr className="m-0" />
                            <Link to="/notificationaml">
                              <button
                                className="meeem menu-close3 nav-link align-items-center d-flex py-4 pe-0"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-notifications"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-profile"
                                aria-selected="false"
                                id="v-pills-home-tab"
                                style={{ width: "100%", color: "black" }}
                              >
                                <div
                                  className="d-flex align-items-center"
                                  style={{
                                    textDecoration: "none",
                                    fontWeight: 500,
                                  }}
                                  href="#"
                                >
                                  <iconify-icon
                                    className="pe-3"
                                    icon="mi:notification"
                                  />
                                  <span style={{ marginLeft: "8px" }}>
                                    Notifications
                                  </span>
                                </div>
                              </button>
                            </Link>
                            <hr className="m-0" />
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              left: "20px",
                            }}
                          >
                            <button
                              style={{
                                padding: "10px",
                                backgroundColor: "#3498db", // Add your desired background color
                                color: "#ffffff", // Add your desired text color
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",

                                // Add a subtle box shadow
                              }}
                              onClick={handleLogout}
                            >
                              <img
                                src="/asset/images/icons/logout_icon.svg"
                                alt=""
                              />
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* sidebar_end */}
            <div
              className="col-sm-10 bg2 container-fluid"
              style={{ position: "relative" }}
            >
              <div className="row">
                {/* header */}
                <div
                  className="col-12 bg2_1 container-fluid backhomeheader"
                  style={{ height: "10vh" }}
                >
                  <div className="row">
                    <Link
                      to="/dashboardaml"
                      style={{ textDecoration: "none", color: "var(--black)" }}
                    >
                      <div className="col-sm-12 d-flex justify-content-between px-3 py-3">
                        <a
                          style={{
                            textDecoration: "none",
                            color: "var(--black)",
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 600,
                          }}
                          href="aml-home.html"
                        >
                          <iconify-icon icon="iconamoon:arrow-left-2" />
                          Back to home
                        </a>
                        <div className="d-flex align-items-center">
                          <h2 className="pe-2 m-0">
                            <b>{store.user?.companyName}</b>
                          </h2>
                          <span />
                          <i class="fa-solid fa-fingerprint"></i>
                        </div>
                      </div>
                    </Link>
                    {/* vvvvvvvvvvvvvvvvvv */}
                  </div>
                </div>
                <div
                  className="col-12 removediv"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    height: "10vh",
                  }}
                >
                  <NewcheckButton />
                </div>
                <div
                  className="tab-content d-flex align-items-end pb-3"
                  id="v-pills-tabContent"
                  style={{ height: "80vh" }}
                >
                  <div
                    className=" container-fluid"
                    style={{ width: "100%" }}
                    id="v-pills-checkHistory"
                    role="tabpanel"
                    aria-labelledby="v-pills-settings-tab"
                    tabIndex={0}
                  >
                    <div className="row p-0">
                      <div className="col-sm-12 p-0">
                        <div className="row">
                          <div className="col-sm-12 p-0">
                            <div
                              id="dropdown_checkHistory"
                              className="col-sm-12 p-sm-0"
                            >
                              <div style={{ maxHeight: "100%" }}>
                                <div
                                  className="search-filter-row pb-3"
                                  style={{ position: "sticky", top: 0 }}
                                >
                                  <div className="form-group has-search search-box">
                                    <span className="fa fa-search form-control-feedback" />
                                    <input
                                      readOnly
                                      // placeholder="Search here..."
                                      className="form-control p-3 ps-5"
                                    />
                                  </div>
                                </div>
                                <div
                                  style={{
                                    height: "65vh",
                                    overflow: "auto",
                                    paddingBottom: 60,
                                  }}
                                  className="tab-content pt-1"
                                  id="myTabContent"
                                >
                                  <div
                                    className="tab-pane fade show active row g-2"
                                    id="home-tab-pane1"
                                    role="tabpanel"
                                    aria-labelledby="home-tab"
                                    tabIndex={0}
                                  >
                                    <table id="myTable">
                                      <thead>
                                        <tr className="table-head">
                                          <th>Status</th>
                                          <th>Label</th>
                                          <th>Action</th>
                                          <th>Created</th>
                                          <th>Last status update</th>
                                        </tr>
                                      </thead>

                                      {history.map((entry) => (
                                        <tbody
                                          key={entry._id}
                                          onClick={() =>
                                            fetchDetails(entry._id)
                                          }
                                          style={{ cursor: "pointer" }}
                                        >
                                          <tr className="table-row">
                                            <td>
                                              {entry &&
                                              entry.response &&
                                              entry.response.data &&
                                              entry.response.data.result &&
                                              entry.response.data.result
                                                .matchedEntities != null ? (
                                                <span className="review py-2 px-3">
                                                  ToReview
                                                </span>
                                              ) : (
                                                <span
                                                  className="review py-2 px-3"
                                                  style={{
                                                    backgroundColor: "grey",
                                                    color: "white",
                                                  }}
                                                >
                                                  No Hits
                                                </span>
                                              )}
                                            </td>
                                            <td>
                                              <span style={{ fontWeight: 600 }}>
                                                {(() => {
                                                  try {
                                                    const parsedQuery = JSON.parse(
                                                      entry.query
                                                    );
                                                    if (parsedQuery.metadata) {
                                                      return (
                                                        parsedQuery.metadata
                                                          .company_name ||
                                                        parsedQuery.metadata
                                                          .full_name ||
                                                        parsedQuery.metadata
                                                          .first_name ||
                                                        "Unknown"
                                                      );
                                                    } else {
                                                      return "Unknown";
                                                    }
                                                  } catch (error) {
                                                    console.error(
                                                      "Error parsing or accessing query:",
                                                      error
                                                    );
                                                    return "Unknown";
                                                  }
                                                })()}
                                              </span>
                                              <br />
                                              {entry._id ? (
                                                <span>{entry._id}</span>
                                              ) : (
                                                <span>
                                                  Response ID Not Available
                                                </span>
                                              )}
                                            </td>
                                            <td>{entry.type}</td>
                                            <td>
                                              {entry.createdAt
                                                ? entry.updatedAt
                                                : "Response not available"}
                                            </td>
                                            {/* Assuming you meant to display createdAt twice */}
                                            <td>
                                              {entry.updatedAt
                                                ? entry.updatedAt
                                                : "Response not available"}
                                            </td>
                                          </tr>
                                        </tbody>
                                      ))}
                                    </table>

                                    <div
                                      id="emptyMessage"
                                      style={{
                                        display: "none",
                                        color: "var(--text)",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        marginTop: 10,
                                      }}
                                    >
                                      No data found
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
                  {/* end */}
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkhistory;
