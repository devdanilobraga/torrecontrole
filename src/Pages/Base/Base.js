import React, { useState } from 'react';
import './Base.css';
import Header from '../Header/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

function Base() {
  // Estados para os campos do formulário de cadastro
  const [newBase, setNewBase] = useState({
    nome: '',
    cliente: '',
    controlador: '',
    uf: ''
  });

  // Estados para os dados de clientes, controladores e UF
  const [clientes] = useState(["Cliente A", "Cliente B", "Cliente C"]);
  const [controladores] = useState(["Aline", "Loira", "Morena"]);
  const [ufs] = useState(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]);

  // Estado para armazenar as bases cadastradas
  const [bases, setBases] = useState([
    { id: 1, nome: "PAVUNA", cliente: "CLASSE BRASIL", controlador: "ALINE.SEILA", uf: "RJ" },
    { id: 2, nome: "PAVUNA", cliente: "MINUANO", controlador: "LOIRA", uf: "SP" }
  ]);

  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // Função para lidar com a submissão do formulário de cadastro
  const handleSubmit = (event) => {
    event.preventDefault();
    // Adiciona a nova base à lista de bases
    setBases([...bases, { id: bases.length + 1, ...newBase }]);
    // Limpa os campos do formulário
    setNewBase({ nome: '', cliente: '', controlador: '', uf: '' });
  };

  // Função para filtrar as bases com base no termo de pesquisa
  const filteredBases = bases.filter(base =>
    base.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    base.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCliente, setEditedCliente] = useState({
    id: null,
    nome: '',
    cliente: '',
    controlador: '',
    uf: ''
  });

  const openEditModal = (base) => {
    setEditedCliente(base);
    setIsModalOpen(true);
  };
  

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCliente({ ...editedCliente, [name]: value });
  };
  

  const handleSaveChanges = () => {
    // Atualize os detalhes do cliente na lista principal
    const updatedClientes = clientes.map((cliente) =>
      cliente.id === editedCliente.id ? editedCliente : cliente
    );
    clientes(updatedClientes);
    closeEditModal(); // Fecha o modal após salvar
  };

  return (
    <div>
      <Header/>

      {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeEditModal}>&times;</span>
                <h2>Editar:</h2>
                <form>
                  <div className="form-field">
                    <input type="text" name="nome" placeholder='nome' value={editedCliente.nome} onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="text" name="cliente" placeholder='cliente' value={editedCliente.cliente} onChange={handleInputChange} />
                  </div>
                  <div>
                    <select value={editedCliente.controlador} onChange={handleInputChange}  >
                      <option value="">Selecione o Controlador(a)</option>
                      {controladores.map((controlador, index) => (
                      <option key={index} value={controlador}>{controlador}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                  <select value={clientes.uf} onChange={handleInputChange}>
                      <option value="">Selecione a UF</option>
                      {ufs.map((uf, index) => (
                        <option key={index} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                </form>
                <button onClick={handleSaveChanges}>Salvar</button>
              </div>
            </div>
          )}


      <div className="base-page-container">
        <div className="header">
          <h2>CADASTRO E PESQUISA DE BASE</h2>
          <div className="cadastro" id="cadastro">
  <h2>Cadastrar Nova Base</h2>
  <form onSubmit={handleSubmit} className="form-container">
    <div className="form-field">
      <input type="text" name="nome" id="nome" placeholder="Nome da Base" value={newBase.nome} onChange={handleInputChange} />
    </div>
    <div className="form-field">
      <select name="cliente" id="cliente" value={newBase.cliente} onChange={handleInputChange}>
        <option value="">Selecione o Cliente</option>
        {clientes.map((cliente, index) => (
          <option key={index} value={cliente}>{cliente}</option>
        ))}
      </select>
    </div>
    <div className="form-field">
      <select name="controlador" id='controlador' value={newBase.controlador} onChange={handleInputChange}>
        <option value="">Selecione o Controlador</option>
        {controladores.map((controlador, index) => (
          <option key={index} value={controlador}>{controlador}</option>
        ))}
      </select>
    </div>
    <div className="form-field">
      <select name="uf" id="uf" value={newBase.uf} onChange={handleInputChange}>
        <option value="">Selecione a UF</option>
        {ufs.map((uf, index) => (
          <option key={index} value={uf}>{uf}</option>
        ))}
      </select>
    </div>
    <button type="submit" id='botao'>Cadastrar</button>
  </form>
</div>
      </div>
      
        <div className="content">
          <h2>Bases Cadastradas</h2>
          <input
            className='search'
            type="text"
            placeholder="Pesquisar por nome da base ou nome do cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>CLIENTE</th>
                <th>CONTROLADOR</th>
                <th>UF</th>
                <th>
                  <button type="button" title="Exportar para Excel">
                    <DescriptionOutlinedIcon />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeamento dos dados das bases cadastradas */}
              {filteredBases.map((base, index) => (
                <tr key={index}>
                  <td>{base.id}</td>
                  <td>{base.nome}</td>
                  <td>{base.cliente}</td>
                  <td>{base.controlador}</td>
                  <td>{base.uf}</td>
                  <td>
                    <button type="button" title="Editar" onClick={() => openEditModal(base)}>
                      <EditIcon />
                    </button>
                    <button type="button" title="Deletar">
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Base;
