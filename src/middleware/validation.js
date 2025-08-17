const { body, param } = require('express-validator');

// Validações para usuários
const userValidation = {
 // Validação para criar usuário
 store: [
  body('name')
   .trim()
   .isLength({ min: 2, max: 100 })
   .withMessage('Nome deve ter entre 2 e 100 caracteres')
   .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
   .withMessage('Nome deve conter apenas letras e espaços'),

  body('email')
   .isEmail()
   .normalizeEmail()
   .withMessage('Email inválido')
 ],

 // Validação para atualizar usuário
 update: [
  param('id')
   .isInt({ min: 1 })
   .withMessage('ID deve ser um número inteiro válido'),

  body('name')
   .optional()
   .trim()
   .isLength({ min: 2, max: 100 })
   .withMessage('Nome deve ter entre 2 e 100 caracteres')
   .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
   .withMessage('Nome deve conter apenas letras e espaços'),

  body('email')
   .optional()
   .isEmail()
   .normalizeEmail()
   .withMessage('Email inválido')
 ],

 // Validação para buscar/deletar usuário por ID
 idParam: [
  param('id')
   .isInt({ min: 1 })
   .withMessage('ID deve ser um número inteiro válido')
 ]
};

module.exports = {
 userValidation
};
