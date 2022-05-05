import { createSignal, onCleanup, onMount } from 'solid-js';
import type { JSX, PropsWithChildren } from 'solid-js';

export type Point = {
  x: number,
  y: number;
};

export type BaseWaveProps = {
  style: JSX.CSSProperties,
  className: string,
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

export default function Wave({
  amplitude = 20,
  height = 20,
  points = 3,
  speed = 0.15,
  ...props
}: PropsWithChildren<WaveProps>) {
  const [path, setPath] = createSignal('');

  let lastUpdate = 0;
  let elapsed = 0;
  let step = 0;
  let frameId = 0;

  function calculateWavePoints() {
    const pointList = [];
    for (let i = 0; i <= Math.max(points, 1); i++) {
      const scale = 100;
      const x = i / points * getWidth();
      const seed = (step + (i + i % points)) * speed * scale;
      const currentHeight = Math.sin(seed / scale) * amplitude;
      const y = Math.sin(seed / scale) * currentHeight + height;
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

  const getWidth = () => ref!.offsetWidth;
  const getHeight = () => ref!.offsetHeight;

  function redraw() {
    setPath(buildPath(calculateWavePoints()));
  }

  function draw() {
    if (!props.paused) {
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

  const {
    style,
    className,
    fill,
    paused,
    children,
    id,
    ref,
    ...rest
  } = props;

  return (
    <div
      style={{ width: '100%', display: 'inline-block', ...style }}
      className={className}
      id={id}
      ref={ref!}
    >
      <svg
        width="100%"
        height="100%"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
        <path d={path()} fill={fill} {...rest} />
      </svg>
    </div>
  );
}
