/* eslint-disable @typescript-eslint/no-explicit-any */
import DiceBox from '@3d-dice/dice-box';
import { useEffect, useRef } from 'react';

export const useDiceBox = (
  onRollComplete: (results: any[]) => void,
  onBeforeRoll?: () => void,
) => {
  const diceBoxRef = useRef<any>(null);

  useEffect(() => {
    diceBoxRef.current = new DiceBox('#dice-box', {
      assetPath: '/assets/dice-box/',
      theme: 'theme-smooth',
      themeColor: '#1d4ed8',
      startingHeight: 8,
      throwForce: 4,
      spinForce: 4,
      lightIntensity: 0.9,
      settleTimeout: 5000,
    });

    diceBoxRef.current.init();
  }, []);

  useEffect(() => {
    if (!diceBoxRef.current) return;

    diceBoxRef.current.onBeforeRoll = () => {
      if (onBeforeRoll) onBeforeRoll();
    };

    diceBoxRef.current.onRollComplete = onRollComplete;
  }, [onBeforeRoll, onRollComplete]);

  return diceBoxRef;
};
