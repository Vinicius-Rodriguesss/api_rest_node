const express = require('express');
const UserController = require('../controllers/UserController');
const { userValidation } = require('../middleware/validation');

const router = express.Router();

// Rotas para usuários
router.get('/', UserController.index); // GET /users - Listar todos os usuários
router.get('/:id', userValidation.idParam, UserController.show); // GET /users/:id - Buscar usuário por ID
router.post('/', userValidation.store, UserController.store); // POST /users - Criar novo usuário
router.put('/:id', userValidation.update, UserController.update); // PUT /users/:id - Atualizar usuário
router.delete('/:id', userValidation.idParam, UserController.destroy); // DELETE /users/:id - Deletar usuário

module.exports = router;
