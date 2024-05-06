import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './Login.css';

import banner from '../../assets/banner.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
        <p>Dúvidas? <br/><Link to="/faleconosco">Fale Conosco!</Link></p>
        <ToastContainer />
      </div>
      <div className="banner">
        <img src={banner} alt="Banner" />
      </div>
    </div>
  );
}

export default Login;
