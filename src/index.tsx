import WaveBase from './wave'

const defaults = {
  height: 20,
  amplitude: 20,
  speed: 0.15,
  points: 3,
}

export default function Wave({
  fill = "#fff",
  paused = false,
  options,
  ...rest
}) {
  return (
    <WaveBase
      fill={fill}
      paused={paused}
      {...defaults}
      {...options}
      {...rest}
    />
  )
}
