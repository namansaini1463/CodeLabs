import CloseIcon from "@mui/icons-material/Close";

import "./CreateFolderModal.scss";
import "../CreateCodeModal/CreateCodeModal.scss";
import { useContext } from "react";
import { ModelContext } from "../../providers/ModalProvider";
import { CodeContext } from "../../providers/CodesProvider";

function CreateFolderModal() {
  const modalFeatures = useContext(ModelContext);
  const { createNewCodesFolder } = useContext(CodeContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };

  const onSubmitModal = (event) => {
    event.preventDefault();
    const folderName = event.target.folderName.value;
    // console.log(folderName);
    createNewCodesFolder(folderName);

    closeModal();
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <form action="" className="modal-body" onSubmit={onSubmitModal}>
          <CloseIcon className="close-icon" onClick={closeModal} />
          <h3 className="folder-modal-title">Create New Folder</h3>
          <div className="modal-item">
            <label htmlFor="">New file name: </label>
            <input
              type="text"
              placeholder="Enter folder name"
              name="folderName"
              autoComplete="off"
              required
            />
          </div>
          <button type="submit"> New</button>
        </form>
      </div>
    </div>
  );
}

export default CreateFolderModal;
