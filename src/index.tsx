import WaveBase from './wave';
import type { BaseWaveProps, WaveHTMLProps } from './wave';
import { splitProps } from 'solid-js';

const defaults = {
  height: 20,
  amplitude: 20,
  speed: 0.15,
  points: 3,
};

export type WaveProps = WaveHTMLProps
  & Pick<BaseWaveProps, "fill" | "paused">
  & { options: Partial<Omit<BaseWaveProps, "fill" | "paused">>; };

export default function Wave(props: WaveProps) {
  const [local, rest] = splitProps(props, ["fill", "paused", "options"])

  return (
    <WaveBase
      fill={local.fill}
      paused={local.paused}
      {...defaults}
      {...local.options}
      {...rest}
    />
  );
}
