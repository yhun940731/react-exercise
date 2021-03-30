/* reselect ----------------------------------------------------------------- */
import { createSelector } from 'reselect'

const selectBookmarksState = (state) => {
  return state.bookmarks
}

export const selectBookmarks = createSelector(
  [selectBookmarksState],
  (bookmarks) => bookmarks
)

/* action types ------------------------------------------------------------- */

const READ_ALL_BOOKMARKS = '모든 북마크 읽기'
const ADD_BOOKMARK = '북마크 추가'
const EDIT_BOOKMARK = '북마크 수정'
/**
 * remove vs delete vs erase
 * 참고: https://blog.naver.com/betterkc/150119228804
 */
const REMOVE_BOOKMARK = '북마크 제거'

/* action creators ---------------------------------------------------------- */

export const readAllBookmarksAction = () => ({
  type: READ_ALL_BOOKMARKS,
})

export const addBookmarkAction = (newBookmark) => ({
  type: ADD_BOOKMARK,
  newBookmark,
})

export const editBookmarkAction = (willEditBookmark) => ({
  type: EDIT_BOOKMARK,
  willEditBookmark,
})

export const removeBookmarkAction = (willRemoveBookmark) => ({
  type: REMOVE_BOOKMARK,
  willRemoveBookmark,
})

/* initial state + reducer -------------------------------------------------- */

const initialState = []

export const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
    case READ_ALL_BOOKMARKS:
      return state

    case ADD_BOOKMARK:
      return [...state, action.newBookmark]

    case EDIT_BOOKMARK:
      return state.map((bookmark) =>
        bookmark.id === action.willEditBookmark.id
          ? action.willEditBookmark
          : bookmark
      )

    case REMOVE_BOOKMARK:
      return state.filter(
        (bookmark) => bookmark.id !== action.willRemoveBookmark.id
      )
  }
}
