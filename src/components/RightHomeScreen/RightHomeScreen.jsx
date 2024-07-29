import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import "./RightHomeScreen.scss";

// eslint-disable-next-line react/prop-types
function RightHomeScreen({ folders }) {
  //console.log(folders[0]);

  // return <h1>Hello</h1>;

  return (
    <div className="right-container">
      <div className="header">
        <div className="title">
          <span>My</span>
          &nbsp;
          <strong>Codes</strong>
        </div>
        <button className="add-folder">
          <AddIcon />
          <span> New Folder</span>
        </button>
      </div>
      <div className="folder-container">
        <div className="folder-header">
          <div className="folder-header-items">
            <FolderIcon fontSize="large" sx={{ fill: "#FFCA29" }} />
            {"Data Structures"}
          </div>
          <div className="folder-header-items">
            <DeleteIcon fontSize="large" />
            <EditIcon fontSize="large" />
            <button className="add-new-button">
              <AddIcon />
              <span>New</span>
            </button>
          </div>
        </div>
        <div className="cards-container">
          <div className="card">
            <div className="card-items">
              <img src="logo.png" alt="logo" />
              <div className="title-container">
                <span className="title-name">{"Graphs"}</span>
                <span className="title-language">Language: {"C++"}</span>
              </div>
            </div>
            <div className="card-items">
              <DeleteIcon />
              <EditIcon />
            </div>
          </div>

          <div className="card">
            <div className="card-items">
              <img src="logo.png" alt="logo" />
              <div className="title-container">
                <span className="title-name">{"Graphs"}</span>
                <span className="title-language">Language: {"C++"}</span>
              </div>
            </div>
            <div className="card-items">
              <DeleteIcon />
              <EditIcon />
            </div>
          </div>
          <div className="card">
            <div className="card-items">
              <img src="logo.png" alt="logo" />
              <div className="title-container">
                <span className="title-name">{"Graphs"}</span>
                <span className="title-language">Language: {"C++"}</span>
              </div>
            </div>
            <div className="card-items">
              <DeleteIcon />
              <EditIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightHomeScreen;
