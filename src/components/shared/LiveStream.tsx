import { FC } from "react"

export interface LiveStreamInterfece {
  id: string
  title: string
}

const LiveStream: FC<LiveStreamInterfece> = ({ id, title }) => {
  return (
    <div>
      <p>{id}</p>
      <h1>{title}</h1>
    </div>
  )
}

export default LiveStream
