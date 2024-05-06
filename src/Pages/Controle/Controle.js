import React, { useState } from 'react';
import './Controle.css';
import Header from '../Header/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

function Controle() {
  // Estados para os campos do formulário de cadastro
  const [newControle, setNewControle] = useState({
    nome: '',
    contato: '',
    funcao: '',
    ativo: '',
    uf: ''
  });

  // Estados para os dados de controles, controladores e UF
  const [ufs] = useState(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]);

  // Estado para armazenar as Controle cadastradas
  const [controles, setcontroles] = useState([
    { id: 1, nome: "BrassPress", contato: "2199999-9999", funcao:"Controladora", ativo: "SIM", controlador: "Aline", uf: "SP" },
    { id: 2, nome: "Minuano", contato: "2199999-9999", funcao:"Controladora", ativo: "SIM", controlador: "LOIRA", uf: "RJ" },
    { id: 3, nome: "Boticario", contato: "2199999-9999", funcao:"Controladora", ativo: "NÃO", controlador: "Morena", uf: "DF" }
  ]);

  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // Função para lidar com a submissão do formulário de cadastro
  const handleSubmit = (event) => {
    event.preventDefault();
    // Adiciona a nova Controle à lista de controles
    setcontroles([...controles, { id: controles.length + 1, ...newControle }]);
    // Limpa os campos do formulário
    setNewControle({ nome: '', contato: '', funcao: '', ativo: '', uf: '' });
  };

  
  // Função para filtrar as Controle com Controle no termo de pesquisa
  const filteredcontroles = controles.filter(Controle =>
    Controle.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Controle.funcao.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedControle, setEditedControle] = useState({
    id: null,
    nome: '',
    contato: '',
    funcao: '',
    ativo: '',
    uf: ''
  });

  const openEditModal = (Controle) => {
    setEditedControle(Controle);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedControle({ ...editedControle, [name]: value });
  };

  const handleSaveChanges = () => {
    // Atualize os detalhes do Controle na lista principal
    const updatedcontroles = controles.map((Controle) =>
      Controle.id === editedControle.id ? editedControle : Controle
    );
    setcontroles(updatedcontroles);
    closeEditModal(); // Fecha o modal após salvar
  };

  return (
    <div>
      <Header/>
      <div className="Controle-page-container">
        <div className="header">
          <h2>CADASTRO E PESQUISA DE CONTROLADOR(A)</h2>
          <div className="cadastro" id="cadastro">
  <h2>Cadastrar Novo Controlador(a)</h2>
  <form onSubmit={handleSubmit} className="form-container">
    <div className="form-field">
      <input type="text" name="nome" id="nome" placeholder="Nome do Controlador(a)" value={newControle.nome} onChange={handleInputChange} />
    </div>
    <div className="form-field">
      <input type="text" name=" contato" id="contato" placeholder="Contato" value={newControle.contato} onChange={handleInputChange} />
    </div>
    <div className="form-field">
      <input type="text" name="funcao" id="funcao" placeholder="Função" value={newControle.funcao} onChange={handleInputChange} />
    </div>
    <div className="form-field">
        <select name="ativo" id='ativo' value={editedControle.ativo} onChange={handleInputChange}>
      <option value=''>Ativo</option>
        <option value="Sim">Sim</option>
        <option value="Não">Não</option>
      </select>
    </div>
    <div className="form-field">
      <select name="uf" id="uf" value={newControle.uf} onChange={handleInputChange}>
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
                    <input type="text" name="nome" placeholder='Nome' value={editedControle.nome} onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="text" name="contato" placeholder='Contato' value={editedControle.contato} onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="text" name="funcao" placeholder='Função' value={editedControle.funcao} onChange={handleInputChange} />
                  </div>
                  <div>
                    <select value={editedControle.ativo} onChange={handleInputChange}  >
                    <option value=''>Ativo</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    </select>
                  </div>
                  <div>
                  <select value={newControle.uf} onChange={handleInputChange}>
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
        
          <h2>controles Cadastrados</h2>
          <input
            className='search'
            type="text"
            placeholder="Pesquisar por nome da nome ou funcao"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>nome</th>
                <th>Contato</th>
                <th>Função</th>
                <th>Ativo</th>
                <th>UF</th>
                <th>
                  <button type="button" title="Exportar para Excel">
                    <DescriptionOutlinedIcon />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeamento dos dados dos controles cadastradas */}
              {filteredcontroles.map((Controle, index) => (
                <tr key={index}>
                  <td>{Controle.id}</td>
                  <td>{Controle.nome}</td>
                  <td>{Controle.contato}</td>
                  <td>{Controle.funcao}</td>
                  <td>{Controle.ativo}</td>
                  <td>{Controle.uf}</td>
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

export default Controle;
