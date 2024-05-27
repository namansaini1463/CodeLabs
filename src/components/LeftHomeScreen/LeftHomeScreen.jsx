import AddIcon from "@mui/icons-material/Add";

import "./LeftHomeScreen.scss";

function LeftHomeScreen() {
  // return <h1>World</h1>;
  return (
    <div className="left-container">
      <div className="left-items-container">
        <img src="logo.png" alt="logo" className="left-logo" />
        <h1>CodeLabs</h1>
        <h2>Code. Compile. Execute.</h2>
        <button>
          <AddIcon sx={{ stroke: "black", strokeWidth: 1 }} />
          <span> Start Coding</span>
        </button>
      </div>
    </div>
  );
}

export default LeftHomeScreen;
