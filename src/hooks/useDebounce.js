import { useState, useEffect } from "react";

export const useDebaounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timout);
  }, [value, delay]);

  return debounceValue;
};
