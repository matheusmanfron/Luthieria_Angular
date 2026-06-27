const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Rotas disponíveis:');
  console.log('- GET /health');
  console.log('- POST /cadastro');
  console.log('- POST /login');
  console.log('- GET /usuarios');
  console.log('- GET /instrumentos');
  console.log('- GET /instrumentos/:id');
  console.log('- POST /instrumentos');
  console.log('- GET /servicos');
  console.log('- POST /servicos');
  console.log('- PATCH /servicos/:id');
});
