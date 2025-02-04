
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';

export function useAutoReset(quickMove, timeout = 2000) {
  const resetTimer = useRef(null);
  const defaultPosition = new Vector3(-140, 110, 90);
  const defaultTarget = new Vector3(0, 5, 0);

  const handleCameraMovement = () => {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }
    
    resetTimer.current = setTimeout(() => {
      quickMove(defaultPosition, defaultTarget);
    }, timeout);
  };

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  return handleCameraMovement;
}