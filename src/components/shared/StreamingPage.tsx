// StreamingPage.tsx
import React from 'react';
import { Player } from 'video-react';
import video1 from '@assets/images/videos/video1.mp4'


const StreamingPage: React.FC = () => {
  return (
    <div>
      <h1>Custom Streaming Page</h1>
      <Player className="max-w-sm">
        {/* <source src="your_stream_url" type="rtmp/flv" /> */}
        <source src={video1} type="video/mp4" />

      </Player>
    </div>
  );
};

export default StreamingPage;
