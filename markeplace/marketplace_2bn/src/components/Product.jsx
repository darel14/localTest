import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import React, { useEffect, useState } from 'react';
import { getHiddenSections } from '../admin/components/SectionMenu';


const Product = ({ onAddToCart, sections = [] }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  fetch('https://2bnmarketplace-c126.up.railway.app/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  // Regrouper les produits par section connue et "Autres" (comparaison directe sur section.name)
  const sectionSet = new Set(sections.map(s => s.name));
  const productsBySection = sections.map(section => ({
    section: section.name,
    products: products.filter(p => p.section === section.name)
  }));
  // Produits dont la section n'existe pas dans la liste
  const otherProducts = products.filter(p => !p.section || !sectionSet.has(p.section));

  const hiddenSections = getHiddenSections();
  return (
    <Box sx={{ width: '100%', mt: 4, px: 4, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {productsBySection.map(({ section, products }) => (
        <Box key={section} sx={{ width: '100%', mb: 5, display: hiddenSections.includes(section) || products.length === 0 ? 'none' : undefined }}>
          <Box className={`header_product section`}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {section}
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="flex-start" alignItems="stretch" sx={{ width: 'auto', maxWidth: '1200px', margin: '0 auto' }}>
            {products.map((product, idx) => (
              <Grid item key={product._id || product.name} xs={3} className="product_card" sx={{ display: 'flex', justifyContent: 'left!important' }}>
                <Card sx={{ width: 300, minHeight: 370, borderRadius: 4, boxShadow: 2, p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '100%', height: 200, bgcolor: product.color, borderRadius: 3, mb: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                    ) : product.icon && (product.icon.endsWith('.png') || product.icon.endsWith('.svg')) ? (
                      <img src={product.icon} alt="icon" style={{ width: 56, height: 56, objectFit: 'contain' }} />
                    ) : (
                      <img src={process.env.PUBLIC_URL + '/file-icon.svg'} alt="icon" style={{ width: 56, height: 56, objectFit: 'contain' }} />
                    )}
                  </Box>
                  <Box sx={{ px: 2, textAlign: 'left', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {product.name}
                    </Typography>
                    <Chip label={product.type} sx={{ fontWeight: 500, fontSize: 12, mt: 0.5 }} />
                    <Typography variant="body2" sx={{ mt: 1, mb: 0.5, color: 'text.secondary', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.description}
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2, mb: 2, textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 15 }}>
                      Prix : <b>{product.price} FCFA</b>
                    </Typography>
                  </Box>
                  <CardActions sx={{ p: 0, px: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button variant="contained" color="primary" size="small" fullWidth sx={{ mb: 1 }} onClick={() => onAddToCart(product)}>
                      Ajouter au panier
                    </Button>
                    <Button variant="outlined" color="primary" size="small" fullWidth>
                      Détail du produit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      {otherProducts.length > 0 && !hiddenSections.includes('Autres') && (
        <Box key="autres" sx={{ width: '100%', mb: 5 }}>
          <Box className={`header_product section`}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Autres
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="flex-start" alignItems="stretch" sx={{ width: 'auto', maxWidth: '1200px', margin: '0 auto' }}>
            {otherProducts.map((product, idx) => (
              <Grid item key={product._id || product.name} xs={12} sm={6} md={3} lg={3} className="product_card" sx={{ display: 'flex', justifyContent: 'left!important' }}>
                <Card sx={{ width: 300, minHeight: 370, borderRadius: 4, boxShadow: 2, p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '100%', height: 200, bgcolor: product.color, borderRadius: 3, mb: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                    ) : (
                      <Typography variant="h1" sx={{ fontSize: 56 }}>{product.icon}</Typography>
                    )}
                  </Box>
                  <Box sx={{ px: 2, textAlign: 'left', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {product.name}
                    </Typography>
                    <Chip label={product.type} sx={{ fontWeight: 500, fontSize: 12, mt: 0.5 }} />
                    <Typography variant="body2" sx={{ mt: 1, mb: 0.5, color: 'text.secondary', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.description}
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2, mb: 2, textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 15 }}>
                      Prix : <b>{product.price} FCFA</b>
                    </Typography>
                  </Box>
                  <CardActions sx={{ p: 0, px: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button variant="contained" color="primary" size="small" fullWidth sx={{ mb: 1 }} onClick={() => onAddToCart(product)}>
                      Ajouter au panier
                    </Button>
                    <Button variant="outlined" color="primary" size="small" fullWidth>
                      Détail du produit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Product;
