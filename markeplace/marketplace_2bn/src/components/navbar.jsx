import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';


const Navbar = ({ cartCount = 0, cart = [], onRemoveFromCart }) => {
  const [paymentMethod, setPaymentMethod] = useState("ebilling"); // Default to Ebilling
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElFormations, setAnchorElFormations] = useState(null);
  const [anchorElDocuments, setAnchorElDocuments] = useState(null);



  const handlePayWithEbilling = async () => {
    if (cart.length === 0 || !phone) {
      alert('Veuillez entrer votre numéro de téléphone pour le paiement Ebilling.');
      return;
    }
    setLoading(true);
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const qty = item.qty || 1;
      return sum + price * qty;
    }, 0);
    // Description du panier (liste des produits)
    const description = cart.map(item => `${item.name} x${item.qty || 1}`).join(', ');
    const payload = {
      payer_msisdn: phone,
      amount: total,
      short_description: description,
    };
    try {
      const res = await fetch('https://2bnmarketplace-c126.up.railway.app/api/payment/ebilling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.e_bill && data.e_bill.bill_id) {
        const billId = data.e_bill.bill_id;
        const callbackUrl = encodeURIComponent(window.location.origin + '/ebilling-callback');
        setLoading(false);
        console.log('Paiement Ebilling réussi :', data);
        window.open(`https://staging.billing-easy.net/?invoice=${billId}&redirect_url=${callbackUrl}`, '_blank');
        return;
      } else {
        console.error('Erreur Ebilling :', data.error || data.message || 'Inconnue');
        alert('Erreur Ebilling : ' + (data.error || data.message || 'Inconnue'));
      }
    } catch (err) {
      console.error('Erreur réseau Ebilling :', err);
      alert('Erreur réseau Ebilling : ' + err.message);
    }
    setLoading(false);
  };
  const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
  const handleMenuClose = (setter) => () => setter(null);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <>
  <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar sx={{gap:5}}>
          <Typography variant="h6" component="div" sx={{ textAlign: 'left', mr: 2 }}>
            2BN Marketplace
          </Typography>
        <Box>
            <Button color="inherit" sx={{ mr: 1 }} onClick={handleMenuOpen(setAnchorElFormations)}>
                Formations
            </Button>
            <Menu
                anchorEl={anchorElFormations}
                open={Boolean(anchorElFormations)}
                onClose={handleMenuClose(setAnchorElFormations)}
            >
                <MenuItem onClick={handleMenuClose(setAnchorElFormations)}>Formation 1</MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorElFormations)}>Formation 2</MenuItem>
            </Menu>
            <Button color="inherit" sx={{ mr: 1 }} onClick={handleMenuOpen(setAnchorElDocuments)}>
                Documents
            </Button>
            <Menu
                anchorEl={anchorElDocuments}
                open={Boolean(anchorElDocuments)}
                onClose={handleMenuClose(setAnchorElDocuments)}
            >
                <MenuItem onClick={handleMenuClose(setAnchorElDocuments)}>Document 1</MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorElDocuments)}>Document 2</MenuItem>
            </Menu>
        </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" sx={{ ml: 2 }} onClick={handleDrawerOpen}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button color="inherit" sx={{ ml: 2 }}>Se connecter</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 300, pt: 2, px: 2, boxSizing: 'border-box', height: '64px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <Typography variant="h6">Panier</Typography>
        </Box>
        <Box sx={{ width: 300, p: 2, boxSizing: 'border-box', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }} role="presentation">
          {cart.length === 0 ? (
            <Typography>Votre panier est vide.</Typography>
          ) : (
            <>
              {cart.map((item, idx) => (
                <Box key={idx} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.type}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Prix : <b>{parseInt(item.price).toLocaleString()} Fcfa</b> {item.qty ? <span style={{marginLeft:8}}>(x{item.qty})</span> : null}
                    </Typography>
                  </Box>
                  <IconButton size="medium" color="error" sx={{ ml: 1 }} onClick={() => onRemoveFromCart(idx)}>
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                </Box>
              ))}
              <Box sx={{ mt: 2, p: 1.5, bgcolor: '#e0f7fa', borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Total : {
                    cart.reduce((sum, item) => {
                      const price = parseFloat(item.price) || 0;
                      const qty = item.qty || 1;
                      return sum + price * qty;
                    }, 0).toLocaleString()
                  } Fcfa
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>Choisissez le mode de paiement :</Typography>
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                  <option value="ebilling">Payer avec Ebilling</option>
                </select>
                {paymentMethod === 'ebilling' && (
                  <>
                    <input
                      type="tel"
                      placeholder="Numéro de téléphone pour Ebilling"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handlePayWithEbilling} disabled={loading}>
                      {loading ? 'Paiement en cours...' : 'Payer avec Ebilling'}
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;

// Comment added to ensure Git detects a change
