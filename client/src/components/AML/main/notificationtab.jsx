import React from 'react'

function notificationtab() {
  return (
    <div className="col-sm-12 p-sm-0 pt-5">
  <div
    id="drpdown_notification"
    style={{
      backgroundColor: "var(--gray)",
      borderRadius: 20,
      maxHeight: "100%",
      overflow: "hidden"
    }}
  >
    <div className="pt-4 px-4" style={{ backgroundColor: "var(--capsule)" }}>
      <ul
        style={{ border: "none" }}
        className="nav nav-tabs btn_tab pb-2"
        id="myTab"
        role="tablist"
      >
        <li className="nav-item active" role="presentation">
          <button
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane2"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            News
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane1"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            Updates
          </button>
        </li>
      </ul>
    </div>
    <div
      style={{
        height: "65vh",
        overflow: "auto",
        overflowX: "hidden",
        paddingBottom: 60
      }}
      className="tab-content pt-3 px-lg-4 px-sm-2"
      id="myTabContent1"
    >
      <div
        className="tab-pane fade show active row g-2 capsules"
        id="home-tab-pane2"
        role="tabpanel"
        aria-labelledby="home-tab"
        tabIndex={0}
      >
        <section className="row g-2">
          <div className="p-3">
            hac sem sem erat vivamus rhoncus. Est eget at quis risus id semper
            iaculis malesuada mattis.
          </div>
          <div className="p-3">
            em erat vivamus rhoncus. Est eget at mattis.
          </div>
          <div className="p-3">
            sem erat vivamus rhoncus. Est eget at quis risus id semper iaculis
            malesuada mattis.
          </div>
          <div className="p-3">
            nam facilisi scelerisque mollis erat grivamus rhoncus. Est eget at
            quis r mattis.
          </div>
          <div className="p-3">
            nam facilisi scelerisque mollis erat grivamus rhoncus. Est eget at
            quis r mattis.
          </div>
          <div className="p-3">
            nam facilisi scelerisque mollis erat grivamus rhoncus. Est eget at
            quis r mattis.
          </div>
          <div className="p-3">
            nam facilisi scelerisque mollis erat grivamus rhoncus. Est eget at
            quis r mattis.
          </div>
          <div className="p-3">
            facilisi sncus. Est eget at quis risus id semper iaculis malesuada
            mattis.
          </div>
          <div className="p-3">
            facilisi sncus. Est eget at quis risus id semper iaculis malesuada
            mattis.
          </div>
          <div className="p-3">
            facilisi sncus. Est eget at quis risus id semper iaculis malesuada
            mattis.
          </div>
        </section>
      </div>
      <div
        className="tab-pane fade row g-2 capsules"
        id="profile-tab-pane1"
        role="tabpanel"
        aria-labelledby="profile-tab"
        tabIndex={1}
      >
        <section className="row g-2">
          <div className="p-3">
            nam facilisi scelerisque mollis erat grivamus rhoncus. Est eget at
            quis r mattis.
          </div>
          <div className="p-3">
            nam facilisi scelerisque mollis erat grivamus rhoncus. Est eget at
            quis r mattis.
          </div>
          <div className="p-3">
            nam facilisi scelerisque mollis erat grivamus rhoncus. Est eget at
            quis r mattis.
          </div>
          <div className="p-3">
            nam facilisi scelerisque mollis erat grivamus rhoncus. Est eget at
            quis r mattis.
          </div>
          <div className="p-3">
            facilisi sncus. Est eget at quis risus id semper iaculis malesuada
            mattis.
          </div>
        </section>
      </div>
    </div>
  </div>
</div>

  )
}

export default notificationtab