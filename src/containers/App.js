import React from 'react';
import TopBar from '../components/TopBar';
import Introduction from '../components/Introduction';
import Services from '../components/Services';

import './App.scss';
function App() {
  return (
    <div className="App">
      <TopBar />
      <Introduction />
      <Services />
    </div>
  );
}

export default App;
