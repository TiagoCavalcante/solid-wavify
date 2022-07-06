import {
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  splitProps
} from "solid-js";
import type { JSX, ParentProps } from "solid-js";

export type Point = {
  x: number,
  y: number;
};

export type BaseWaveProps = {
  style: JSX.CSSProperties,
  class: string,
  fill: JSX.IntrinsicElements["path"]["fill"],
  paused: Boolean,
  id: string,
  ref: HTMLDivElement | null,
  height: number,
  amplitude: number,
  speed: number,
  points: number,
};

export type WaveHTMLProps = Omit<
  JSX.IntrinsicElements["path"],
  keyof BaseWaveProps | "children"
>;

export type WaveProps = Partial<BaseWaveProps & WaveHTMLProps>;

export default function Wave(baseProps: ParentProps<WaveProps>) {
  const props = mergeProps({
    amplitude: 20,
    height: 20,
    points: 3,
    speed: 0.15,
  }, baseProps);

  const [local, rest] = splitProps(props, [
    "amplitude",
    "height",
    "points",
    "speed",

    "style",
    "class",
    "fill",
    "paused",
    "children",
    "id",
    "ref",
  ]);

  const [path, setPath] = createSignal("");

  let lastUpdate = 0;
  let elapsed = 0;
  let step = 0;
  let frameId = 0;

  function calculateWavePoints() {
    const pointList = [];
    for (let i = 0; i <= Math.max(local.points, 1); i++) {
      const scale = 100;
      const x = i / local.points * getWidth();
      const seed = (step + (i + i % local.points)) * local.speed * scale;
      const currentHeight = Math.sin(seed / scale) * local.amplitude;
      const y = Math.sin(seed / scale) * currentHeight + local.height;
      pointList.push({ x, y });
    }
    return pointList;
  }

  function buildPath(points: Array<Point>) {
    let svg = `M ${points[0].x} ${points[0].y}`;
    const initial = {
      x: (points[1].x - points[0].x) / 2,
      y: (points[1].y - points[0].y) + points[0].y + (points[1].y - points[0].y)
    };
    const cubic = (a: Point, b: Point) => ` C ${a.x} ${a.y} ${a.x} ${a.y} ${b.x} ${b.y}`;
    svg += cubic(initial, points[1]);
    let point = initial;
    for (let i = 1; i < points.length - 1; i++) {
      point = {
        x: (points[i].x - point.x) + points[i].x,
        y: (points[i].y - point.y) + points[i].y
      };
      svg += cubic(point, points[i + 1]);
    }
    svg += ` L ${getWidth()} ${getHeight()}`;
    svg += ` L 0 ${getHeight()} Z`;
    return svg;
  }

  const getWidth = () => local.ref!.offsetWidth;
  const getHeight = () => local.ref!.offsetHeight;

  function redraw() {
    setPath(buildPath(calculateWavePoints()));
  }

  function draw() {
    if (!local.paused) {
      const now = new Date().getTime();
      elapsed += now - lastUpdate;
      lastUpdate = now;
    }
    const scale = 1000;
    step = elapsed * Math.PI / scale;
    redraw();
  }

  function update() {
    draw();

    if (frameId) resume();
  }

  function resume() {
    frameId = window.requestAnimationFrame(update);
    lastUpdate = new Date().getTime();
  }

  onMount(() => {
    if (!frameId) resume();
  });

  onCleanup(() => {
    window.cancelAnimationFrame(frameId);
    frameId = 0;
  });

  return (
    <div
      style={{ width: "100%", display: "inline-block", ...local.style }}
      class={local.class}
      id={local.id}
      ref={local.ref!}
    >
      <svg
        width="100%"
        height="100%"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {local.children}
        <path d={path()} fill={local.fill} {...rest} />
      </svg>
    </div>
  );
}
