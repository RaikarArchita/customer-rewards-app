import { useEffect, useState } from "react";
import {DEBOUNCE_DELAY} from '../constants/constant';

// Custom hook that takes a value and a delay as arguments and returns a debounced version of the value.
export const useDebounce = (value, delay = DEBOUNCE_DELAY) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};