import CloseIcon from "@mui/icons-material/Close";

import "./UpdateFileTitleModal.scss";
import "../CreateCodeModal/CreateCodeModal.scss";
import { useContext } from "react";
import { ModelContext } from "../../providers/ModalProvider";
import { CodeContext } from "../../providers/CodesProvider";

function UpdateFileTitleModal() {
  const modalFeatures = useContext(ModelContext);
  const { updateFileTitle } = useContext(CodeContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };

  const onSubmitModal = (event) => {
    event.preventDefault();

    const fileName = event.target.fileName.value;
    updateFileTitle(
      fileName,
      modalFeatures.modalPayload.fileId,
      modalFeatures.modalPayload.folderId
    );

    modalFeatures.closeModal();
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <form action="" className="modal-body" onSubmit={onSubmitModal}>
          <CloseIcon className="close-icon" onClick={closeModal} />
          <h3 className="folder-modal-title">Update File Name: </h3>
          <div className="modal-item">
            <label htmlFor="">New file name: </label>
            <input
              type="text"
              placeholder="Enter new file name"
              name="fileName"
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

export default UpdateFileTitleModal;
