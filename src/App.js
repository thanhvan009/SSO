import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import Callback from './Callback';
import { useState } from 'react';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('token')
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={<Login setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route 
          path="/callback" 
          element={<Callback setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;