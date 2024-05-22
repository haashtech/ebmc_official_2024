import React from "react";


function newcheckbutton() {
  return (
    <div className="py-3">
      <button
        id="myButton"
        style={{
          backgroundColor: "var(--orange)",
          border: "none",
          padding: "15px 40px",
          borderRadius: 5,
          fontWeight: 600,
          width: "fit-content",
          color: "var(--white)",
        }}
        className="btn btn-primary"
        onclick="switchToTab('v-pills-messages')"
      >
        NEW CHECK
      </button>
    </div>
  );
}

export default newcheckbutton;
