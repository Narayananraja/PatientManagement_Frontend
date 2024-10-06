import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/admin', { email, password });
        if (response.status === 200) {
            const userData = {
               email: email,
               role: 'admin',
            };
            localStorage.setItem('user', JSON.stringify(userData));
            // If login is successful, navigate to patients list
            navigate('/patients-list');
            setError('');
        }
    } catch (error) {
        setError('Invalid admin credentials');
    }
};


    return (
        <div className="admin-login-container mt-5">
            <div className="d-flex justify-content-between mb-4">
                <h2 className="mb-4">Admin Login</h2>
                <div>
                    <Link to="/" className="btn btn-secondary me-3">Home</Link>
                    <Link to="/register" className="btn btn-secondary">Register</Link> {/* Register Link */}
                    <Link to="/doctorRegistration" className="btn btn-secondary">AddDoctor</Link>
                    
                </div>
            </div>

            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
