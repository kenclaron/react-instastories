import React from "react";

export interface IndicatorProps extends React.HTMLAttributes<HTMLTableElement> {
  /**
   * Enables is interactive mode of the indicator.
   */
  readonly interactive?: boolean;
  /**
   * Time value controls the acceleration of the progress bar filling in ms.
   */
  readonly threshold?: number;
}

export interface ItemProps
  extends Required<Pick<IndicatorProps, "interactive" | "threshold">> {
  /**
   * Current page index.
   */
  readonly current: number;
  /**
   * Index of the item.
   */
  readonly index: number;
  /**
   * Maximum value for the indicator.
   */
  readonly max: number;
  /**
   * Current value for the indicator.
   */
  readonly value: number;
  /**
   * Function to handle click event./
   */
  onClick(): void;
}
