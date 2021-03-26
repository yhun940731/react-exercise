import React from 'react'
import { tmdb } from 'api'
import { useFetchData, STATUS } from 'hooks'
import { Effects, YoutubePlayer, BookmarkButton } from 'components'
import { Helmet } from 'react-helmet-async'
import {
  container,
  videoTrailer,
  poster,
  headline,
  title,
  tagline,
  overview,
  button,
} from './MovieDetail.module.scss'

/* -------------------------------------------------------------------------- */

const initialBookmark = []

function bookmarkReducer(state, action) {
  switch (action.type) {
    case 'create':
      return [...state, action.payload]
    case 'update':
      return state.map((bookmark) => {
        return bookmark.id === action.payload.id ? action.payload : bookmark
      })
    case 'delete':
      return state.filter(({ id }) => id !== action.payload)
    // 읽기를 시도할 경우, 현재 상태를 반환하도록 설정합니다.
    // 읽기 id
    case 'read':
    default:
      return state
  }
}

/* -------------------------------------------------------------------------- */

const { idle, pending, rejected, resolved } = STATUS

export default function MovieDetailPage({ match }) {
  const [state, dispatch] = React.useReducer(bookmarkReducer, initialBookmark)

  const [status, error, json] = useFetchData(tmdb.getDetail(match.params.id))

  // 북마크 체크 상태 관리
  const [checkBookmark, setCheckBookmark] = React.useState(false)

  // 이펙트 훅
  React.useEffect(() => {
    console.log(state)
  }, [state])

  // 이벤트 리스너 설정
  const addBookmark = (newBookmark) => {
    // 컴포넌트 상태 업데이트
    setCheckBookmark(true)
    // 리듀서에게 디스패치 → 리듀서 (상태 업데이트) → React 리랜더링 (컴포넌트 업데이트)
    dispatch({
      type: 'create',
      payload: newBookmark,
    })
  }

  if (status === idle) {
    return null
  }

  if (status === pending) {
    return <Effects message="로딩중" />
  }

  if (status === rejected) {
    return <div role="alert">{error.message}</div>
  }

  if (status === resolved) {
    return !json ? (
      <Effects message="로딩중" />
    ) : (
      <div className="movie-page">
        <Helmet>
          <title>"{json.title}" 영화 안내 ← "나의 영화" 서비스</title>
        </Helmet>
        <div className={container}>
          <a href={json.homepage} target="_blank" rel="noreferrer noopener">
            <img
              className={poster}
              src={tmdb.getImageURL(json.poster_path, 200)}
              alt={json.title}
              height={480}
            />
          </a>
          <div className={headline}>
            <h2 className={title}>{json.title}</h2>
            <BookmarkButton
              isActive={checkBookmark}
              disabled={checkBookmark}
              onClick={() =>
                addBookmark({
                  id: match.params.id,
                  title: json.title,
                  tagline: json.tagline,
                  overview: json.overview,
                  poster: json.poster_path,
                  homepage: json.homepage,
                })
              }
              className={button}
              iconProps={{ size: '2x' }}
            />
            <p className={tagline}>{json.tagline}</p>
          </div>
          <p className={overview}>{json.overview}</p>
        </div>
        <div className={videoTrailer}>
          {json.videos.results[1] && (
            <YoutubePlayer videoId={json.videos.results[1].key} />
          )}
        </div>
      </div>
    )
  }
}
