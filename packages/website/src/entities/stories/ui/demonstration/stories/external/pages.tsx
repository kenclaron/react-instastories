import { Link } from "nextra-theme-docs";
import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { Card, Preview } from "../../components";

import { useShouldShowTransition } from "../../../../lib";

function Pages() {
  const textRef = React.useRef<HTMLDivElement>(null);

  const show = useShouldShowTransition();

  return (
    <Preview icon="layers">
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
                <div
                  className="skeleton skeleton--vertical dark nx-h-full nx-absolute nx-inset-y-0 nx-right-0"
                  style={{ width: "2em", position: "absolute" }}
                />
                <div
                  className="skeleton skeleton--vertical dark nx-h-full nx-absolute nx-inset-y-0 nx-left-0"
                  style={{
                    marginInlineStart: "-2em",
                    width: "2em",
                    position: "absolute"
                  }}
                />
                <Card>
                  <p>
                    <strong>@react-instastories/external</strong>
                  </p>
                </Card>
                <Card>
                  <p>
                    These demo stories have an invisible component that, when
                    clicked, will take you to the next (right) or previous
                    (left) page of the story. If there is no next or previous
                    page in the story, then a moving to the next or previous
                    story will occur, respectively, if possible.
                  </p>
                </Card>
                <Card>
                  <p>
                    <Link href="/docs/external/controls/buttons">#buttons</Link>
                    <Link href="/docs/base/pages"> #pages </Link>
                    <Link href="/docs/base/page"> #page </Link>
                    <Link href="/docs/base/contexts/pages">#pagescontext</Link>
                  </p>
                </Card>
              </>
            ) : (
              <div>
                <h1>EXTERNAL COMPONENTS</h1>
                <p>How third-party components can be used with the library?</p>
              </div>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </Preview>
  );
}

export default Pages;
