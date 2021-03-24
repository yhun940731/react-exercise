import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import './styles/index.css';
import { StrictMode } from 'react';
import { render } from 'react-dom';

// import App from './containers/App/App';

// JSX 학습
// 데이터 -> 인터폴레이션(보간) -> JSX -> React.createElement()
const songs = [
  {
    id: 'song-kwez',
    title: '오늘도 난 봄을 기다려',
    artist: '케이시',
    song: 'mp3',
    cover: 'http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/903/108/81903108_1613633285391_1_600x600.JPG',
    active: true,
    colors: '#9070b6 d394a7'.split(' '),
    albumClass: "song-figure",
  }
]

function renderAlbumFigure({ active, albumClass, cover, song, colors}) {
  return active ? (
    <figure className={albumClass}>
      <img src={cover} alt=""/>
      <figcaption>
        <div>
          <a href={song} download={true}>download mp3</a>
        </div>
        <span lang='ko'>
          선택한 앨범의 컬러 개수: <b>{colors.length}</b>
        </span>
      </figcaption>
    </figure>
  ) : null
}

// React 요소 (JSX 활용)
// const albumElement = (
//   <div className="song-container" lang="ko">
//     <h1 className="song-info">{`${songs[0].title} -> ${songs[0].artist}`}</h1>
//     {renderAlbumFigure(songs[0])}
//   </div>
// )


const albumElement = (()=> {
  let firstSong = songs[0]

  firstSong = {
    ...firstSong,
    active: false,
  }

  console.log(firstSong);

  const styleObject = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'colum',
  }

    return (
      <div className="song-container" lang="ko" style={styleObject}>
      <h1 className="song-info">{`${firstSong.title} -> ${firstSong.artist}`}</h1>
      {renderAlbumFigure(firstSong)}
    </div>
    )
})();

render(
  <StrictMode>
    {/* <App /> */}
    {albumElement}
  </StrictMode>,
  document.getElementById('root')
);
