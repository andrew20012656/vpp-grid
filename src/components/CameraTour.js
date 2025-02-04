
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { gsap } from 'gsap';
import { useCallback, useRef, useState } from 'react';

export function useCameraTour() {
  const { camera, controls } = useThree();
  const tourRunning = useRef(false);

  const tourPoints = [
    { 
      cameraPos: new Vector3(-47.46, 1.45, 6.01), 
      lookAt: new Vector3(-25.23, 1.45, 6.01),
      duration: 2
    },
    { 
      cameraPos: new Vector3(34.92, 1.45, 6.01),
      lookAt: new Vector3(47.16, 1.45, 6.01),
      duration: 6
    },
    // Add more tour points as needed
  ];

  const moveTo = useCallback((position, target, duration = 2) => {
    const timeline = gsap.timeline();

    timeline.to(camera.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration,
      ease: "power2.inOut"
    });

    if (controls) {
      timeline.to(controls.target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration,
        ease: "power2.inOut"
      }, "<");
    }

    return timeline;
  }, [camera, controls]);

  const startTour = useCallback(() => {
    if (tourRunning.current) return;
    tourRunning.current = true;

    const timeline = gsap.timeline({
      onComplete: () => {
        tourRunning.current = false;
      }
    });

    tourPoints.forEach((point) => {
      timeline.add(
        moveTo(point.cameraPos, point.lookAt, point.duration)
      );
    });
  }, [moveTo]);

  const quickMove = useCallback((cameraPos, lookAt) => {
    moveTo(cameraPos, lookAt, 2);
  }, [moveTo]);

  return { startTour, quickMove };
}