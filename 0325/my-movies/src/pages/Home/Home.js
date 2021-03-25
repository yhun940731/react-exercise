import 'styles/pages/page.scss'
import { Effects } from 'components'
import image from 'assets/vision.png'
import { Helmet } from 'react-helmet-async'
import { vision, effect } from './Home.module.scss'

/* -------------------------------------------------------------------------- */

export default function HomePage({ history }) {
  return (
    <div className="home-page">
      <Helmet>
        <title>홈 ← "나의 영화" 서비스</title>
      </Helmet>
      <Effects message="ENTER" className={effect} />
      <a
        href="#go-to-movies"
        onClick={(e) => {
          e.preventDefault()
          history.push('/movies')
        }}
      >
        <img className={vision} src={image} alt="영화 목록 페이지로 이동" />
      </a>
    </div>
  )
}
