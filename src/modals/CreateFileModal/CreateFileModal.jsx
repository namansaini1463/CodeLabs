import { v4 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";

import "./CreateFileModal.scss";
import "../CreateCodeModal/CreateCodeModal.scss";
import { useContext } from "react";
import { ModelContext } from "../../providers/ModalProvider";
import { CodeContext, defaultCode } from "../../providers/CodesProvider";

function CreateFileModal() {
  const modalFeatures = useContext(ModelContext);
  const { createNewFile } = useContext(CodeContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };

  const onSubmitModal = (event) => {
    event.preventDefault();
    const fileName = event.target.fileName.value;
    const language = event.target.language.value;

    const file = {
      id: v4(),
      title: fileName,
      language: language,
      code: defaultCode[language],
    };

    createNewFile(file, modalFeatures.modalPayload);
    modalFeatures.closeModal();
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <form className="modal-body" onSubmit={onSubmitModal}>
          <CloseIcon className="close-icon" onClick={closeModal} />
          <h1>Create New File</h1>
          <div className="modal-item">
            <label htmlFor="">New file name: </label>
            <input
              type="text"
              name="fileName"
              autoComplete="off"
              placeholder="New File Name"
              required
            />
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

export default CreateFileModal;
