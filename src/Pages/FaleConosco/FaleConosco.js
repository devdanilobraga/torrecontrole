import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './FaleConosco.css';

import banner from '../../assets/xicara.webp';

function FaleConosco() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar a mensagem de contato
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Mensagem:', mensagem);
    // Limpar os campos do formulário após o envio
    setNome('');
    setEmail('');
    setMensagem('');
  };

  return (
    <div>
        <div className="banner">
            {/* Aqui vai o seu banner */}
            <img src={banner} alt="Banner" />
        </div>
    <div className="fale-conosco-container">
      <h2>PREENCHA O FORMULÁRIO E ENTRAREMOS EM CONTATO COM VOCÊ</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mensagem">Mensagem:</label>
          <textarea
            id="mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
      <div className="redes-sociais">
        <h3>Estamos nas redes sociais:</h3>
        <ul>
          <li><a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li><a href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li><a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} /></a></li>
          <li><a href='https://www.linkedin.com'><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
          <li><a href='https://www.whatsapp.com'><FontAwesomeIcon icon={faWhatsapp} /></a></li>
        </ul>
      </div>
      <p>Voltar para <Link to="/login">Página Inicial</Link></p>      
    </div>
</div>
  );
}

export default FaleConosco;
