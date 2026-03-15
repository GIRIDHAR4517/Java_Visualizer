import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import EditorPage from "../Editor/EditorPage";
import LoginPage from "./LoginPaage";
import Register from "./RegisterPage";

function AppRouter() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/signup" element={<Register />} />

        <Route path="/editor" element={<EditorPage />} />

      </Routes>

    </BrowserRouter>
  );

}

export default AppRouter;