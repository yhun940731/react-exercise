/* reselct ------------------------------------------------------------------ */
import { createSelector } from 'reselect'

const selectBookmarksState = (state) => state.bookmarks

export const selectBookmarks = createSelector(
  [selectBookmarksState],
  (bookmarks) => bookmarks
)

/* action types ------------------------------------------------------------- */

const ADD_BOOKMARK = '북마크 추가'
const EDIT_BOOKMARK = '북마크 수정'
const REMOVE_BOOKMARK = '북마크 제거'
const READ_ALL_BOOKMARKS = '모든 북마크 읽기'

/* action creators ---------------------------------------------------------- */

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
export const readAllBookmarkAction = () => ({
  type: READ_ALL_BOOKMARKS,
})

/* intial state + reducers -------------------------------------------------- */

const initialState = []

export const bookmarksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_BOOKMARK:
      return [...state, payload]
    case EDIT_BOOKMARK:
      return state.map((bookmark) =>
        bookmark.id === payload.id ? payload : bookmark
      )
    case REMOVE_BOOKMARK:
      return state.filter((bookmark) => bookmark.id !== payload.id)
    default:
    case READ_ALL_BOOKMARKS:
      return state
  }
}
