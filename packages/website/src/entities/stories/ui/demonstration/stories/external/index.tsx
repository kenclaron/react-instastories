import React from "react";

import { Preview } from "../../components";

import { type IStory } from "../../../../..";
import styles from "../styles.module.scss";

import Events from "./events";
import Pages from "./pages";
import Presets from "./presets";
import Stories from "./stories";

const className = [
  styles["demonstration"],
  styles["demonstration--external"]
].join(" ");

const story: IStory = {
  name: "external",
  preview: {
    props: { className },
    children: (
      <Preview icon="layers">
        <h1>EXTERNAL COMPONENTS</h1>
        <p>How third-party components can be used with the library?</p>
      </Preview>
    )
  },
  pages: {
    children: [
      {
        props: { className },
        children: <Pages />
      },
      {
        props: { className },
        children: <Stories />
      },
      {
        props: { className },
        children: <Events />
      },
      {
        props: { className },
        children: <Presets />
      }
    ]
  }
};

export default story;
