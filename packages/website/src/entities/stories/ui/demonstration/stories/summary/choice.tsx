import { Link } from "nextra-theme-docs";
import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { Card, Preview } from "../../components";

import {
  usePreventShowTransition,
  useShouldShowTransition
} from "../../../../lib";

function Choice() {
  const buttonsRef = React.useRef<HTMLUListElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);

  const show = useShouldShowTransition();

  usePreventShowTransition([buttonsRef]);

  return (
    <Preview icon="help_center">
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
              <>
                <Card>
                  <p>
                    To stop the timer and read the full text, tap and hold the
                    viewer.
                  </p>
                </Card>
                <Card>
                  <p>
                    To move on to the next story, just relax and don`t click
                    anything.
                  </p>
                </Card>
                <Card>
                  <p>
                    <strong>Why choose react-instastories library? 🤔</strong>
                  </p>
                  <p>
                    With <strong>react-instastories</strong>, you can
                    effortlessly create stunning and interactive stories for
                    your React applications. Whether you`re building immersive
                    content for social media or engaging storytelling
                    experiences for your website, library offers unprecedented
                    ease of use and customization.
                  </p>
                </Card>
              </>
            ) : (
              <div>
                <h1>SUMMARY</h1>
                <p>
                  Description about the library, why to use it, links and
                  more...
                </p>
              </div>
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
        <ul ref={buttonsRef}>
          <br />
          <li>
            <Link
              className="nx-block nx-w-full nx-text-center action-item action-item--secondary interactive--force"
              href="/docs/what-is-stories"
            >
              What is Stories?
            </Link>
          </li>
          <li>
            <Link
              className="nx-block nx-w-full nx-text-center action-item action-item--primary interactive--force"
              href="/docs/why-this-library"
            >
              More about this library
            </Link>
          </li>
        </ul>
      </CSSTransition>
    </Preview>
  );
}

export default Choice;
