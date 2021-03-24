import { headline } from './Bookmark.module.scss'
import { Helmet } from 'react-helmet'

/* -------------------------------------------------------------------------- */

export default function BookmarkPage(props) {
  return (
    <div className="bookmark-page">
      <Helmet>
        <title>북마크 페이지 (인증 사용자 전용) ← "나의 영화" 서비스</title>
      </Helmet>
      <h1 className={headline}>북마크 페이지</h1>
    </div>
  )
}
