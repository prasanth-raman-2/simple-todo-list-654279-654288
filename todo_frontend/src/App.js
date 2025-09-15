import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Recipe from './components/recipe/Recipe';
import Search from './components/search/Search';

// PUBLIC_INTERFACE
function App() {
  /**
   * App entry that wires routes:
   * - "/" renders the existing Recipe screen
   * - "/search" renders the converted Search screen
   */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Recipe />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
