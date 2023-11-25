import React from 'react';
import './App.css';
import './canvas.css';
import CanvasComponent from './canvas.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Data Generator</h1>
        <p>Draw the image here</p>
        <div className="canvas-container">
        <CanvasComponent />
        </div>
      </header>
    </div>
  );
}

export default App;
