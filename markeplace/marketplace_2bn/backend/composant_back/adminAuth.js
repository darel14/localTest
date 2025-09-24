const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./User');
const router = express.Router();

// Route de connexion admin
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Tentative de connexion admin:', { username, password });
  if (!username || !password) {
    console.log('Champs manquants');
    return res.status(400).json({ error: 'Champs manquants' });
  }
  const user = await User.findOne({ username });
  console.log('Utilisateur trouvé:', user);
  if (!user) {
    console.log('Utilisateur non trouvé');
    return res.status(401).json({ error: 'Identifiants incorrects' });
  }
  const valid = await bcrypt.compare(password, user.password);
  console.log('Résultat bcrypt.compare:', valid);
  if (!valid) {
    console.log('Mot de passe incorrect');
    return res.status(401).json({ error: 'Identifiants incorrects' });
  }
  console.log('Connexion admin réussie');
  res.json({ success: true, username: user.username, role: user.role });
});

module.exports = router;
