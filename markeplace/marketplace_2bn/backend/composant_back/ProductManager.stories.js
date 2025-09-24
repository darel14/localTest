// Storybook backend (documentation usage)
const { Product, createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('./ProductManager');

async function story() {
  // Création d'un produit
  const prod = await createProduct({
    name: 'Business Plan Word',
    type: 'Document Word',
    price: '5 000 Fcfa',
    color: '#FFB74D',
    icon: '📄',
    description: "Un modèle prêt à l'emploi pour structurer votre business plan et convaincre vos partenaires.",
    section: 'Informatique'
  });
  console.log('Produit créé:', prod);

  // Récupération de tous les produits
  const all = await getProducts();
  console.log('Tous les produits:', all);

  // Mise à jour
  const updated = await updateProduct(prod._id, { price: '6 000 Fcfa' });
  console.log('Produit mis à jour:', updated);

  // Suppression
  await deleteProduct(prod._id);
  console.log('Produit supprimé');
}

// story(); // Décommente pour tester
