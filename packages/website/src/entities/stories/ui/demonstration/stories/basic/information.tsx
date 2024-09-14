import { usePagesContext } from "@react-instastories/base";

import { Link } from "nextra-theme-docs";
import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { Card, Preview } from "../../components";

import {
  usePreventShowTransition,
  useShouldShowTransition
} from "../../../../lib";

function Information() {
  const pages = usePagesContext();

  const buttonsRef = React.useRef<HTMLUListElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);

  const show = useShouldShowTransition();

  usePreventShowTransition([buttonsRef]);

  return (
    <Preview icon="web_stories">
      <SwitchTransition>
        <CSSTransition
          key={String(show)}
          addEndListener={(done: any) => {
            textRef.current?.addEventListener?.("transitionend", done, false);
          }}
          classNames="fade"
          nodeRef={textRef}
        >
          <div ref={textRef}>
            {show ? (
              <Card>
                <p>
                  <strong>You are welcome!</strong> ❤️
                </p>
                <p>
                  Each story and page has its own context, as well as a shared
                  context for transitioning between stories and pages.
                </p>
              </Card>
            ) : (
              <>
                <h1>GREETINGS</h1>
                <div>
                  <p>
                    This story card contains basic functions of library. Story
                    is sleepy, but you can click to raise right now!
                  </p>
                </div>
              </>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
      <CSSTransition
        unmountOnExit
        classNames="transitions"
        in={show}
        nodeRef={buttonsRef}
        timeout={1000}
      >
        <ul ref={buttonsRef} className="story-container-buttons">
          <br />
          <li>
            <Link
              className="nx-block nx-w-full nx-text-center action-item action-item--tertiary interactive--force"
              href="/docs"
            >
              I want to read documentation... 🏗️
            </Link>
          </li>
          <li>
            <Link
              className="nx-block nx-w-full nx-text-center action-item action-item--secondary interactive--force"
              href="/docs/install"
            >
              I want to install this library now. 📦
            </Link>
          </li>
          <li>
            <button
              className="nx-block nx-w-full nx-text-center action-item action-item--primary interactive--force"
              onClick={() => pages.next()}
            >
              I want to see the next page now! 📃
            </button>
          </li>
        </ul>
      </CSSTransition>
    </Preview>
  );
}

export default Information;
