// EndPage.js
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import NoteBook from './NoteBook';
import './styles/endpage.css'

// Loading spinner component
const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
    <p className="loading-text">Loading video...</p>
  </div>
);

export default function Note(props) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoBuffering, setIsVideoBuffering] = useState(true);

  useEffect(() => {
    props.setProgress(100);
  }, []);

  return (
    <div className='note-for-crush bg-transparent bg-gradient-to-br from-[#3a1c71] via-[#d76d77] to-[#ffaf7b] w-full min-h-screen flex flex-col flex-wrap gap-0 sm:gap-6 justify-center items-center'>
      <div className="up-content flex items-center justify-center">
        <div className="note-card flex items-center justify-between">
          <NoteBook />
        </div>
      </div>
      <div className="down-content w-full h-fit flex flex-col flex-wrap items-center justify-center gap-2 sm:gap-10 px-4">
        <div className="video-container">
          {isVideoBuffering && <LoadingSpinner />}
          <ReactPlayer
            url="https://www.youtube.com/watch?v=46z6aKzpDP0"
            playing={true}
            loop={true}
            controls={true}
            width="100%"
            height="100%"
            className="react-player"
            onReady={() => {
              setIsVideoReady(true);
              setIsVideoBuffering(false);
            }}
            onBuffer={() => setIsVideoBuffering(true)}
            onBufferEnd={() => setIsVideoBuffering(false)}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  modestbranding: 1,
                  rel: 0,
                }
              }
            }}
          />
        </div>
        <div className="button">
          <a href="https://wa.me/+918588908100">
            <button className="button-chat-font bg-transparent bg-gradient-to-bl from-[#ff00ff] to-[#5A3F37] text-white font-bold py-2 px-4 rounded-lg text-2xl sm:text-3xl lg:text-4xl shadow-2xl hover:scale-110 active:scale-95 duration-150 border-[2px] border-gray-300">
              Wanna Chat ?
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
