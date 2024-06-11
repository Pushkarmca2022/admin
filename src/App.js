// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Product from './pages/Product';
import AddCategory from './pages/AddCategory';
import Category from './pages/Category';

import './App.css';  // Add some basic styling

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/product" element={<Product />} />
            <Route path="/addCategory" element={<AddCategory />} />

            <Route path="/category" element={<Category />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
