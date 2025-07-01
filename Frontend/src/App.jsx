import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import PrivateRoute from './component/PrivateRoute';


import Login from './component/Login';
import Register from './component/Register';

import Home from './component/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
         <Route path="/" element={
  <PrivateRoute>
    <Home />
  </PrivateRoute>
} />

          <Route path="/login" element={
            
              <Login />
          
          } />

          <Route path="/register" element={
           
              <Register />
            
          } />

          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
