import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AdminSidebar from './components/AdminSidebar';
import AdminLogin from './components/AdminLogin';
import ProductDashboard from './components/ProductDashboard';
import HistoryDashboard from './components/HistoryDashboard';
import BannerMenu from './components/BannerMenu';
import SectionMenu from './components/SectionMenu';

const AdminApp = ({ bannerImages, setBannerImages, sections, setSections }) => {
  const [logged, setLogged] = useState(false);
  const [selected, setSelected] = useState('products');

  if (!logged) return <AdminLogin onLogin={() => setLogged(true)} />;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f7f7f7' }}>
      <AdminSidebar selected={selected} onSelect={setSelected} />
      <Box sx={{ flex: 1 }}>
  {selected === 'products' && <ProductDashboard sections={sections} setSections={setSections} />}
  {selected === 'sections' && <SectionMenu sections={sections} setSections={setSections} />}
        {selected === 'history' && <HistoryDashboard />}
        {selected === 'banner' && <BannerMenu images={bannerImages} setImages={setBannerImages} />}
      </Box>
    </Box>
  );
};

export default AdminApp;
