import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './frontend/login_page.jsx';
import Dashboard from './frontend/dashboard.jsx';
import Print from './frontend/print_page.jsx';
import RegisterPage from './frontend/register_page.jsx';
import ProtectedRoute from './frontend/components/protected_route.jsx';
import Profile from './frontend/profile_page.jsx';

function App() {
    return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/print" 
                    element={
                        <ProtectedRoute>
                            <Print />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/profile" 
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
    );
}

export default App;