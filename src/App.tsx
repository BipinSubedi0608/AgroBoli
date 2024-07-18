import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/global/navbar";
import HomePage from "./pages/home/homePage";
import SettingsPage from "./pages/profile/profilePage";
import ErrorPage from "./pages/errorPage";

export default function App() {
  return (
    <>
      <div className="mb-[4.5rem]">
        <NavBar />
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/home" element={<Navigate to="/" />} />

          <Route path="/" element={<HomePage />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
