import { usePagesContext, useTimerContext } from "@react-instastories/base";

import React from "react";

import { Card, Preview } from "../../components";

function Timer() {
  const pages = usePagesContext();

  const timer = useTimerContext();

  const seconds = React.useMemo(() => {
    function format(number: number) {
      if (Number.isInteger(number)) return number.toFixed(1);
      else return number.toString();
    }

    return {
      time: format(Math.round(timer.time / 100) / 10),
      duration: format(Math.round(timer.duration / 100) / 10)
    };
  }, [timer.time]);

  const ref = React.useRef<HTMLButtonElement>(null);

  const changeStateTimer = React.useCallback(() => {
    if (timer.active) timer.pause();
    else timer.start();
  }, [timer.active]);

  return (
    <Preview hue={1} textProps={{ style: { height: "100%" } }}>
      <Card>
        <h1>Caution! Timer!</h1>
      </Card>
      <div style={{ flexGrow: 1 }} />
      <Card>
        <p>
          In most cases, this is standard behavior for stories in apps, but
          there is nothing stopping you from setting the timer duration to 301
          seconds for the entire story or 2024 milliseconds for each page.
        </p>
      </Card>
      <Card>
        <p>
          <strong>Time:</strong> {seconds.time} of {seconds.duration} seconds
        </p>
        <p>
          <strong>Paused:</strong> {timer.active ? "no" : "yes"}
        </p>
      </Card>
      <ul className="nx-mt-4">
        <li>
          <button
            className="nx-block nx-w-full nx-text-center action-item action-item--secondary interactive--force"
            onClick={() => (timer.active ? timer.reset() : timer.stop())}
          >
            Reset timer
          </button>
        </li>
        <li>
          <button
            ref={ref}
            className="nx-block nx-w-full nx-text-center action-item action-item--secondary interactive--force"
            onClick={() => changeStateTimer()}
          >
            {timer.active ? "Pause timer" : "Start timer"}
          </button>
        </li>
        <li>
          <button
            className="nx-block nx-w-full nx-text-center action-item action-item--primary interactive--force"
            onClick={() => pages.next()}
          >
            I can press faster than timer reaches the end!
          </button>
        </li>
      </ul>
    </Preview>
  );
}

export default Timer;
