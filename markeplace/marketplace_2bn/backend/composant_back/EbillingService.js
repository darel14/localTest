// EbillingService.js
// Service pour gérer les appels à l'API Ebilling

const axios = require('axios');
require('dotenv').config();

const EBILLING_BASE_URL = 'https://stg.billing-easy.com/api/v1/merchant/e_bills';
const EBILLING_USERNAME = process.env.EBILLING_USERNAME || '2Bni';
const EBILLING_SHAREDKEY = process.env.EBILLING_SHAREDKEY || '20c57a6f-9571-459a-8e4e-9865324c62b9';

function getAuthHeader() {
  const token = Buffer.from(`${EBILLING_USERNAME}:${EBILLING_SHAREDKEY}`).toString('base64');
  return `Basic ${token}`;
}

async function createBill(data) {
  console.log('Appel Ebilling API externe...');
  try {
    const response = await axios.post(
      EBILLING_BASE_URL,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': getAuthHeader(),
        },
      }
    );
    console.log('Réponse Ebilling:', response ? response.data : response);

    // Appel automatique pour récupérer le statut après la création de la facture
    if (response && response.data && response.data.paymentId) {
      console.log('ID de paiement généré:', response.data.paymentId);
      const status = await checkPaymentStatus(response.data.paymentId);
      console.log('Statut automatique récupéré:', status);
    }

    return response ? response.data : response;
  } catch (error) {
    console.error('Catch Ebilling:', error);
    if (error && error.response) {
      console.error('Erreur Ebilling API:', error.response ? error.response.data : error.response);
      return error.response ? error.response.data : error.response;
    } else {
      console.error('Erreur Ebilling:', error ? error.message : error);
      return { error: error ? error.message : error };
    }
  }
}

async function checkPaymentStatus(paymentId) {
    console.log('Vérification du statut du paiement...');
    try {
        const response = await axios.get(
            `${EBILLING_BASE_URL}/${paymentId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getAuthHeader(),
                },
            }
        );
        console.log('Statut du paiement:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la vérification du statut:', error);
        if (error && error.response) {
            console.error('Erreur API:', error.response.data);
            return error.response.data;
        } else {
            return { error: error.message };
        }
    }
}

module.exports = {
    createBill,
    checkPaymentStatus,
};
