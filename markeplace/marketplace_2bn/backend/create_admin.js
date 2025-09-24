require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./composant_back/User');

mongoose.connect(process.env.MONGODB_URI);

async function createAdmin() {
  const username = 'ebaneth';
  const password = '2bnDev2025';
  const role = 'admin';

  const exists = await User.findOne({ username });
  if (exists) {
    console.log('Admin déjà existant.');
    mongoose.disconnect();
    process.exit(0);
  }

  const admin = new User({ username, password, role });
  await admin.save();
  console.log('Admin créé avec succès.');
  mongoose.disconnect();
  process.exit(0);
}

createAdmin();
