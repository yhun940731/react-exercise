import { combineReducers } from 'redux'
import { authReducer } from './auth/auth'
import { bookmarksReducer } from './bookmarks/bookmarks'

/* root reducer (combine reducers) ------------------------------------------ */

// {
//   auth: {
//     authUser: object,
//     isAuthed: boolean
//   },
//   bookmarks: []
// }

const rootReducer = combineReducers({
  auth: authReducer,
  bookmarks: bookmarksReducer,
})

export default rootReducer
