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
    p5.createCanvas(500, 500, p5.WEBGL).parent(canvasParentRef);
    p5.noStroke();
    p5.frameRate(60);
    p5.directionalLight(255, 255, 255, 0, 0, 1); // White light
  
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
  
  let ballPositions = [];
  
  const draw = (p5) => {
    p5.clear(); // NightSky color
  
    const centerX = p5.width / 2 - 250;
    const centerY = p5.height / 2 - 250;
  
    const maxRadius = Math.min(p5.width, p5.height) / 2; // Slightly adjusted for better bounds
    const numShapes = 6;
  
    if (ballPositions.length === 0) {
      for (let i = 0; i < numShapes; i++) {
        ballPositions.push({
          x: centerX + p5.random(-maxRadius, maxRadius),
          y: centerY + p5.random(-maxRadius, maxRadius),
          velocityX: p5.random(0.5, 1.5),
          velocityY: p5.random(0.5, 1.5),
          colorFactor: p5.random(0, 255),
        });
      }
    }
  
    // Move balls
    for (let i = 0; i < numShapes; i++) {
      const ball = ballPositions[i];
      const angle = p5.frameCount * 0.01 + i;
      const mouseXFactor = p5.map(p5.mouseX, 0, p5.width, 0.5, 2);
      const mouseYFactor = p5.map(p5.mouseY, 0, p5.height, 0.5, 2);
  
      ball.x += ball.velocityX * mouseXFactor;
      ball.y += ball.velocityY * mouseYFactor;
  
      // Apply friction
      ball.velocityX *= 0.99;
      ball.velocityY *= 0.99;
  
      // Pulsating size effect
      const size = 50 + p5.sin(p5.frameCount * 0.02 + i) * 30;
  
      // Check for edge collisions, reverse velocity, and constrain based on size
      const halfSize = size / 2;  // Ball's half size (radius)
  
      if (ball.x - halfSize < centerX - maxRadius) {
        ball.x = centerX - maxRadius + halfSize;  // Prevent going beyond the left edge
        ball.velocityX *= -1.1; // Reverse velocity with some elasticity
      } else if (ball.x + halfSize > centerX + maxRadius) {
        ball.x = centerX + maxRadius - halfSize;  // Prevent going beyond the right edge
        ball.velocityX *= -1.1; // Reverse velocity with some elasticity
      }
  
      if (ball.y - halfSize < centerY - maxRadius) {
        ball.y = centerY - maxRadius + halfSize;  // Prevent going beyond the top edge
        ball.velocityY *= -1.1; // Reverse velocity with some elasticity
      } else if (ball.y + halfSize > centerY + maxRadius) {
        ball.y = centerY + maxRadius - halfSize;  // Prevent going beyond the bottom edge
        ball.velocityY *= -1.1; // Reverse velocity with some elasticity
      }
  
      // Dynamic color based on position and time
      const red = p5.map(p5.sin(p5.frameCount * 0.05 + ball.colorFactor), -1, 1, 117, 140);
      const green = p5.map(p5.cos(p5.frameCount * 0.05 + ball.colorFactor), -1, 1, 85, 130);
      const blue = p5.map(p5.sin(p5.frameCount * 0.1 + ball.colorFactor), -1, 1, 95, 150);
  
      p5.fill(red, green, blue, 180);
      p5.ellipse(ball.x, ball.y, size, size);
    }
  };
  

  if (!isClient) return null;

  return (
    <section>
      <div className="flex flex-col-reverse items-center justify w-full relative lg:flex-row lg:gap-10 uw:gap-0 uw:justify-between">

        <div className="flex-1 flex flex-col text-center max-w-[544px] lg:text-left lg:max-w-xl ">
            <h2 className="subheading font-b mb-4 text-frostWhite">
              Teaching
            </h2>
            <p className="text-base leading-7 text-stoneGray">
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

        <div className="flex-1 flex justify-center items-center h-full w-full mb-6 md:w-[544px] md:h-auto lg:mb-0 lg:bg-softCharcoal xl:flex-none xl:w-[500px] xl:h-[500px] ">
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
