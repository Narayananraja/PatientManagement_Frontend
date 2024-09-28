// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Import the CSS file for custom styles

const Home = () => {
    return (
        <div className="container-fluid text-center mt-5">
            <div className="jumbotron bg-light p-5 rounded">
                <p className="lead mt-4">
                    Please log in or register to access your patient information and management tools.
                </p>
                <hr className="my-4" />
                <p>
                    Our system allows you to manage your health information efficiently and securely.
                </p>
                <div className="mt-4">
                    <Link to="/login" className="btn btn-primary btn-lg me-3">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-secondary btn-lg">
                        Register
                    </Link>
                </div>
            </div>
            <footer className="mt-5">
                <p className="text-muted">© 2024 Patient Management System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
