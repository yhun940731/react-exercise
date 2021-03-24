import { tmdb } from 'api'
import { useFetchData, STATUS } from 'hooks'
import { Effects, YoutubePlayer } from 'components'
import { Helmet } from 'react-helmet'
import {
  container,
  videoTrailer,
  poster,
  headline,
  title,
  tagline,
  overview,
} from './Movie.module.scss'

/* -------------------------------------------------------------------------- */

const { idle, pending, rejected, resolved } = STATUS

export default function MovieDetailPage({ match }) {
  // props → ID: 596247, 527774, 464052, 399566
  const [status, error, json] = useFetchData(tmdb.getDetail(match.params.id))

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

    return json ? (
      <div className="movie-page">
        <Helmet>
          <title>{json.title} 영화 정보 페이지 ← "나의 영화" 서비스</title>
        </Helmet>
        <div className={container}>
          <a href={json.homepage} target="_blank" rel="noreferrer noopener">
            <img
              className={poster}
              src={tmdb.getImageURL(json.poster_path, 200)}
              alt={json.title}
            />
          </a>
          <div className={headline}>
            <h2 class={title}>{json.title}</h2>
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
    ) : null
  }
}
