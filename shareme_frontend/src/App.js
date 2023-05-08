import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './components';
import Home from './container/Home';
import { getUserDataFromToken } from './utilities';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserDataFromToken();
    if (!userInfo) {
      localStorage.clear();
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  );
};

export default App;
