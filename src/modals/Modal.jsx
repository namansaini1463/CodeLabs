import { useContext } from "react";
import { ModelContext, modalConstants } from "../providers/ModalProvider";
import CreateCodeModal from "./CreateCodeModal/CreateCodeModal";
import CreateFolderModal from "./CreateFolderModal/CreateFolderModal";
import UpdateFolderTitleModal from "./UpdateFolderTitleModal/UpdateFolderTitleModal";
import UpdateFileTitleModal from "./UpdateFileTitleModal/UpdateFileTitleModal";
import CreateFileModal from "./CreateFileModal/CreateFileModal";

function Modal() {
  const modalFeatures = useContext(ModelContext);

  return (
    <>
      {modalFeatures.activeModal === modalConstants.CREATE_CODE && (
        <CreateCodeModal />
      )}
      {modalFeatures.activeModal === modalConstants.CREATE_FOLDER && (
        <CreateFolderModal />
      )}
      {modalFeatures.activeModal === modalConstants.UPDATE_FOLDER_TITLE && (
        <UpdateFolderTitleModal />
      )}
      {modalFeatures.activeModal === modalConstants.UPDATE_FILE_TITLE && (
        <UpdateFileTitleModal />
      )}
      {modalFeatures.activeModal === modalConstants.CREATE_FILE && (
        <CreateFileModal />
      )}
    </>
  );
}

export default Modal;
