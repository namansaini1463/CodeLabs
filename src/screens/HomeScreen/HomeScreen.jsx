import { useContext } from "react";
// import LeftHomeScreen from "../../components/LeftHomeScreen/LeftHomeScreen";
// import RightHomeScreen from "../../components/RightHomeScreen/RightHomeScreen";

import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import "./HomeScreen.scss";
import { CodeContext } from "../../providers/CodesProvider";
import Modal from "../../modals/Modal";
import { ModelContext, modalConstants } from "../../providers/ModalProvider";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Folder = ({ folderTitle, cards, folderId }) => {
  const { deleteFolder, deleteFile } = useContext(CodeContext);
  const { openModal, setModalPayload } = useContext(ModelContext);
  const navigate = useNavigate();

  const onDeleteFolder = () => {
    deleteFolder(folderId);
  };

  const onEditFolderTitle = () => {
    setModalPayload(folderId);
    openModal(modalConstants.UPDATE_FOLDER_TITLE);
  };

  const openCreateNewFileModal = () => {
    setModalPayload(folderId);
    openModal(modalConstants.CREATE_FILE);
  };

  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-header-items">
          <FolderIcon fontSize="large" sx={{ fill: "#FFCA29" }} />
          {folderTitle}
        </div>
        <div className="folder-header-items">
          <DeleteIcon
            fontSize="large"
            className="delete-folder my-mui-icon"
            onClick={onDeleteFolder}
          />
          <EditIcon
            fontSize="large"
            className="my-mui-icon"
            onClick={onEditFolderTitle}
          />
          <button className="add-new-button" onClick={openCreateNewFileModal}>
            <AddIcon />
            <span>New</span>
          </button>
        </div>
      </div>
      <div className="cards-container">
        {
          // eslint-disable-next-line react/prop-types
          cards?.map((file, index) => {
            const onUpdateFile = () => {
              setModalPayload({ fileId: file.id, folderId: folderId });
              openModal(modalConstants.UPDATE_FILE_TITLE);
            };

            const onDeleteFile = () => {
              deleteFile(file.id, folderId);
            };

            //` Navigating to the respective code screen using the folderId and the fileID
            const navigateToCodeScreen = () => {
              navigate(`/code/${folderId}/${file.id}`);
            };

            return (
              <div className="card" key={index}>
                <div className="card-items" onClick={navigateToCodeScreen}>
                  <img src="logo.png" alt="logo" />
                  <div className="title-container">
                    <span className="title-name">{file?.title}</span>
                    <span className="title-language">
                      Language: {file?.language}
                    </span>
                  </div>
                </div>
                <div className="card-items">
                  <DeleteIcon onClick={onDeleteFile} />
                  <EditIcon onClick={onUpdateFile} />
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

function HomeScreen() {
  const { folders } = useContext(CodeContext);
  const modalFeatures = useContext(ModelContext);

  const openCreateCodeModal = () => {
    modalFeatures.openModal(modalConstants.CREATE_CODE);
  };

  const openCreateNewFolderModal = () => {
    modalFeatures.openModal(modalConstants.CREATE_FOLDER);
  };

  return (
    <div className="home-container">
      <div className="left-container">
        <div className="left-items-container">
          <img src="logo.png" alt="logo" className="left-logo" />
          <h1>CodeLabs</h1>
          <h2>Code. Compile. Execute.</h2>
          <button onClick={openCreateCodeModal}>
            <AddIcon sx={{ stroke: "black", strokeWidth: 1 }} />
            <span> Start Coding</span>
          </button>
        </div>
      </div>

      <div className="right-container">
        <div className="header">
          <div className="title">
            <span>My</span>
            &nbsp;
            <strong>Codes</strong>
          </div>
          <button className="add-folder" onClick={openCreateNewFolderModal}>
            <AddIcon />
            <span> New Folder</span>
          </button>
        </div>
        {folders?.map((folder) => {
          return (
            <Folder
              key={folder.id}
              folderTitle={folder.title}
              cards={folder.files}
              folderId={folder.id}
            />
          );
        })}
      </div>
      <Modal />
    </div>
  );
}

export default HomeScreen;
