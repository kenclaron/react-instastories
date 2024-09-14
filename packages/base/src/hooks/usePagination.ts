import React from "react";

/**
 * Interface for pagination events.
 */
export interface PaginationEvents {
  /**
   * Function to be called when the element changes.
   * @param {number} index index of the item that will be after the change.
   */
  onPaginate?(index: number): void;
  /**
   * Function to be called when the element changes.
   * @param {number} index preivous item index before changing.
   */
  onNext?(index: number): void;
  /**
   * Function to be called when the element changes.
   * @param {number} index next item index before changing.
   */
  onPrevious?(index: number): void;
}

/**
 * Interface for the return value of `usePagination` hook.
 */
export interface Pagination {
  /**
   * Indicates if there is a next element.
   */
  readonly canNext: boolean;
  /**
   * Indicates if there is a previous element.
   */
  readonly canPrevious: boolean;
  /**
   * The state for the current element index.
   */
  readonly current: number;
  /**
   * The total number of elements based on the children nodes.
   */
  readonly length: number;
  /**
   * Function to change the current element by index.
   *
   * @param {number} value - The new exists element index.
   */
  change: (value: number) => void;
}

/**
 * React Hook for pagination between `React.ReactNode`.
 *
 * @param {React.ReactNode} children - The children nodes.
 * @returns {Pagination} The pagination object.
 */
export function usePagination(children: React.ReactNode): Pagination {
  const [current, setCurrent] = React.useState(-1);

  const length = React.useMemo(
    () => (Array.isArray(children) ? children.length : 1),
    [children]
  );

  const canNext = React.useMemo(() => current < length - 1, [current, length]);
  const canPrevious = React.useMemo(() => current > 0, [current]);

  const change = React.useCallback(
    (value: number) => setCurrent(value),
    [setCurrent]
  );

  return { canNext, canPrevious, current, length, change };
}
