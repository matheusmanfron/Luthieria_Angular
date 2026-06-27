const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'minha_chave_super_secreta_123';

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }

  jwt.verify(token, JWT_SECRET, (erro, usuarioDecodificado) => {
    if (erro) {
      return res.status(403).json({ erro: 'Token inválido ou expirado.' });
    }

    req.usuario = usuarioDecodificado;
    next();
  });
}

function formatarUsuario(user) {
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    telefone: user.telefone,
    tipo: user.tipo,
    tempoExperiencia: user.tempo_experiencia,
    instrumentosAtendidos: user.instrumentos_atendidos ? JSON.parse(user.instrumentos_atendidos) : [],
    descricaoProfissional: user.descricao_profissional
  };
}

function formatarInstrumento(instrumento) {
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

function formatarServico(servico) {
  return {
    id: servico.id,
    clienteId: servico.cliente_id,
    instrumentoId: servico.instrumento_id,
    luthierId: servico.luthier_id,
    instrumento: servico.instrumento,
    status: servico.status,
    observacoes: servico.observacoes
  };
}

router.get('/health', (req, res) => {
  res.json({ status: 'ok', projeto: 'Music Soul API' });
});

router.post('/cadastro', async (req, res) => {
  const {
    nome,
    email,
    telefone,
    senha,
    password,
    tipo = 'cliente',
    tempoExperiencia,
    instrumentosAtendidos = [],
    descricaoProfissional
  } = req.body;

  const senhaRecebida = senha || password;

  if (!nome || !email || !telefone || !senhaRecebida) {
    return res.status(400).json({ erro: 'Nome, e-mail, telefone e senha sÃ£o obrigatórios.' });
  }

  if (senhaRecebida.length < 6) {
    return res.status(400).json({ erro: 'A senha deve ter pelo menos 6 caracteres.' });
  }

  if (!['cliente', 'luthier'].includes(tipo)) {
    return res.status(400).json({ erro: 'Tipo de usuário inválido.' });
  }

  if (tipo === 'luthier' && (!tempoExperiencia || !descricaoProfissional)) {
    return res.status(400).json({ erro: 'Para cadastrar um luthier, informe tempo de experiência e descrição profissional.' });
  }

  try {
    const userExists = await db('users').where({ email }).first();

    if (userExists) {
      return res.status(409).json({ erro: 'Este e-mail já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(senhaRecebida, 10);

    const instrumentosFormatados = Array.isArray(instrumentosAtendidos)
      ? instrumentosAtendidos
      : String(instrumentosAtendidos).split(',').map(i => i.trim()).filter(Boolean);

    const [newUserId] = await db('users').insert({
      nome,
      email,
      telefone,
      password: hashedPassword,
      tipo,
      tempo_experiencia: tipo === 'luthier' ? tempoExperiencia : null,
      instrumentos_atendidos: tipo === 'luthier' ? JSON.stringify(instrumentosFormatados) : JSON.stringify([]),
      descricao_profissional: tipo === 'luthier' ? descricaoProfissional : null
    });

    const user = await db('users').where({ id: newUserId }).first();

    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: formatarUsuario(user)
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ erro: 'Erro interno ao cadastrar o usuário.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, senha } = req.body;
  const senhaRecebida = password || senha;

  if (!email || !senhaRecebida) {
    return res.status(400).json({ erro: 'Informe e-mail e senha.' });
  }

  try {
    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const isValidPassword = await bcrypt.compare(senhaRecebida, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, tipo: user.tipo },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: formatarUsuario(user)
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno ao realizar o login.' });
  }
});

router.get('/usuarios', verificarToken, async (req, res) => {
  try {
    const users = await db('users').select(
      'id',
      'nome',
      'email',
      'telefone',
      'tipo',
      'tempo_experiencia',
      'instrumentos_atendidos',
      'descricao_profissional'
    );

    res.json(users.map(formatarUsuario));
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ erro: 'Erro ao buscar usuários.' });
  }
});

router.get('/instrumentos', async (req, res) => {
  try {
    const instrumentos = await db('instrumentos').select('*').orderBy('id', 'desc');
    res.json(instrumentos.map(formatarInstrumento));
  } catch (error) {
    console.error('Erro ao buscar instrumentos:', error);
    res.status(500).json({ erro: 'Erro ao buscar instrumentos.' });
  }
});

router.get('/instrumentos/:id', async (req, res) => {
  try {
    const instrumento = await db('instrumentos').where({ id: req.params.id }).first();

    if (!instrumento) {
      return res.status(404).json({ erro: 'Instrumento não encontrado.' });
    }

    res.json(formatarInstrumento(instrumento));
  } catch (error) {
    console.error('Erro ao buscar instrumento:', error);
    res.status(500).json({ erro: 'Erro ao buscar instrumento.' });
  }
});

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
    return res.status(400).json({ erro: 'Nome, tipo, marca, modelo e descrição são obrigatórios.' });
  }

  if (!['novo', 'usado', 'precisa_conserto'].includes(estado)) {
    return res.status(400).json({ erro: 'Estado inválido.' });
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

    const instrumento = await db('instrumentos').where({ id }).first();
    res.status(201).json(formatarInstrumento(instrumento));
  } catch (error) {
    console.error('Erro ao cadastrar instrumento:', error);
    res.status(500).json({ erro: 'Erro interno ao cadastrar instrumento.' });
  }
});

router.get('/servicos', async (req, res) => {
  try {
    const { status } = req.query;
    const query = db('servicos').select('*').orderBy('id', 'desc');

    if (status) {
      query.where({ status });
    }

    const servicos = await query;
    res.json(servicos.map(formatarServico));
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({ erro: 'Erro ao buscar serviços.' });
  }
});

router.post('/servicos', async (req, res) => {
  const {
    clienteId = 1,
    instrumentoId = 0,
    luthierId = 1,
    instrumento,
    status = 'solicitado',
    observacoes = ''
  } = req.body;

  if (!instrumento || !observacoes) {
    return res.status(400).json({ erro: 'Instrumento e observações são obrigatórios.' });
  }

  try {
    const [id] = await db('servicos').insert({
      cliente_id: Number(clienteId),
      instrumento_id: Number(instrumentoId),
      luthier_id: Number(luthierId),
      instrumento,
      status,
      observacoes
    });

    const servico = await db('servicos').where({ id }).first();
    res.status(201).json(formatarServico(servico));
  } catch (error) {
    console.error('Erro ao cadastrar serviço:', error);
    res.status(500).json({ erro: 'Erro interno ao cadastrar serviço.' });
  }
});

router.patch('/servicos/:id', async (req, res) => {
  const { id } = req.params;
  const { status, observacoes } = req.body;

  try {
    const servicoAtual = await db('servicos').where({ id }).first();

    if (!servicoAtual) {
      return res.status(404).json({ erro: 'Serviço não encontrado.' });
    }

    await db('servicos')
      .where({ id })
      .update({
        status: status ?? servicoAtual.status,
        observacoes: observacoes ?? servicoAtual.observacoes,
        updated_at: db.fn.now()
      });

    const servico = await db('servicos').where({ id }).first();
    res.json(formatarServico(servico));
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar serviço.' });
  }
});

module.exports = router;
