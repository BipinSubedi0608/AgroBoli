import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/global/navbar";
import HomePage from "./pages/home";
import SettingsPage from "./pages/settings";
import ErrorPage from "./pages/error";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/home" element={<Navigate to="/" />} />

        <Route path="/" element={<HomePage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
