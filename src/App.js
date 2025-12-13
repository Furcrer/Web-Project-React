import './App.css';
import { Routes, Route } from "react-router-dom";


import LoginPage from './frontend/login_page.jsx';
import Dashboard from './frontend/dashboard.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}