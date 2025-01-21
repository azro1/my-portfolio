"use client"

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-p5
const ReactP5Wrapper = dynamic(() => import("react-p5"), { ssr: false });

const Interests = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Setup function for p5.js
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400, p5.WEBGL).parent(canvasParentRef);
    p5.noStroke();
    p5.frameRate(60);
    p5.directionalLight(255, 255, 255, 0, 0, 1); // White light
  };

  let isRotating = false; // Whether animation is running
  let rotationX = 0; // Current X-axis rotation
  let rotationY = 0; // Current Y-axis rotation
  let prevMouseX = 0; // Previous mouse position X
  let prevMouseY = 0; // Previous mouse position Y
  let dragging = false; // Whether the user is dragging the box

  // Draw function for p5.js
  const draw = (p5) => {
    p5.clear(); // Set background color

    // Start automatic rotation if enabled
    if (isRotating) {
      rotationX += 0.01;
      rotationY += 0.01;
    }

    // If dragging, update rotation based on mouse movement
    if (dragging) {
      rotationX += (p5.mouseY - prevMouseY) * 0.01;
      rotationY += (p5.mouseX - prevMouseX) * 0.01;
    }

    // Update previous mouse position
    prevMouseX = p5.mouseX;
    prevMouseY = p5.mouseY;

    p5.rotateX(rotationX);
    p5.rotateY(rotationY);

    p5.fill('#191b20');
    p5.stroke('#6B6B6B')

    p5.box(150); // Draw the 3D box
  };

  // Handle mouse press event to start animation or dragging
  const handleMousePressed = (p5) => {
    // Check if the mouse is inside the canvas and click on the box
    const distToBox = p5.dist(p5.mouseX, p5.mouseY, 200, 200); // Assuming box is centered at (200, 200)
    if (distToBox < 100) {
      // Toggle rotation state
      isRotating = !isRotating;
      dragging = false; // Disable dragging when rotation starts
    }
  };

  // Handle mouse dragging to manually spin the box
  const handleMouseDragged = () => {
    dragging = true; // Start dragging
  };

  // Handle mouse release event to stop dragging
  const handleMouseReleased = () => {
    dragging = false; // Stop dragging
  };

  if (!isClient) return null;

  return (
    <section>
      <div className="md:px-0 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section - p5.js Canvas */}
        <div className="flex-1 flex justify-center md:justify-start">
          <ReactP5Wrapper
            setup={setup}
            draw={draw}
            mousePressed={handleMousePressed}
            mouseDragged={handleMouseDragged}
            mouseReleased={handleMouseReleased}
          />
        </div>

        {/* Text Section */}
        <div className="flex-1">
          <h2 className="subheading font-b text-saddleBrown text-2xl mb-4">My Interests</h2>
          <p className="leading-7 text-ashGray">
            When I'm not absorbed in pixels and code or catching up on design trends, I indulge in the joys of cooking and diving into captivating books. These creative outlets fuel my imagination and bring balance to my life, inspiring both my personal and professional pursuits.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Interests;
