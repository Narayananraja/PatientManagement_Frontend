import React, {useState}from 'react';
import axios from '../axiosConfig';
import { useNavigate,Link} from 'react-router-dom';
import '../styles/doctorRegister.css';
const  DoctorRegistration= () => {
const [name,setName]=useState('');
const[specialist,setSpecialist]=useState('');
const[contact,setContact]=useState('');
const[timeslot,setTimeslot]=useState('');
const[success,setSuccess]=useState('');
const[error,setError]=useState('');
const navigate = useNavigate();
const doctorRegister = async (e) => {
    e.preventDefault();
   try {
    console.log("name",name)
    console.log("specialist",specialist)
    console.log("contact",contact)
    console.log("timeslot",timeslot)
        await axios.post('/dregister', { name, specialist, contact, timeslot });
        setSuccess('Registration successful! You can now login.');
        setError('give correct information');
        navigate('/doctors-list');
   }
   catch(seterror){
    setError(error.response.data);

   }
};
return(
    
    <div className="doctorRegistration-container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-center">AddDoctor</h2>
        </div>
    <form onSubmit={doctorRegister} className="mt-4">
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />
            </div>
            <div className="mb-3">
                <label className="form-label">specialist:</label>
                <input
                    type="text"
                    className="form-control"
                    value={specialist}
                    onChange={(e) => setSpecialist(e.target.value)}
                    required />
            </div>
            <div className="mb-3">
                <label className="form-label">Contact:</label>
                <input
                    type="text"
                    className="form-control"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required />
            </div>

            <div className="mb-3">
                <label className="form-label">Timeslot:</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    value={timeslot}
                    onChange={(e) => setTimeslot(e.target.value)}
                    required />
            </div>
            <button type="submit" className="btn btn-primary w-100">addDoctor</button>
        </form>
       
        </div>
);
};

export default  DoctorRegistration;