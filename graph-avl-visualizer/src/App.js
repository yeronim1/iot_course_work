import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import GraphEditor from './components/Graph/GraphEditor';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/graph" element={<GraphEditor />} />
        </Routes>
      </Router>
  );
};

export default App;
