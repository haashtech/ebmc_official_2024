import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";

function Admincredentialmanagement() {

const[formData,setFormData] = useState({
username:'',
oldPassword:'',
newPassword:'',
repeatNewpassword:'',
error:'',
success:''
})

const handleChange = (e) =>{


  setFormData({...formData,[e.target.name]:e.target.value})
};

const handleSubmit = async (e) =>{

e.preventDefault();

const {username,oldPassword,newPassword,repeatNewpassword} = formData;

if(newPassword !== repeatNewpassword){

  setFormData({...formData,error:"New password and repeat new password do not match",success:""})

  return ;
}
try {

  const response = await axios.post('/admin/resetadminpassword',{
username,
password:oldPassword,
newPassword,
repeatNewpassword
  });

  setFormData({...formData,success:response.data.success,error:""});

  Swal.fire({
    icon:'success',
    title:'Credentil updated',
    text:"Admin credentials updated successfully"
  })

  
} catch (error) {
  setFormData({...formData,error:error.response.data.error,success:""});
}
}








  const navigate = useNavigate();

  const adminLogout = async () => {
    try {
      await axios.get("/admin/logout");
      navigate("/loginadmin");
      // console.log("admin logout successfully");
    } catch (err) {
      console.error("error in logout", err);
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [editNewsId, setEditNewsId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
  });

  
  return (

        <div className="main-panel pt-0">
          <div className="content-wrapper d-flex justify-content-center">
            <div className="row p-3">
              <div className="col-12 grid-margin ">
                <div className="container mt-5 ">
                  <h2 className="mb-4">Credential Management</h2>

                  {!editMode ? (
                    <div>
                      {/* <h3 className="mt-4" style={{ textAlign: "center" }}>
                        Add News here
                      </h3> */}

                      <form
                      onSubmit={handleSubmit}
                        id="addNewsForm"
                        className="p-3"
                        style={{
                          border: "1px solid rgb(62, 62, 62)",
                          borderRadius: 10,
                        }}
                      >
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter Username "
                            required=""
                           
                          
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            placeholder="Enter Password "
                            required=""
                            
                          
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            New password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter New password "
                            required=""
                           
                         
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            Repeate new password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="repeatNewpassword"
                            value={formData.repeatNewpassword}
                            onChange={handleChange}
                            placeholder=" Repeate New password"
                            required=""                  
                          />

{formData.newPassword !== formData.repeatNewpassword && <div className="error" style={{color:'red'}}>Password do not match</div>}
                        </div>
                        {formData.error && <div className="error"style={{color:'red'}}>{formData.error}</div>}
                        {formData.success && <div className="success"style={{color:'green'}}>{formData.success}</div>}

                        <button
                          type="submit"
                          className="btn btn-primary p-3"
                         
                        >
                          Save Changes
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

export default Admincredentialmanagement;
