import React from 'react';
import './App.css';
import AppProvider from "./providers";
import { AppRouter } from "./routes";

function App() {
  return (
    <AppProvider>
      <AppRouter/>
    </AppProvider>
  );
}

export default App;
