import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tasks from './Tasks';
import EditTasks from './EditTasks';
import CreateTask from './CreateTask';
import Completed from './Completed';

function App() {
  const [completedTasks, setCompletedTasks] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Tasks completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />}/>
          <Route path='/create' element={<CreateTask />} />
          <Route path='/completed' element={<Completed completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />}/>
          <Route path='/edit/:id' element={<EditTasks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;