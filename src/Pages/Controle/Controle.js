import React, { useEffect, useState } from 'react';
import './Controle.css'
import Header from '../Header/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


function Controle() {
  // Estados para os campos do formulário de cadastro
  const [newControle, setNewControle] = useState({
    nome: '',
    contato: '',
    funcao: '',
    ativo: '',
    uf: '',
    login: '', 
    senha: ''  
  });

  
  // Estados para os dados de controle, controladores e UF
  const [ufs] = useState(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]);

  const [controle, setControle] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (controleId) => {
    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Tem certeza que deseja excluir este controle?',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
      await axios.delete(`http://localhost:3001/controle/${controleId}`);
      setControle(controle.filter((controle) => controle.id !== controleId));

        // Mostrar um alerta de sucesso
        await Swal.fire({
          icon: 'success',
          title: 'Controle excluído com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
      }

    } catch (error) {
      console.error('Erro ao deletar controle:', error);
    }
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      const response = await axios.post('http://localhost:3001/controle', newControle);
      console.log('Registro inserido com sucesso:', response.data);
      setControle([...controle, response.data]); // Atualiza o estado com os dados inseridos
      setNewControle({ nome: '', contato: '', funcao: '', ativo: '', uf: '', login: '', senha: '' }); // Limpa o formulário
    
      await Swal.fire({
        icon: 'success',
        title: 'Cadastro efetuado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      setNewControle({ nome: '', contato: '', funcao: '', ativo: '', uf: '', login: '', senha: '' });
      await Swal.fire({
        icon: 'error',
        title: 'Erro ao fazer cadastro!',
        text: 'Ocorreu um erro ao tentar fazer o cadastro. Por favor, tente novamente.',
      });
      console.error('Erro ao atualizar controle:', error);
      console.error('Erro ao inserir registro:', error);
    }
  };

  useEffect(() => {
    const fetchControle = async () => {
      try {
        const response = await axios.get('http://localhost:3001/controle');
        setControle(response.data); // Atualiza o estado com os dados recebidos

      } catch (error) {
        console.error('Erro ao buscar controle:', error);
      }
    };

    fetchControle();
  }, []);
      
  // Função para filtrar as Controle com Controle no termo de pesquisa
  const filteredcontrole = controle.filter(Controle =>
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
    uf: '',
    login: '', 
    senha: ''  
  });

  const baixarexcel = async () => {
    try {
      const torre = controle.map(({ senha, ...item }) => item);
      
      const ws = XLSX.utils.json_to_sheet(torre);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Controles");
      XLSX.writeFile(wb, "controles.xlsx");
     
      // Exibe um alerta
      await Swal.fire({
        icon: 'success',
        title: 'Arquivo Excel baixado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });
      
    } catch (error) {
      // Exibe um alerta de erro
      await Swal.fire({
        icon: 'error',
        title: 'Erro ao baixar o arquivo Excel!',
        text: 'Ocorreu um erro ao tentar atualizar o controle. Por favor, tente novamente mais tarde.',
      });
      console.error('Erro ao fazer o download:', error);
    }
  }



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

  const handleSaveChanges = async () => {
    try {
      // Crie um objeto com os campos preenchidos
      const editedFields = {};
      for (const key in editedControle) {
        if (editedControle[key] !== '') {
          editedFields[key] = editedControle[key];
        }
      }

      // Realiza a solicitação de atualização para o backend
      await axios.put(`http://localhost:3001/controle/${editedControle.id}`, editedControle);
      
      // Exibe um alerta de sucesso
      await Swal.fire({
        icon: 'success',
        title: 'Cadastro editado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });
      
      // Atualize os detalhes do Controle na lista principal
      const updatedControles = controle.map((controle) =>
      controle.id === editedControle.id ? { ...controle, ...editedFields } : controle
      );
      setControle(updatedControles);
      closeEditModal(); // Fecha o modal após salvar
    } catch (error) {
      // Exibe um alerta de erro
      await Swal.fire({
        icon: 'error',
        title: 'Erro ao editar!',
        text: 'Ocorreu um erro ao tentar atualizar o controle. Por favor, tente novamente mais tarde.',
      });
      console.error('Erro ao atualizar controle:', error);
    }
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
    <input
      type="text"
      name="nome"
      placeholder="Nome do Controlador(a)"
      id="nome"
      value={newControle.nome} // Adiciona o valor do estado
      onChange={(e) => setNewControle({ ...newControle, nome: e.target.value })} // Atualiza o estado
    />
  </div>
  <div className="form-field">
    <input
      type="text"
      name="contato"
      id="contato"
      placeholder="Contato"
      value={newControle.contato}
      onChange={(e) => setNewControle({ ...newControle, contato: e.target.value })}
    />
  </div>
  <div className="form-field">
    <input
      type="text"
      name="funcao"
      id="funcao"
      placeholder="Função"
      value={newControle.funcao}
      onChange={(e) => setNewControle({ ...newControle, funcao: e.target.value })}
    />
  </div>
  <div className="form-field">
    <select
      name="ativo"
      id="ativo"
      value={newControle.ativo}
      onChange={(e) => setNewControle({ ...newControle, ativo: e.target.value })}
    >
      <option value="">Ativo</option>
      <option value="Sim">Sim</option>
      <option value="Não">Não</option>
    </select>
  </div>
  <div className="form-field">
    <select
      name="uf"
      id="uf"
      value={newControle.uf}
      onChange={(e) => setNewControle({ ...newControle, uf: e.target.value })}
    >
      <option value="">Selecione a UF</option>
      {ufs.map((uf, index) => (
        <option key={index} value={uf}>
          {uf}
        </option>
      ))}
    </select>
  </div>
  <div className="form-field">
    <input
      type="text"
      name="login"
      id="login"
      placeholder="Login"
      value={newControle.login}
      onChange={(e) => setNewControle({ ...newControle, login: e.target.value })}
    />
  </div>
  <div className="form-field">
    <input
      type="password"
      name="senha"
      id="senha"
      placeholder="Senha"
      value={newControle.senha}
      onChange={(e) => setNewControle({ ...newControle, senha: e.target.value })}
    />
  </div>
  <button type="submit" id="botao">Cadastrar</button> 
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
                    <input type="text" 
                    name="nome" 
                    placeholder='Nome' 
                    value={editedControle.nome} 
                    onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="text" name="contato" placeholder='Contato' value={editedControle.contato} onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="text" name="funcao" placeholder='Função' value={editedControle.funcao} onChange={handleInputChange} />
                  </div>
                  <div>
                    <select name="ativo" value={editedControle.ativo} onChange={handleInputChange}  >
                    <option value=''>Ativo</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    </select>
                  </div>
                  <div>
                  <select name="uf" value={editedControle.uf} onChange={handleInputChange}>
                      <option value="">Selecione a UF</option>
                      {ufs.map((uf, index) => (
                        <option key={index} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <input type="text" name="login" placeholder='Login' value={editedControle.login} onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="password" name="senha" placeholder='Senha' value={editedControle.senha} onChange={handleInputChange} />
                  </div>
                </form>
                <button onClick={handleSaveChanges}>Salvar</button>
              </div>
            </div>
          )}

        <div className="content">
        
          <h2>Cadastrados</h2>
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
                <th>Login</th> 
                <th>
                  <button type="button" title="Exportar para Excel" onClick={baixarexcel}>
                    <DescriptionOutlinedIcon />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeamento dos dados dos controle cadastradas */}
              {filteredcontrole && filteredcontrole.map((Controle, index) => (
                <tr key={index}>
                  <td>{Controle.id}</td>
                  <td>{Controle.nome}</td>
                  <td>{Controle.contato}</td>
                  <td>{Controle.funcao}</td>
                  <td>{Controle.ativo}</td>
                  <td>{Controle.uf}</td>
                  <td>{Controle.login}</td> 
                  <td>
                    <button type="button" title="Editar" onClick={()=> openEditModal(Controle)}>
                      <EditIcon />
                    </button>
                    <button type="button" title="Deletar" onClick={() => handleDelete(Controle.id)}>
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
