import React from "react";

import { Preview } from "../../components";

import { type IStory } from "../../../../..";
import general from "../../styles.module.scss";
import styles from "../styles.module.scss";

import Contexts from "./contexts";
import Customization from "./customization";
import Information from "./information";
import Timer from "./timer";

const className = [
  styles["demonstration"],
  styles["demonstration--basic"]
].join(" ");

const story: IStory = {
  name: "basic",
  story: { props: { duration: 30000 } },
  preview: {
    props: {
      className: [general.primary, className].join(" ")
    },
    children: (
      <Preview icon="web_stories">
        <h1>GREETINGS</h1>
        <div>
          <p>
            This story card contains basic functions of library. Story is
            sleepy, but you can click to raise right now!
          </p>
        </div>
      </Preview>
    )
  },
  pages: {
    children: [
      {
        props: { className, duration: 60000 },
        children: <Information />
      },
      {
        props: { className },
        children: <Timer />
      },
      {
        props: { className },
        children: <Contexts />
      },
      {
        props: { className },
        children: <Customization />
      }
    ]
  }
};

export default story;
