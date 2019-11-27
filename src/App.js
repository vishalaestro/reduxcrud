import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Shell from './containers/shell';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Shell/>
    </div>
    </BrowserRouter>
  );
}

export default App;
