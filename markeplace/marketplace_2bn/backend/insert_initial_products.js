const mongoose = require('mongoose');
const Section = require('./composant_back/Section');
const { Product } = require('./composant_back/ProductManager');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  await mongoose.connect(MONGODB_URI);

  // Supprimer tous les produits existants
  await Product.deleteMany({});

  // Section documents disponible
  let section = await Section.findOne({ key: 'nos-documents-disponible' });
  if (!section) {
    section = await Section.create({
      name: 'Nos documents disponible',
      key: 'nos-documents-disponible',
      class: 'sections',
    });
  }

  // Création des 4 nouveaux produits
  const products = [
    {
      name: 'Pack Livres',
      type: 'Pack',
      price: '15000',
      description: 'Tous les livres du pack Livres.',
      section: section.key,
      fileUrl: '/ressources/Livres/',
      image: '',
      color: '#8d5524',
      icon: '/file-icon.svg',
    },
    {
      name: 'Pack Excel',
      type: 'Pack',
      price: '25000',
      description: 'Tous les fichiers du pack Excel.',
      section: section.key,
      fileUrl: '/ressources/Excel/',
      image: '',
      color: '#217346',
      icon: '/file-icon.svg',
    },
    {
      name: 'Pack MS Project projets terminés',
      type: 'Pack',
      price: '50000',
      description: 'Tous les projets MS Project terminés.',
      section: section.key,
      fileUrl: '/ressources/Ms Project/',
      image: '',
      color: '#2b579a',
      icon: '/file-icon.svg',
    },
    {
      name: 'Pack kit management projets',
      type: 'Pack',
      price: '50000',
      description: 'Tous les fichiers du kit management projets.',
      section: section.key,
      fileUrl: '/ressources/Kit Management Projet/',
      image: '',
      color: '#e69138',
      icon: '/file-icon.svg',
    },
  ];

  for (const prod of products) {
    await Product.create(prod);
    console.log(`Produit ajouté : ${prod.name}`);
  }

  await mongoose.disconnect();
  console.log('Insertion terminée.');
}

seed();
