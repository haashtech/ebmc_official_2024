import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";

function Adminnewsmanagement() {
  const navigate = useNavigate();

  // const adminLogout = async () => {
  //   try {
  //     await axios.get("/admin/logout");
  //     navigate("/loginadmin");
  //     // console.log("admin logout successfully");
  //   } catch (err) {
  //     console.error("error in logout", err);
  //   }
  // };

  const [news, setNews] = useState([]);
  const [newsData, setNewsData] = useState({
    title: "",
    description: "",
  });

  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editNewsId, setEditNewsId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
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
    return newsData.title.trim() !== "" && newsData.description.trim() !== "";
  };

  const handleValidation = () => {
    const valid = isFormValid();
    setFormValid(valid);

    if (!valid) {
      setErrors({
        title: newsData.title.trim() === "" ? "Title is required" : "",
        description:
          newsData.description.trim() === "" ? "Description is required" : "",
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/admin/viewnewses");
      const sortedNews = response.data.news.sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      setNews(sortedNews);
    } catch (err) {
      console.error("Error in fetching data", err);
    }
  };

  const addNews = async () => {
    try {
      await axios.post("/admin/addnews", newsData).then((response) => {
        // console.log("News added successfully", response.data);
      });
      fetchData();

      Swal.fire({
        icon: "success",
        title: "News Added",
        text: "The News has been Successfully added",
      });

      setNewsData({
        title: "",
        description: "",
      });
    } catch (err) {
      console.error("Error adding news", err);
    }
  };

  const deleteNews = async (newsId) => {
    try {
      await axios.delete(`/admin/deletenews/${newsId}`);
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
        title: newsItemToEdit.title,
        description: newsItemToEdit.description,
      });
    }
  };

  const updateNews = async () => {
    try {
      await axios.put(`/admin/updatenews/${editNewsId}`, editFormData);

      fetchData();

      setEditMode(false);
      setEditNewsId(null);
      // console.log("news updated successfully");

      Swal.fire({
        icon: "success",
        title: "News Updated",
        text: "The news has been Successfully updated",
      });
    } catch (error) {
      console.error("Error in updating news ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        Swal.fire("Deleted !", "Your news has been deleted", "success");
      }
    });
  };


  return (
    
        <div className=" main-panel pt-0">
          <div className="content-wrapper d-flex justify-content-center">
            <div className="row p-3 ">
              <div className="col-12 grid-margin ">
                <div className="container mt-5 ">
                  <h2 className="mb-4 text-md-start text-center">News Management</h2>

                  {!editMode ? (
                    <div>
                      <h3 className="mt-4" style={{ textAlign: "center" }}>
                        Add News here
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
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Enter news title"
                            required=""
                            value={newsData.title}
                            onChange={(e) => {
                              handleInputChange(e);
                              handleValidation();
                            }}
                          />
                          {errors.title && (
                            <div className="text-danger"> {errors.title} </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            name="description"
                            placeholder="Enter news description"
                            rows={3}
                            required=""
                            value={newsData.description}
                            onChange={(e) => {
                              handleInputChange(e);
                              handleValidation();
                            }}
                          />
                          {errors.description && (
                            <div className="text-danger">
                              {errors.description}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary p-3"
                          onClick={addNews}
                          disabled={!formValid}
                        >
                          Add News
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div>
                      <h3 className="mt-4" style={{ textAlign: "center" }}>
                        Update News here
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
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Enter news title"
                            required=""
                            value={editFormData.title}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            name="description"
                            placeholder="Enter news description"
                            rows={3}
                            required=""
                            defaultValue={""}
                            value={editFormData.description}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary p-3"
                          onClick={updateNews}
                        >
                          Update News
                        </button>
                      </form>
                    </div>
                  )}

                  <hr />
                </div>
                {/* Display News Table */}
              </div>
              <div className="col-12 grid-margin  stretch-card">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>Description</th>
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
                              {newsItem.title}
                            </td>
                            <td
                              className="description-column"
                              style={{
                                width: "300px",
                                maxWidth: "300px",
                                overflow: "hidden",
                                whiteSpace: "normal",
                                textAlign: "justify",
                              }}
                            >
                              {newsItem.description}
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
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
              <div
                className="modal fade"
                id="editNewsModal"
                tabIndex={-1}
                aria-labelledby="editNewsModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="editNewsModalLabel">
                        Edit News
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <form id="editNewsForm">
                        <div className="mb-3">
                          <label htmlFor="editTitle" className="form-label">
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="editTitle"
                            placeholder="Enter news title"
                            required=""
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="editDate" className="form-label">
                            Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="editDate"
                            required=""
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="editDescription"
                            className="form-label"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            id="editDescription"
                            rows={3}
                            placeholder="Enter news description"
                            required=""
                            defaultValue={""}
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-light p-3"
                          onclick="updateNews()"
                        >
                          Update News
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* partial */}
            </div>
            {/* main-panel ends */}
          </div>
          {/* page-body-wrapper ends */}
        </div>
      
    
  );
}

export default Adminnewsmanagement;
