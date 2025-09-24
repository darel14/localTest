import React, { useEffect } from 'react';

// Cette page doit être appelée après le retour du portail ebilling
// Elle vérifie le paiement et déclenche le téléchargement du pack acheté

const EbillingCallback = () => {
  useEffect(() => {
    // Exemple : récupérer l'ID du produit acheté depuis le localStorage ou l'URL
    const productId = localStorage.getItem('lastProductId');
    // Vérifier le paiement via une requête à l'API backend (optionnel)
    fetch('/api/payment/ebilling/last-status')
      .then(res => res.json())
      .then(data => {
        if (data.state === 'processed' && productId) {
          // Déclencher le téléchargement du ZIP
          const link = document.createElement('a');
          link.href = `/download/${productId}`;
          link.setAttribute('download', '');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
  }, []);

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h2>Merci pour votre paiement !</h2>
      <p>Votre document va se télécharger automatiquement.</p>
    </div>
  );
};

export default EbillingCallback;
