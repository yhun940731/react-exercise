import 'styles/pages/page.scss'
import { Effects } from 'components'
import image from 'assets/vision.png'
import { Helmet } from 'react-helmet'
import { vision, effect } from './Home.module.scss'

/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <div className="home-page">
      <Helmet>
        <title>홈 페이지 ← "나의 영화" 서비스</title>
      </Helmet>
      <Effects message="ENTER" className={effect} />
      <img className={vision} src={image} alt="" />
    </div>
  )
}
