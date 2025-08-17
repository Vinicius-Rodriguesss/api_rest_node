const express = require('express');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Rotas da API - Apenas usuários
router.use('/api/users', userRoutes);

module.exports = router;
