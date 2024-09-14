import React from "react";

export function useScrollPosition() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const requestRef = React.useRef<number | null>(null);

  const updatePosition = () => {
    setPosition({ x: window.scrollX, y: window.scrollY });
    requestRef.current = null;
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("scroll", handleScroll);
    updatePosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return position;
}
