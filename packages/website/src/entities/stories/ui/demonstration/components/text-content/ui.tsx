import React from "react";

import styles from "./styles.module.scss";

export function TextContent({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={styles["text-content"]} {...props}>
      {children}
    </div>
  );
}

export default TextContent;
