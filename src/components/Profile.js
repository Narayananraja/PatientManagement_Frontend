import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const [patient, setPatient] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedAge, setUpdatedAge] = useState('');
    const [updatedContact, setUpdatedContact] = useState('');
    const [updatedDisease, setUpdatedDisease] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatientDetails = async () => {
            const patientId = localStorage.getItem('patientId');

            if (!patientId) {
                alert('No patient ID found. Please log in again.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`/${patientId}`);
                setPatient(response.data);
                setUpdatedName(response.data.name);
                setUpdatedEmail(response.data.email);
                setUpdatedAge(response.data.age);
                setUpdatedContact(response.data.contact);
                setUpdatedDisease(response.data.disease);
            } catch (error) {
                console.error('Error fetching patient details:', error);
            }
        };

        fetchPatientDetails();
    }, [navigate]);

    const handleUpdate = async () => {
        const updatedPatient = {
            name: updatedName,
            email: updatedEmail,
            age: updatedAge,
            contact: updatedContact,
            disease: updatedDisease,
            password: patient.password,
        };

        try {
            if (updatedEmail !== patient.email) {
                const emailCheckResponse = await axios.get(`/check-email/${updatedEmail}`);
                if (!emailCheckResponse.data.available) {
                    setError('Email already in use.');
                    return;
                }
            }

            await axios.put(`/${patient.id}`, updatedPatient);
            alert('Profile updated successfully!');
            setError('');
        } catch (error) {
            console.error('Error updating patient profile:', error);
            setError('An error occurred while updating the profile.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('patientId'); // Clear patient ID from local storage
        navigate('/login'); // Redirect to login page
    };

    if (!patient) return <p>Loading...</p>;

    return (
        <div className="profile-container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-center">Patient Profile</h2>
                <div>
                    <Link to="/" className="btn btn-secondary me-2">Home</Link> {/* Home link */}
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button> {/* Logout button */}
                </div>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label"><strong>Name:</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Email:</strong></label>
                        <input
                            type="email"
                            className="form-control"
                            value={updatedEmail}
                            onChange={(e) => setUpdatedEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Age:</strong></label>
                        <input
                            type="number"
                            className="form-control"
                            value={updatedAge}
                            onChange={(e) => setUpdatedAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Contact:</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={updatedContact}
                            onChange={(e) => setUpdatedContact(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Disease:</strong></label>
                        <textarea
                            className="form-control"
                            value={updatedDisease}
                            onChange={(e) => setUpdatedDisease(e.target.value)}
                            rows={3} // You can adjust the number of rows
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleUpdate}>Update Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
