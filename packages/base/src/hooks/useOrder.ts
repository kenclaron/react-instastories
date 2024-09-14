import React from "react";

/**
 * Interface for props that include an index property.
 */
interface OrderedProps {
  /**
   * The index of the child element.
   */
  readonly index: number;
}

/**
 * Custom hook to order and render children elements with an added index prop.
 *
 * @param {React.ReactNode} children - The children elements to be ordered.
 * @param {function} [render] - Optional render function to process each child element. Defaults to returning the child as-is.
 * @returns {React.ReactNode[]} An array of React nodes with added index props.
 *
 * @example
 * ```tsx
 * const children = useOrder(props.children);
 * return <div>{children}</div>;
 * ```
 */
export function useOrder(
  children: React.PropsWithChildren<OrderedProps>["children"],
  render: (child: React.ReactNode, index: number) => React.ReactNode = (
    child
  ) => child
) {
  return React.useMemo(
    () =>
      React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return render(
            React.cloneElement(child, { index } as OrderedProps),
            index
          );
        }

        return render(child, index);
      }),
    [children, render]
  );
}

export default useOrder;
