import { useState, useEffect, useRef } from 'react';

export default function useSetCallback<T>(
  initialValue: T,
  callback?: (value: T) => void
) {
  const callbackRef = useRef<((value: T) => void) | undefined>(callback);
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    callbackRef.current?.(state);
  }, [state]);

  function setter(value: T | ((v: T) => T), cb?: (value: T) => void) {
    callbackRef.current = cb ?? callback;
    setState(value);
  }

  return [state, setter] as const;
}
