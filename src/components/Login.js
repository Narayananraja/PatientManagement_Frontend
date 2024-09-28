import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            localStorage.setItem('patientId', response.data.id); // Save patient ID to local storage
            navigate('/profile'); // Redirect to profile after successful login
        } catch (error) {
            setError('Invalid email or password.'); // Update error message
        }
    };

    return (
        <div className="login-container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Login</h2>
                <Link to="/" className="btn btn-secondary">Home</Link> {/* Home link in the top right corner */}
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

export default Login;
