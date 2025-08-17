const User = require('../models/User');
const { validationResult } = require('express-validator');

class UserController {
 // Listar todos os usuários
 static async index(req, res) {
  try {
   const users = await User.findAll();
   res.json({
    success: true,
    data: users,
    message: 'Usuários listados com sucesso'
   });
  } catch (error) {
   res.status(500).json({
    success: false,
    message: error.message
   });
  }
 }

 // Buscar usuário por ID
 static async show(req, res) {
  try {
   const { id } = req.params;
   const user = await User.findById(id);

   if (!user) {
    return res.status(404).json({
     success: false,
     message: 'Usuário não encontrado'
    });
   }

   res.json({
    success: true,
    data: user,
    message: 'Usuário encontrado com sucesso'
   });
  } catch (error) {
   res.status(500).json({
    success: false,
    message: error.message
   });
  }
 }

 // Criar novo usuário
 static async store(req, res) {
  try {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(400).json({
     success: false,
     errors: errors.array()
    });
   }

   const { name, email } = req.body;

   // Verificar se email já existe
   const existingUser = await User.findByEmail(email);
   if (existingUser) {
    return res.status(400).json({
     success: false,
     message: 'Email já está em uso'
    });
   }

   const user = await User.create({ name, email });

   res.status(201).json({
    success: true,
    data: user,
    message: 'Usuário criado com sucesso'
   });
  } catch (error) {
   res.status(500).json({
    success: false,
    message: error.message
   });
  }
 }

 // Atualizar usuário
 static async update(req, res) {
  try {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(400).json({
     success: false,
     errors: errors.array()
    });
   }

   const { id } = req.params;
   const { name, email } = req.body;

   // Verificar se usuário existe
   const existingUser = await User.findById(id);
   if (!existingUser) {
    return res.status(404).json({
     success: false,
     message: 'Usuário não encontrado'
    });
   }

   // Verificar se email já está em uso por outro usuário
   if (email && email !== existingUser.email) {
    const userWithEmail = await User.findByEmail(email);
    if (userWithEmail) {
     return res.status(400).json({
      success: false,
      message: 'Email já está em uso'
     });
    }
   }

   const user = await User.update(id, { name, email });

   res.json({
    success: true,
    data: user,
    message: 'Usuário atualizado com sucesso'
   });
  } catch (error) {
   res.status(500).json({
    success: false,
    message: error.message
   });
  }
 }

 // Deletar usuário
 static async destroy(req, res) {
  try {
   const { id } = req.params;

   // Verificar se usuário existe
   const existingUser = await User.findById(id);
   if (!existingUser) {
    return res.status(404).json({
     success: false,
     message: 'Usuário não encontrado'
    });
   }

   await User.delete(id);

   res.json({
    success: true,
    message: 'Usuário deletado com sucesso'
   });
  } catch (error) {
   res.status(500).json({
    success: false,
    message: error.message
   });
  }
 }
}

module.exports = UserController;
