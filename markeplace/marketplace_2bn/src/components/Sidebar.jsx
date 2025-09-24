import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const categories = [
  { text: 'Formation Business plan' },
  { text: 'Formation Plan financier' },
  { text: 'Formation 03' },
  { text: 'Formation 04' },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Drawer anchor="left" open={open} variant="persistent" PaperProps={{ sx: { width: 260, bgcolor: '#fff', color: '#222', top: '64px', height: 'calc(100vh - 64px)', position: 'fixed' } }}>
        <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 16, right: 8, zIndex: 1500, bgcolor: '#fff', boxShadow: 2 }}>
            <ChevronLeftIcon />
          </IconButton>
          <Box sx={{ display: 'none', alignItems: 'center', mb: 2 }}>
            <span style={{ fontWeight: 'bold', fontSize: 24, letterSpacing: 1 }}>MARKETPLACE</span>
          </Box>
          <Divider sx={{ display:'none', bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
          <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '56% 0 0 0' }}>
            {categories.map((cat, idx) => (
              <ListItem
                button
                key={cat.text}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  px: 2,
                  '&:hover': { bgcolor: '#f5f5f5' },
                  minHeight: 48,
                }}
                onClick={() => alert(`Vous avez cliqué sur ${cat.text}`)}
              >
                <ListItemText primary={cat.text} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ bgcolor: '#eee', mt: 2, mb: 2 }} />
          <Button variant="contained" sx={{ bgcolor: '#6c4cff', color: 'white', width: '100%', borderRadius: 2, textTransform: 'none', fontWeight: 'bold', boxShadow: 'none' }}>
            Accéder à toutes les formations
          </Button>
        </Box>
      </Drawer>
      {!open && (
        <IconButton onClick={handleOpen} sx={{ position: 'fixed', top: 24, left: 24, zIndex: 1400, bgcolor: '#fff', boxShadow: 2 }}>
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
}

export default Sidebar;