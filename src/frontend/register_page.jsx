import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./components/css/register.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        meno: "",
        rok_narodenia: "",
        stat: "",
        email: "",
        password: "", // Add password field
        telefon: "",
        poznamka: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
        setMessage("");
    };

    const validateForm = () => {
        // Name validation
        const nameRegex = /^[a-zA-Zá-žÁ-Ž ]+$/;
        if (!nameRegex.test(formData.meno)) {
            setError("Meno môže obsahovať iba písmená.");
            return false;
        }

        // Year validation
        if (isNaN(formData.rok_narodenia) || formData.rok_narodenia === "") {
            setError("Rok narodenia musí byť číslo.");
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Zadajte platný email.");
            return false;
        }

        // Password validation (min 6 characters)
        if (!formData.password || formData.password.length < 6) {
            setError("Heslo musí mať aspoň 6 znakov.");
            return false;
        }

        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch('http://localhost/cenovky/src/backend/register.php', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                setMessage(result.success);
                setFormData({ 
                    meno: "", 
                    rok_narodenia: "", 
                    stat: "", 
                    email: "", 
                    password: "",
                    telefon: "", 
                    poznamka: "" 
                });
                // Optional: auto redirect after successful registration
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Nepodarilo sa odoslať dáta na server.");
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Registrácia</h2>
                
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Meno *</label>
                        <input 
                            type="text" 
                            name="meno" 
                            placeholder="Zadajte meno" 
                            value={formData.meno} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Rok narodenia *</label>
                        <input 
                            type="number" 
                            name="rok_narodenia" 
                            placeholder="Napríklad: 1990" 
                            value={formData.rok_narodenia} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Štát *</label>
                        <input 
                            type="text" 
                            name="stat" 
                            placeholder="Zadajte štát" 
                            value={formData.stat} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Email *</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="email@priklad.sk" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Heslo *</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Minimálne 6 znakov" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Telefón</label>
                        <input 
                            type="text" 
                            name="telefon" 
                            placeholder="Voliteľné" 
                            value={formData.telefon} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Poznámka</label>
                        <textarea 
                            name="poznamka" 
                            placeholder="Voliteľná poznámka" 
                            value={formData.poznamka} 
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="register-btn"
                        disabled={loading}
                    >
                        {loading ? 'Registrujem...' : 'Zaregistrovať sa'}
                    </button>
                </form>

                <div className="register-links">
                    <p>Máte už účet? <a href="/login">Prihláste sa</a></p>
                </div>

                <div className="register-footer">
                    <p>
                        Informácia: Vaše údaje sú spracovávané v súlade s GDPR. 
                    </p>
                    <p className="required-note">* Povinné polia</p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;