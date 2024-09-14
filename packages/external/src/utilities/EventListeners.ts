interface KeyboardEventFunction {
  (event: KeyboardEvent): void;
}

/**
 * Utility class that provides static methods to handle keyboard events.
 */
export class EventListeners {
  /**
   * Handles the keyboard event with necessary key.
   *
   * @param event - The keyboard event.
   * @param keys - An array of key names that, when pressed, will call the function.
   * @param fn - The function to be called when the key is pressed.
   */
  static execute(
    event: KeyboardEvent,
    keys: KeyboardEvent["key"][],
    fn: KeyboardEventFunction
  ) {
    if (keys.includes(event.key)) fn(event);
  }
}

export default EventListeners;
