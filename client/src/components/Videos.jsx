import React, { useState } from "react";
import videos_data from '../videos_data.json';
import VidThumbnail from './VidThumbnail.jsx'

export default function Videos() {
    
    const videos = videos_data.map(video => {
        return <VidThumbnail {...video} />
    })
    
    return <div className="videos">
      
      <div>
        <h1 className="heading-thin">VIDEOS</h1>
        <hr className="underline-heading-videos" />
        </div>
        <h1 className="title-main-video">OFFICIAL TRAILER 1</h1>
        <div className="video-window-videos" />
        <div className="video-thumbnails">{videos}</div>
  </div>;
}
