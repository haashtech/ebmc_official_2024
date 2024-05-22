import React from 'react'

function header() {
  return (
    <div className="row">
  <div className="col-sm-12 d-flex justify-content-between px-3 py-3">
    <a
      style={{
        textDecoration: "none",
        color: "var(--black)",
        display: "flex",
        alignItems: "center",
        fontWeight: 600
      }}
      href="aml-home.html"
    >
      <iconify-icon icon="iconamoon:arrow-left-2" />
      Exit
    </a>
    <div className="d-flex align-items-center">
      <h2 className="pe-2 m-0">
        <b>ABIN</b>
      </h2>
      <span
        style={{
          borderRadius: "50%",
          height: 40,
          width: 40,
          backgroundColor: "var(--capsule)"
        }}
      />
    </div>
  </div>
</div>

  )
}

export default header