const express = require('express');
const router = express.Router();
const { Vendedor, Endereco } = require('../models/user');

// Rota para cadastro de usuário
router.post('/cadastro', async (req, res) => {
    try {
      const userData = req.body;
      console.log('conseguiu pegar a requisiçã');

      // Cria um novo vendedor com os dados recebidos
      const novoVendedor = await Vendedor.create({
        nome: userData.nome,
        CPF: userData.CPF,
        email: userData.email,
        data_nascimento: userData.data_nascimento,
        telefone: userData.telefone,
        empresa: userData.empresa,
        cargo: userData.cargo,
        senha: userData.senha,
      });
  
      // Cria um novo endereço associado ao vendedor
      const novoEndereco = await Endereco.create({
        vendedor_CPF: userData.CPF,
        CEP: userData.CEP,
        endereco: userData.endereco,
        cidade: userData.cidade,
        estado: userData.estado,
      });
  
      res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
      console.log('Usuario cadastrado');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
  });
  
  module.exports = router;