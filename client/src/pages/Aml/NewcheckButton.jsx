import React from 'react'
import { Link } from 'react-router-dom'


function NewcheckButton() {
  return (
    <div className="py-2">
      <button
        className="btnremove menu-close1 nav-link align-items-center"
        title="Choose Your action"
        data-bs-html="true"
        data-bs-content="
          <a href='newcheck_individual.html' class='btn btn-success'>individual</a>
          <a href='newcheck_corporate.html' class='btn btn-danger'>corporate</a>
        "
        id="myButton"
        data-bs-placement="left"
        style={{
          border: "none",
          padding: "15px 35px",
          borderRadius: 5,
          fontWeight: 600,
          width: "fit-content",
          color: "var(--white)",
          backgroundColor: "#fa4923" 
        }}
      >
        <Link
          to="/newcheckaml"
          className="d-flex align-items-center"
          style={{ textDecoration: "none", fontWeight: 500, color: "var(--white)" }}
        >
          <iconify-icon className="pe-3" icon="ic:round-plus" />
          New Check
        </Link>
      </button>
    </div>
  )
}

export default NewcheckButton