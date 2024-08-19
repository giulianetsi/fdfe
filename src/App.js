// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componentes/Home';
import Converter from './componentes/Converter';
import Historico from './componentes/Historico';
import TaxasAtuais from './componentes/TaxasAtuais';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/taxas" element={<TaxasAtuais />} />
      </Routes>
    </Router>
  );
};

export default App;
