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

const WRITE_ALL_BOOKMARK = '모든 북마크 교체'
const READ_ALL_BOOKMARKS = '모든 북마크 읽기'
const ADD_BOOKMARK = '북마크 추가'
const EDIT_BOOKMARK = '북마크 수정'
const REMOVE_BOOKMARK = '북마크 제거'

/* action creators ---------------------------------------------------------- */

export const readAllBookmarksAction = () => ({
  type: READ_ALL_BOOKMARKS,
})

export const writeAllBookmarkAction = (newBookmarks) => ({
  type: WRITE_ALL_BOOKMARK,
  payload: newBookmarks,
})

export const addBookmarkAction = (newBookmark) => ({
  type: ADD_BOOKMARK,
  payload: newBookmark,
})

export const editBookmarkAction = (willEditBookmark) => ({
  type: EDIT_BOOKMARK,
  payload: willEditBookmark,
})

export const removeBookmarkAction = (willRemoveBookmark) => ({
  type: REMOVE_BOOKMARK,
  payload: willRemoveBookmark,
})

/* initial state + reducer -------------------------------------------------- */

const initialState = []

export const bookmarkReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
    case READ_ALL_BOOKMARKS:
      return state

    case WRITE_ALL_BOOKMARK:
      return payload

    case ADD_BOOKMARK:
      return [...state, payload]

    case EDIT_BOOKMARK:
      return state.map((bookmark) =>
        bookmark.id === payload.id ? payload : bookmark
      )

    case REMOVE_BOOKMARK:
      return state.filter((bookmark) => bookmark.id !== payload.id)
  }
}
