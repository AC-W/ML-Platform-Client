import './App.css';
import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NavBar from './components/navbar';
import Home from './pages/Home.jsx';
import Car_model from './pages/Car_model.jsx';

function App() {
  return (
    <div className="App">
          <NavBar />
          <Car_model />
    </div>
  );
}

export default App;
