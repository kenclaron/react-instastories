import random from "random";

export function hueRotate(seed: number): React.CSSProperties["filter"] {
  random.use(seed);

  const degree = random.integer(0, 360);

  return `hue-rotate(${degree}deg)`;
}

export default hueRotate;
