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

    // Function to check if the user is an admin
    const isAdmin = () => {
    
const user = JSON.parse(localStorage.getItem('user')); // Example: fetching user data from local storage
        return user && user.role === 'admin'; // Adjust according to your user object structure
    };

    // Fetch patients and check admin status when component mounts
    useEffect(() => {
        if (!isAdmin()) {
            navigate('/'); // Redirect to home or login page if not admin
        } else {
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
        }
    }, [navigate]);

    const handleEdit = (patient) => {
        setEditPatientId(patient.id);
        setEditedPatient({ ...patient, password: '' }); // Clear password for security
    };

    const handleDelete = async (patientId) => {
        try {
            await axios.delete(`/${patientId}`);
            setPatients(patients.filter((patient) => patient.id !== patientId));
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    const handleSave = async () => {
        try {
            const updatedEmail = editedPatient.email;
            const originalPatient = patients.find(patient => patient.id === editPatientId);

            // Check for email availability if it has changed
            if (updatedEmail !== originalPatient.email) {
                const emailCheckResponse = await axios.get(`/check-email/${updatedEmail}`);
                if (!emailCheckResponse.data.available) {
                    setError('Email already in use. Please use a different email.');
                    setTimeout(() => {
                        setError('');
                    }, 5000); // Hide error message after 5 seconds
                    return;
                }
            }

            const updatedPatient = { ...editedPatient };
            if (!updatedPatient.password) {
                updatedPatient.password = originalPatient.password; // Keep original password if not updated
            }

            await axios.put(`/${editPatientId}`, updatedPatient);
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
                <Link to="/register" state={{ fromPatientList: true }} className="btn btn-secondary">Register</Link>
                <Link to="/doctorRegistration" state={{}} className="btn btn-secondary">ADD Doctor</Link>
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
                        <th className="">Actions</th> {/* Align the header to the right */}
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
                                        <textarea
                                            className="form-control"
                                            name="disease"
                                            value={editedPatient.disease}
                                            onChange={handleChange}
                                            rows={1} // Adjust rows as necessary
                                        />
                                    </td>
                                    <td className=""> {/* Align buttons to the right */}
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
                                    <td className=""> {/* Align buttons to the right */}
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
