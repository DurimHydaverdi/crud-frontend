import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createTask", { task, description })
            .then(result => {
                console.log(result);
                navigate('/tasks');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Task</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Task</label>
                        <input type="text" placeholder='Enter Task' className='form-control' onChange={(e) => setTask(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Description</label>
                        <input type="text" placeholder='Type here' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button type='submit' className='btn btn-success m-1'>Submit</button>
                    <button type="button" className='btn btn-secondary' onClick={() => navigate('/tasks')}>Back</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;