import React from "react";

import styles from "./styles.module.scss";

type SeparatorProps<T extends React.ElementType = "div"> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

export function Separator<T extends React.ElementType = "div">({
  as,
  ...props
}: SeparatorProps<T>) {
  const Tag = as ?? "div";

  return <Tag className={styles["separator"]} {...props} />;
}

export default Separator;
