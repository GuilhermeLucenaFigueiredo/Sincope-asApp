const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sincop',
  port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM vendedor WHERE CPF = ? AND senha = ?', [cpf, senha]);
    connection.release();

    if (rows.length > 0) {
      const userCPF = rows[0].CPF;
      const token = jwt.sign({ cpf: userCPF }, 'teste_segredo', { expiresIn: '1h' });

      res.json({ success: true, message: 'Login bem-sucedido!', token });
      console.log('login feito');
    } else {
      res.json({ success: false, message: 'CPF ou senha incorretos.' });
      console.log('Cpf ou senha incorretos.');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ success: false, message: 'Erro ao fazer login.' });
  }
});


module.exports = router;

