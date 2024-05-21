import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Login from './Login';
import Tasks from './Tasks';
import Signup from './Signup';
import CreateTask from './CreateTask';
import EditTasks from './EditTasks';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} /> {/* Pass setLoggedIn to Login component */}
                <Route path='/register' element={<Signup />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path='/edit/:id' element={<EditTasks />} />
                <Route path='/create' element={<CreateTask />} />
                <Route path="*" element={loggedIn ? <Navigate to="/tasks" /> : <Navigate to="/login" />} /> {/* Use Navigate conditionally */}
            </Routes>
        </Router>
    );
}

export default App;




// import { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Tasks from './Tasks';
// import EditTasks from './EditTasks';
// import CreateTask from './CreateTask';
// import Signup from './Signup';
// import Login from './Login';

// function App() {
//   const [completedTasks, setCompletedTasks] = useState([]);

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Tasks completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />} />
//           <Route path='/create' element={<CreateTask />} />
//           <Route path='/edit/:id' element={<EditTasks />} />
//           <Route path='/register' element={<Signup />} />
//           <Route path='login' element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;