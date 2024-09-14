/**
 * Determines if a page can be preloaded based on the current page and the
 * specified range of previous and next pages to preload.
 *
 * @param {number} current - The current page that is showing on screen.
 * @param {number} index - The index of the item to check for preloading.
 * @param {number} previous - The maximum number of previous items to preload.
 * @param {number} next - The maximum number of next items to preload.
 * @returns {boolean} Returns `true` if the page can be preloaded, otherwise returns `false`.
 *
 * @example
 * const canPreload = canPreloaded(5, 3, 2, 2);
 * console.debug(canPreload); // true
 */
export function canPreloaded(
  current: number,
  index: number,
  previous: number,
  next: number
): boolean {
  if (current - previous > index) return false;
  if (current + next < index) return false;

  return true;
}

export default canPreloaded;
