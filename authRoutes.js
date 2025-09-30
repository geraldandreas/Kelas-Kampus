const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', (req, res, next) => {
  console.log('Masuk endpoint /auth/register');
  next();
}, register);

router.post('/login', login);

// Contoh route protected untuk admin, bisa ditambahkan sesuai kebutuhan
router.get('/admin-dashboard', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  res.json({ message: 'Ini halaman khusus admin' });
});

// Contoh route protected untuk siswa
router.get('/siswa-dashboard', authenticateToken, authorizeRoles(['siswa']), (req, res) => {
  res.json({ message: 'Ini halaman khusus siswa' });
});

module.exports = router;
