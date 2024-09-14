import React from "react";

function useWindowResize() {
  const [resized, setResized] = React.useState(false);

  const handleResize = React.useCallback(() => setResized(true), []);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return resized;
}

export default useWindowResize;
