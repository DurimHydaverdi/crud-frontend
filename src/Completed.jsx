import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Completed = () => {
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteTask/${id}`)
      .then(res => {
        console.log(res);
        setCompletedTasks(completedTasks.filter(task => task._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='vh-100 bg-dark d-flex flex-column align-items-center justify-content-center'>
      <h1 className='mb-4 text-light'>Completed Tasks</h1>
      <div className='w-50 bg-white rounded p-3'>
        <Link to='/' className='btn btn-success mb-2 m-1'>Back to Task List</Link>
        <table className='table'>
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map(task => (
              <tr key={task._id}>
                <td>{task.task}</td>
                <td>{task.description}</td>
                <td>
                  <button onClick={() => handleDelete(task._id)} className='btn btn-danger m-1'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Completed;