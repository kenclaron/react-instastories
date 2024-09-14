import classNames from "classnames";
import React from "react";

import styles from "./styles.module.scss";

interface AccentProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  variant: "heading" | "demonstration";
}

export function Accent({ variant, ...props }: AccentProps) {
  const className = classNames(
    styles["item"],
    variant && styles[`item--${variant}`],
    props.className
  );

  return (
    <div className={styles["container"]}>
      <div className={className} {...props} />
    </div>
  );
}

export default Accent;
