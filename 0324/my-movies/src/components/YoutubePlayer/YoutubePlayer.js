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

  const _onReady = (e) => {
    e.target.mute()
  }

  return (
    <YouTube
      opts={options}
      videoId={videoId}
      onReady={_onReady}
      {...restProps}
    />
  )
}
