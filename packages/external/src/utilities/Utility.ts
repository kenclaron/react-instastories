/**
 * Utility class provides helper methods for debugging.
 */
export class Utility {
  /**
   * Outputs debug information to the console.
   * @param data - Data to be logged to the console.
   */
  static debug(...data: unknown[]): void {
    console.debug("[EXTERNAL INSTASTORIES]", ...data);
  }
}

export default Utility;
