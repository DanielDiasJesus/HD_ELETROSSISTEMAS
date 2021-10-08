import React, { useState } from 'react';
import {BrowserRouter} from 'react-router-dom';

import TopBar from '../TopBar';
import Routes from '../../routes';
import Maintenance from '../Maintenance';
import ScrollHandler from '../../utils/ScrollHandler';

import './App.scss';

export default function App() {
  const [manutencao] = useState(false);
  return ( 
  <div className = "App" >
      <BrowserRouter >
      {
        manutencao ? 
          <Maintenance />
          : <>
              <ScrollHandler />
              <TopBar />
              <Routes />
            </>
      }
      </BrowserRouter> 
  </div>
  );
}
