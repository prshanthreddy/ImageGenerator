import React, { useRef, useEffect, useState } from 'react';

const list= ['fish','house','tree','guitar','pencil','bicycle'];

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevPos, setPrevPos] = useState({ x: 0, y: 0 });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;

    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const getTouchPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
    
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    };
    const startDrawing = (pos) => {
      setIsDrawing(true);
      setPrevPos(pos);
    };

    const draw = (pos) => {
      if (!isDrawing) return;

      ctx.beginPath();
      ctx.moveTo(prevPos.x, prevPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      setPrevPos(pos);
    };

    const endDrawing = () => {
      setIsDrawing(false);
    };

    const handleStart = (e) => {
      e.preventDefault();
      const pos = e.type === 'mousedown' ? getMousePos(e) : getTouchPos(e);
      startDrawing(pos);
    };

    const handleMove = (e) => {
      e.preventDefault();
      const pos = e.type === 'mousemove' ? getMousePos(e) : getTouchPos(e);
      draw(pos);
    };

    const handleEnd = () => {
      endDrawing();
    };

    canvas.addEventListener('mousedown', handleStart, { passive: false });
    canvas.addEventListener('mousemove', handleMove, { passive: false });
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseout', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd);
    canvas.addEventListener('touchcancel', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('mouseout', handleEnd);

      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
      canvas.removeEventListener('touchcancel', handleEnd);
    };
  }, [isDrawing, prevPos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);
  
  const next = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    setCurrentWordIndex(currentWordIndex + 1);
    clearCanvas();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <p>Draw the image of the word shown below</p>
      <p>{list[currentWordIndex]}</p>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid #000', touchAction: 'none' }}
      />
      <button onClick={clearCanvas}>Clear</button> 
      <button onClick={next}>Next</button>
    </div>
  );
};

export default Canvas;
