// components/BlackFireCursor.js
import React, { useState, useEffect } from 'react';
import './BlackFireCursor.css'; // Import the CSS for styling

const BlackFireCursor = () => {
  const [circles, setCircles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const fireColors = [
    '#cc3700', // Darker OrangeRed
    '#cc7000', // Darker DarkOrange
    '#cc8400', // Darker Orange
    '#ccac00', // Darker Gold
    '#cccc00', // Darker Yellow
    '#cc4f39', // Darker Tomato
    '#cc0000', // Darker Red
    '#cc548f', // Darker HotPink
    '#cc0f73', // Darker DeepPink
    '#cc00cc'  // Darker Magenta
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setMousePosition({ x, y });
    };

    // Attach the mousemove event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircles((prevCircles) => {
        return prevCircles.map(circle => {
          const newX = circle.x + Math.sign(mousePosition.x - circle.x);
          const newY = circle.y + Math.sign(mousePosition.y - circle.y);
          return { ...circle, x: newX, y: newY };
        });
      });
    }, 10); // Update every 10 milliseconds

    return () => clearInterval(interval);
  }, [mousePosition]);

  useEffect(() => {
    setCircles((prevCircles) => {
      const updatedCircles = prevCircles.map(circle => ({
        ...circle,
        id: circle.id - 1
      })); // Update the id of each circle by subtracting 1
      // Add a new circle to the end of the array
      const newCircles = [...updatedCircles.slice(-9), { x: mousePosition.x, y: mousePosition.y, id: updatedCircles.length }];
      return newCircles;
    });
  }, [mousePosition]);

  return (
    <div className="black-fire-cursor">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="cursor-circle"
          style={{ 
              left: `${circle.x-12}px`, 
              top: `${circle.y-12}px`,  
              scale: `${circle.id / 10}`,
              backgroundColor: fireColors[circle.id % fireColors.length],
            }}
        />
      ))}
    </div>
  );
};

export default BlackFireCursor;
