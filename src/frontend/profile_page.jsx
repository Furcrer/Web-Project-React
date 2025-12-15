import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import './components/css/profile.css';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");
    
    const navigate = useNavigate();

    // Check authentication and load user data
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!user || !user.email) {
            navigate('/login');
            return;
        }
        
        // Load user data from database
        loadUserData(user.id);
    }, [navigate]);

    const loadUserData = async (userId) => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost/cenovky/src/backend/get_user_profile.php?id=${userId}`);
            const data = await res.json();
            
            if (data.error) {
                setError(data.error);
            } else {
                setUserData(data);
            }
        } catch (err) {
            console.error("Error loading user data:", err);
            setError("Chyba pri načítaní údajov");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!user || !user.id) {
            setError("Nie ste prihlásený");
            return;
        }

        if (deleteConfirmText !== "POTVRDZOVAŤ") {
            setError("Pre potvrdenie zadajte: POTVRDZOVAŤ");
            return;
        }

        try {
            const res = await fetch('http://localhost/cenovky/src/backend/delete_my_account.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: user.id })
            });
            
            const result = await res.json();
            
            if (result.success) {
                setSuccess("Váš účet bol úspešne vymazaný");
                
                // Clear localStorage and redirect after 2 seconds
                setTimeout(() => {
                    localStorage.removeItem('user');
                    navigate('/login');
                }, 2000);
            } else {
                setError(result.error || "Chyba pri mazaní účtu");
            }
        } catch (err) {
            console.error("Error deleting account:", err);
            setError("Chyba pri mazaní účtu");
        }
    };

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.email) {
        return null;
    }

    return (
        <>
            <Header />
            <div className="profile-container">
                <h1 className="profile-title">Môj profil</h1>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                {loading ? (
                    <div className="loading-container">
                        <p>Načítavam údaje...</p>
                    </div>
                ) : userData ? (
                    <div className="profile-content">
                        {/* User Information */}
                        <div className="profile-info">
                            <h2 className="info-title">Osobné údaje</h2>
                            
                            <div className="info-grid">
                                <div className="info-item">
                                    <label className="info-label">Meno:</label>
                                    <div className="info-value">{userData.meno}</div>
                                </div>
                                
                                <div className="info-item">
                                    <label className="info-label">Email:</label>
                                    <div className="info-value">{userData.email}</div>
                                </div>
                                
                                <div className="info-item">
                                    <label className="info-label">Rok narodenia:</label>
                                    <div className="info-value">{userData.rok_narodenia}</div>
                                </div>
                                
                                <div className="info-item">
                                    <label className="info-label">Štát:</label>
                                    <div className="info-value">{userData.stat}</div>
                                </div>
                                
                                {userData.telefon && (
                                    <div className="info-item">
                                        <label className="info-label">Telefón:</label>
                                        <div className="info-value">{userData.telefon}</div>
                                    </div>
                                )}
                                
                                {userData.poznamka && (
                                    <div className="info-item full-width">
                                        <label className="info-label">Poznámka:</label>
                                        <div className="info-value">{userData.poznamka}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Danger Zone - Delete Account */}
                        <div className="danger-zone">
                            <h2 className="danger-title">Nebezpečná zóna</h2>
                            <p className="danger-warning">
                                ⚠️ Tieto akcie sú nevratné. Po vymazaní účtu stratíte prístup k aplikácii.
                            </p>
                            
                            {!showDeleteConfirm ? (
                                <button 
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="delete-account-button"
                                >
                                    Vymazať môj účet
                                </button>
                            ) : (
                                <div className="delete-confirmation">
                                    <p className="confirmation-warning">
                                        <strong>UPOZORNENIE:</strong> Naozaj chcete vymazať svoj účet? 
                                        Táto akcia je nevratná. Stratíte všetky svoje údaje.
                                    </p>
                                    
                                    <div className="confirmation-instruction">
                                        <p>Pre potvrdenie zadajte: <strong>POTVRDZOVAŤ</strong></p>
                                        <input
                                            type="text"
                                            value={deleteConfirmText}
                                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                                            placeholder="Zadajte POTVRDZOVAŤ"
                                            className="confirmation-input"
                                        />
                                    </div>
                                    
                                    <div className="confirmation-buttons">
                                        <button 
                                            onClick={handleDeleteAccount}
                                            disabled={deleteConfirmText !== "POTVRDZOVAŤ"}
                                            className="confirm-delete-button"
                                        >
                                            Áno, vymazať účet
                                        </button>
                                        
                                        <button 
                                            onClick={() => {
                                                setShowDeleteConfirm(false);
                                                setDeleteConfirmText("");
                                                setError("");
                                            }}
                                            className="cancel-delete-button"
                                        >
                                            Zrušiť
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="no-data">
                        <p>Nepodarilo sa načítať údaje o používateľovi.</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}