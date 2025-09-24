import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const BannerMenu = ({ images, setImages }) => {
  const [newImage, setNewImage] = useState('');

  const handleAddImage = () => {
    if (newImage) {
      setImages([...images, newImage]);
      setNewImage('');
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages([...images, ev.target.result]);
      };
      reader.readAsDataURL(file);
      e.target.value = ''; // La ligne qui suit est correcte et nécessaire.
    }
  };

  const handleRemoveImage = (idx) => {
    // Retirer l'image mais laisser un emplacement vide (null)
    setImages(images.map((img, i) => (i === idx ? null : img)));
  };

  const handleDeleteImage = (idx) => {
    // Supprimer complètement l'image (réduire le nombre de slides)
    setImages(images.filter((_, i) => i !== idx));
  };

  const handleEditImage = (idx, value) => {
    setImages(images.map((img, i) => (i === idx ? value : img)));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Gestion des images du slider (Banner)</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="URL de l'image"
          value={newImage}
          onChange={e => setNewImage(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddImage}>Ajouter</Button>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="banner-upload"
          onChange={handleUpload}
        />
        <label htmlFor="banner-upload">
          <Button variant="contained" component="span" color="secondary">Uploader</Button>
        </label>
      </Box>
      <Box>
        {images.map((img, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 2, bgcolor: '#f5f5f5', borderRadius: 2, p: 1 }}>
            {img ? (
              <img src={img} alt={`banner-${idx}`} style={{ width: 120, height: 60, objectFit: 'cover', borderRadius: 8, marginRight: 12 }} />
            ) : (
              <Box sx={{ width: 120, height: 60, bgcolor: '#eee', borderRadius: 8, marginRight: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontStyle: 'italic' }}>
                Slide vide
              </Box>
            )}
            <TextField
              label="URL de l'image"
              value={img || ''}
              onChange={e => handleEditImage(idx, e.target.value)}
              size="small"
              sx={{ width: 220 }}
            />
            <Button variant="outlined" color="warning" onClick={() => handleRemoveImage(idx)}>
              Retirer
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleDeleteImage(idx)}>
              Supprimer
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BannerMenu;