import React from 'react'
// 참고: https://www.npmjs.com/package/react-youtube
import YouTube from 'react-youtube'

/* -------------------------------------------------------------------------- */

const opts = {
  width: '640',
  height: '390',
  // 매개변수: https://developers.google.com/youtube/player_parameters
  playerVars: {
    autoplay: 1,
    modestbranding: 1,
    showinfo: 0,
    controls: 0,
    fs: 0,
    cc_load_policy: 0,
    iv_load_policy: 3,
    autohide: 0,
    loop: 1,
  },
}

/* -------------------------------------------------------------------------- */

export default function YoutubePlayer({ videoId, options = {}, ...restProps }) {
  options = { ...opts, ...options }

  const youtubeRef = React.useRef(null)

  const handleReady = (e) => {
    e.target.mute()
  }

  const handleEnd = (e) => {
    e.target.playVideo()
  }

  React.useEffect(() => {
    const player = youtubeRef.current.getInternalPlayer()
    const handleKeyUp = (e) => {
      const code = e.keyCode

      if (code === 27 /* Escape */) {
        player.pauseVideo()
      }
      if (code === 32 /* Space */ || code === 13 /* Enter */) {
        player.playVideo()
      }
    }

    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <YouTube
      ref={youtubeRef}
      opts={options}
      videoId={videoId}
      onReady={handleReady}
      onEnd={handleEnd}
      {...restProps}
    />
  )
}
