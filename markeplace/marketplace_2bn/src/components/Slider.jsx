import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SlideImg from '../assets/icons/formation_nw.jpg'; // Corrected image path
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Ensure the default image is displayed when the slider is empty
const Slider = ({ images = [] }) => {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  // Force the default image if the images array is empty
  const sliderImages = images.length > 0 ? images : [SlideImg];

  return (
  <Box sx={{ position: 'relative', width: '100%', maxWidth: 900, mx: 'auto', bgcolor: '#e0f7fa', borderRadius: 2, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 350, height: 350 }}>
      <IconButton onClick={prev} sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', bgcolor: '#fff', boxShadow: 1 }}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={sliderImages[index]} alt={`slide-${index}`} style={{ width: '100%', height: '100%', borderRadius: 12, objectFit: 'cover' }} />
      </Box>
      <IconButton onClick={next} sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', bgcolor: '#fff', boxShadow: 1 }}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Slider;
