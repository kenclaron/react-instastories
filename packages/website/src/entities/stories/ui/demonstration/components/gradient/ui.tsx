import React from "react";

import { hueRotate } from "../../../../../../shared";
import styles from "../../stories/styles.module.scss";

interface GradientProps {
  hue?: number;
}

export function Gradient({ hue }: GradientProps) {
  return (
    <div
      className={styles["background"]}
      style={{ ...(hue && { filter: hueRotate(hue) }) }}
    >
      <div className={styles["background-item"]} />
      <div className={styles["background-item"]} />
      <div className={styles["background-item"]} />
    </div>
  );
}

export default Gradient;
