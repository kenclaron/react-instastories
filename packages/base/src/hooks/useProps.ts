import React from "react";

/**
 * Hook to extract and return the props of a specified type from the children elements.
 *
 * @template Props - The type of the props to be extracted. It can be either `React.PropsWithChildren<{}>` or `React.PropsWithRef<React.PropsWithChildren<{}>>`.
 * @param {React.ReactNode} children - The children elements to search through.
 * @param {function} [type] - Optional component type to match the child element against.
 * @returns {Partial<Props>} The props of the matched child element, if any.
 *
 * @example
 * ```tsx
 * const props = useProps(props.children, Component);
 * ```
 */
export function useProps<
  Props extends
    | React.PropsWithChildren<{}>
    | React.PropsWithRef<React.PropsWithChildren<{}>>
>(
  children: React.ReactNode,
  type?: (props: Props) => React.ReactNode | undefined
): Partial<Props> {
  return React.useMemo(() => {
    // Ensure children is a valid React element or an array of elements
    if (!Array.isArray(children) && !React.isValidElement(children)) return {};

    const items = Array.isArray(children) ? children : [children];

    // Iterate over the children to find a matching element
    for (const child of items) {
      if (!React.isValidElement<Props>(child)) continue;

      if (!type || child.type === type) {
        // Return the props of the matched element, including ref if available
        return {
          ...child.props,
          ...("ref" in child && { ref: child.ref })
        };
      }
    }

    return {};
  }, [children]);
}

export default useProps;
