import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import EditorPage from "../Editor/EditorPage";
import LoginPage from "./LoginPaage";

function AppRouter() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/editor" element={<EditorPage />} />

      </Routes>

    </BrowserRouter>
  );

}

export default AppRouter;