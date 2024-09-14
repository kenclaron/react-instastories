import { useRouter } from "next/router";
import React from "react";
import { isMobile } from "react-device-detect";

export function useShowThemeSwitch() {
  const { pathname } = useRouter();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    requestAnimationFrame(() => {
      if (isMobile || pathname !== "/") return setShow(false);

      setShow(true);
    });
  }, [isMobile, pathname]);

  return show;
}
