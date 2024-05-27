import SaveAsIcon from "@mui/icons-material/SaveAs";
import PublishIcon from "@mui/icons-material/Publish";
import DownloadIcon from "@mui/icons-material/Download";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import Editor from "@monaco-editor/react";

import "./EditorContainer.scss";
import { useContext, useRef, useState } from "react";
import { CodeContext } from "../../providers/CodesProvider";

const editorOptions = {
  fontSize: "18px",
  wordWrap: "on",
};

const fileExtensions = {
  cpp: "cpp",
  java: "java",
  javascript: "js",
  python: "py",
};

// eslint-disable-next-line react/prop-types
function EditorContainer({ fileId, folderId, runCode }) {
  const {
    getFileName,
    getFileCode,
    getFileLanguage,
    updateLanguageAndCode,
    saveCode,
  } = useContext(CodeContext);

  const fileName = getFileName(fileId, folderId);

  const [code, setCode] = useState(() => {
    return getFileCode(fileId, folderId);
  });
  const [language, setLanguage] = useState(() => {
    return getFileLanguage(fileId, folderId);
  });

  const [theme, setTheme] = useState("vs-dark");
  const codeRef = useRef(code);

  const onChangeCode = (newCode) => {
    codeRef.current = newCode;
  };

  const onChangeLanguage = (event) => {
    updateLanguageAndCode(fileId, folderId, event.target.value);
    setCode(getFileCode(fileId, folderId));
    setLanguage(event.target.value);
  };

  const onChangeTheme = (event) => {
    const newTheme = event.target.value;
    setTheme(newTheme);
  };

  const onImportCode = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.includes("text");

    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function (value) {
        const importedCode = value.target.result;
        setCode(importedCode);
        codeRef.current = importedCode;
      };
    } else {
      alert("Please select a program file");
    }
  };

  const onExportCode = () => {
    let codeValue = codeRef.current;

    if (!codeValue) {
      alert("Empty file cannot be exported!");
    } else {
      codeValue = codeValue.trim();
      //`Creating a blob or instant file in the memory
      const codeBlob = new Blob([codeValue], { type: "text/plain" });
      //` Creating a downloadable link for the blob data
      const downloadUrl = URL.createObjectURL(codeBlob);
      //`Creating a downloadable link for the above url
      const link = document.createElement("a");
      link.href = downloadUrl;
      const fileExtension = fileExtensions[language];
      link.download = `code.${fileExtension}`;
      link.click();
    }
  };

  const onSaveCode = () => {
    saveCode(fileId, folderId, codeRef.current);
    // console.log(codeRef.current);
    alert("Code Saved Successfully!");
  };

  const onRunCode = () => {
    runCode({ code: codeRef.current, language });
  };

  return (
    <div className="root-editor-container">
      <div className="editor-header">
        <div className="left-editor-header">
          <div className="editor-header-title-container">
            <h3 className="editor-container-title">{fileName}</h3>
          </div>
          <button className="save-code" onClick={onSaveCode}>
            <SaveAsIcon />
            <h4>Save Code</h4>
          </button>
        </div>
        <div className="right-editor-header">
          <select
            name="language"
            className="editor-select"
            onChange={onChangeLanguage}
            value={language}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <select
            name="theme"
            className="editor-select"
            value={theme}
            onChange={onChangeTheme}
          >
            <option value="vs-light">Light</option>
            <option value="vs-dark">Dark</option>
          </select>
        </div>
      </div>
      <div className="editor-body">
        <Editor
          language={language}
          options={editorOptions}
          theme={theme}
          onChange={onChangeCode}
          value={code}
        />
      </div>
      <div className="editor-footer">
        <button>
          <label htmlFor="import-code" className="editor-footer-item">
            <PublishIcon />
            <h4>Import Code</h4>
          </label>
        </button>
        <input
          type="file"
          id="import-code"
          style={{ display: "none" }}
          onChange={onImportCode}
        />
        <button className="editor-footer-item" onClick={onExportCode}>
          <DownloadIcon />
          <h4>Export Code</h4>
        </button>
        <button className="editor-footer-item run-code" onClick={onRunCode}>
          <PlayArrowIcon />
          <h4>Run Code</h4>
        </button>
      </div>
    </div>
  );
}

export default EditorContainer;
