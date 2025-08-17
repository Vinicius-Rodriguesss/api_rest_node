require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const routes = require('./routes');
const { connectDB, disconnectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de segurança
app.use(helmet());
app.use(cors());

// Middleware para parsing de JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rota para o dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rotas da API (apenas usuários)
app.use('/', routes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada - Esta API possui apenas rotas de usuários'
  });
});

// Função para iniciar o servidor
async function startServer() {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`👥 API de usuários disponível em: http://localhost:${PORT}/api/users`);
      console.log(`🌐 Dashboard disponível em: http://localhost:${PORT}/dashboard`);
      console.log(`🔍 Prisma Studio: http://localhost:5555`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

// Função para parar o servidor
async function stopServer() {
  console.log('\n🛑 Parando servidor...');
  await disconnectDB();
  process.exit(0);
}

// Tratamento de sinais para parar o servidor graciosamente
process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);

// Iniciar servidor
startServer();
