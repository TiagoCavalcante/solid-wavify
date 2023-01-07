import WaveBase from "./wave";
import type { BaseWaveProps, WaveHTMLProps } from "./wave";

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
  return (
    <WaveBase
      {...defaults}
      {...props.options}
      {...props}
    />
  );
}
