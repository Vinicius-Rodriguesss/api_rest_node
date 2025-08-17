const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
 log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Função para conectar ao banco
async function connectDB() {
 try {
  await prisma.$connect();
  console.log('✅ Conectado ao banco de dados com sucesso!');
 } catch (error) {
  console.error('❌ Erro ao conectar ao banco de dados:', error);
  process.exit(1);
 }
}

// Função para desconectar do banco
async function disconnectDB() {
 try {
  await prisma.$disconnect();
  console.log('✅ Desconectado do banco de dados');
 } catch (error) {
  console.error('❌ Erro ao desconectar do banco de dados:', error);
 }
}

module.exports = {
 prisma,
 connectDB,
 disconnectDB
};
