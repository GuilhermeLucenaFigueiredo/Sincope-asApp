
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users'); 
const AuthRoutes = require('./routes/auth');
const CadastRoutes = require('./routes/cadastro');
const CadastProva = require('./routes/prova');
require('./models/user'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use('/api/users', userRoutes);
app.use('/api', AuthRoutes);
app.use('/', CadastRoutes);
app.use('/', CadastProva);




app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
