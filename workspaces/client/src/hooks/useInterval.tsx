import { useEffect, useRef } from 'react'

export const useInterval = (callback: () => void, delay: number | null): void => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if(delay === null) return;

    const interval = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(interval);
  }, [delay]);
}