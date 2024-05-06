import React, { useState } from 'react';
import './Cliente.css';
import Header from '../Header/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

function Cliente() {
  // Estados para os campos do formulário de cadastro
  const [newCliente, setNewCliente] = useState({
    empresa: '',
    contato: '',
    cnpj: '',
    ativo: '',
    controlador: '',
    uf: ''
  });

  // Estados para os dados de clientes, controladores e UF
  const [controladores] = useState(["Aline S.", "Loira", "Morena"]);
  const [ufs] = useState(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]);

  // Estado para armazenar as cliente cadastradas
  const [clientes, setclientes] = useState([
    { id: 1, empresa: "BrassPress", contato: "2199999-9999", cnpj:"99.999/0001-80", ativo: "SIM", controlador: "Aline", uf: "SP" },
    { id: 2, empresa: "Minuano", contato: "2199999-9999", cnpj:"99.999/0001-99", ativo: "SIM", controlador: "LOIRA", uf: "RJ" },
    { id: 3, empresa: "Boticario", contato: "2199999-9999", cnpj:"99.999/0001-70", ativo: "NÃO", controlador: "Morena", uf: "DF" }
  ]);

  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // Função para lidar com a submissão do formulário de cadastro
  const handleSubmit = (event) => {
    event.preventDefault();
    // Adiciona a nova cliente à lista de clientes
    setclientes([...clientes, { id: clientes.length + 1, ...newCliente }]);
    // Limpa os campos do formulário
    setNewCliente({ empresa: '', contato: '', cnpj: '', ativo: '', controlador: '', uf: '' });
  };

  
  // Função para filtrar as cliente com cliente no termo de pesquisa
  const filteredClientes = clientes.filter(cliente =>
    cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cnpj.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCliente, setEditedCliente] = useState({
    id: null,
    empresa: '',
    contato: '',
    cnpj: '',
    ativo: '',
    controlador: '',
    uf: ''
  });

  const openEditModal = (cliente) => {
    setEditedCliente(cliente);
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
    setclientes(updatedClientes);
    closeEditModal(); // Fecha o modal após salvar
  };

  return (
    <div>
      <Header/>
      <div className="cliente-page-container">
        <div className="header">
          <h2>CADASTRO E PESQUISA DE Cliente</h2>
          <div className="cadastro" id="cadastro">
  <h2>Cadastrar Novo Cliente</h2>
  <form onSubmit={handleSubmit} className="form-container">
    <div className="form-field">
      <input type="text" name="empresa" id="empresa" placeholder="Nome da Empresa" value={newCliente.empresa} onChange={handleInputChange} />
    </div>
    <div className="form-field">
      <input type="text" name=" contato" id="contato" placeholder="Contato" value={newCliente.contato} onChange={handleInputChange} />
    </div>
    <div className="form-field">
      <input type="number" name="cnpj" id="cnpj" placeholder="CNPJ" value={newCliente.cnpj} onChange={handleInputChange} />
    </div>
    <div className="form-field">
        <select name="ativo" id='ativo' value={editedCliente.ativo} onChange={handleInputChange}>
      <option value=''>Ativo</option>
        <option value="Sim">Sim</option>
        <option value="Não">Não</option>
      </select>
    </div>
    
    <div className="form-field">
      <select name="controlador" id='controlador' value={newCliente.controlador} onChange={handleInputChange}>
        <option value="">Selecione o Controlador(a)</option>
        {controladores.map((controlador, index) => (
          <option key={index} value={controlador}>{controlador}</option>
        ))}
      </select>
    </div>
    <div className="form-field">
      <select name="uf" id="uf" value={newCliente.uf} onChange={handleInputChange}>
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
       
        {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeEditModal}>&times;</span>
                <h2>Editar:</h2>
                <form>
                  <div className="form-field">
                    <input type="text" name="empresa" placeholder='Empresa' value={editedCliente.empresa} onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="text" name="contato" placeholder='Contato' value={editedCliente.contato} onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="number" name="cnpj" placeholder='CNPJ' value={editedCliente.cnpj} onChange={handleInputChange} />
                  </div>
                  <div>
                    <select value={editedCliente.ativo} onChange={handleInputChange}  >
                    <option value=''>Ativo</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    </select>
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
                  <select value={newCliente.uf} onChange={handleInputChange}>
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


        <div className="content">
        
          <h2>Clientes Cadastrados</h2>
          <input
            className='search'
            type="text"
            placeholder="Pesquisar por nome da Empresa ou CNPJ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Empresa</th>
                <th>Contato</th>
                <th>CNPJ</th>
                <th>Ativo</th>
                <th>Controlador(a)</th>
                <th>UF</th>
                <th>
                  <button type="button" title="Exportar para Excel">
                    <DescriptionOutlinedIcon />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeamento dos dados dos clientes cadastradas */}
              {filteredClientes.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.id}</td>
                  <td>{cliente.empresa}</td>
                  <td>{cliente.contato}</td>
                  <td>{cliente.cnpj}</td>
                  <td>{cliente.ativo}</td>
                  <td>{cliente.controlador}</td>
                  <td>{cliente.uf}</td>
                  <td>
                    <button type="button" title="Editar" onClick={openEditModal}>
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

export default Cliente;
