import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

import { useEffect } from "react";

function Adminnotificationmanagement() {


const [isSubmitDisabled,setIsSubmitDisabled] = useState(true);



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


  const [news, setNews] = useState([]);
  const [newsData, setNewsData] = useState({
    
    description: "",
  });

 
  const [errors, setErrors] = useState({
   
    description: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editNewsId, setEditNewsId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData({
      ...newsData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
const isAnyFieldEmpty = Object.values(newsData).some((val)=>val.trim() === '');
setIsSubmitDisabled(isAnyFieldEmpty)

  };

 



  const fetchData = async () => {
    try {
      const response = await axios.get("/admin/viewnotifications");
      const sortedNews = response.data.notifications.sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      setNews(sortedNews);
    } catch (err) {
      console.error("Error in fetching data", err);
    }
  };

  const addNews = async () => {
    try {
      await axios.post("/admin/addnotification", newsData).then((response) => {
        // console.log("News added successfully", response.data);
      });
      fetchData();

      Swal.fire({
        icon: "success",
        title: "Notification Added",
        text: "The Notification  has been Successfully added",
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
      await axios.delete(`/admin/deletenotification/${newsId}`);
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
      await axios.put(`/admin/updatenotification/${editNewsId}`, editFormData);

      fetchData();

      setEditMode(false);
      setEditNewsId(null);
      // console.log("news updated successfully");

      Swal.fire({
        icon: "success",
        title: "Notification  Updated",
        text: "The Notification  has been Successfully updated",
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
        Swal.fire("Deleted !", "Your Notification  has been deleted", "success");
      }
    });
  };

 
  return (


        <div className="main-panel pt-0">
          <div className="content-wrapper d-flex justify-content-center">
            <div className="row p-3">
              <div className="col-12 grid-margin ">
                <div className="container mt-5 ">
                  <h2 className="mb-4">Notification Management</h2>

                  {!editMode ? (
                    <div>
                      <h3 className="mt-4" style={{ textAlign: "center" }}>
                        Add Notification here
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
                              
                            }}
                          />
                          {errors.description && (
                            <div className="text-danger">
                              {errors.description}
                            </div>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary p-3"
                          onClick={addNews}
                          disabled={isSubmitDisabled}
                          
                        >
                          Add Notification
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div>
                      <h3 className="mt-4" style={{ textAlign: "center" }}>
                        Update Notification here
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
                      {/* <th>Title</th> */}

                      <th>Description</th>
                      
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
                            {/* <td
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
                            </td> */}
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

export default Adminnotificationmanagement;
