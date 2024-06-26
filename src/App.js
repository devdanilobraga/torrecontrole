import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Conexao/Router/AuthContext';
import PrivateRoute from './Conexao/Router/PrivateRoute';

import Footer from './Pages/Footer/Footer';
import Base from './Pages/Base/Base';
import Cliente from './Pages/Cliente/Cliente';
import Colaboradores from './Pages/Colaboradores/Colaboradores';
import Controle from './Pages/Controle/Controle';
import Escala from './Pages/Escala/Escala';
import Historico from './Pages/Historico/Historico';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import './logo.svg';
import NaoEncontrado from './Pages/Erro404/NaoEncontrado';
import FaleConosco from './Pages/FaleConosco/FaleConosco';

import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
  <AuthProvider>
    <Router>
      <div>
        <Routes> 
          <Route path="*" element={<NaoEncontrado />} />
          <Route path="/base" element={<Base />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/colaboradores" element={<Colaboradores />} />
          <Route path="/controle" element={<Controle />} />
          <Route path="/escala" element={<Escala />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/faleconosco" element={<FaleConosco />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  </AuthProvider>
  );

  
}

export default App;
