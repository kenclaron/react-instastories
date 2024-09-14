import { usePagesContext, useTimerContext } from "@react-instastories/base";

import React from "react";

import { type IndicatorProps } from "./Indicator.model";
import Item from "./Item";

import styles from "./Indicator.module.scss";

/**
 * Represents a component that displays an indicator for pagination of items.
 *
 * @external This component uses external context from `@react-instastories/base`.
 *
 * @param props - The props object.
 * @param {React.Ref<HTMLTableElement>} ref - Reference to the HTML table element.
 * @returns {JSX.Element | null} JSX element representing the indicator.
 */
export const Indicator = React.forwardRef<HTMLTableElement, IndicatorProps>(
  function Indicator(
    { interactive = false, threshold = 0, className, ...props },
    ref
  ) {
    if (threshold < 0) {
      throw new Error(
        'Prop "threshold" in Preloadable must be a positive number or zero'
      );
    }

    const timer = useTimerContext();
    const pages = usePagesContext();

    if (!pages.length) return null;

    return (
      <table
        aria-label="Indicator"
        {...props}
        ref={ref}
        className={[styles["indicator-container"], className]
          .filter(Boolean)
          .join(" ")}
        data-testid="is-indicator-container"
      >
        <tbody>
          <tr>
            {Array.from({ length: pages.length }).map((_, index) => (
              <Item
                key={index}
                current={pages.current}
                index={index}
                interactive={interactive}
                max={Math.max(timer.duration, 0)}
                threshold={threshold}
                value={timer.time}
                onClick={() => pages.show(index)}
              />
            ))}
          </tr>
        </tbody>
      </table>
    );
  }
);

Indicator.displayName = "Controls.Indicator";

export default Indicator;
