import classNames from "classnames";
import React from "react";

import styles from "./styles.module.scss";

interface CardProps
  extends React.PropsWithChildren<{}>,
    React.HTMLAttributes<HTMLDivElement> {}

export function Card({ children, ...props }: CardProps) {
  const className = classNames(styles["card"], props.className);

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export default Card;
