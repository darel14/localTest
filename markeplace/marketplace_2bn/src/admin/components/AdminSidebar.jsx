import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const menus = [
  { key: 'products', label: 'Gest. de produits' },
  { key: 'sections', label: 'Section' },
  { key: 'history', label: 'Historique des transactions' },
  { key: 'banner', label: 'Banner' },
];

const AdminSidebar = ({ selected, onSelect }) => (
  <Box sx={{ width: 240, bgcolor: '#fff', height: '100vh', borderRight: '1px solid #eee', pt: 8 }}>
    <List>
      {menus.map(menu => (
        <ListItem key={menu.key} disablePadding>
          <ListItemButton selected={selected === menu.key} onClick={() => onSelect(menu.key)}>
            <ListItemText primary={menu.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default AdminSidebar;
