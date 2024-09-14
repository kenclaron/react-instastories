import Variant from "./Variant.model";

/**
 * Retrieves the variant of the item based on its index and the current page index.
 * @param {number} index - Index of the item.
 * @param {number} current - Current page index.
 * @returns {Variant} Variant of the item.
 *
 * @example
 * const viewed = getVariant(0, 1);
 * const unviewed = getVariant(2, 1);
 * const current = getVariant(1, 1);
 * console.debug(viewed); // Variant.Viewed
 * console.debug(unviewed); // Variant.Unviewed
 * console.debug(current); // Variant.Current
 */
export function getVariant(index: number, current: number) {
  if (index < current) return Variant.Viewed;
  else if (index > current) return Variant.Unviewed;
  else return Variant.Current;
}
