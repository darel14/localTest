# Guide pour récupérer le statut d'une transaction via l'API eBilling

## Étape 1 : Ajouter une méthode pour interroger l'API eBilling

Dans votre fichier `EbillingService.js`, ajoutez une méthode pour récupérer le statut d'une transaction. Voici un exemple :

```javascript
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
```

## Étape 2 : Appeler la méthode dans votre application

Utilisez la méthode `checkPaymentStatus` dans votre application pour interroger l'API eBilling avec l'identifiant de la transaction.

Exemple :

```javascript
const { checkPaymentStatus } = require('./EbillingService');

async function getStatus(paymentId) {
    const status = await checkPaymentStatus(paymentId);
    console.log('Statut récupéré:', status);
}

getStatus('12345'); // Remplacez '12345' par l'identifiant réel de la transaction
```

## Étape 3 : Tester la méthode

1. Assurez-vous que les identifiants de l'API (nom d'utilisateur et clé partagée) sont correctement configurés dans votre fichier `.env`.
2. Appelez la méthode avec un identifiant de transaction valide.
3. Vérifiez les logs pour voir le statut retourné par l'API.

## Étape 4 : Gérer les erreurs

Ajoutez une gestion des erreurs pour informer l'utilisateur en cas de problème (par exemple, transaction introuvable ou erreur réseau).

Exemple :

```javascript
try {
    const status = await checkPaymentStatus(paymentId);
    if (status.error) {
        console.error('Erreur:', status.error);
    } else {
        console.log('Statut:', status);
    }
} catch (error) {
    console.error('Erreur inattendue:', error);
}
```

## Étape 5 : Intégrer dans votre système

- Si vous avez une base de données, enregistrez le statut récupéré pour un suivi ultérieur.
- Si vous avez une interface utilisateur, affichez le statut à l'utilisateur de manière conviviale.