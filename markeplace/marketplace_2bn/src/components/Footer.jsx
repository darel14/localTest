import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const sections = [
  {
    title: 'À PROPOS DE 2BN MARKET',
    items: [
      'Plan du site',
      'Qui sommes-nous ?',
      'Nouveautés',
      'Nous rejoindre',
      'Nos engagements',
      "L'Avenir de l'entrepreneuriat",
      'Espace presse',
    ],
  },
  {
    title: 'INFORMATIONS LÉGALES',
    items: [
      "Conditions générales d'utilisation",
      'Référencement et classement',
      'Conditions générales de vente',
      'Vie privée / cookies',
      'Vos droits et obligations',
      'Avis utilisateurs',
    ],
  },
  {
    title: 'NOS SOLUTIONS PROS',
    items: [
      'Publicité',
      'Formations pour entrepreneurs',
      'Vos recrutements',
      'Solutions digitales',
      'Autres solutions professionnelles',
      'Annuaire des experts',
    ],
  },
  {
    title: 'DES QUESTIONS ?',
    items: [
      'Aide',
      'Le paiement sécurisé',
      'Le porte-monnaie',
      'Service client',
      'Votre espace vendeur',
      'Votre espace acheteur',
    ],
  },
];

const Footer = () => (
  <Box sx={{ bgcolor: '#3a4147', color: '#fff', pt: 6, pb: 2, px: 2, mt: 10 }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', maxWidth: 1400, mx: 'auto' }}>
      {sections.map((section) => (
        <Box key={section.title} sx={{ minWidth: 260, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, borderBottom: '2px solid #50555a', pb: 1 }}>
            {section.title}
          </Typography>
          {section.items.map((item) => (
            <Typography key={item} variant="body1" sx={{ mb: 1, fontSize: 14, textAlign: 'left' }}>
              {item}
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
    <Typography align="center" sx={{ color: '#cfd8dc', mt: 2, fontSize: 17 }}>
      2BN Market : Pour mieux comprendre et booster l'entrepreneuriat africain contemporain.
    </Typography>
  </Box>
);

export default Footer;
