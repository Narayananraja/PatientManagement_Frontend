import React, { useState } from 'react';
import axios from '../axiosConfig';  // Axios configuration to call your API
import { useNavigate, Link } from 'react-router-dom';  // Import Link for navigation
import '../styles/AdminLogin.css'; // Add this line to include custom styles

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [patients, setPatients] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false); // Track login status
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/admin', { email, password });
            setPatients(response.data); // Set patients after login
            setLoggedIn(true); // Hide login form and show patient table
            setError('');
        } catch (error) {
            setError('Invalid admin credentials');
        }
    };

    return (
        <div className="admin-login-container mt-5">
            {/* Add Home link at the top right */}
            <div className="d-flex justify-content-between">
                <h2 className="">Admin Login</h2>
                <Link to="/" className="btn btn-secondary">Home</Link>
            </div>

            {!loggedIn ? (
                <>
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
                </>
            ) : (
                <div className="patients-list mt-5">
                    <h3>All Patients:</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Age</th>
                                <th>Disease</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.name}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.contact}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.disease}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminLogin;
