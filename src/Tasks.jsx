import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setTasks(result.data))
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

    return (
        <div className='vh-100 bg-dark d-flex flex-column align-items-center justify-content-center'>
            <h1 className='mb-4 text-light'>To Do List</h1>
            <div className='w-50 bg-white rounded p-3'>
                <Link to='/create' className='btn btn-success mb-2'>Add new task</Link>
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
                                        <Link to={`/edit/${task._id}`} className='btn btn-success m-1'>Edit</Link>
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