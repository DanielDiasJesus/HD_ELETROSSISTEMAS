import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import TopBar from '../TopBar';
import Routes from '../../routes';

import './App.scss';

export default function App() {
  return ( 
  <div className = "App" >
      <BrowserRouter >
        <TopBar / >
        <Routes / >
      </BrowserRouter> 
  </div>
  );
}