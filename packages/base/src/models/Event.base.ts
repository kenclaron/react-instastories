/**
 * Properties for components that handle events, extending React's PropsWithChildren.
 */
export interface EventProps extends React.PropsWithChildren {
  /**
   * Optional HTMLElement to which the event is attached.
   */
  element?: HTMLElement | null;
}
