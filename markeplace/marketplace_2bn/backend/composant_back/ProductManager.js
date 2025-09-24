const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: String, required: true },
  color: String,
  icon: {type: String, required: false },
  description: { type: String, required: true },
  image: String, // URL de l'image du produit
  section: {type: String, required: true },
  fileUrl: { type: String, required: false } // URL du fichier à télécharger
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product,
  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  },
  async getProducts() {
    return await Product.find();
  },
  async getProductById(id) {
    return await Product.findById(id);
  },
  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  },
  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
};
