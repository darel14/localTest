// testEbilling.js
// Script pour tester le service Ebilling

const { createBill } = require('./EbillingService');

// Données de test pour le paiement
const testData = {
  amount: 1000,
  currency: 'USD',
  description: 'Test Payment',
  customer: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  metadata: {
    orderId: '12345',
  },
};

(async () => {
  try {
    console.log('Envoi des données de test à Ebilling...');
    const response = await createBill(testData);
    console.log('Réponse de l\'API Ebilling:', response);
  } catch (error) {
    console.error('Erreur lors du test Ebilling:', error);
  }
})();