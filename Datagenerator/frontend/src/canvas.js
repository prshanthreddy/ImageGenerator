import React, { useRef, useEffect, useState } from 'react';
// const labels=["dog","cat","bird","fish","horse","cow","sheep"];


const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevPos, setPrevPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;

    const startDrawing = (e) => {
      setIsDrawing(true);
      setPrevPos({
        x: e.clientX - canvas.getBoundingClientRect().left,
        y: e.clientY - canvas.getBoundingClientRect().top,
      });
    };

    const draw = (e) => {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(prevPos.x, prevPos.y);
      ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
      ctx.stroke();
      setPrevPos({
        x: e.clientX - canvas.getBoundingClientRect().left,
        y: e.clientY - canvas.getBoundingClientRect().top,
      });
    };

    const endDrawing = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseout', endDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', endDrawing);
      canvas.removeEventListener('mouseout', endDrawing);
    };
  }, [isDrawing, prevPos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; // Set the background color to white
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with white color
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; // Set the background color to white
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with white color
  };

  return (
    <div>
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '1px solid #000' }}
    />
    <button onClick={clearCanvas}>Clear</button>
    <button id="generate">Generate</button>

    </div>
  );
};

export default Canvas;
