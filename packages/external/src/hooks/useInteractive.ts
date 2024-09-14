/**
 * List of CSS selectors representing interactive elements within the document.
 */
const SELECTORS = [
  "a[href]:not([tabindex='-1'])",
  "area[href]:not([tabindex='-1'])",
  "input:not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "iframe:not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])",
  "[contentEditable=true]:not([tabindex='-1'])"
];

interface InteractiveElement {
  element: Element;
  tabIndex: string | null;
}

/**
 * Retrieves all interactive elements within a given element, excluding elements within the provided element.
 *
 * @param {Element} element - The target element to exclude search of items.
 * @returns {Element[]} An array of interactive elements outside the document.
 */
function getItemsOutsideElement(element: Element) {
  const query = SELECTORS.join(",");

  const items = document.body.querySelectorAll(query);
  const excludedItems = element.querySelectorAll(query);

  return Array.from(items).filter(
    (item) => !Array.from(excludedItems).includes(item)
  );
}

/**
 * Disables/enables interactive on all window.document elements
 */
export function useInteractive() {
  /**
   * Disables interactive elements outside a given element.
   *
   * @param {HTMLElement} element - The element to disable interactive elements outside.
   * @returns {InteractiveElement[]} An array of objects representing disabled elements and their original tab indices.
   */
  function disable(element: HTMLElement) {
    if (!element) return [];

    const exclude = getItemsOutsideElement(element);
    const items: InteractiveElement[] = exclude.map((element) => ({
      element,
      tabIndex: element.getAttribute("tabindex")
    }));

    for (const item of exclude) {
      item.setAttribute("tabindex", "-1");
    }

    return items;
  }

  /**
   * Enables previously disabled interactive elements.
   *
   * @param {InteractiveElement[]} items - An array of objects representing disabled elements and their original tab indices.
   */
  function enable(items: InteractiveElement[]) {
    for (const item of items) {
      const tabindex = item.tabIndex;

      if (tabindex === null) item.element.removeAttribute("tabindex");
      else item.element.setAttribute("tabindex", tabindex);
    }
  }

  return { disable, enable };
}

export default useInteractive;
