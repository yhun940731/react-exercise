import { tmdb } from 'api'
import { useFetchData, STATUS } from 'hooks'
import { Effects, LazyLoadingImg } from 'components'
import { Helmet } from 'react-helmet-async'
import { list, figure, title } from './MovieList.module.scss'
import { Link } from 'react-router-dom'

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
            <title>영화 목록 ← "나의 영화" 서비스</title>
          </Helmet>
          <ul className={list}>
            {json &&
              json?.results.map((movie) => (
                <li key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <figure className={figure}>
                      <LazyLoadingImg
                        src={tmdb.getImageURL(movie.poster_path)}
                        alt=""
                      />
                      <figcaption className={title}>{movie.title}</figcaption>
                    </figure>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )
    case rejected:
      return <div role="alert">{error.message}</div>
  }
}
