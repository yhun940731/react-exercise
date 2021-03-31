import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { tmdb } from 'api'
import { Bookmark } from 'components'

import { useSelector, useDispatch } from 'react-redux'

import {
  selectBookmarks,
  readAllBookmarksAction,
  removeBookmarkAction,
} from 'redux/storage/bookmarks/bookmarks'
import useDetectViewport from 'hooks/useDetectVieport'

/* component ---------------------------------------------------------------- */

export default function BookmarkPage() {
  const bookmarks = useSelector((state) => selectBookmarks(state))
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(readAllBookmarksAction())
  }, [dispatch])

  const handleRemoveBookmark = (willRemoveBookmark) => {
    dispatch(removeBookmarkAction(willRemoveBookmark))
  }

  const { isMobile } = useDetectViewport()

  return (
    <div className="bookmark-page">
      <Helmet>
        <title>북마크 페이지 (인증 사용자 전용) ← "나의 영화" 서비스</title>
      </Helmet>

      {bookmarks.length === 0 ? (
        <Bookmark.Empty>
          <h2>북마크 된 영화가 존재하지 않습니다.</h2>
          <Link to="/movies">영화 목록 페이지로 이동하시겠습니까?</Link>
        </Bookmark.Empty>
      ) : (
        <Bookmark.List isMobile={isMobile}>
          {bookmarks.map(
            ({ id, poster, title, tagline, overview, homepage }) => {
              return (
                <Bookmark key={id}>
                  <Bookmark.HomepageLink
                    href={homepage}
                    external
                    isMobile={isMobile}
                  >
                    <Bookmark.Poster
                      src={tmdb.getImageURL(poster)}
                      alt=""
                      isMobile={isMobile}
                    />
                  </Bookmark.HomepageLink>
                  <Bookmark.Container isMobile={isMobile}>
                    <Bookmark.Container column>
                      <Bookmark.Title isMobile={isMobile}>
                        {title}
                      </Bookmark.Title>
                      <Bookmark.Tagline isMobile={isMobile}>
                        {tagline}
                      </Bookmark.Tagline>
                    </Bookmark.Container>
                    <Bookmark.Button
                      isActive={true}
                      isMobile={isMobile}
                      iconProps={{ size: '2x' }}
                      onClick={() =>
                        handleRemoveBookmark({
                          id,
                          poster,
                          title,
                          tagline,
                          overview,
                          homepage,
                        })
                      }
                    />
                  </Bookmark.Container>
                  <Bookmark.Overview isMobile={isMobile}>
                    {overview}
                  </Bookmark.Overview>
                </Bookmark>
              )
            }
          )}
        </Bookmark.List>
      )}
    </div>
  )
}
