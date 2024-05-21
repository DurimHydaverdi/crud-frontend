import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset previous error messages
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setServerError('');

        // Validation checks
        let isValid = true;

        if (name.length < 3) {
            setNameError("Name must be at least 3 characters long.");
            isValid = false;
        }

        if (!email.includes("@")) {
            setEmailError("Invalid email address.");
            isValid = false;
        }

        if (password.length < 5) {
            setPasswordError("Password must be at least 5 characters long.");
            isValid = false;
        }

        if (isValid) {
            axios.post('http://localhost:3001/register', { name, email, password })
                .then(result => {
                    console.log(result);
                    navigate('/login');
                })
                .catch(err => {
                    if (err.response && err.response.data) {
                        const { message } = err.response.data;
                        if (message === "An account with this email already exists.") {
                            setEmailError("This email is already taken. Please try another.");
                        } else if (message === "An account with this name already exists.") {
                            setNameError("This name already exists. Please try another.");
                        } else {
                            setServerError("An error occurred. Please try again later.");
                        }
                    }
                });
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input type="text" placeholder='Enter Name' autoComplete='off' name='name' className='form-control rounder-0' onChange={(e) => setName(e.target.value)} />
                        <div className="text-danger">{nameError}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder='Enter Email' name="email" autoComplete='off' className='form-control rounded-0' onChange={(e) => setEmail(e.target.value)} />
                        <div className="text-danger">{emailError}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder='Enter Password' name='password' className='form-control rounded-0' onChange={(e) => setPassword(e.target.value)} />
                        <div className="text-danger">{passwordError}</div>
                    </div>
                    <div className="text-danger">{serverError}</div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Register</button>
                    <p>Already Have an Account</p>
                    <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;