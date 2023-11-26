import React, { useState } from 'react';
import CanvasComponent from './canvas';
import './App.css';
import './canvas.css';

function App() {
  const [canvasVisible, setCanvasVisible] = useState(false);
  const [studentName, setStudentName] = useState('');

  const start = () => {
    if (studentName === '') {
      alert('Please enter the name');
    } else {
      setCanvasVisible(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data Generator</h1>
        <div className="canvas-container">
          <label htmlFor="name">Student Name : </label>
          <input
            type="text"
            placeholder="Enter the name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <button id="start" onClick={start}>
            START
          </button>
          {canvasVisible && <CanvasComponent />}
        </div>
      </header>
    </div>
  );
}

export default App;
