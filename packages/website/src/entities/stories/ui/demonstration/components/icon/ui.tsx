import React from "react";

import styles from "./styles.module.scss";

interface IconProps {
  name: string;
}

export function Icon({ name }: IconProps) {
  return (
    <span
      aria-label={name}
      className={[styles["icon"], "material-icons-outlined"].join(" ")}
      role="img"
    >
      {name}
    </span>
  );
}

export default Icon;
