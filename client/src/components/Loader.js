import React  from "react";
import BarLoader from "react-spinners/BarLoader"

function Loader() {
  

  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // This ensures the loader takes up the full height of the viewport
  };

  return (
    <div style={loaderContainerStyle}>
      <BarLoader

        color="orange"
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
