import React, { useEffect, useState } from 'react';
import './Base.css'
import Header from '../Header/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


function Base() {
  const [empresa, setEmpresa] = useState([]);
  const [controle, setControle] = useState([]);
  
  const [base, setBase] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editedBase, setEditedBase] = useState({
    id: null,
    nome: '',
    empresa: '',
    controlador: '',
    lider: '',
    ativo: '',
    uf: '',
    login: '', 
    senha: ''  
  });

  // Estados para os campos do formulário de cadastro
  const [newBase, setNewBase] = useState({
    nome: '',
    empresa: '',
    lider: '',
    ativo: '',
    uf: '',
    login: '', 
    senha: '' ,
    controlador: ''
  });

  
  // Estados para os dados de base, controladores e UF
  const [ufs] = useState(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]);

  const handleDelete = async (baseId) => {
    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Tem certeza que deseja excluir este base?',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
      await axios.delete(`http://localhost:3001/base/${baseId}`);
      setBase(base.filter((base) => base.id !== baseId));

        // Mostrar um alerta de sucesso
        await Swal.fire({
          icon: 'success',
          title: 'base excluída com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
      }

    } catch (error) {
      console.error('Erro ao deletar base:', error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    
    try {
      // Verifica se os campos de empresa e controlador estão preenchidos
      if (!newBase.cliente || !newBase.controle) {
        await Swal.fire({
          icon: 'error',
          title: 'Campos obrigatórios não preenchidos!',
          text: 'Por favor, selecione uma empresa e um controlador antes de continuar.',
        });
        return; // Impede o envio do formulário se os campos obrigatórios não estiverem preenchidos
      }

      const selectedControlador = controle.find(item => item.id === newBase.controle);
      const selectedEmpresa = empresa.find(item => item.id === newBase.cliente);

      const updatedBase = {
        ...newBase,
        controlador: selectedControlador ? selectedControlador.nome : '', 
        cliente: selectedEmpresa ? selectedEmpresa.nome : '' 
      };

      const response = await axios.post('http://localhost:3001/base', updatedBase);
      console.log('Registro inserido com sucesso:', response.data);
      setBase([...base, response.data]); // Atualiza o estado com os dados inseridos
      setNewBase({ nome: '', empresa: '', lider: '', ativo: '', uf: '', login: '', senha: '', controlador: ''  }); // Limpa o formulário

      await Swal.fire({
        icon: 'success',
        title: 'Base criada com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });
  
    } catch (error) {
      setNewBase({ nome: '', empresa: '', lider: '', ativo: '', uf: '', login: '', senha: '', controlador: ''  });
      await Swal.fire({
        icon: 'error',
        title: 'Erro ao criar Base!',
        text: 'Ocorreu um erro ao tentar fazer o cadastro. Por favor, tente novamente.',
      });
      console.error('Erro ao atualizar base:', error);
      console.error('Erro ao inserir registro:', error);
    }
  };
  
  useEffect(() => {
    const fetchBase = async () => {
      try {
        const response = await axios.get('http://localhost:3001/base');
        setBase(response.data); // Atualiza o estado com os dados recebidos

      } catch (error) {
        console.error('Erro ao buscar base:', error);
      }
    };

    const fetchEmpresa = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cliente'); // Rota para recuperar empresa do backend
        setEmpresa(response.data); // Atualiza o estado com os dados das empresa
      } catch (error) {
        console.error('Erro ao buscar empresa:', error);
      }
    };

    // Função para carregar os dados dos controladores
    const fetchControle = async () => {
      try {
        const response = await axios.get('http://localhost:3001/controle'); // Rota para recuperar controladores do backend
        setControle(response.data); // Atualiza o estado com os dados dos controladores
      } catch (error) {
        console.error('Erro ao buscar controladores:', error);
      }
    };

    fetchEmpresa(); 
    fetchControle();
    fetchBase();
  }, []);
      
  //pesquisa
  const filteredBase = base && base.filter(base =>
    (base && base.nome && base.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (base && base.empresa && base.empresa.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const baixarexcel = async () => {
    try {
      const torre = base.map(({ senha, ...item }) => item);
      
      const ws = XLSX.utils.json_to_sheet(torre);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "bases");
      XLSX.writeFile(wb, "bases.xlsx");
     
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
        text: 'Ocorreu um erro ao tentar atualizar o base. Por favor, tente novamente mais tarde.',
      });
      console.error('Erro ao fazer o download:', error);
    }
  }

  const openEditModal = (base) => {
    setEditedBase(base);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedBase({ ...editedBase, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      // Crie um objeto com os campos preenchidos
      const editedFields = {};
      for (const key in editedBase) {
        if (editedBase[key] !== '') {
          editedFields[key] = editedBase[key];
        }
      }

      // Realiza a solicitação de atualização para o backend
      await axios.put(`http://localhost:3001/base/${editedBase.id}`, editedBase);
      
      // Exibe um alerta de sucesso
      await Swal.fire({
        icon: 'success',
        title: 'Base editada com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });
      
      // Atualize os detalhes do base na lista principal
      const updatedBases = base.map((base) =>
      base.id === editedBase.id ? { ...base, ...editedFields } : base
      );
      setBase(updatedBases);
      closeEditModal(); // Fecha o modal após salvar
    } catch (error) {
      // Exibe um alerta de erro
      await Swal.fire({
        icon: 'error',
        title: 'Erro ao editar!',
        text: 'Ocorreu um erro ao tentar atualizar a base. Por favor, tente novamente mais tarde.',
      });
      console.error('Erro ao atualizar base:', error);
    }
  };

  return (
    <div>
      <Header/>
      <div className="base-page-container">
        <div className="header">
          <h2>CADASTRO E PESQUISA DE BASE</h2>
          <div className="cadastro" id="cadastro">
  <h2>Cadastrar Nova Base</h2>
  <form onSubmit={handleSubmit} className="form-container">
  <div className="form-field">
    <input
      type="text"
      name="nome"
      placeholder="Nome da Base"
      id="base"
      value={newBase.nome} // Adiciona o valor do estado
      onChange={(e) => setNewBase({ ...newBase, nome: e.target.value })} // Atualiza o estado
    />
  </div>
  <div className="form-field">
        <select
          name="cliente"
          id="cliente"
          value={newBase.cliente}
          onChange={(e) => setNewBase({ ...newBase, cliente: e.target.value })}
        >
          <option value="">Empresa</option>
          {empresa.map((empresa) => (
            <option key={empresa.id} value={empresa.id}>{empresa.nome}</option>
          ))}
        </select>
      </div>
  <div className="form-field">
    <input
      type="text"
      name="lider"
      id="lider"
      placeholder="Lider"
      value={newBase.lider}
      onChange={(e) => setNewBase({ ...newBase, lider: e.target.value })}
    />
  </div>
  <div className="form-field">
        <select
          name="controlador"
          id="controle"
          value={newBase.controlador}
          onChange={(e) => setNewBase({ ...newBase, controlador: e.target.value })}
        >
          <option value="">Controlador(a)</option>
          {controle.map((controle) => (
            <option key={controle.id} value={controle.nome}>{controle.nome}</option>
          ))}
        </select>
      </div>
  <div className="form-field">
    <select
      name="ativo"
      id="ativo"
      value={newBase.ativo}
      onChange={(e) => setNewBase({ ...newBase, ativo: e.target.value })}
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
      value={newBase.uf}
      onChange={(e) => setNewBase({ ...newBase, uf: e.target.value })}
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
      value={newBase.login}
      onChange={(e) => setNewBase({ ...newBase, login: e.target.value })}
    />
  </div>
  <div className="form-field">
    <input
      type="password"
      name="senha"
      id="senha"
      placeholder="Senha"
      value={newBase.senha}
      onChange={(e) => setNewBase({ ...newBase, senha: e.target.value })}
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
                    value={editedBase.nome} 
                    onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="text" name="empresa" placeholder='empresa' value={editedBase.empresa} onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="text" name="lider" placeholder='lider' value={editedBase.lider} onChange={handleInputChange} />
                  </div>
                  <div>
                    <select name="ativo" value={editedBase.ativo} onChange={handleInputChange}  >
                    <option value=''>Ativo</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    </select>
                  </div>
                  <div>
                  <select name="uf" value={editedBase.uf} onChange={handleInputChange}>
                      <option value="">Selecione a UF</option>
                      {ufs.map((uf, index) => (
                        <option key={index} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <input type="text" name="login" placeholder='Login' value={editedBase.login} onChange={handleInputChange} />
                  </div>
                  <div className="form-field">
                    <input type="password" name="senha" placeholder='Senha' value={editedBase.senha} onChange={handleInputChange} />
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
            placeholder="Pesquisar por nome da nome ou lider"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Base</th>
                <th>Empresa</th>
                <th>Controlador</th>
                <th>Lider</th>
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
              {/* Mapeamento dos dados dos base cadastradas */}
              {filteredBase && filteredBase.map((base, index) => (
                <tr key={index}>
                  <td>{base.id}</td>
                  <td>{base.nome}</td>
                  <td>{base.empresa}</td>
                  <td>{base.controlador}</td>
                  <td>{base.lider}</td>
                  <td>{base.ativo}</td>
                  <td>{base.uf}</td>
                  <td>{base.login}</td> 
                  <td>
                    <button type="button" title="Editar" onClick={()=> openEditModal(base)}>
                      <EditIcon />
                    </button>
                    <button type="button" title="Deletar" onClick={() => handleDelete(base.id)}>
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
