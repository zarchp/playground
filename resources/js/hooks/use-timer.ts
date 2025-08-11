import { useEffect, useRef, useState } from 'react';

export function useTimer(startOn: boolean) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const raf = useRef<number | null>(null);
  const startTs = useRef<number | null>(null);

  const tick = (t: number) => {
    if (!startTs.current) startTs.current = t;
    const delta = (t - startTs.current) / 1000;
    setSeconds(delta);
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (startOn && !running) {
      setRunning(true);
      raf.current = requestAnimationFrame(tick);
    }
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [startOn]);

  const reset = () => {
    setSeconds(0);
    setRunning(false);
    startTs.current = null;
  };
  const pause = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setRunning(false);
  };

  return { seconds, running, reset, pause };
}

export const formatTime = (s: number) => {
  const mm = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
};
