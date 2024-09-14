import { Configurable, InstaStories, Stories } from "@react-instastories/base";

import "@react-instastories/base/index.css";
import "@react-instastories/external/index.css";

import React from "react";

import configurable from "./configurable";
import stories from "./stories";

import styles from "./styles.module.scss";

export function DemonstrationStories() {
  return (
    <section className={`light ${styles["container"]}`}>
      <InstaStories
        config={{
          duration: 30000,
          viewer: {
            shouldMount: false,
            props: { className: "demonstration-viewer light nextra-content" }
          }
        }}
      >
        <Configurable.Container>{configurable}</Configurable.Container>
        <Stories className={styles["stories"]}>{stories}</Stories>
      </InstaStories>
    </section>
  );
}

export default DemonstrationStories;
