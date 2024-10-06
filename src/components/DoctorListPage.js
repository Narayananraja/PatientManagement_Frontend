import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/DoctorListPage.css';
const DoctorListPage = () => {
    const [doctor, setDoctor] = useState([]);
    const [editDoctorId, setEditDoctorId] = useState(null);
    const [editedDoctor, setEditedDoctor] = useState({});
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const isAdmin = () => {
        const user = JSON.parse(localStorage.getItem('user')); // Example: fetching user data from local storage
        return user && user.role === 'admin'; // Adjust according to your user object structure
    };
    useEffect(() => {
        if (!isAdmin()) {
            navigate('/'); // Redirect to home or login page if not admin
        } else {
            const fetchDoctors = async () => {
                try {
                    const response = await axios.get('/doctors-list'); // API call to get patients
                    setDoctor(response.data);
                } catch (error) {
                    console.error('Error fetching Doctors:', error);
                    setError('Could not load doctors. Please try again later.');
                }
            };

            fetchDoctors();
        }
    }, [navigate]);
    const handleEdit = (doctor) => {
        setEditDoctorId(doctor.id);
        setEditedDoctor({ ...doctor, timeslot: '' }); // Clear password for security
    };

    const handleDelete = async (doctorId) => {
        try {
            await axios.delete(`/doctor/${doctorId}`);
            setDoctor(doctor.filter((doctor) => doctor.id !== doctorId));
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };
    const save =async() =>{
     await axios.put(`doctor/${editDoctorId}`, editedDoctor);
     try{
    setDoctor(
        doctor.map((patient) =>
            doctor.id === editDoctorId ? editedDoctor : doctor
        )
    );

    setEditDoctorId(null);
    setError('');
}catch (error) {
    console.error('Error updating patient:', error);
    setError('An error occurred while updating the patient.');
} 
    };


    const handleChange = (e) => {
        setEditedDoctor({ ...editedDoctor, [e.target.name]: e.target.value });
    };
   
   
    return (
        <div className="patients-list mt-5">
            <div className="d-flex justify-content-between mb-4">
                <h3>All Patients:</h3>
                </div>
                
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>specialist</th>
                        <th>Contact</th>
                        <th>timeslot</th>
                        <th className="">Actions</th>
                        

                        </tr>
                </thead>
                <tbody>
                    {doctor.map((doctor) => (
                        <tr key={doctor.id}>
                             (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={editedDoctor.name}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="specialist"
                                            value={editedDoctor.specialist}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="time-local"
                                            className="form-control"
                                            name="timeslot"
                                            value={editedDoctor.timeslot}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="contact"
                                            value={editedDoctor.contact}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td className=""> {/* Align buttons to the right */}
                                        <button className="btn btn-secondary" onClick={() => setEditDoctorId(null)}>Cancel</button>
                                        <button className="btn btn-secondary" onClick={save}>Save</button>

                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.specialist}</td>
                                    <td>{doctor.contact}</td>
                                    <td>{doctor.timeslot}</td>
                                    <td className="">
                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(doctor)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(doctor.id)}>
                                    Delete</button>
</td>
</>

                    )
                    </tr>
                
            
       
            ))}
        </tbody>
        </table>
</div>
    );
};
export default DoctorListPage;
