import React from "react";

import { type ItemProps } from "./Indicator.model";
import Variant from "./Variant.model";
import { getVariant } from "./getVariant";

import styles from "./Indicator.module.scss";

const VALUES = {
  [Variant.Viewed]: 100,
  [Variant.Current]: undefined,
  [Variant.Unviewed]: 0
};

function getPhase(variant: Variant) {
  switch (variant) {
    case Variant.Viewed:
      return VALUES[Variant.Viewed];
    case Variant.Current:
      return VALUES[Variant.Current];
    case Variant.Unviewed:
      return VALUES[Variant.Unviewed];
    default:
      throw new Error("Invalid variant of indicator item");
  }
}

/**
 * Renders an item within the indicator component.
 * @param {Object} props - Props for the indicator item.
 * @returns {React.ReactElement} React element representing the indicator item.
 */
export function Item({
  current,
  index,
  value,
  max,
  threshold,
  interactive,
  onClick
}: ItemProps) {
  const variant = React.useMemo(
    () => getVariant(index, current),
    [index, current]
  );

  const performing = React.useMemo(
    () => variant === Variant.Current,
    [variant]
  );

  const acceleration = React.useMemo(
    () => threshold * (value / (max || Infinity)),
    [threshold, value, max]
  );

  const phase = React.useMemo(() => getPhase(variant), [variant]);

  const label = React.useMemo(
    () => (phase ? `${phase}%` : `${value}/${max}ms`),
    [variant, phase, value, max]
  );

  /**
   * Calculates the percentage of viewing for the item.
   * @type {number}
   */
  const percent = React.useMemo(
    () =>
      Math.min(
        phase ?? ((value + acceleration) / (max || Infinity)) * 100,
        100
      ),
    [variant, value, acceleration, max]
  );

  const disabled = React.useMemo(
    () => (performing || !interactive ? true : undefined),
    [performing, interactive]
  );

  return (
    <td
      className={[styles["indicator"], styles[`indicator--${variant}`]]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        aria-disabled={disabled}
        aria-label={`${index}`}
        data-testid="is-indicator-item-button"
        disabled={disabled}
        tabIndex={performing || !interactive ? -1 : 0}
        onClick={interactive ? onClick : undefined}
      >
        <div
          aria-busy={performing ? true : undefined}
          aria-label={label}
          aria-live={performing ? "polite" : "off"}
          aria-valuemax={max}
          aria-valuemin={0}
          aria-valuenow={performing ? value : undefined}
          aria-valuetext={label}
          className={styles["indicator-bar"]}
          data-testid="is-indicator-item-timer"
          role="timer"
          style={{ width: `${percent}%` }}
        />
      </button>
    </td>
  );
}

Item.displayName = "Controls.Indicator.Item";

export default Item;
