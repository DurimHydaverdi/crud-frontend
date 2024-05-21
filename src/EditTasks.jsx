import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTasks = () => {
    const { id } = useParams();
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/getTask/' + id)
            .then(result => {
                const { task, description } = result.data;
                // Check if task and description exist before setting state
                if (task !== undefined && description !== undefined) {
                    setTask(task);
                    setDescription(description);
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleEdit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/editTask/" + id, { task, description })
            .then(result => {
                console.log(result);
                navigate('/tasks');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleEdit}>
                    <h2>Edit Task</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Task</label>
                        <input type="text" placeholder='Enter Task' className='form-control' value={task} onChange={(e) => setTask(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Description</label>
                        <input type="text" placeholder='Type here' className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button className='btn btn-success m-1'>Edit</button>
                    <button type="button" className='btn btn-secondary' onClick={() => navigate('/')}>Back</button>
                </form>
            </div>
        </div>
    );
};

export default EditTasks;