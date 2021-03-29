import { container } from './PageNotFound.module.scss'
import { Helmet } from 'react-helmet-async'

export default function PageNotFound() {
  return (
    <div className={container} role="alert">
      <Helmet>
        <title>문제 발생! ← "나의 영화" 서비스</title>
      </Helmet>
      <h2>찾는 페이지가 존재하지 않습니다.</h2>
      <a href="/">홈 페이지로 이동하시겠습니까?</a>
    </div>
  )
}
