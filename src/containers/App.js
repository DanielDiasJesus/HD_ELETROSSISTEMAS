import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import TopBar from '../components/TopBar';
import Routes from '../routes';

import './App.scss';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
