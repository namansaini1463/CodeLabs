import { createContext, useEffect, useState } from "react";
import { v4 } from "uuid";

export const CodeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const defaultCode = {
  ["cpp"]: `#include <bits/stdc++.h>
using namespace std;

int main(){
    cout << "Hello World" << endl;

    return 0;
}
`,
  ["java"]: `public class Main {
	public static void main(String[] args) {
		System.out.println("Hello World");
	}
}
`,
  ["javascript"]: `console.log("Hello World");`,
  ["python"]: `print("Hello World")`,
};

const initialData = [
  {
    id: v4(),
    title: "New Folder",
    files: [
      {
        id: v4(),
        title: `New File`,
        language: "cpp",
        code: defaultCode["cpp"],
      },
    ],
  },
];

// eslint-disable-next-line react/prop-types
function CodesProvider({ children }) {
  const [folders, setFolders] = useState(() => {
    const localData = localStorage.getItem("data");
    if (localData) return JSON.parse(localData);

    return initialData;
  });

  const createNewFolder = (newFolder) => {
    const { folderName, fileName, language } = newFolder;

    const newFolders = [...folders];
    newFolders.unshift({
      id: v4(),
      title: folderName,
      files: [
        {
          id: v4(),
          title: fileName,
          language: language,
          code: defaultCode[language],
        },
      ],
    });

    localStorage.setItem("data", JSON.stringify(newFolders));
    setFolders(newFolders);
  };

  const createNewCodesFolder = (folderName) => {
    const newFolder = {
      id: v4(),
      title: folderName,
      files: [],
    };

    const newFolders = [...folders];
    newFolders.unshift(newFolder);
    localStorage.setItem("data", JSON.stringify(newFolders));
    setFolders(newFolders);
  };

  const deleteFolder = (folderId) => {
    const updatedFolders = folders.filter((folder) => {
      return folder.id !== folderId;
    });

    localStorage.setItem("data", JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const updateFolderTitle = (newFolderTitle, id) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === id) {
        folder.title = newFolderTitle;
      }

      return folder;
    });

    localStorage.setItem("data", JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const updateFileTitle = (newFileTitle, fileId, folderId) => {
    const updatedFolders = [...folders];

    for (let i = 0; i < updatedFolders.length; i++) {
      if (updatedFolders[i].id === folderId) {
        const files = updatedFolders[i].files;
        for (let j = 0; j < files.length; j++) {
          if (files[i].id === fileId) {
            files[i].title = newFileTitle;
            break;
          }
        }
        break;
      }
    }

    localStorage.setItem("data", JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const deleteFile = (fileId, folderId) => {
    const updatedFolders = [...folders];

    for (let i = 0; i < updatedFolders.length; i++) {
      if (updatedFolders[i].id === folderId) {
        const files = [...updatedFolders[i].files];
        updatedFolders[i].files = files.filter((file) => {
          return file.id !== fileId;
        });
        break;
      }
    }

    localStorage.setItem("data", JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const createNewFile = (file, folderId) => {
    const updatedFolders = [...folders];

    for (let i = 0; i < updatedFolders.length; i++) {
      if (updatedFolders[i].id === folderId) {
        updatedFolders[i].files.unshift(file);
        break;
      }
    }

    localStorage.setItem("data", JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const getFileCode = (fileId, folderId) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) {
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j];
          if (currentFile.id === fileId) {
            return currentFile.code;
          }
        }
      }
    }
  };

  const getFileLanguage = (fileId, folderId) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) {
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j];
          if (currentFile.id === fileId) {
            return currentFile.language;
          }
        }
      }
    }
  };

  const getFileName = (fileId, folderId) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) {
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j];
          if (currentFile.id === fileId) {
            return currentFile.title;
          }
        }
      }
    }
  };

  const updateLanguageAndCode = (fileId, folderId, language) => {
    const updatedFolders = [...folders];
    for (let i = 0; i < updatedFolders.length; i++) {
      if (updatedFolders[i].id === folderId) {
        for (let j = 0; j < updatedFolders[i].files.length; j++) {
          const currentFile = updatedFolders[i].files[j];
          if (currentFile.id === fileId) {
            updatedFolders[i].files[j].code = defaultCode[language];
            updatedFolders[i].files[j].language = language;
          }
        }
      }
    }

    localStorage.setItem("data", JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const saveCode = (fileId, folderId, newCode) => {
    const updatedFolders = [...folders];
    for (let i = 0; i < updatedFolders.length; i++) {
      if (updatedFolders[i].id === folderId) {
        for (let j = 0; j < updatedFolders[i].files.length; j++) {
          const currentFile = updatedFolders[i].files[j];
          if (currentFile.id === fileId) {
            updatedFolders[i].files[j].code = newCode;
          }
        }
      }
    }

    localStorage.setItem("data", JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(folders));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const codesProviderFeatures = {
    folders,
    createNewFolder,
    createNewCodesFolder,
    deleteFolder,
    updateFolderTitle,
    updateFileTitle,
    deleteFile,
    createNewFile,
    getFileName,
    getFileCode,
    getFileLanguage,
    updateLanguageAndCode,
    saveCode,
  };

  return (
    <CodeContext.Provider value={codesProviderFeatures}>
      {children}
    </CodeContext.Provider>
  );
}

export default CodesProvider;
