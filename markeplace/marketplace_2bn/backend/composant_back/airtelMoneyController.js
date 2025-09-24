const express = require('express');
const router = express.Router();
const AirtelMoneyTransaction = require('./AirtelMoneyTransaction');

// POST /api/payment/airtel-money
router.post('/', async (req, res) => {
  console.log('Requête reçue pour Airtel Money:', req.body); // Log incoming request
  const { email, airtel_number, products } = req.body;
  if (!email || !airtel_number || !products || !Array.isArray(products) || products.length === 0) {
    console.error('Validation échouée:', { email, airtel_number, products }); // Log validation failure
    return res.status(400).json({ error: 'Champs requis manquants ou invalides.' });
  }
  try {
    const transaction = new AirtelMoneyTransaction({ email, airtel_number, products });
    await transaction.save();
    console.log('Transaction enregistrée avec succès:', transaction); // Log successful transaction
    res.json({ success: true, transaction });
  } catch (err) {
    console.error('Erreur lors de l’enregistrement de la transaction Airtel Money:', err); // Log error details
    res.status(500).json({ error: 'Erreur serveur Airtel Money.' });
  }
});

module.exports = router;
