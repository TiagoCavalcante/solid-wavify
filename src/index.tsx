import WaveBase from './wave';
import type { BaseWaveProps, WaveHTMLProps } from './wave';

const defaults = {
  height: 20,
  amplitude: 20,
  speed: 0.15,
  points: 3,
};

export type WaveProps = WaveHTMLProps
  & Pick<BaseWaveProps, "fill" | "paused">
  & { options: Omit<BaseWaveProps, "fill" | "paused">; };

export default function Wave({
  fill = "#fff",
  paused = false,
  options,
  ...rest
}: WaveProps) {
  return (
    <WaveBase
      fill={fill}
      paused={paused}
      {...defaults}
      {...options}
      {...rest}
    />
  );
}
