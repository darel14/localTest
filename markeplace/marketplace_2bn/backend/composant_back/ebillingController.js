// ebillingController.js
const express = require('express');
const router = express.Router();
const EbillingService = require('./EbillingService'); //importation des dependances 

// Route pour créer une facture Ebilling
router.post('/ebilling', async (req, res) => {
  console.log('Requête Ebilling reçue:', req.body);
  try {
    const billData = req.body;
    const result = await EbillingService.createBill(billData);
    if (result.error) {
      console.error('Erreur Ebilling:', result.error);
      return res.status(400).json({ error: result.error });
    }
    res.status(201).json(result);
  } catch (err) {
    console.error('Exception Ebilling:', err);
    res.status(500).json({ error: err.message || 'Erreur serveur Ebilling' });
  }
});

// Route pour recevoir les notifications Ebilling
router.post('/ebilling/notification', async (req, res) => {
  console.log('Notification Ebilling reçue:', req.body);
  console.log('Callback ebilling reçu : traitement en cours...');
  // Vérification du state ebilling dans la notification
  const ebillingState = req.body.state;
  if (ebillingState === 'processed') {
    console.log('Statut ebilling : PROCESSED (paiement validé et reçu)');
    // Réponse positive uniquement si le paiement est validé et reçu
    res.status(200).json({ success: true });
  } else {
    console.log(`Statut ebilling : ${ebillingState} (paiement non validé ou en attente)`);
    // Réponse neutre ou d'attente
    res.status(200).json({ success: false });
  }
});

module.exports = router;
