import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';

const SectionMenu = ({ sections, setSections }) => {
  const [hiddenSections, setHiddenSections] = useState(() => {
    const saved = localStorage.getItem('hiddenSections');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleSection = (sectionName) => {
    let updated;
    if (hiddenSections.includes(sectionName)) {
      updated = hiddenSections.filter(s => s !== sectionName);
    } else {
      updated = [...hiddenSections, sectionName];
    }
    setHiddenSections(updated);
    localStorage.setItem('hiddenSections', JSON.stringify(updated));
  };
  
  const [newSection, setNewSection] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState('');

  const fetchSections = useCallback(() => {
  fetch('https://2bnmarketplace-c126.up.railway.app/sections')
      .then(res => res.json())
      .then(data => setSections(data));
  }, [setSections]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleAddSection = async () => {
    if (newSection.trim()) {
  const res = await fetch('https://2bnmarketplace-c126.up.railway.app/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSection.trim() })
      });
      if (res.ok) {
        setNewSection('');
        fetchSections();
      }
    }
  };

  const handleDeleteSection = async (idx) => {
    const id = sections[idx]._id;
  const res = await fetch(`https://2bnmarketplace-c126.up.railway.app/sections/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchSections();
    }
  };

  const handleEditSection = (idx) => {
    setEditIdx(idx);
    setEditValue(sections[idx].name);
  };

  const handleSaveEdit = async () => {
    const id = sections[editIdx]._id;
  const res = await fetch(`https://2bnmarketplace-c126.up.railway.app/sections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editValue })
    });
    if (res.ok) {
      setEditIdx(null);
      setEditValue('');
      fetchSections();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Gestion des sections</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Nom de la section"
          value={newSection}
          onChange={e => setNewSection(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddSection}>Ajouter</Button>
      </Box>
      <List>
        {sections.map((section, idx) => (
          <ListItem key={section._id || idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {editIdx === idx ? (
              <>
                <TextField value={editValue} onChange={e => setEditValue(e.target.value)} size="small" />
                <Button variant="contained" color="success" onClick={handleSaveEdit}>Valider</Button>
              </>
            ) : (
              <>
                <Typography sx={{ flex: 1 }}>{section.name}</Typography>
                <Switch
                  checked={!hiddenSections.includes(section.name)}
                  onChange={() => toggleSection(section.name)}
                  color="primary"
                  inputProps={{ 'aria-label': 'Afficher/cacher la section' }}
                />
                <IconButton onClick={() => handleEditSection(idx)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleDeleteSection(idx)}><DeleteIcon /></IconButton>
              </>
            )}
          </ListItem>
        ))}
        <ListItem key="autres-section" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ flex: 1 }}>Autres</Typography>
          <Switch
            checked={!hiddenSections.includes('Autres')}
            onChange={() => toggleSection('Autres')}
            color="primary"
            inputProps={{ 'aria-label': 'Afficher/cacher la section Autres' }}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export function getHiddenSections() {
  const saved = localStorage.getItem('hiddenSections');
  return saved ? JSON.parse(saved) : [];
}

export default SectionMenu;