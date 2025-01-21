"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

const ReactP5Wrapper = dynamic(() => import("react-p5"), { ssr: false });

const Teaching = () => {
  const [isClient, setIsClient] = useState(false);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const setup = (p5, canvasParentRef) => {
    // Fixed canvas size of 500x500
    p5.createCanvas(500, 500, p5.WEBGL).parent(canvasParentRef);
    p5.noStroke();
    p5.frameRate(60);
    p5.directionalLight(255, 255, 255, 0, 0, 1); // White light

    // Mouse event listeners
    p5.mousePressed = () => {
      setMouseIsPressed(true);
      setMouseStart({ x: p5.mouseX, y: p5.mouseY });
    };

    p5.mouseReleased = () => {
      setMouseIsPressed(false);
    };

    p5.mouseDragged = () => {
      setMousePos({ x: p5.mouseX, y: p5.mouseY });
    };
  };

  let ballPositions = []; // To store ball positions and velocity

  const draw = (p5) => {
    p5.clear(); // NightSky color

    const centerX = p5.width / 2 - 250;
    const centerY = p5.height / 2 - 250;

    const maxRadius = Math.min(p5.width, p5.height) / 3;
    const numShapes = 6;

    // If this is the first frame, initialize the balls' positions and velocities
    if (ballPositions.length === 0) {
      for (let i = 0; i < numShapes; i++) {
        ballPositions.push({
          x: centerX + p5.random(-maxRadius, maxRadius),
          y: centerY + p5.random(-maxRadius, maxRadius),
          velocityX: p5.random(0.5, 1.5),
          velocityY: p5.random(0.5, 1.5),
          colorFactor: p5.random(0, 255), // For dynamic color
        });
      }
    }

    // Move the balls with smooth transitions and elastic bounce
    for (let i = 0; i < numShapes; i++) {
      const ball = ballPositions[i];
      const angle = p5.frameCount * 0.01 + i;
      const mouseXFactor = p5.map(p5.mouseX, 0, p5.width, 0.5, 2);
      const mouseYFactor = p5.map(p5.mouseY, 0, p5.height, 0.5, 2);

      // Update ball positions based on velocity and mouse interaction
      ball.x += ball.velocityX * mouseXFactor;
      ball.y += ball.velocityY * mouseYFactor;

      // Add friction for smoother deceleration
      ball.velocityX *= 0.99; // Small friction to slow down gradually
      ball.velocityY *= 0.99;

      // Elastic bouncing at the edges of the defined range
      if (ball.x < centerX - maxRadius || ball.x > centerX + maxRadius) {
        ball.velocityX *= -1.1; // Invert and increase velocity for elasticity
      }
      if (ball.y < centerY - maxRadius || ball.y > centerY + maxRadius) {
        ball.velocityY *= -1.1; // Invert and increase velocity for elasticity
      }

      // Constrain positions to within bounds
      ball.x = p5.constrain(ball.x, centerX - maxRadius, centerX + maxRadius);
      ball.y = p5.constrain(ball.y, centerY - maxRadius, centerY + maxRadius);

      // Pulsating size effect
      const size = 50 + p5.sin(p5.frameCount * 0.02 + i) * 30;

      // Dynamic color based on position and time
      const red = p5.map(p5.sin(p5.frameCount * 0.05 + ball.colorFactor), -1, 1, 117, 140);  // Red component for stoneGray
      const green = p5.map(p5.cos(p5.frameCount * 0.05 + ball.colorFactor), -1, 1, 85, 130);  // Green component for cloudGray
      const blue = p5.map(p5.sin(p5.frameCount * 0.1 + ball.colorFactor), -1, 1, 95, 150);   // Blue component for frostWhite

      p5.fill(red, green, blue, 180);  // Apply the dynamic color to the ball

      p5.fill(red, green, blue, 180);
      p5.ellipse(ball.x, ball.y, size, size);
    }
  };

  if (!isClient) return null;

  return (
    <section>
      <div className="flex flex-col md:flex-row items-center justify w-full relative">
        <div className="flex-1 flex flex-col px-4 md:px-0">
          <div className="max-w-xl bg-nightSky p-6 lg:p-8">
            <h2 className="subheading font-bold mb-4 text-saddleBrown hover:text-goldenrod transition-all duration-300 transform hover:scale-105">
              Teaching
            </h2>
            <p className="text-base leading-7 text-ashGray">
              I'm passionate about sharing knowledge through my{" "}
              <a
                className="text-saddleBrown hover:underline transition-all duration-300"
                href="https://www.youtube.com/channel/UCSK7zfwlgMq3r88lkchHsSw"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube channel
              </a>
              , offering tutorials on web development, graphic design, and more.
              Teaching via video content broadens my reach, empowering others to
              explore these creative realms.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center w-full mt-6 h-[400px] md:mt-0 md:h-[500px] md:w-[500px]">
          <ReactP5Wrapper
            setup={setup}
            draw={draw}
            className="w-full h-full bg-transparent" // Ensure proper fit and no overflow
          />
        </div>
      </div>
    </section>
  );
};

export default Teaching;
