const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const port = process.env.PORT || 3001;

// Configurações do servidor
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão ao MySQL bem-sucedida!');
});

connection.on('error', (err) => {
  console.error('Erro na conexão MySQL:', err);
});

app.get('/controle', (req, res) => {
  connection.query('SELECT * FROM controle', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao executar consulta');
      return;
    }
    res.json(results);
});
});

//TABELA CONTROLE

app.post('/controle', async (req, res) => {
    const { nome, contato, funcao, ativo, uf, login, senha } = req.body;
    const insertQuery = `INSERT INTO controle (nome, contato, funcao, ativo, uf, login, senha) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(insertQuery, [nome, contato, funcao, ativo, uf, login, senha], (err, results, fields) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ id: results.insertId, nome, contato, funcao, ativo, uf, login }); 
    });
  });

  app.delete('/controle/:id', (req, res) => {
    const controleId = req.params.id;
    const deleteQuery = `DELETE FROM controle WHERE id = ?`;
    connection.query(deleteQuery, [controleId], (err, results, fields) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ message: 'Controle excluído com sucesso!' });
    });
  });

  app.put('/controle/:id', (req, res) => {
    const controleId = req.params.id;
    const { nome, contato, funcao, ativo, uf, login, senha } = req.body;
    const updateQuery = `
      UPDATE controle 
      SET nome = ?, contato = ?, funcao = ?, ativo = ?, uf = ?, login = ?, senha = ? 
      WHERE id = ?
    `;
    connection.query(
      updateQuery, 
      [nome, contato, funcao, ativo, uf, login, senha, controleId], 
      (err, results, fields) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.json({ id: controleId, nome, contato, funcao, ativo, uf, login }); 
      }
    );
  });


//TABELA CLIENTE
app.get('/cliente', (req, res) => {
    connection.query('SELECT * FROM cliente', (err, results, fields) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(results);
    });
  });

  app.post('/cliente', async (req, res) => {
    const { nome, contato, cnpj, ativo, uf, login, senha } = req.body;
    const insertQuery = `INSERT INTO cliente (nome, contato, cnpj, ativo, uf, login, senha) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(insertQuery, [nome, contato, cnpj, ativo, uf, login, senha], (err, results, fields) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ id: results.insertId, nome, contato, cnpj, ativo, uf, login }); 
    });
  });

  app.put('/cliente/:id', (req, res) => {
    const clienteId = req.params.id;
    const { nome, contato, cnpj, ativo, uf, login, senha } = req.body;
    const updateQuery = `
      UPDATE cliente 
      SET nome = ?, contato = ?, cnpj = ?, ativo = ?, uf = ?, login = ?, senha = ? 
      WHERE id = ?
    `;
    connection.query(
      updateQuery, 
      [nome, contato, cnpj, ativo, uf, login, senha, clienteId], 
      (err, results, fields) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.json({ id: clienteId, nome, contato, cnpj, ativo, uf, login }); 
      }
    );
  });

  app.delete('/cliente/:id', (req, res) => {
    const clienteId = req.params.id;
    const deleteQuery = `DELETE FROM cliente WHERE id = ?`;
    connection.query(deleteQuery, [clienteId], (err, results, fields) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ message: 'cliente excluído com sucesso!' });
    });
  });


// LOGIN
app.post('/login', async (req, res) => {
    const { login, senha } = req.body;
    const selectQuery = `SELECT * FROM controle WHERE login = ?`;
    connection.query(selectQuery, [login], async (err, results, fields) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        // Verifica se o usuário foi encontrado no banco de dados
        if (results.length === 0) {
            res.status(404).json({ message: 'Usuário não encontrado.' });
            return;
        }
        const user = results[0];
        // Verifica se a senha está correta
        if (user.senha !== senha) {
            res.status(401).json({ message: 'Credenciais inválidas.' });
            return;
        }
        // Verifica se o usuário está ativo
        if (user.ativo !== 'true') {
            res.status(401).json({ message: 'Usuário inativo.' });
            return;
        }
        // Autenticação bem-sucedida
        res.status(200).json({ message: 'Login bem-sucedido.', user });
    });
});


//TABELA DE BASE
app.get('/base', (req, res) => {
  connection.query('SELECT * FROM base', (err, results, fields) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.post('/base', async (req, res) => {
  const { nome, empresa, controlador, lider, ativo, uf, login, senha } = req.body;
  const insertQuery = `INSERT INTO base (nome, empresa, controlador, lider, ativo, uf, login, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(insertQuery, [nome, empresa, controlador, lider, ativo, uf, login, senha], (err, results, fields) => {  
  if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ id: results.insertId, nome, empresa, controlador, lider, ativo, uf, login }); 
  });
});

app.put('/base/:id', (req, res) => {
  const baseId = req.params.id;
  const { nome, empresa, controlador, lider, ativo, uf, login, senha } = req.body;
  const updateQuery = `
    UPDATE base 
    SET nome = ?, empresa = ?,  controlador = ?, lider = ?, ativo = ?, uf = ?, login = ?, senha = ? 
    WHERE id = ?
  `;
  connection.query(
    updateQuery, 
    [nome, empresa, controlador, lider, ativo, uf, login, senha, baseId], 
    (err, results, fields) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ id: baseId, nome, empresa, controlador, lider, ativo, uf, login }); 
    }
  );
});

app.delete('/base/:id', (req, res) => {
  const baseId = req.params.id;
  const deleteQuery = `DELETE FROM base WHERE id = ?`;
  connection.query(deleteQuery, [baseId], (err, results, fields) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: 'base excluído com sucesso!' });
  });
});




















app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = connection;