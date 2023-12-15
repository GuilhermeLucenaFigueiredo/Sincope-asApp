
const express = require('express');
const router = express.Router();
const sequelize = require('../config/database'); 
const { authenticateToken } = require('../middleware/auth');
const { Vendedor, Endereco, Nota } = require('../models/user');

// PEGAR NOTA
router.get('/nota', authenticateToken, async (req, res) => {
  const vendedorCPF = req.user.cpf; // Obtém o CPF do vendedor do token

  try {
    const nota = await Nota.findOne({ where: { vendedor_CPF: vendedorCPF } });

    if (nota) {
      res.json({ success: true, nota });
    } else {
      res.status(404).json({ success: false, message: 'Nota não encontrada para este vendedor.' });
    }
  } catch (error) {
    console.error('Erro ao buscar a nota:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar a nota.' });
  }
});

 //pega os dados do perfil

 router.get('/perfil', authenticateToken, async (req, res) => {                  
   
   try {
    const cpf = req.user.cpf;

    const vendedor = await Vendedor.findOne({
      where: { CPF: cpf },
    });
 
     if (vendedor) {
      const dataNascimento = new Date(vendedor.data_nascimento);
      const hoje = new Date();
      let idade = hoje.getFullYear() - dataNascimento.getFullYear();
      const mesAtual = hoje.getMonth() + 1;
      const mesNascimento = dataNascimento.getMonth() + 1;

      if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
      }

      res.json({ 
        exists: true,
        vendedor: {
          CPF: vendedor.CPF,
          nome: vendedor.nome,
          email: vendedor.email,
          idade: idade,
          // Adicionar outros campos caso queira informação a mais
        }
      });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Erro ao buscar CPF na tabela:', error);
    res.status(500).json({ error: 'Erro ao buscar CPF na tabela' });
  }
});


router.put('/perfilupdate', authenticateToken, async (req, res) => {
  const { nome, email, idade } = req.body;

  try {
      const cpf = req.user.cpf;

      const vendedor = await Vendedor.findOne({
          where: { CPF: cpf },
      });

      if (vendedor) {
          // Atualize os dados do vendedor com os novos valores
          await vendedor.update({
              nome: nome,
              email: email,
              idade: idade,
          });

          res.status(200).json({ message: 'Dados do vendedor atualizados com sucesso' });
      } else {
          res.status(404).json({ message: 'Vendedor não encontrado' });
      }
  } catch (error) {
      console.error('Erro ao atualizar dados do vendedor:', error);
      res.status(500).json({ error: 'Erro ao atualizar dados do vendedor' });
  }
});

//DELETAR PERFIL
router.delete('/delete', authenticateToken, async (req, res) => {
  try {
    const cpf = req.user.cpf;

    const vendedor = await Vendedor.findOne({
      where: { CPF: cpf },
    });

    if (vendedor) {
      // Deletar as notas associadas ao vendedor
      await Nota.destroy({
        where: { vendedor_CPF: cpf },
      });

      // Deletar o próprio vendedor após a exclusão das notas
      await vendedor.destroy();

    console.log('Cadastro excluido com sucesso');
    } else {
      res.status(404).json({ message: 'Vendedor não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar vendedor e notas associadas:', error);
    res.status(500).json({ error: 'Erro ao deletar vendedor e notas associadas' });
  }
});



  // buscar todos os usuarios
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM vendedor'; 
    const [results] = await sequelize.query(query); 

    res.json(results); 
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});
  
module.exports = router;
