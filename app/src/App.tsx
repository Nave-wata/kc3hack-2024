import React from 'react';
import './App.css';
import { Home } from './pages/Home';
import AppProvider from "./providers";

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
