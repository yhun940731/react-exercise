import React from 'react'
import { Helmet } from 'react-helmet-async'

import { tmdb } from 'api'
import { useFetchData, STATUS } from 'hooks'
import { useBookmark, addBookmarkAction } from 'contexts/Bookmark'
import { Effects, BookmarkButton, YoutubePlayer } from 'components'
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

// 초기 상태
// const initialBookmark = []

// 리듀서 (순수) 함수
// function bookmarkReducer(state, action) {
//   switch (action.type) {
//     case 'create':
//       return [...state, action.payload]

//     case 'update':
//       return state.map((bookmark) => {
//         return bookmark.id === action.payload.id ? action.payload : bookmark
//       })

//     case 'delete':
//       return state.filter(({ id }) => id !== action.payload.id)

//     case 'read':
//     default:
//       return state
//   }
// }

// 사용자가 좋아요(❤️) 버튼을 누르면 `쓰기(create)`를 요청(알림)
// dispatch({type: create, payload: newBookmark})
// dispatch({type: 'read', payload: newBookmark.id})

/* -------------------------------------------------------------------------- */

const { idle, pending, rejected, resolved } = STATUS

export default function MovieDetailPage({ match }) {
  // [상태, 디스패치] = useReducer 훅 활용
  // const [state, dispatch] = React.useReducer(bookmarkReducer, initialBookmark)
  // console.log(state)

  const [status, error, json] = useFetchData(tmdb.getDetail(match.params.id))
  const [checkBookmark, setCheckBookmark] = React.useState(false)

  const { dispatch } = useBookmark()

  // console.log(dispatch)
  // console.log(addBookmarkAction)

  const addBookmark = (bookmarkObject) => {
    setCheckBookmark(true)
    dispatch(addBookmarkAction(bookmarkObject))
  }

  // const addBookmark = (bookmarkObject) => {
  //   setCheckBookmark(true)

  //   dispatch({
  //     type: 'create',
  //     payload: bookmarkObject,
  //   })
  // }

  // const toggleBookmark = (bookmarkObject) => {
  //   setCheckBookmark(!checkBookmark)

  //   dispatch({
  //     type: !checkBookmark ? 'create' : 'delete',
  //     payload: bookmarkObject,
  //   })
  // }

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
    // 무비 정보
    // console.log(json)

    // backdrop_path
    // poster_path
    // genres
    // homepage
    // title
    // tagline
    // overview
    // videos.results[1].key

    // if (json) {
    //   const { poster_path, homepage, title, tagline, overview } = json

    //   if (state.length === 0) {
    //     dispatch({
    //       type: 'create',
    //       payload: {
    //         id: match.params.id,
    //         title,
    //         tagline,
    //         overview,
    //         poster: poster_path,
    //         homepage,
    //       },
    //     })
    //   }
    // }

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
                // toggleBookmark
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
              iconProps={{
                size: '2x',
              }}
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
