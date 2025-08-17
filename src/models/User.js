const { prisma } = require('../config/database');

class User {
 // Buscar todos os usuários
 static async findAll() {
  try {
   return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
   });
  } catch (error) {
   throw new Error(`Erro ao buscar usuários: ${error.message}`);
  }
 }

 // Buscar usuário por ID
 static async findById(id) {
  try {
   return await prisma.user.findUnique({
    where: { id: parseInt(id) }
   });
  } catch (error) {
   throw new Error(`Erro ao buscar usuário: ${error.message}`);
  }
 }

 // Buscar usuário por email
 static async findByEmail(email) {
  try {
   return await prisma.user.findUnique({
    where: { email }
   });
  } catch (error) {
   throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
  }
 }

 // Criar novo usuário
 static async create(userData) {
  try {
   return await prisma.user.create({
    data: userData
   });
  } catch (error) {
   throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
 }

 // Atualizar usuário
 static async update(id, userData) {
  try {
   return await prisma.user.update({
    where: { id: parseInt(id) },
    data: userData
   });
  } catch (error) {
   throw new Error(`Erro ao atualizar usuário: ${error.message}`);
  }
 }

 // Deletar usuário
 static async delete(id) {
  try {
   return await prisma.user.delete({
    where: { id: parseInt(id) }
   });
  } catch (error) {
   throw new Error(`Erro ao deletar usuário: ${error.message}`);
  }
 }
}

module.exports = User;
