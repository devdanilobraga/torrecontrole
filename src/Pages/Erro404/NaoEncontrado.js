// NotFound.js

import React from 'react';
import './NaoEncontrado.css';
import Header from '../Header/Header';

function NaoEncontrado() {
  return (
    <div>
      <Header/>
      <div className="not-found">
        <h1>404</h1>
        <p>Página não encontrada</p>
      </div>
    </div>
  );
}

export default NaoEncontrado;
