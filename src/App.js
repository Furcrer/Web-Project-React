import './App.css';
import { Routes, Route } from "react-router-dom";


import LoginPage from './frontend/login_page.jsx';
import Dashboard from './frontend/dashboard.jsx';
import Print from './frontend/print_page.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/print" element={<Print />} />
    </Routes>
  );
}