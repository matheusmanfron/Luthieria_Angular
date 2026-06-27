// server.js
const express = require('express');
const cors = require('cors');

// Importamos as rotas que acabamos de criar no arquivo routes.js
const routes = require('./routes');

// Inicializa o Express
const app = express();

// Configura o Express para entender requisiÃ§Ãµes em formato JSON
app.use(express.json());

// Habilita o CORS para todas as rotas
app.use(cors());

// Dizemos ao nosso aplicativo para usar as rotas importadas
app.use(routes);

// Define a porta e inicia o servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Rotas disponíveis:`);
  console.log(`- GET /health`);
  console.log(`- GET /instrumentos`);
  console.log(`- GET /instrumentos/:id`);
  console.log(`- POST /instrumentos`);
  console.log(`- GET /usuarios`);
  console.log(`- GET /usuarios/:id`);
  console.log(`- POST /cadastro`);
  console.log(`- POST /login`);
});
