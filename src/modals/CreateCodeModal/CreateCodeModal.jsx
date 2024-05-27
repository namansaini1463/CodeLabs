import CloseIcon from "@mui/icons-material/Close";

import { useContext } from "react";
import { ModelContext } from "../../providers/ModalProvider";
import { CodeContext } from "../../providers/CodesProvider";

import "./CreateCodeModal.scss";

function CreateCodeModal() {
  const modalFeatures = useContext(ModelContext);
  const codesProviderFeatures = useContext(CodeContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };

  const onSubmitModal = (event) => {
    event.preventDefault();

    // const { folderName, fileName, language } = event.target;
    const folderName = event.target.folderName.value;
    const fileName = event.target.fileName.value;
    const language = event.target.language.value;
    codesProviderFeatures.createNewFolder({ folderName, fileName, language });

    closeModal();
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <form className="modal-body" onSubmit={onSubmitModal}>
          <CloseIcon className="close-icon" onClick={closeModal} />
          <h1>Create New Folder</h1>
          <div className="modal-item">
            <label htmlFor="">New folder name: </label>
            <input type="text" name="folderName" autoComplete="off" required />
          </div>
          <div className="modal-item">
            <label htmlFor="">New card name: </label>
            <input type="text" name="fileName" autoComplete="off" required />
          </div>
          <div className="modal-item">
            <select name="language" id="">
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCodeModal;
