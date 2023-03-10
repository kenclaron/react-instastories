import styles from "./styles.module.scss";
import * as React from "react";

interface Props {
  text: string;
}

export const ExampleComponent = ({ text }: Props) => {
  return <code className={styles.initial}>react-instastories: {text}</code>;
};
