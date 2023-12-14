import { forwardRef } from "react"

import video1 from "../../../assets/images/videos/video1.mp4"

const MiniVideoPlayer = forwardRef<HTMLVideoElement>(({children,...props}, ref) => {
  return (
    <>
    <div className="w-[30%] h-[300px] overflow-hidden" >
    <video className="w-full h-full" controls>
    <source src={video1} type="video/mp4" />
    <source src="movie.ogg" type="video/ogg" />
    Your browser does not support the video tag.
    </video>
    </div>
    </>
  )
}
)

export default MiniVideoPlayer