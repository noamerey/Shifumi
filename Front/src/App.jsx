import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import CreateAccount from './components/CreateAccount'; // Make sure the path is correct

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<CreateAccount/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
