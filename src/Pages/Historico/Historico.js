import { React, useState } from 'react';
import Header from '../Header/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import './Historico.css';

function Historico() {
 // Dados fictícios para demonstração
 const [servicos] = useState([
  {
    id: 1,
    nomeCliente: 'Cliente A',
    dataPedido: '2024-05-07',
    qtdSolicitada: 10,
    qtdAtendida: 8,
    controlador: 'Controlador A',
    dataServico: '2024-05-10',
    turno: 'T1',
    uf: 'SP'
  },
  {
    id: 2,
    nomeCliente: 'Cliente B',
    dataPedido: '2024-05-08',
    qtdSolicitada: 15,
    qtdAtendida: 12,
    controlador: 'Controlador B',
    dataServico: '2024-05-11',
    turno: 'T2',
    uf: 'RJ'
  },
  {
    id: 3,
    nomeCliente: 'Cliente C',
    dataPedido: '2024-05-09',
    qtdSolicitada: 20,
    qtdAtendida: 18,
    controlador: 'Controlador C',
    dataServico: '2024-05-12',
    turno: 'T3',
    uf: 'MG'
  },
  {
    id: 4,
    nomeCliente: 'Cliente D',
    dataPedido: '2024-05-10',
    qtdSolicitada: 12,
    qtdAtendida: 10,
    controlador: 'Controlador D',
    dataServico: '2024-05-13',
    turno: 'T1',
    uf: 'SP'
  }
  
]);

const [searchTerm, setSearchTerm] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');

// Função para filtrar os serviços com base no termo de busca, data de serviço e nome do cliente
const filteredServicos = servicos.filter(servico =>
  servico.nomeCliente.toLowerCase().includes(searchTerm.toLowerCase()) &&
  (startDate === '' || servico.dataServico >= startDate) &&
  (endDate === '' || servico.dataServico <= endDate)
);

return (
  <div>
    <Header/>
  <div className="content">
    <h2>Histórico de Serviços</h2>
    <input
      className='search'
      type="text"
      placeholder="Pesquisar por nome do Cliente"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <label>
      Data Inicial:
      <input
        className="date-input"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
    </label>
    <label >
      Data Final:
      <input
      className="date-input"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </label>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Cliente</th>
          <th>Data do Pedido</th>
          <th>Qtd Solicitada</th>
          <th>Qtd Atendida</th>
          <th>Controlador(a)</th>
          <th>Data do Serviço</th>
          <th>Turno</th>
          <th>UF</th>
          <th>
            <button type="button" title="Exportar para Excel">
              <DescriptionOutlinedIcon />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredServicos.map(servico => (
          <tr key={servico.id}>
            <td>{servico.id}</td>
            <td>{servico.nomeCliente}</td>
            <td>{servico.dataPedido}</td>
            <td>{servico.qtdSolicitada}</td>
            <td>{servico.qtdAtendida}</td>
            <td>{servico.controlador}</td>
            <td>{servico.dataServico}</td>
            <td>{servico.turno}</td>
            <td>{servico.uf}</td>
            <td>
              <button type="button" title="Editar">
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
);
}

export default Historico;
