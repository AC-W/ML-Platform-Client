import './App.css';
import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NavBar from './components/navbar';
import Home from './pages/Home.jsx';
import Car_model from './pages/Car_model.jsx';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/ML-Platform-Client" element={<Home />} />
            <Route path="/ML-Platform-Client/car_model" element={<Car_model/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
