import React from "react";

import Container from "./container";
import Information from "./information";
import Project from "./project";
import Resources from "./resources";

export function Footer() {
  return (
    <Container>
      <Project />
      <Resources />
      <Information />
    </Container>
  );
}

export default Footer;
