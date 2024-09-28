import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';
const Register = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [contact, setContact] = useState('');
    const [disease, setDisease] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', { name, age, contact, disease, password, email });
            setSuccess('Registration successful! You can now login.');
            setError('');
            navigate('/login');
        } catch (error) {
            setError(error.response.data);
            setSuccess('');
        }
    };

    return (
        <div className="register-container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-center">Register</h2>
                <div>
                    <Link to="/" className="btn btn-link">Home</Link>
                    <Link to="/login" className="btn btn-link">Login</Link>
                </div>
            </div>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleRegister} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Disease:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={disease}
                        onChange={(e) => setDisease(e.target.value)}
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
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
};

export default Register;
