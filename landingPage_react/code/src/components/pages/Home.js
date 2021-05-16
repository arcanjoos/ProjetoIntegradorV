import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import Form from '../Form';

import HeroSection from '../HeroSection';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Form />
    </>
  );
}

export default Home;