// --- Imports ---
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Product } = require('./composant_back/ProductManager');
const Section = require('./composant_back/Section');
const ebillingController = require('./composant_back/ebillingController');
const adminAuth = require('./composant_back/adminAuth');

// --- Initialisation de l'application ---
// THIS IS THE CORRECTED PART:
// The 'app' variable must be created before it's used.
const app = express();
app.use(cors());
app.use(express.json());

// --- Routes & Middleware ---
// --- Route de téléchargement ZIP d'un pack acheté ---
const AdmZip = require('adm-zip');

app.get('/download/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({ error: 'Produit introuvable' });
        const folderPath = path.join(__dirname, '../public', product.fileUrl);
        if (!fs.existsSync(folderPath)) return res.status(404).json({ error: 'Dossier non trouvé' });

        const zip = new AdmZip();
        zip.addLocalFolder(folderPath);
        const zipName = `${product.name.replace(/\s+/g, '_')}.zip`;
        const data = zip.toBuffer();
        res.set('Content-Type', 'application/zip');
        res.set('Content-Disposition', `attachment; filename="${zipName}"`);
        res.send(data);
    } catch (err) {
        console.error('Erreur téléchargement ZIP:', err);
        res.status(500).json({ error: 'Erreur serveur ZIP' });
    }
});
// Now that 'app' is defined, these lines will work.
app.use('/admin', adminAuth);
app.use('/api/payment', ebillingController); // Ebilling comme route par défaut

// --- Banner Images API ---
const bannerImagesPath = path.join(__dirname, 'bannerImages.json');

// GET banner images
app.get('/banner-images', (req, res) => {
    try {
        const data = fs.readFileSync(bannerImagesPath, 'utf8');
        const images = JSON.parse(data);
        res.json(images);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lecture bannerImages.json' });
    }
});

// POST banner images (remplace la liste)
app.post('/banner-images', (req, res) => {
    const images = req.body;
    if (!Array.isArray(images)) {
        return res.status(400).json({ error: 'Format attendu: tableau' });
    }
    try {
        fs.writeFileSync(bannerImagesPath, JSON.stringify(images, null, 2), 'utf8');
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Erreur écriture bannerImages.json' });
    }
});


// dossier d'upload images
const uploadDir = path.join(__dirname, '../assets/img');
app.use('/assets/img', express.static(uploadDir));

// dossier documents téléchargeables
const documentsDir = path.join(__dirname, '../assets/documents');
app.use('/assets/documents', express.static(documentsDir));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Connexion à la base de données
mongoose.connect(process.env.MONGODB_URI);

// Endpoint d'upload d'image
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: `/assets/img/${req.file.filename}` });
});

// CRUD API Products
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/products', async (req, res) => {
    console.log('POST /products req.body:', req.body);
    const data = { ...req.body, section: req.body.section || '' };
    if (!data.section) {
        console.warn('ATTENTION: section manquante ou vide dans le body reçu:', data);
        return res.status(400).json({ error: 'Section manquante ou vide.' });
    }
    const sectionExists = await Section.findOne({ name: data.section });
    if (!sectionExists) {
        console.warn('Section inexistante en BDD:', data.section);
        return res.status(400).json({ error: `La section '${data.section}' n'existe pas.` });
    }
    const product = new Product(data);
    await product.save();
    res.json(product);
});

app.put('/products/:id', async (req, res) => {
    const { _id, __v, ...data } = req.body;
    const updated = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
});

app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// API Sections
const sectionRouter = express.Router();

// Get all sections
sectionRouter.get('/', async (req, res) => {
    const sections = await Section.find();
    res.json(sections);
});

// Create section
sectionRouter.post('/', async (req, res) => {
    let { name, key } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });
    if (!key && name) {
        key = name
            .toLowerCase()
            .replace(/é|è|ê|ë/g, 'e')
            .replace(/à|â|ä/g, 'a')
            .replace(/î|ï/g, 'i')
            .replace(/ô|ö/g, 'o')
            .replace(/û|ü/g, 'u')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/--+/g, '-');
    }
    const section = new Section({ name, key, class: 'sections' });
    await section.save();
    res.json(section);
});

// Update section
sectionRouter.put('/:id', async (req, res) => {
    let { name, key } = req.body;
    if (!key && name) {
        key = name
            .toLowerCase()
            .replace(/é|è|ê|ë/g, 'e')
            .replace(/à|â|ä/g, 'a')
            .replace(/î|ï/g, 'i')
            .replace(/ô|ö/g, 'o')
            .replace(/û|ü/g, 'u')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/--+/g, '-');
    }
    const section = await Section.findByIdAndUpdate(req.params.id, { name, key, class: 'sections' }, { new: true });
    res.json(section);
});

// Delete section
sectionRouter.delete('/:id', async (req, res) => {
    await Section.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.use('/sections', sectionRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});