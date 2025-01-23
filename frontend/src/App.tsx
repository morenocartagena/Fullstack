import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Clientes from './components/Clientes';
import Productos from './components/Productos';
import Ventas from './components/Ventas';
import Contacto from './components/Contacto';
import Login from './components/Login';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/clientes" element={<PrivateRoute element={Clientes} />} />
        <Route path="/productos" element={<PrivateRoute element={Productos} />} />
        <Route path="/ventas" element={<PrivateRoute element={Ventas} />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
}

export default App;
