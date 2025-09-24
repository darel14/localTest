import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple login (à remplacer par une vraie auth plus tard)
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <Box sx={{ maxWidth: 350, mx: 'auto', mt: 12, p: 4, bgcolor: '#fff', borderRadius: 3, boxShadow: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Connexion Admin</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nom d'utilisateur" fullWidth sx={{ mb: 2 }} value={username} onChange={e => setUsername(e.target.value)} />
        <TextField label="Mot de passe" type="password" fullWidth sx={{ mb: 2 }} value={password} onChange={e => setPassword(e.target.value)} />
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>Se connecter</Button>
      </form>
    </Box>
  );
};

export default AdminLogin;
