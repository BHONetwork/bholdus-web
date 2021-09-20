import { useEffect, useRef } from "react";

// Got from https://usehooks.com/useLockBodyScroll/
export function useLockBodyScroll() {
  useEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
}

export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}
