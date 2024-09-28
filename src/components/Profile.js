import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AdminLogin.css';

const PatientListPage = () => {
    const [patients, setPatients] = useState([]);
    const [editPatientId, setEditPatientId] = useState(null);
    const [editedPatient, setEditedPatient] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch patients when component mounts
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('/patients-list'); // API call to get patients
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
                setError('Could not load patients. Please try again later.');
            }
        };

        fetchPatients();
    }, []);

    const handleEdit = (patient) => {
        setEditPatientId(patient.id);
        // Include password in the edited patient state, but don't allow it to be updated unless changed
        setEditedPatient({ ...patient, password: '' }); // Clear password for security
    };

    const handleDelete = async (patientId) => {
        try {
            await axios.delete(`/patients/${patientId}`);
            setPatients(patients.filter((patient) => patient.id !== patientId));
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    const handleSave = async () => {
        try {
            const updatedEmail = editedPatient.email;

            // If the email has changed, check for availability
            if (updatedEmail !== patients.find(patient => patient.id === editPatientId).email) {
                const emailCheckResponse = await axios.get(`/check-email/${updatedEmail}`);
                if (!emailCheckResponse.data.available) {
                    setError('Email already in use. Please use a different email.');
                    return;
                }
            }

            // If password field is empty, retain the original password
            const updatedPatient = { ...editedPatient };
            if (!updatedPatient.password) {
                const originalPatient = patients.find(patient => patient.id === editPatientId);
                updatedPatient.password = originalPatient.password; // Keep original password
            }

            await axios.put(`/patients/${editPatientId}`, updatedPatient);
            setPatients(
                patients.map((patient) =>
                    patient.id === editPatientId ? updatedPatient : patient
                )
            );
            setEditPatientId(null);
            setError('');
        } catch (error) {
            console.error('Error updating patient:', error);
            setError('An error occurred while updating the patient.');
        }
    };

    const handleChange = (e) => {
        setEditedPatient({ ...editedPatient, [e.target.name]: e.target.value });
    };

    return (
        <div className="patients-list mt-5">
            <div className="d-flex justify-content-between mb-4">
                <h3>All Patients:</h3>
                <Link to="/register" className="btn btn-secondary">Register</Link>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Age</th>
                        <th>Disease</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            {editPatientId === patient.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={editedPatient.name}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={editedPatient.email}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="contact"
                                            value={editedPatient.contact}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="age"
                                            value={editedPatient.age}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="disease"
                                            value={editedPatient.disease}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                                        <button className="btn btn-secondary" onClick={() => setEditPatientId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{patient.name}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.contact}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.disease}</td>
                                    <td>
                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(patient)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(patient.id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientListPage;
