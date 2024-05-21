import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate(); // Add this line to use the navigate function

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => {
                console.log(result.data);
                setTasks(result.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteTask/' + id)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleLogout = () => {
        axios.post('http://localhost:3001/logout')
            .then(res => {
                console.log(res);
                // Redirect to the login page after successful logout
                navigate('/login');
            })
            .catch(err => {
                console.error(err);
                // Handle error if necessary
            });
    };

    return (
        <div className='vh-100 bg-dark d-flex flex-column align-items-center justify-content-center'>
            <h1 className='mb-4 text-light'>To Do List</h1>
            <div className='w-50 bg-white rounded p-3'>
                <Link to='/create' className='btn btn-success mb-2'>Add new task</Link>
                <button className='btn btn-danger mb-2 ms-2' onClick={handleLogout}>Logout</button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task) => {
                                return <tr key={task._id}>
                                    <td>{task.task}</td>
                                    <td>{task.description}</td>
                                    <td>
                                        <Link to={`/edit/${task._id}`} className='btn btn-success m-1' >Edit</Link>
                                        <button className='btn btn-danger' onClick={() => handleDelete(task._id)}>Delete</button>
                                    </td>
                                </tr>;
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tasks;