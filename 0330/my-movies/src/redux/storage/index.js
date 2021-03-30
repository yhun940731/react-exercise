import { combineReducers } from 'redux'
import { authReducer } from './auth/auth'
import { bookmarkReducer } from './bookmarks/bookmarks'

/* root reducer ------------------------------------------------------------- */

const rootReducer = combineReducers({
  auth: authReducer,
  bookmarks: bookmarkReducer,
})

export default rootReducer
