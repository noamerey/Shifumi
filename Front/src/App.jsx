import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Pages/Components/login';
import CreateAccount from './Pages/Components/CreateAccount';
import Match from './Pages/Components/Match';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isLoggedIn = !!username;

  const PrivateRoute = ({ children }) => {
    const userToken = localStorage.getItem('userToken');
    const storedUsername = localStorage.getItem('username');
  
    return userToken && storedUsername ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login setUsername={setUsername}/>}/>
          <Route path="/register" element={<CreateAccount/>}/>
          <Route path="/matchlist" element={<PrivateRoute><Match/></PrivateRoute>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
