import { createContext, useState } from "react";

export const ModelContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const modalConstants = {
  CREATE_CODE: "CREATE_CODE",
  CREATE_FOLDER: "CREATE_FOLDER",
  UPDATE_FOLDER_TITLE: "UPDATE_FOLDER_TITLE",
  UPDATE_FILE_TITLE: "UPDATE_FILE_TITLE",
  CREATE_FILE: "CREATE_FILE",
};

// eslint-disable-next-line react/prop-types
function ModalProvider({ children }) {
  const [modalType, setModalType] = useState(null);
  const [modalPayload, setModalPayload] = useState(null);

  const closeModal = () => {
    setModalType(null);
    setModalPayload(null);
  };

  const modalFeatures = {
    activeModal: modalType,
    openModal: setModalType,
    closeModal,
    modalPayload,
    setModalPayload,
  };
  return (
    <ModelContext.Provider value={modalFeatures}>
      {children}
    </ModelContext.Provider>
  );
}

export default ModalProvider;
