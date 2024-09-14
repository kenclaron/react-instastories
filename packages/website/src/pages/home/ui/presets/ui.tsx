import React from "react";

import { Separator } from "../../../../shared";
import { APPS } from "../../model";

import styles from "./styles.module.scss";

interface PresetProps extends React.PropsWithChildren {
  name: string;
}

function Template({ children, name }: PresetProps) {
  return (
    <article>
      <h2 className="nx-font-semibold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 nx-mt-8 nx-mb-4 nx-text-2xl">
        <span>{name}</span>
        <sup>* </sup>
        <span>Stories</span>
      </h2>

      <div className={styles["scroller"]}>
        <section className={styles["container"]}>{children}</section>
      </div>
    </article>
  );
}

function Stories() {
  return React.useMemo(
    () =>
      Object.entries(APPS).map(([name, { Component }]) => (
        <Template key={name} name={name}>
          <Component />
        </Template>
      )),
    [APPS]
  );
}

function Note() {
  const developers = Object.values(APPS)
    .map(({ developer }) => developer)
    .filter(Boolean)
    .join(", ");

  return (
    <p className="nx-mt-8 nx-text-gray-600 dark:nx-text-gray-400">
      <sup>
        * This project is not affilated with {[developers].join(", ")} There is
        no connection between react-instastories and companies. The above simply
        demonstrates how you can provide a great User Experience similar to
        these companies.
      </sup>
    </p>
  );
}

export function Enterprise() {
  return (
    <section>
      <Separator as="h2" id="showcase">
        As enterprise apps
      </Separator>
      <Stories />
      <Note />
    </section>
  );
}

export default Enterprise;
