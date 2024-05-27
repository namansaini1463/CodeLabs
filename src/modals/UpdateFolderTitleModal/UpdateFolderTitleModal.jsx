import CloseIcon from "@mui/icons-material/Close";

import "./UpdateFolderTitleModal.scss";
import "../CreateCodeModal/CreateCodeModal.scss";

import { useContext } from "react";
import { ModelContext } from "../../providers/ModalProvider";
import { CodeContext } from "../../providers/CodesProvider";

function UpdateFolderTitleModal() {
  const modalFeatures = useContext(ModelContext);
  const { updateFolderTitle } = useContext(CodeContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };

  const onSubmitModal = (event) => {
    event.preventDefault();

    const folderName = event.target.folderName.value;
    updateFolderTitle(folderName, modalFeatures.modalPayload);
    closeModal();
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <form action="" className="modal-body" onSubmit={onSubmitModal}>
          <CloseIcon className="close-icon" onClick={closeModal} />
          <h3 className="folder-modal-title">Update Folder Name: </h3>
          <div className="modal-item">
            <label htmlFor="">New folder name: </label>
            <input
              type="text"
              placeholder="Enter new folder name"
              name="folderName"
              autoComplete="off"
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateFolderTitleModal;
