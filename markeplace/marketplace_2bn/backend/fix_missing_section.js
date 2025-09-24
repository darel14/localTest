const mongoose = require('mongoose');
const { Product } = require('./composant_back/ProductManager');

mongoose.connect('mongodb://localhost:27017/market_place');

(async () => {
  const res = await Product.updateMany(
    { section: { $exists: false } },
    { $set: { section: '' } }
  );
  console.log('Produits corrigés:', res.modifiedCount);
  mongoose.disconnect();
})();
