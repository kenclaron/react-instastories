import { useRouter } from "next/router";
import { DocsThemeConfig } from "nextra-theme-docs";
import React from "react";

import project from "../../package.json";

import pkg from "./package.json";
import { COMMON, getSourceByBasePath } from "./src/shared";
import { Footer, Logo } from "./src/widgets";

const config: DocsThemeConfig = {
  logo: <Logo />,
  feedback: {
    content: null
  },
  project: {
    link: project.repository.url
  },
  docsRepositoryBase: `${pkg.repository.url}/blob/main/${pkg.repository.directory}`,
  footer: {
    component: <Footer />
  },
  primaryHue: 210,
  primarySaturation: 100,
  head: (
    <>
      <link href={getSourceByBasePath("/favicon.ico")} rel="shortcut icon" />
      <link
        href={getSourceByBasePath("/apple-icon.png")}
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href={getSourceByBasePath("/icon.svg")}
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <meta content="website" property="og:type" />
      <meta content={COMMON.title} property="og:title" />
      <meta content={COMMON.description} name="description" />
      <meta content={COMMON.description} property="og:description" />
      <meta content="en_US" property="og:locale" />
      <meta content={COMMON.name} property="og:site_name" />
      <meta
        content={process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE}
        property="og:image"
      />
      <meta content={COMMON.image.alt} property="og:image:alt" />
      <meta content={COMMON.image.type} property="og:image:type" />
      <meta content="512" property="og:image:width" />
      <meta content="256" property="og:image:height" />
      <meta content="clipboard-write 'self'" httpEquiv="Feature-Policy" />
    </>
  ),
  useNextSeoProps() {
    const { asPath } = useRouter();

    const common = /^(\/|\/#.*|\/\?)$/.test(asPath);

    return {
      ...(common
        ? { titleTemplate: `${COMMON.name} – ${COMMON.title}` }
        : { titleTemplate: `%s – ${COMMON.title}` })
    };
  }
};

export default config;
