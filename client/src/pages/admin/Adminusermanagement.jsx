import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Select from 'react-select';
import countries from 'i18n-iso-countries';


countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// Create an array of options for react-select
const countryOptions = Object.entries(countries.getNames("en")).map(([code, name]) => ({
  value: code,
  label: name
}));




function Adminusermanagement(userId) {



  const handleCountryChange = selectedOption => {
    setNewsData({
      ...newsData,
      country: selectedOption.value
    });
  };


  const navigate = useNavigate()

  const adminLogout = async () => {
    try {
      await axios.get("/admin/logout");
      navigate("/loginadmin");
      // console.log("admin logout successfully");
    } catch (err) {
      console.error("error in logout", err);
    }
  };



useEffect(()=>{
  fetchData()
},[])




  

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = (newsItem) => {
    setSelectedNewsItem(newsItem);
    setModalVisible(!modalVisible);
  };

  const [selectedNewsItem, setSelectedNewsItem] = useState(null);

  const [news, setNews] = useState([]);
  const [newsData, setNewsData] = useState({
    companyName: "",
    email: "",
    country: "",
    emirate: "",
    street: "",
    city: "",
    zipCode: "",
    trn: "",
    checkLimit: "",
    password: "",
  });

  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({
    companyName: "",
    email: "",
    country: "",
    emirate: "",
    street: "",
    city: "",
    zipCode: "",
    trn: "",
    checkLimit: "",
    password: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editNewsId, setEditNewsId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    companyName: "",
    email: "",
    country: "",
    emirate: "",
    street: "",
    city: "",
    zipCode: "",
    trn: "",
    checkLimit: "",
    password: "",
  });




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData({
      ...newsData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const isFormValid = () => {
    return (
      newsData.companyName.trim() !== "" &&
      /\S+@\S+\.\S+/.test(newsData.email.trim()) &&
      newsData.country.trim() !== "" &&
      newsData.emirate.trim() !== "" &&
      newsData.street.trim() !== "" &&
      newsData.city.trim() !== "" &&
      newsData.zipCode.trim() !== "" &&
      /^\d{15}$/.test(newsData.trn.trim()) &&
      newsData.checkLimit.trim() !== "" &&
      newsData.password.trim() !== ""
    );
  };

  const handleValidation = () => {
    const valid = isFormValid();

    setFormValid(valid);

    if (!valid) {
      setErrors({
        companyName:
          newsData.companyName.trim() === "" ? "Company name is required." : "",
        email:
          newsData.email.trim() === ""
            ? "Email is required."
            : !/\S+@\S+\.\S+/.test(newsData.email.trim())
            ? "Email is invalid."
            : "",
        country: newsData.country.trim() === "" ? "Country is required." : "",
        emirate: newsData.emirate.trim() === "" ? "Emirate is required." : "",
        street: newsData.street.trim() === "" ? "Street is required." : "",
        city: newsData.city.trim() === "" ? "City is required." : "",
        zipCode: newsData.zipCode.trim() === "" ? "ZipCode is required." : "",
        trn:
          newsData.trn.trim() === ""
            ? "TRN is required."
            : !/^\d{15}$/.test(newsData.trn.trim())
            ? "TRN must be a 15-digit number."
            : "",
        checkLimit:
          newsData.checkLimit.trim() === "" ? "Check limit is required." : "",
        password: newsData.password.trim() === "" ? "password is required" : "",
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/admin/viewusers");
      // console.log(response);
      const sortedNews = response.data.users.sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      setNews(sortedNews);
    } catch (err) {
      console.error("Error in fetching data", err);
    }
  };

  const addNews = async () => {
    try {
      await axios.post("/admin/adduser", newsData).then((response) => {
        // console.log("News added successfully", response.data);
      });
      fetchData();
      Swal.fire({
        icon: "success",
        title: "User Added",
        text: "The User has been Successfully added",
      });

      setNewsData({
        companyName: "",
        email: "",
        country: "",
        emirate: "",
        street: "",
        city: "",
        zipCode: "",
        trn: "",
        checkLimit: "",
        password: "",
      });
    } catch (err) {
      console.error("Error adding news", err);
    }
  };

  const deleteNews = async (newsId) => {
    try {
      await axios.delete(`/admin/deleteuser/${newsId}`);
      fetchData();
      // console.log("news deleted successfully");
    } catch (err) {
      console.error("error in deleting news", err.message);
    }
  };

  const handleEdit = (newsId) => {
    setEditMode(true);
    setEditNewsId(newsId);

    const newsItemToEdit = news.find((item) => item._id === newsId);

    if (newsItemToEdit) {
      setEditFormData({
        companyName: newsItemToEdit.companyName,
        email: newsItemToEdit.email,
        country: newsItemToEdit.country,
        emirate: newsItemToEdit.emirate,
        street: newsItemToEdit.street,
        city: newsItemToEdit.city,
        zipCode: newsItemToEdit.zipCode,
        trn: newsItemToEdit.trn,
        checkLimit: newsItemToEdit.checkLimit,
        password: newsItemToEdit.password,
      });
    }
  };

  const updateNews = async () => {
    try {
      await axios.put(`/admin/updateuser/${editNewsId}`, editFormData);

      fetchData();

      setEditMode(false);
      setEditNewsId(null);
      // console.log("news updated successfully");

      Swal.fire({
        icon: "success",
        title: "User Updated",
        text: "The User has been Successfully updated",
      });
    } catch (error) {
      console.error("Error in updating news ", error);
    }
  };

  
  

  const handleDelete = (newsId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Proceeding with this deletion means accepting its irreversible nature, as there will be no option to retrieve or reverse it once initiated.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNews(newsId);
        Swal.fire("Deleted !", "Your User has been deleted", "success");
      }
    });
  };

 

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      color: 'black',
      borderColor: '#ced4da',
      boxShadow: 'none',
      '&:hover': { borderColor: 'gray' } // border style on hover
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'lightgray' : 'white',
      color: 'black',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white'
    })
  };

  return (

        <div className="main-panel pt-0 ">
          <div className="content-wrapper d-flex justify-content-center">
            <div className="row p-3 ">
              <div className="col-12 grid-margin ">
                <div className="container mt-5 ">
                  <h2 className="mb-4">User Management</h2>

                  {!editMode ? (
                    <div>
                      <h3 className="mt-4" style={{ textAlign: "center" }}>
                        Add User here
                      </h3>

                      <form
                        id="addNewsForm"
                        className="p-3"
                        style={{
                          border: "1px solid rgb(62, 62, 62)",
                          borderRadius: 10,
                        }}
                      >
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Company Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            placeholder="Enter Company Name "
                            required=""
                            value={newsData.companyName}
                            onChange={(e) => {
                              handleInputChange(e);
                              handleValidation();
                            }}
                          />
                          {errors.companyName && (
                            <div className="text-danger">
                              {errors.companyName}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Email
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email"
                            required=""
                            value={newsData.email}
                            onChange={(e) => {
                              handleInputChange(e);
                              handleValidation();
                            }}
                          />
                          {errors.email && (
                            <div className="text-danger">{errors.email}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Country
                          </label>
                          <Select
        name="country"
        options={countryOptions}
        value={countryOptions.find(option => option.value === newsData.country)}
        onChange={handleCountryChange}
        placeholder="Select a country"
        isClearable={true}
        isSearchable={true}
        styles={customStyles}
      />
                          {errors.country && (
                            <div className="text-danger">{errors.country}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Emirate/State
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="emirate"
                            placeholder="Enter Emirate"
                            required=""
                            value={newsData.emirate}
                            onChange={(e) => {
                              handleInputChange(e);
                              handleValidation();
                            }}
                          />
                          {errors.emirate && (
                            <div className="text-danger">{errors.emirate}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Street
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="street"
                            placeholder="Enter Street"
                            required=""
                            value={newsData.street}
                            onChange={(e) => {
                              handleInputChange(e);
                              handleValidation();
                            }}
                          />
                          {errors.street && (
                            <div className="text-danger">{errors.street}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            City
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            placeholder="Enter City"
                            required=""
                            value={newsData.city}
                            onChange={(e) => {
                              handleInputChange(e);
                              handleValidation();
                            }}
                          />
                          {errors.city && (
                            <div className="text-danger">{errors.city}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Zipcode
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="zipCode"
                            placeholder="Enter Zipcode"
                            required=""
                            value={newsData.zipCode}
                            onChange={(e) => {
                              handleInputChange(e);
                              handleValidation();
                            }}
                          />
                          {errors.zipCode && (
                            <div className="text-danger">{errors.zipCode}</div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            TRN
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="trn"
                            placeholder="Enter Trn"
                            required=""
                            value={newsData.trn}
                            onChange={(e) => {
                              handleInputChange(e);
                              handleValidation();
                            }}
                          />
                          {errors.trn && (
                            <div className="text-danger">{errors.trn}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Check limit
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="checkLimit"
                            placeholder="Enter Checklimit"
                            required=""
                            value={newsData.checkLimit}
                            onChange={(e) => {
                              handleInputChange(e);
                              handleValidation();
                            }}
                          />
                          {errors.checkLimit && (
                            <div className="text-danger">
                              {errors.checkLimit}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Password
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="password"
                            placeholder="Enter Password"
                            required=""
                            value={newsData.password}
                            onChange={(e) => {
                              handleInputChange(e);
                              handleValidation();
                            }}
                          />
                          {errors.password && (
                            <div className="text-danger">{errors.password}</div>
                          )}
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary p-3"
                          onClick={addNews}
                          disabled={!isFormValid}
                        >
                          Add User
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div>
                      <h3 className="mt-4" style={{ textAlign: "center" }}>
                        Update User here
                      </h3>
                      <form
                        id="addNewsForm"
                        className="p-3"
                        style={{
                          border: "1px solid rgb(62, 62, 62)",
                          borderRadius: 10,
                        }}
                      >
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Company Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            placeholder="Enter Company Name"
                            required=""
                            value={editFormData.companyName}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                companyName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Email
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email"
                            required=""
                            value={editFormData.email}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Country
                          </label>
                          <Select
        name="country"
        options={countryOptions}
        value={countryOptions.find(option => option.value === newsData.country)}
        onChange={handleCountryChange}
        placeholder="Select a country"
        isClearable={true}
        isSearchable={true}
        styles={customStyles}
      />
                          {errors.country && (
                            <div className="text-danger">{errors.country}</div>
                          )}
                       </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Emirate
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="emirate"
                            placeholder="Enter Emirate"
                            required=""
                            value={editFormData.emirate}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                emirate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Street
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="street"
                            placeholder="Enter Street"
                            required=""
                            value={editFormData.street}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                street: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            City
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            placeholder="Enter City"
                            required=""
                            value={editFormData.city}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                city: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            ZipCode
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="zipCode"
                            placeholder="Enter Zipcode"
                            required=""
                            value={editFormData.zipCode}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                zipCode: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            TRN
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="trn"
                            placeholder="Enter TRN"
                            required=""
                            value={editFormData.trn}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                trn: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Check Limit
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="checkLimit"
                            placeholder="Enter checklimit "
                            required=""
                            value={editFormData.checkLimit}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                checkLimit: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Password
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="checkLimit"
                            placeholder="Enter checklimit "
                            required=""
                            value={editFormData.password}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                password: e.target.value,
                              })
                            }
                          />
                        </div>

                        <button
                          type="button"
                          className="btn btn-primary p-3"
                          onClick={updateNews}
                        >
                          Save Changes
                        </button>
                      </form>
                    </div>
                  )}

                  <hr />
                </div>
                {/* Display News Table */}
              </div>

              <div className="col-12 grid-margin stretch-card">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th>Company Name</th>

                      {/* <th>Email</th> */}
                      <th>Country</th>
                      <th>Emirate</th>
                      {/* <th>Street</th>
                      <th>City</th>
                      <th>Zipcode</th> */}
                      {/* <th>Trn</th> */}
                      <th>Check Limit</th>
                      {/* <th>password</th> */}
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {news &&
                      news.length > 0 &&
                      news
                        .slice()
                        .reverse()
                        .map((newsItem) => (
                          <tr key={newsItem._id}>
                            <td
                              className="title-column"
                              style={{
                                width: "200px",
                                maxWidth: "200px",
                                overflow: "hidden",
                                whiteSpace: "normal",
                                textAlign: "justify",
                              }}
                            >
                              {newsItem.companyName}
                            </td>

                            <td
                              className="description-column"
                              style={{
                                width: "200px",
                                maxWidth: "200px",
                                overflow: "hidden",
                                whiteSpace: "normal",
                                textAlign: "justify",
                              }}
                            >
                              {newsItem.country}
                            </td>
                            <td
                              className="description-column"
                              style={{
                                width: "200px",
                                maxWidth: "200px",
                                overflow: "hidden",
                                whiteSpace: "normal",
                                textAlign: "justify",
                              }}
                            >
                              {newsItem.emirate}
                            </td>

                            <td
                              className="description-column"
                              style={{
                                width: "200px",
                                maxWidth: "200px",
                                overflow: "hidden",
                                whiteSpace: "normal",
                                textAlign: "justify",
                              }}
                            >
                              {newsItem.checkLimit}
                            </td>
                            <td>
                              <button
                                onClick={() => handleEdit(newsItem._id)}
                                type="button"
                                className="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#editNewsModal"
                              >
                                Edit
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => handleDelete(newsItem._id)}
                                type="button"
                                className="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#editNewsModal"
                              >
                                Delete
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  toggleModal(newsItem);
                                }}
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#editNewsModal"
                              >
                                View
                              </button>
                            </td>
                            <td>
                             
                            </td>
                            <div
                              className={`modal fade ${
                                modalVisible ? "show d-block" : ""
                              }`}
                              tabIndex="-1"
                              role="dialog"
                              style={{
                                display: modalVisible ? "block" : "none",
                              }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                                role="document"
                                style={{ minHeight: "100vh" }}
                              >
                                <div
                                  className="modal-content"
                                  style={{ minHeight: "50%" }}
                                >
                                  <div
                                    className="modal-header"
                                    style={{
                                      backgroundColor: "#f0f0f0",
                                      borderBottom: "1px solid #ddd",
                                      padding: "10px 20px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <h5
                                      className="modal-title"
                                      style={{
                                        margin: "0 auto",
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {selectedNewsItem &&
                                        selectedNewsItem.companyName}
                                    </h5>
                                  </div>

                                  <div
                                    className="modal-body"
                                    style={{
                                      padding: "20px",
                                      backgroundColor: "#fff",
                                      borderRadius: "8px",
                                    }}
                                  >
                                    {/* Display other properties of selectedNewsItem */}
                                    <h5 style={{ marginBottom: "10px" }}>
                                      Email:{" "}
                                      {selectedNewsItem &&
                                        selectedNewsItem.email}
                                    </h5>
                                    <h5 style={{ marginBottom: "10px" }}>
                                      Country:{" "}
                                      {selectedNewsItem &&
                                        selectedNewsItem.country}
                                    </h5>
                                    <h5 style={{ marginBottom: "10px" }}>
                                      Emirate:{" "}
                                      {selectedNewsItem &&
                                        selectedNewsItem.emirate}
                                    </h5>
                                    <h5 style={{ marginBottom: "10px" }}>
                                      Street:{" "}
                                      {selectedNewsItem &&
                                        selectedNewsItem.street}
                                    </h5>
                                    <h5 style={{ marginBottom: "10px" }}>
                                      City:{" "}
                                      {selectedNewsItem &&
                                        selectedNewsItem.city}
                                    </h5>
                                    <h5 style={{ marginBottom: "10px" }}>
                                      Zipcode:{" "}
                                      {selectedNewsItem &&
                                        selectedNewsItem.zipCode}
                                    </h5>
                                    <h5 style={{ marginBottom: "10px" }}>
                                      TRN:{" "}
                                      {selectedNewsItem && selectedNewsItem.trn}
                                    </h5>
                                    <h5 style={{ marginBottom: "10px" }}>
                                      CheckLimit:{" "}
                                      {selectedNewsItem &&
                                        selectedNewsItem.checkLimit}
                                    </h5>
                                    <h5 style={{ marginBottom: "10px" }}>
                                      Password:{" "}
                                      {selectedNewsItem &&
                                        selectedNewsItem.password}
                                    </h5>
                                    {/* Add more properties as needed */}
                                  </div>
                                  <div
                                    className="modal-footer"
                                    style={{
                                      borderTop: "none",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={() => toggleModal(null)}
                                    >
                                      Close
                                    </button>
                                    {/* Additional modal footer buttons */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>

              {/* partial */}
            </div>
            {/* main-panel ends */}
          </div>
          {/* page-body-wrapper ends */}
        </div>
     
    
  );
}

export default Adminusermanagement;
