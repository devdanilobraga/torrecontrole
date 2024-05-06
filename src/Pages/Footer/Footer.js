// Footer.js

import React from 'react';
import './Footer.css'; // Importe o arquivo CSS para estilização
import SeloQualidade from '../../assets/D0Branco.webp';

function Footer() {
  return (
    <footer className="footer">
      <div className="left">
        {/* Selo de qualidade */}
        <img src={SeloQualidade} alt="Selo de Qualidade" />
      </div>
         <p className='txtfooter'>&copy; {new Date().getFullYear()} D0 Logistics. Todos os direitos reservados.</p>
      <div className="right">
        {/* Slogan */}
        <p className="slogan">
          SOLUÇÕES ESTRATÉGICAS <br/><span className="sub">SOB MEDIDA</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
