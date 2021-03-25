import { Link } from 'react-router-dom'
import { headline, link, dot } from './HomeLink.module.scss'

export default function HomeLink() {
  return (
    <h1 lang="en" className={headline}>
      <Link
        to={{
          pathname: '/',
        }}
        className={link}
      >
        <span style={{ alignItems: 'flex-end' }}>_</span>MY
        <span className={dot}>.</span>MOVIES
      </Link>
    </h1>
  )
}
