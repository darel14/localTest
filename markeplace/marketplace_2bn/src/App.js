// ...modification neutre pour forcer un push sur GitHub

import React, { useState, useEffect } from 'react';
import { getHiddenSections } from './admin/components/SectionMenu';
import Navbar from './components/navbar';
import Sidebar from './components/Sidebar';
import Product from './components/Product';
import Footer from './components/Footer';
import Slider from './components/Slider';
import AdminApp from './admin/AdminApp';
import './App.css';
//une nouvelle dependance

function App() {
  const [cart, setCart] = useState([]);
  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };
  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };
  const adminMode = useState(window.location.pathname === '/admin')[0];
  const [bannerImages, setBannerImages] = useState([]);

  // Charger les images de bannière depuis le backend au démarrage
  useEffect(() => {
  fetch('https://2bnmarketplace-c126.up.railway.app/banner-images')
      .then(res => res.json())
      .then(data => setBannerImages(data));
  }, []);

  // Sauvegarder les images de bannière à chaque modification
  useEffect(() => {
  fetch('https://2bnmarketplace-c126.up.railway.app/banner-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bannerImages)
    });
  }, [bannerImages]);
  const [sections, setSections] = useState([]);

  // Synchronisation avec l'API backend
  useEffect(() => {
  fetch('https://2bnmarketplace-c126.up.railway.app/sections')
      .then(res => res.json())
      .then(data => setSections(data));
  }, []);

  const hiddenSections = getHiddenSections();
  const visibleSections = sections.filter(s => !hiddenSections.includes(s.name));
  if (adminMode) {
    // Passer sections et setSections au dashboard admin
    return <AdminApp bannerImages={bannerImages} setBannerImages={setBannerImages} sections={sections} setSections={setSections} />;
  }
  return (
    <div className="App">
      <header className="header">
        <Navbar cartCount={cart.length} cart={cart} onRemoveFromCart={handleRemoveFromCart} />
        <Slider images={bannerImages}/>
        <Sidebar/>
        <Product onAddToCart={handleAddToCart} sections={visibleSections} />
      </header>
      <Footer />
    </div>
  );
}

export default App;
