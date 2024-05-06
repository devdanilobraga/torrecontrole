const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('./Conexao');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM usuario WHERE login = ?', [username], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: 'Nome de usuário ou senha incorretos' });
            return;
        }

        const user = results[0];

        // Verifica a senha
        bcrypt.compare(password, user.senha, (err, match) => {
            if (err) {
                console.error('Erro ao comparar senhas:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }

            if (!match) {
                // Senha incorreta
                res.status(401).json({ error: 'Senha incorreta' });
                return;
            }

            // Login bem-sucedido
            res.json({ message: 'Login bem-sucedido' });
        });
    });
});

module.exports = router;
