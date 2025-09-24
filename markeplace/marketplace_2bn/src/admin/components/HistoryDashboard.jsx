import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const HistoryDashboard = () => {
  // À remplacer par une vraie récupération depuis le backend
  const [history] = useState([
    { id: 1, date: '2025-09-01', user: 'client1', montant: '5 000 Fcfa', produit: 'Business Plan Word' },
    { id: 2, date: '2025-09-02', user: 'client2', montant: '7 000 Fcfa', produit: 'Tableau Financier Excel' },
  ]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Historique des transactions</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Produit</TableCell>
              <TableCell>Montant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map(tx => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.user}</TableCell>
                <TableCell>{tx.produit}</TableCell>
                <TableCell>{tx.montant}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistoryDashboard;
