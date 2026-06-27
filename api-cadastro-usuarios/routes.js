// routes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Importamos a configuração do banco de dados (Knex)
const knexConfig = require('./knexfile');
const knex = require('knex');
const db = knex(knexConfig.development);

// Cria o gerenciador de rotas do Express
const router = express.Router();

// Chave secreta para assinar o JWT
const JWT_SECRET = process.env.JWT_SECRET || 'minha_chave_super_secreta_123';

function formatarInstrumento(instrumento) {
  if (!instrumento) {
    return null;
  }

  return {
    id: instrumento.id,
    nome: instrumento.nome,
    tipo: instrumento.tipo,
    marca: instrumento.marca,
    modelo: instrumento.modelo,
    estado: instrumento.estado,
    preco: Number(instrumento.preco),
    aceitaTroca: Boolean(instrumento.aceita_troca),
    descricao: instrumento.descricao,
    donoId: instrumento.dono_id
  };
}

/**
 * MIDDLEWARE DE SEGURANÇA (VERIFICAR TOKEN)
 */
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      erro: 'Acesso negado. Token não fornecido.'
    });
  }

  jwt.verify(token, JWT_SECRET, (erro, usuarioDecodificado) => {
    if (erro) {
      return res.status(403).json({
        erro: 'Token inválido ou expirado.'
      });
    }

    req.usuario = usuarioDecodificado;
    next();
  });
}

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    projeto: 'Music Soul API'
  });
});

/**
 * ROTAS DE INSTRUMENTOS
 */

// Lista todos os instrumentos para o catÃ¡logo
router.get('/instrumentos', async (req, res) => {
  try {
    const instrumentos = await db('instrumentos')
      .select('*')
      .orderBy('id', 'desc');

    res.json(instrumentos.map(formatarInstrumento));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: 'Erro ao buscar instrumentos.'
    });
  }
});

// Busca um instrumento por ID
router.get('/instrumentos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const instrumento = await db('instrumentos')
      .where({ id })
      .first();

    if (!instrumento) {
      return res.status(404).json({
        erro: 'Instrumento não encontrado.'
      });
    }

    res.json(formatarInstrumento(instrumento));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: 'Erro ao buscar instrumento.'
    });
  }
});

// Cadastra novo instrumento anunciado pelo usuÃ¡rio
router.post('/instrumentos', async (req, res) => {
  const {
    nome,
    tipo,
    marca,
    modelo,
    estado = 'usado',
    preco = 0,
    aceitaTroca = false,
    descricao,
    donoId = 1
  } = req.body;

  if (!nome || !tipo || !marca || !modelo || !descricao) {
    return res.status(400).json({
      erro: 'Nome, tipo, marca, modelo e descrição são obrigatórios.'
    });
  }

  if (!['novo', 'usado', 'precisa_conserto'].includes(estado)) {
    return res.status(400).json({
      erro: 'Estado inválido. Use novo, usado ou precisa_conserto.'
    });
  }

  try {
    const [id] = await db('instrumentos').insert({
      nome,
      tipo,
      marca,
      modelo,
      estado,
      preco: Number(preco),
      aceita_troca: Boolean(aceitaTroca),
      descricao,
      dono_id: Number(donoId)
    });

    const instrumento = await db('instrumentos')
      .where({ id })
      .first();

    res.status(201).json({
      mensagem: 'Instrumento cadastrado com sucesso!',
      instrumento: formatarInstrumento(instrumento)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: 'Erro interno ao cadastrar instrumento.'
    });
  }
});

/**
 ROTAS DE USUÁRIOS
 */

router.get('/usuarios', verificarToken, async (req, res) => {
  try {
    const users = await db('users').select('id', 'email');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: 'Erro ao buscar usuários.'
    });
  }
});

router.get('/usuarios/:id', verificarToken, async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await db('users')
      .where({ id: userId })
      .select('id', 'email')
      .first();

    if (!user) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: 'Erro ao buscar o usuário.'
    });
  }
});

router.post('/cadastro', async (req, res) => {
  const { email, password, senha } = req.body;
  const senhaRecebida = password || senha;

  if (!email || !senhaRecebida) {
    return res.status(400).json({
      erro: 'E-mail e senha são obrigatórios.'
    });
  }

  try {
    const userExists = await db('users').where({ email }).first();

    if (userExists) {
      return res.status(400).json({
        erro: 'Este email já está em uso.'
      });
    }

    const hashedPassword = await bcrypt.hash(senhaRecebida, 10);

    const [newUserId] = await db('users').insert({
      email,
      password: hashedPassword
    });

    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      id: newUserId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: 'Erro interno ao cadastrar o usuário.'
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, senha } = req.body;
  const senhaRecebida = password || senha;

  if (!email || !senhaRecebida) {
    return res.status(400).json({
      erro: 'Informe e-mail e senha.'
    });
  }

  try {
    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(401).json({
        erro: 'Credenciais inválidas.'
      });
    }

    const isValidPassword = await bcrypt.compare(senhaRecebida, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        erro: 'Credenciais inválidas.'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      JWT_SECRET,
      {
        expiresIn: '2h'
      }
    );

    res.json({
      mensagem: 'Login realizado com sucesso!',
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: 'Erro interno ao realizar o login.'
    });
  }
});

module.exports = router;
