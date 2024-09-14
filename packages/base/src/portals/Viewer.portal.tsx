import React from "react";
import { createPortal } from "react-dom";

import Viewer from "../components/Viewer";

/**
 * This is a function that returns a React dialog component within stories container
 * @returns A React component that is being rendered in the body of the document.
 */
export function ViewerPortal() {
  if (typeof document === "undefined") return <React.Fragment />;

  return createPortal(<Viewer />, document.body);
}

export default ViewerPortal;
