import React from 'react'
import { Helmet } from 'react-helmet-async'

import { tmdb } from 'api'
import { useFetchData, STATUS, useDetectViewport } from 'hooks'
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
  mobileOnly,
} from './MovieDetail.module.scss'

/* dispatch + action creator ------------------------------------------------ */

import { useDispatch } from 'react-redux'
import { addBookmarkAction } from 'redux/storage/bookmarks/bookmarks'

/* component ---------------------------------------------------------------- */

const { idle, pending, rejected, resolved } = STATUS

export default function MovieDetailPage({ match }) {
  const [status, error, json] = useFetchData(tmdb.getDetail(match.params.id))
  const [checkBookmark, setCheckBookmark] = React.useState(false)
  const dispatch = useDispatch()

  const addBookmark = (newBookmark) => {
    setCheckBookmark(true)
    dispatch(addBookmarkAction(newBookmark))
  }

  const { isMobile } = useDetectViewport()

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
    return (
      <div className="movie-page">
        <Helmet>
          <title>"{json.title}" 영화 안내 ← "나의 영화" 서비스</title>
        </Helmet>
        <div className={`${container} ${isMobile ? mobileOnly : ''}`.trim()}>
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
              iconProps={{
                size: '2x',
              }}
            />
            <p className={tagline}>{json.tagline}</p>
          </div>
          <p className={overview}>{json.overview}</p>
        </div>
        <div className={videoTrailer}>
          {json.videos.results[1] && !isMobile && (
            <YoutubePlayer videoId={json.videos.results[1].key} />
          )}
        </div>
      </div>
    )
  }
}
