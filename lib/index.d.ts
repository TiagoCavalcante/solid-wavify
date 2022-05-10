import { JSX } from "solid-js";
type BaseWaveProps = {
    style: JSX.CSSProperties;
    className: string;
    fill: JSX.IntrinsicElements["path"]["fill"];
    paused: Boolean;
    id: string;
    ref: HTMLDivElement | null;
    height: number;
    amplitude: number;
    speed: number;
    points: number;
};
type WaveHTMLProps = Omit<JSX.IntrinsicElements["path"], keyof BaseWaveProps | "children">;
export type WaveProps = WaveHTMLProps & Pick<BaseWaveProps, "fill" | "paused"> & {
    options: Partial<Omit<BaseWaveProps, "fill" | "paused">>;
};
export default function Wave(props: WaveProps): import("solid-js").JSX.Element;

//# sourceMappingURL=index.d.ts.map
