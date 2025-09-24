import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import excelPng from '../../assets/icons/exceller (1).png';
import wordPng from '../../assets/icons/word.png';
import pptPng from '../../assets/icons/power-point (1).png';
import pdfPng from '../../assets/icons/pdf.png';
import excelSvg from '../../assets/icons/excel.svg';
import wordSvg from '../../assets/icons/word.svg';
import pptSvg from '../../assets/icons/powerpoint.svg';
import pdfSvg from '../../assets/icons/pdf.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const iconFiles = [
  { name: 'Excel', file: excelPng },
  { name: 'Word', file: wordPng },
  { name: 'PowerPoint', file: pptPng },
  { name: 'PDF', file: pdfPng },
  { name: 'Excel (svg)', file: excelSvg },
  { name: 'Word (svg)', file: wordSvg },
  { name: 'PowerPoint (svg)', file: pptSvg },
  { name: 'PDF (svg)', file: pdfSvg },
];


const API = 'https://2bnmarketplace-c126.up.railway.app/products';

const emptyProduct = { name: '', type: '', price: '', description: '', icon: '', image: '', section: '', color: '#f5f5f5' };

const ProductDashboard = ({ sections = [] }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
    // Removed redundant state declarations for sections and setSections
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch(API);
    setProducts(await res.json());
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let imageUrl = form.image;
    if (imageFile) {
      const data = new FormData();
      data.append('image', imageFile);
  const res = await fetch('https://2bnmarketplace-c126.up.railway.app/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      imageUrl = window.location.origin + result.url;
    }
    const payload = { ...form, image: imageUrl };
    console.log('Payload envoyé au backend:', payload);
    if (editingId) {
      await fetch(`${API}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    setForm(emptyProduct);
    setEditingId(null);
    setImageFile(null);
    fetchProducts();
  };

  const handleEdit = prod => {
    // S'assurer que la section correspond à une valeur du menu déroulant si possible
    let sectionValue = prod.section;
    if (sectionValue && !sections.some(s => s.name === sectionValue)) {
      // Si la section n'existe pas dans la liste, l'ajouter temporairement pour l'édition
      sections = [...sections, { name: sectionValue, key: sectionValue.toLowerCase().replace(/[^a-z0-9]+/g, '-') }];
    }
    // On retire color du formulaire si présent
    const { color, ...prodSansColor } = prod;
    setForm({ ...prodSansColor, section: sectionValue || '' });
    setEditingId(prod._id);
    setImageFile(null);
  };

  const handleDelete = async id => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Gestion des produits</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <TextField
            name="color"
            label="Couleur de fond"
            type="color"
            value={form.color || '#f5f5f5'}
            onChange={handleChange}
            sx={{ width: 60, minWidth: 60, p: 0, background: 'none' }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="color"
            label="Code couleur (ex: #FF0000)"
            type="text"
            value={form.color || ''}
            onChange={handleChange}
            sx={{ width: 120 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField name="name" label="Nom" value={form.name} onChange={handleChange} required />
          <TextField name="type" label="Type" value={form.type} onChange={handleChange} required />
          <TextField name="price" label="Montant" value={form.price} onChange={handleChange} required />
          <TextField name="description" label="Description" value={form.description} onChange={handleChange} required />
          <TextField
            select
            name="section"
            label="Section"
            value={form.section}
            onChange={handleChange}
            required
            sx={{ minWidth: 120 }}
          >
            {sections.map((section, idx) => (
              <MenuItem key={section._id || idx} value={section.name}>{section.name}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <TextField name="image" label="Image (URL)" value={form.image} onChange={handleChange} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            select
            name="icon"
            label="Icone"
            value={form.icon}
            onChange={handleChange}
            required
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">Aucune</MenuItem>
            <MenuItem value="📄">📄 Document</MenuItem>
            <MenuItem value="📊">📊 Tableau</MenuItem>
            <MenuItem value="🎬">🎬 Vidéo</MenuItem>
            <MenuItem value="📈">📈 Présentation</MenuItem>
            <MenuItem value="🛒">🛒 Produit</MenuItem>
            <MenuItem value="💡">💡 Idée</MenuItem>
            <MenuItem value="📝">📝 Note</MenuItem>
            <MenuItem value="🔧">🔧 Outil</MenuItem>
            <MenuItem value="📚">📚 Livre</MenuItem>
            <MenuItem value="🖼️">🖼️ Image</MenuItem>
            {/* Icônes Office dynamiques */}
            {iconFiles.map(icon => (
              <MenuItem key={icon.name} value={icon.file}>
                <ListItemIcon><img src={icon.file} alt={icon.name} style={{ width: 24, height: 24 }} /></ListItemIcon>
                <ListItemText>{icon.name}</ListItemText>
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Button type="submit" variant="contained" color="primary">{editingId ? 'Modifier' : 'Créer'}</Button>
        {editingId && <Button sx={{ ml: 2 }} onClick={() => { setForm(emptyProduct); setEditingId(null); setImageFile(null); }}>Annuler</Button>}
      </form>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Montant</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(prod => (
              <TableRow key={prod._id}>
                <TableCell>{prod.name}</TableCell>
                <TableCell>{prod.type}</TableCell>
                <TableCell>{prod.price}</TableCell>
                <TableCell>{prod.description}</TableCell>
                <TableCell>{prod.section}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(prod)}>Modifier</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(prod._id)}>Supprimer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductDashboard;
