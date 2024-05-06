import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/D0Branco.webp'; 
import './Header.css';

function Header({ history }) {
  const [username, setUsername] = useState('');

  const fetchUsername = () => {
    const mockUsername = 'Danilo Braga';
    setUsername(mockUsername);
  };

  useEffect(() => {
    fetchUsername();
  }, []);

 
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Logo da Empresa" /></Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/base">Base</Link></li>
            <li><Link to="/cliente">Cliente</Link></li>
            <li><Link to="/colaboradores">Colaboradores</Link></li>
            <li><Link to="/controle">Torre de Controle</Link></li>
            <li><Link to="/escala">Escala</Link></li>
            <li><Link to="/historico">Histórico</Link></li>
          </ul>
        </nav>
        <div className="user-info">
          <span>Usuário: {username}</span> 
          <Link to="/login" className="link-button"><button>Sair</button></Link> 
        </div>
      </div>
    </header>
  );
}

export default Header;
