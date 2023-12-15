const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { Nota } = require('../models/user');

router.post('/prova', authenticateToken, async (req, res) => {
  const vendedorCPF = req.user.cpf; // CPF do usuário autenticado
  
  const { nota } = req.body;
  
  try {
    await Nota.create({
      vendedor_CPF: vendedorCPF, // Aqui você está usando o CPF do token como vendedor_CPF
      nota: nota,
    });
  
    res.json({ success: true, message: 'Nota salva com sucesso.' });
  } catch (error) {
    console.error('Erro ao salvar a nota:', error);
    res.status(500).json({ success: false, message: 'Erro ao salvar a nota.' });
  }
});

module.exports = router;
