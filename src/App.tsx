import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { Navigation } from './components/navigation';
import { About } from './pages/About';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<Books />} />
        <Route path='/about' element={<About />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
