/**
 * A type representing a reference in React. It can be a mutable reference object,
 * a callback function reference, or null.
 * @template T - The type of the referenced element.
 */
type RefType<T> = React.MutableRefObject<T> | React.RefCallback<T> | null;

/**
 * Shares a React ref between multiple ref objects or ref callback functions.
 * This is useful when you need to pass the same ref to multiple elements or components.
 *
 * @template T - The type of the referenced element.
 * @param refs - The refs, which can be mutable ref objects, callback refs, or null.
 * @returns A callback function that sets the provided instance to all provided refs.
 */
export function shareRef<T>(...refs: RefType<T>[]) {
  return (instance: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(instance);
      else if (ref) ref.current = instance;
    });
  };
}

export default shareRef;
