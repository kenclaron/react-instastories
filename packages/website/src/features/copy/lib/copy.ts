import { Utility } from "../../../shared";

function fallback(content: string): Promise<void> {
  const textarea = document.createElement("textarea");

  textarea.setAttribute("readonly", "true");
  textarea.setAttribute("contenteditable", "true");
  textarea.style.position = "fixed";
  textarea.value = content;

  document.body.appendChild(textarea);

  textarea.focus();
  textarea.select();

  const range = document.createRange();
  range.selectNodeContents(textarea);

  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);

  textarea.setSelectionRange(0, textarea.value.length);

  try {
    document.execCommand("copy");
    return Promise.resolve();
  } catch (error) {
    console.error("Content copying failed by fallback method: ", error);
    return Promise.reject();
  } finally {
    document.body.removeChild(textarea);
  }
}

export async function copy(content: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(content);
    Utility.debug("Content copied to clipboard:", content);
    return Promise.resolve();
  } catch (error) {
    try {
      Utility.debug("Clipboard API does not ready:", error);
      await fallback(content);
      Utility.debug("Content copied to clipboard by fallback method:", content);
      return Promise.resolve();
    } catch (error) {
      if (error) console.error("Content copying failed:", error);
      return Promise.reject(error);
    }
  }
}

export default copy;
