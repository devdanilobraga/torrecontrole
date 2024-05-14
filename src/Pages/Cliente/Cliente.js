import React, { useEffect, useState } from 'react';
import './Cliente.css'
import Header from '../Header/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


function Cliente() {
  // Estados para os campos do formulário de cadastro
  const [newCliente, setNewCliente] = useState({
    nome: '',
    cnpj: '',
    contato: '',
    ativo: '',
    uf: '',
    login: '', 
    senha: ''  
  });

  
  // Estados para os dados de Cliente, controladores e UF
  const [ufs] = useState(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]);

  const [cliente, setCliente] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (clienteId) => {
    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Tem certeza que deseja excluir este Cliente?',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
      await axios.delete(`http://localhost:3001/cliente/${clienteId}`);
      setCliente(cliente.filter((cliente) => cliente.id !== clienteId));

        // Mostrar um alerta de sucesso
        await Swal.fire({
          icon: 'success',
          title: 'Cliente excluído com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
      }

    } catch (error) {
      console.error('Erro ao deletar Cliente:', error);
    }
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      const response = await axios.post('http://localhost:3001/cliente', newCliente);
      console.log('Registro inserido com sucesso:', response.data);
      setCliente([...cliente, response.data]); // Atualiza o estado com os dados inseridos
      setNewCliente({ nome: '', cnpj: '', contato: '', ativo: '', uf: '', login: '', senha: '' }); // Limpa o formulário
    
      await Swal.fire({
        icon: 'success',
        title: 'Cadastro efetuado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      setNewCliente({ nome: '', cnpj: '', contato: '', ativo: '', uf: '', login: '', senha: '' });
      await Swal.fire({
        icon: 'error',
        title: 'Erro ao fazer cadastro!',
        text: 'Ocorreu um erro ao tentar fazer o cadastro. Por favor, tente novamente.',
      });
      console.error('Erro ao atualizar Cliente:', error);
      console.error('Erro ao inserir registro:', error);
    }
  };

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cliente');
        setCliente(response.data); // Atualiza o estado com os dados recebidos

      } catch (error) {
        console.error('Erro ao buscar Cliente:', error);
      }
    };

    fetchCliente();
  }, []);
      
  // Contato para filtrar as Cliente com Cliente no termo de pesquisa
  const filteredCliente = cliente.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCliente, setEditedCliente] = useState({
    id: null,
    nome: '',
    cnpj: '',
    contato: '',
    ativo: '',
    uf: '',
    login: '', 
    senha: ''  
  });

  const baixarexcel = async () => {
    try {
      const torre = Cliente.map(({ senha, ...item }) => item);
      
      const ws = XLSX.utils.json_to_sheet(torre);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Clientes");
      XLSX.writeFile(wb, "Clientes.xlsx");
     
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
        text: 'Ocorreu um erro ao tentar atualizar o Cliente. Por favor, tente novamente mais tarde.',
      });
      console.error('Erro ao fazer o download:', error);
    }
  }



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

  const handleSaveChanges = async () => {
    try {
      // Crie um objeto com os campos preenchidos
      const editedFields = {};
      for (const key in editedCliente) {
        if (editedCliente[key] !== '') {
          editedFields[key] = editedCliente[key];
        }
      }

      // Realiza a solicitação de atualização para o backend
      await axios.put(`http://localhost:3001/cliente/${editedCliente.id}`, editedCliente);
      
      // Exibe um alerta de sucesso
      await Swal.fire({
        icon: 'success',
        title: 'Cadastro editado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });
      
      // Atualize os detalhes do Cliente na lista principal
      const updatedClientes = cliente.map((cliente) =>
      cliente.id === editedCliente.id ? { ...cliente, ...editedFields } : cliente
      );
      setCliente(updatedClientes);
      closeEditModal(); // Fecha o modal após salvar
    } catch (error) {
      // Exibe um alerta de erro
      await Swal.fire({
        icon: 'error',
        title: 'Erro ao editar!',
        text: 'Ocorreu um erro ao tentar atualizar o Cliente. Por favor, tente novamente mais tarde.',
      });
      console.error('Erro ao atualizar Cliente:', error);
    }
  };

  return (
    <div>
      <Header/>
      <div className="Cliente-page-container">
        <div className="header">
          <h2>CADASTRO E PESQUISA DE EMPRESA</h2>
          <div className="cadastro" id="cadastro">
  <h2>Cadastrar Nova Empressa</h2>
  <form onSubmit={handleSubmit} className="form-container">
  <div className="form-field">
    <input
      type="text"
      name="nome"
      placeholder="Nome da Empressa"
      id="nome"
      value={newCliente.nome} // Adiciona o valor do estado
      onChange={(e) => setNewCliente({ ...newCliente, nome: e.target.value })} // Atualiza o estado
    />
  </div>
  <div className="form-field">
    <input
      type="text"
      name="cnpj"
      id="cnpj"
      placeholder="cnpj"
      value={newCliente.cnpj}
      onChange={(e) => setNewCliente({ ...newCliente, cnpj: e.target.value })}
    />
  </div>
  <div className="form-field">
    <input
      type="text"
      name="contato"
      id="contato"
      placeholder="Contato"
      value={newCliente.contato}
      onChange={(e) => setNewCliente({ ...newCliente, contato: e.target.value })}
    />
  </div>
  <div className="form-field">
    <select
      name="ativo"
      id="ativo"
      value={newCliente.ativo}
      onChange={(e) => setNewCliente({ ...newCliente, ativo: e.target.value })}
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
      value={newCliente.uf}
      onChange={(e) => setNewCliente({ ...newCliente, uf: e.target.value })}
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
      value={newCliente.login}
      onChange={(e) => setNewCliente({ ...newCliente, login: e.target.value })}
    />
  </div>
  <div className="form-field">
    <input
      type="password"
      name="senha"
      id="senha"
      placeholder="Senha"
      value={newCliente.senha}
      onChange={(e) => setNewCliente({ ...newCliente, senha: e.target.value })}
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
                    value={editedCliente.nome} 
                    onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="text" name="cnpj" placeholder='cnpj' value={editedCliente.cnpj} onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="text" name="contato" placeholder='Contato' value={editedCliente.contato} onChange={handleInputChange} />
                  </div>
                  <div>
                    <select name="ativo" value={editedCliente.ativo} onChange={handleInputChange}  >
                    <option value=''>Ativo</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    </select>
                  </div>
                  <div>
                  <select name="uf" value={editedCliente.uf} onChange={handleInputChange}>
                      <option value="">Selecione a UF</option>
                      {ufs.map((uf, index) => (
                        <option key={index} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <input type="text" name="login" placeholder='Login' value={editedCliente.login} onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="password" name="senha" placeholder='Senha' value={editedCliente.senha} onChange={handleInputChange} />
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
            placeholder="Pesquisar pelo nome Empresa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Contato</th>
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
              {/* Mapeamento dos dados dos Cliente cadastradas */}
              {filteredCliente && filteredCliente.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cnpj}</td>
                  <td>{cliente.contato}</td>
                  <td>{cliente.ativo}</td>
                  <td>{cliente.uf}</td>
                  <td>{cliente.login}</td> 
                  <td>
                    <button type="button" title="Editar" onClick={()=> openEditModal(cliente)}>
                      <EditIcon />
                    </button>
                    <button type="button" title="Deletar" onClick={() => handleDelete(cliente.id)}>
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
