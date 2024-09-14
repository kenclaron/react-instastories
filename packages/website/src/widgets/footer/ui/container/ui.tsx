import React from "react";

import styles from "./styles.module.scss";

export function Container({ children }: React.PropsWithChildren) {
  return (
    <footer className="nx-border-t dark:nx-border-neutral-800">
      <div
        className={`${styles["container"]} nx-mx-auto nx-max-w-[90rem] nx-items-start nx-gap-2 nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)] nx-p-8`}
      >
        {children}
      </div>
    </footer>
  );
}

export default Container;
