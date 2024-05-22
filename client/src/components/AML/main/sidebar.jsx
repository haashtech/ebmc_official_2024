import React from 'react'

function sidebar() {
  return (
    <div className="row m-0">
  <div className="py-5 m-0 d-flex justify-content-center align-items-start logo_section1">
    <img style={{height: 140}} src="/asset/images/logo/Echeck Final Logo-01.svg" alt="logo" />
  </div>
  <div className="logo_section2 pe-0 container-fluid p-0">
    <div className="row m-0">
      <div className="p-0 m-0">
        <div className="text-white py-4">
          <div style={{width: '100%'}} className="d-flex align-items-start">
            <div style={{width: '100%', boxSizing: 'border-box'}} className="nav flex-column nav-pills btn_sidebar" id="v-pills-tab1" role="tablist" aria-orientation="vertical">
              <hr className="m-0" />
              <button className="meeem nav-link active align-items-center d-flex py-4 pe-0 m-0 menu-close5" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                <div id="btn_dashboard_tab" className=" " style={{display: 'flex', alignItems: 'center'}}>
                  <iconify-icon className="pe-3" icon="radix-icons:dashboard" />
                  Dashboard
                </div>
              </button>
              <hr className="m-0" />
              <button className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                <div id="btn_profile_tab ">
                  <iconify-icon className="pe-3" icon="healthicons:ui-user-profile" />
                  Profile
                </div>
              </button>
              <hr className="m-0" />
              <button className="btnremove menu-close1 nav-link align-items-center d-flex py-4 pe-0" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages">
                <div type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false" className="d-flex align-items-center" style={{textDecoration: 'none', fontWeight: 500}} href="/">
                  <iconify-icon className="pe-3" icon="ic:round-plus" />New Check
                </div>
              </button>
              <hr className="m-0" />
              <button className="meeem menu-close2 nav-link align-items-center d-flex py-4 pe-0" data-bs-toggle="pill" data-bs-target="#v-pills-checkHistory" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false" id="v-pills-home-tab">
                <div className="d-flex align-items-center" style={{textDecoration: 'none', fontWeight: 500}} href="/">
                  <iconify-icon className="pe-3" icon="material-symbols:history-rounded" />Check History
                </div>
              </button>
              <hr className="m-0" />
              <button className="meeem menu-close3 nav-link align-items-center d-flex py-4 pe-0" data-bs-toggle="pill" data-bs-target="#v-pills-notifications" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false" id="v-pills-home-tab">
                <div className="d-flex align-items-center" style={{textDecoration: 'none', fontWeight: 500}} href="/">
                  <iconify-icon className="pe-3" icon="mi:notification" />Notifications
                </div>
              </button>
              <hr className="m-0" />
            </div>
            <div className="col logout p-3" id="logout" style={{position: 'absolute', bottom: 0}}>
              <a href="/">
                <img src="/asset/images/icons/logout_icon.svg" alt />
                logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default sidebar