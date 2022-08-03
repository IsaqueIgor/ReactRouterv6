import React from 'react';
import './App.css';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navigation } from './components/navigation';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { BookRoutes } from './BookRoutes';
import { Books } from './pages/Books';
import { Book } from './pages/Book';
import { Contact } from './pages/Contact';

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/contact',
      element: <Contact />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/books',
      children: [
        { index: true, element: <Books /> },
        { path: ':id', element: <Book /> },
      ],
    },
  ]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/*' element={<BookRoutes />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
