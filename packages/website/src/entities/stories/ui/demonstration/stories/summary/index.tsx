import React from "react";

import { Preview } from "../../components";

import { type IStory } from "../../../../..";
import styles from "../styles.module.scss";

import Choice from "./choice";

const className = [
  styles["demonstration"],
  styles["demonstration--summary"]
].join(" ");

const story: IStory = {
  name: "summary",
  preview: {
    props: { className },
    children: (
      <Preview icon="help_center">
        <h1>SUMMARY</h1>
        <p>Description about the library, why to use it, links and more...</p>
      </Preview>
    )
  },
  pages: {
    children: [
      {
        props: { className },
        children: <Choice />
      }
    ]
  }
};

export default story;
