import { container } from './PageNotFound.module.scss'

export default function PageNotFound() {
  return (
    <div className={container} role="alert">
      <h2>찾는 페이지가 존재하지 않습니다.</h2>
      <a href="/">홈 페이지로 이동하시겠습니까?</a>
    </div>
  )
}
