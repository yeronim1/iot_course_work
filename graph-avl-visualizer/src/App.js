import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import GraphEditor from './components/Graph/GraphEditor';
import AVLTreeEditor from "./components/AVLTree/AVLTreeEditor";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/graph" element={<GraphEditor />} />
          <Route path="/avl-tree" element={<AVLTreeEditor />} />
        </Routes>
      </Router>
  );
};

export default App;
