import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const SectionDashboard = () => {
  const [sections, setSections] = useState([]);
  const [section, setSection] = useState('');

  const handleAdd = () => {
    if (section.trim()) {
      setSections([...sections, section]);
      setSection('');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Gestion des sections</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Nom de la section" value={section} onChange={e => setSection(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleAdd}>Créer</Button>
      </Box>
      <List>
        {sections.map((sec, idx) => (
          <ListItem key={idx}>{sec}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SectionDashboard;
