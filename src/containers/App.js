import React from 'react';
import TopBar from '../components/TopBar';
import Introduction from '../components/Introduction';
import Services from '../components/Services';
import Sobre from '../components/Sobre';

import './App.scss';
function App() {
  return (
    <div className="App">
      <TopBar />
      <Introduction />
      <Services />
      <Sobre />
    </div>
  );
}

export default App;
