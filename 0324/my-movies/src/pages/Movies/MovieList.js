import { tmdb } from 'api'
import { useFetchData, STATUS } from 'hooks'
import { Effects } from 'components'
import { Helmet } from 'react-helmet'
import { list, figure, title } from './MovieList.module.scss'

const { idle, pending, resolved, rejected } = STATUS

/* -------------------------------------------------------------------------- */

export default function MoviesPage() {
  const [status, error, json] = useFetchData(tmdb.discover())

  switch (status) {
    default:
    case idle:
      return null
    case pending:
      return <Effects message="로딩 중" />
    case resolved:
      return (
        <div className="movie-list-page">
          <Helmet>
            <title>무비 리스트 페이지 ← "나의 영화" 서비스</title>
          </Helmet>
          <ul className={list}>
            {json &&
              json?.results.map((movie) => (
                <li key={movie.id}>
                  <a href={`/movie/${movie.id}`}>
                    <figure className={figure}>
                      <img src={tmdb.getImageURL(movie.poster_path)} alt="" />
                      <figcaption className={title}>{movie.title}</figcaption>
                    </figure>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )
    case rejected:
      return <div role="alert">{error.message}</div>
  }
}
