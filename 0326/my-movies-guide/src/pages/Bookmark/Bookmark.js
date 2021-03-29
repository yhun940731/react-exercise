import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { tmdb } from 'api'
import {
  useBookmark,
  readAllBookmarkAction,
  deleteBookmarkAction,
} from 'contexts'
import { Bookmark } from 'components'

/* -------------------------------------------------------------------------- */

export default function BookmarkPage() {
  const { state, dispatch } = useBookmark()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => dispatch(readAllBookmarkAction()), [])

  return (
    <div className="bookmark-page">
      <Helmet>
        <title>북마크 페이지 (인증 사용자 전용) ← "나의 영화" 서비스</title>
      </Helmet>

      {state.length === 0 ? (
        <Bookmark.Empty>
          <h2>북마크 된 영화가 존재하지 않습니다.</h2>
          <Link to="/movies">영화 목록 페이지로 이동하시겠습니까?</Link>
        </Bookmark.Empty>
      ) : (
        <Bookmark.List>
          {state.map(({ id, poster, title, tagline, overview, homepage }) => {
            return (
              <Bookmark key={id}>
                <Bookmark.HomepageLink href={homepage} external>
                  <Bookmark.Poster src={tmdb.getImageURL(poster)} alt="" />
                </Bookmark.HomepageLink>
                <Bookmark.Container>
                  <Bookmark.Container column>
                    <Bookmark.Title>{title}</Bookmark.Title>
                    <Bookmark.Tagline>{tagline}</Bookmark.Tagline>
                  </Bookmark.Container>
                  <Bookmark.Button
                    isActive={true}
                    iconProps={{ size: '2x' }}
                    onClick={() =>
                      dispatch(
                        deleteBookmarkAction({
                          id,
                          poster,
                          title,
                          tagline,
                          overview,
                          homepage,
                        })
                      )
                    }
                  />
                </Bookmark.Container>
                <Bookmark.Overview>{overview}</Bookmark.Overview>
              </Bookmark>
            )
          })}
        </Bookmark.List>
      )}
    </div>
  )
}
