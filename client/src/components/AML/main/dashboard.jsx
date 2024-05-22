import React from 'react'

function dashboard() {
  return (
    <div className="row" style={{ height: "100%" }}>
  <div className="col-lg-6" style={{ display: "flex", alignItems: "end" }}>
    <div className="welcome">
      <h1>
        Welcome
        <span style={{ color: "var(--orange)" }}>
          <b>“ABIN”</b>
        </span>
      </h1>
      <p
        className="textGreetings pb-4"
        style={{ fontWeight: 500, color: "var(--text)", textAlign: "justify" }}
      >
        <b>Greetings! We're glad to see you here.</b> The Portal is a powerful
        platform that allows you to interact with various Products. Feel free to
        start out by checking out the&nbsp;Products menu&nbsp;by clicking the
        link or the menu item at the top of the screen.We hope that with the use
        of Portal, your day-to-day workload will become a breeze!
      </p>
      {/* graph_start */}
      <div
        style={{ borderRadius: 20, backgroundColor: "var(--gray)" }}
        className="p-4 border"
      >
        <div className="d-flex justify-content-end dashboard_dropdown">
          <div className="dropdown">
            <button
              className="btn me-1 btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Period
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="/">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-secondary"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <iconify-icon icon="ci:hamburger-md" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="/">
                  Download PNG
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Download JPEG
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-lg-6 ps-lg-5 align-items-center justify-content-center d-flex m-0 p-0">
              <div className="pieID pie mt-3" />
            </div>
            <div className="col-sm-12 col-lg-6 m-0 p-0 align-items-center justify-content-center d-flex">
              <ul className="pieID legend p-0 mt-1">
                <li>
                  <em>Used checks</em>
                  <span>30</span>
                </li>
                <li>
                  <em>Remaining checks</em>
                  <span>70</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <p
            style={{ fontSize: 12, fontWeight: 500 }}
            className="mt-3 text-center"
          >
            Total checks : 100 Used checks : 12 Remaining checks : 88
          </p>
        </div>
      </div>
    </div>
  </div>
  <div
    className="col-lg-6 newsmobile"
    style={{ height: "100%", display: "flex", alignItems: "end" }}
  >
    <div
      className="dashboard_tab"
      style={{
        backgroundColor: "var(--gray)",
        borderRadius: 20,
        maxHeight: "100%",
        overflow: "hidden"
      }}
    >
      <div
        className="px-4 pt-3"
        style={{ backgroundColor: "var(--capsule)", height: "100%" }}
      >
        <ul
          style={{ border: "none" }}
          className="nav nav-tabs btn_tab"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active btn_dashnews"
              id="home-tab1"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
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
              className="nav-link btn_dashnews"
              id="home-tab4"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
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
        style={{ height: 600, overflow: "auto", overflowX: "hidden" }}
        className="tab-content pt-3 px-sm-3"
        id="myTabContent"
      >
        <div
          className="tab-pane fade show active row g-2 capsules"
          id="home-tab-pane"
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
              hac sem sem erat vivamus rhoncus. Est eget at quis risus id semper
              iaculis malesuada mattis.
            </div>
            <div className="p-3">
              hac sem sem erat vivamus rhoncus. Est eget at quis risus id semper
              iaculis malesuada mattis.
            </div>
            <div className="p-3">
              hac sem sem erat vivamus rhoncus. Est eget at quis risus id semper
              iaculis malesuada mattis.
            </div>
            <div className="p-3">
              hac sem sem erat vivamus rhoncus. Est eget at quis risus id semper
              iaculis malesuada mattis.
            </div>
            <div className="p-3">
              hac sem sem erat vivamus rhoncus. Est eget at quis risus id semper
              iaculis malesuada mattis.
            </div>
            <div className="p-3">
              hac sem sem erat vivamus rhoncus. Est eget at quis risus id semper
              iaculis malesuada mattis.
            </div>
          </section>
        </div>
        <div
          className="tab-pane fade show active row g-2 capsules"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabIndex={0}
        >
          <div className="p-3">
            rcu sed viverra sit hac sem sem erat vivamus rhoncus. Est eget at
            quis risus id semper iaculis malesuada mattis.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default dashboard