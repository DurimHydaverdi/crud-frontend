import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    setLoggedIn(true);
                } else {
                    setErrorMessage("Email or password is incorrect!");
                }
            })
            .catch(err => console.log(err));
    };

    if (loggedIn) {
        return <Navigate to="/tasks" />;
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className="bg-white p-3 rounded w-30">
                <h2>Login</h2>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder='Enter Email' autoComplete='off' name='email' className='form-control rounded-0' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder='Enter Password' name='password' className='form-control rounded-0' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Login
                    </button>
                </form>
                <p className='mt-6'>Don't have an account? <Link to='/register' className='text-decoration-none'>
                    Sign Up
                </Link></p>
                
            </div>
        </div>
    );
}

export default Login;