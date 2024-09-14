import React from "react";

/**
 * A utility class for custom prop-type validations in React components.
 */
export class PropTypes {
  /**
   * A custom prop-type validator that ensures the children of a component
   * are of specific types.
   *
   * @param components - An array of React component constructors that are allowed as children.
   * @returns A function to validate the prop types of a component.
   */
  static limitation(...components: Function[]) {
    /**
     * The actual validation function.
     *
     * @param props - The props of the component being validated.
     * @param propName - The name of the prop to validate.
     * @param componentName - The name of the component being validated.
     * @returns An error if validation fails, otherwise null.
     */
    return function (
      props: { [key: string]: any },
      propName: string,
      componentName: string
    ) {
      if (propName !== "children") throw new Error("Invalid property name");

      const prop = props["children"];

      const getTypeName = (component: Function) => {
        if (component && typeof component === "function")
          return component.name || typeof function () {};

        return typeof component;
      };

      const available = components
        .map((component) => getTypeName(component))
        .filter(Boolean)
        .join('", "');

      let error = null;

      React.Children.forEach(
        prop,
        (child: React.ReactElement | React.ReactPortal) => {
          if (
            !React.isValidElement(child) ||
            !components.some((component) => child.type === component)
          ) {
            error = new Error(
              `"${componentName}" children should be of type "${available}".`
            );
          }
        }
      );

      return error ? new Error(error) : null;
    };
  }
}

export default PropTypes;
