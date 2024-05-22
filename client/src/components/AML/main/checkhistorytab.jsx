import React from 'react'

function checkhistorytab() {
  return (
    <div className="row p-0">
    <div className="col-sm-12 p-0">
      <div className="row">
        <div className="col-sm-12 p-0">
          <div id="dropdown_checkHistory" className="col-sm-12 p-sm-0">
            <div style={{ maxHeight: "100%" }}>
              <div
                className="search-filter-row pb-3"
                style={{ position: "sticky", top: 0 }}
              >
                <div className="form-group has-search search-box">
                  <span className="fa fa-search form-control-feedback" />
                  <input
                    type="text"
                    id="searchInput"
                    className="form-control p-3 ps-5"
                    placeholder="Search by Name"
                  />
                </div>
                <div className="dropdown">
                  <button className="filter-button d-flex px-4 py-3 align-items-center ms-3">
                    <i className="fas fa-filter pe-2" />
                    <div>Filter</div>
                  </button>
                  <div className="dropdown-content">
                    <a href="/" onclick="filterTable('Finalized')">
                      Finalized
                    </a>
                    <a href="/" onclick="filterTable('To review')">
                      To review
                    </a>
                    <a href="/" onclick="filterTable('Declined')">
                      Declined
                    </a>
                    <a href="/" onclick="filterTable('Approved')">
                      Approved
                    </a>
                    <a href="/" onclick="filterTable('Individual')">
                      Individual
                    </a>
                    <a href="/" onclick="filterTable('Corporate')">
                      Corporate
                    </a>
                  </div>
                </div>
              </div>
              <div
                style={{ height: "65vh", overflow: "auto", paddingBottom: 60 }}
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
                        <th>Last action update</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-row">
                        <td>
                          <span className="review py-2 px-3">ToReview</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>Mohanlal</span>
                          <br />
                          613d9a74-ed67-45e0-96cd-7824c7b6155a
                        </td>
                        <td>Individual</td>
                        <td>2024-01-18 06:37:31</td>
                        <td>2024-01-18 06:37:43</td>
                      </tr>
                      <tr className="table-row">
                        <td>
                          <span className="review_c py-2 px-3">Finalized</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>babu</span>
                          <br />
                          613d9a74-ed67-45e0-96cd-7824c7b6155a
                        </td>
                        <td>Individual</td>
                        <td>2024-01-18 06:37:31</td>
                        <td>2024-01-18 06:37:43</td>
                      </tr>
                      <tr className="table-row">
                        <td>
                          <span className="review py-2 px-3">ToReview</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>Mohanlal</span>
                          <br />
                          613d9a74-ed67-45e0-96cd-7824c7b6155a
                        </td>
                        <td>Individual</td>
                        <td>2024-01-18 06:37:31</td>
                        <td>2024-01-18 06:37:43</td>
                      </tr>
                      <tr className="table-row">
                        <td>
                          <span className="review py-2 px-3">ToReview</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>Mohanlal</span>
                          <br />
                          613d9a74-ed67-45e0-96cd-7824c7b6155a
                        </td>
                        <td>Corporate</td>
                        <td>2024-01-18 06:37:31</td>
                        <td>2024-01-18 06:37:43</td>
                      </tr>
                      <tr className="table-row">
                        <td>
                          <span className="review_c py-2 px-3">Finalized</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>Mohanlal</span>
                          <br />
                          613d9a74-ed67-45e0-96cd-7824c7b6155a
                        </td>
                        <td>Individual</td>
                        <td>2024-01-18 06:37:31</td>
                        <td>2024-01-18 06:37:43</td>
                      </tr>
                      <tr className="table-row">
                        <td>
                          <span className="review_c py-2 px-3">Finalized</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>Mohanlal</span>
                          <br />
                          613d9a74-ed67-45e0-96cd-7824c7b6155a
                        </td>
                        <td>Corporate</td>
                        <td>2024-01-18 06:37:31</td>
                        <td>2024-01-18 06:37:43</td>
                      </tr>
                      <tr className="table-row">
                        <td>
                          <span className="review_c py-2 px-3">Finalized</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>Mohanlal</span>
                          <br />
                          613d9a74-ed67-45e0-96cd-7824c7b6155a
                        </td>
                        <td>Individual</td>
                        <td>2024-01-18 06:37:31</td>
                        <td>2024-01-18 06:37:43</td>
                      </tr>
                      <tr className="table-row">
                        <td>
                          <span className="review_c py-2 px-3">Finalized</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>Mohanlal</span>
                          <br />
                          613d9a74-ed67-45e0-96cd-7824c7b6155a
                        </td>
                        <td>Individual</td>
                        <td>2024-01-18 06:37:31</td>
                        <td>2024-01-18 06:37:43</td>
                      </tr>
                      <tr className="table-row">
                        <td>
                          <span className="review_c py-2 px-3">Finalized</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>Mohanlal</span>
                          <br />
                          613d9a74-ed67-45e0-96cd-7824c7b6155a
                        </td>
                        <td>Corporate</td>
                        <td>2024-01-18 06:37:31</td>
                        <td>2024-01-18 06:37:43</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                  <div
                    id="emptyMessage"
                    style={{
                      display: "none",
                      color: "var(--text)",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 10
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
  
  )
}

export default checkhistorytab