import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import CodeScreen from "./screens/CodeScreen/CodeScreen";
import CodesProvider from "./providers/CodesProvider";
import ModalProvider from "./providers/ModalProvider";

import "./App.css";

function App() {
  return (
    <CodesProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/code/:folderId/:fileId" element={<CodeScreen />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </CodesProvider>
  );
}

export default App;
