// VideoPlayer.tsx
import React from 'react';
import ReactPlayer from 'react-player/youtube';

interface MiniVideoPlayerProps {
  url: string
}

const MiniVideoPlayer: React.FC<MiniVideoPlayerProps> = ({ url }) => {
  return (
    <div 
    className='bg-secondary relative w-full h-full' 
    >
    {/* <span className='px-2 py-1 bg-red-700 text-sm text-white rounded absolute m-1'>Live</span> */}
    <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
      
      {/* <ReactPlayer
        url={url}
        controls
        alt="video"
        width="100%"
        height="100%"
        config={{
          // Platform-specific configurations
          twitch: {
            options: {
              autoplay: false,  
              muted: false, 
              // theme: 'dark', 
              // layout: 'video-with-chat', 
            },
          },
        }}
      /> */}
    </div>
  );
};

export default MiniVideoPlayer;
