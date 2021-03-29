import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from './storage'

/* middlewares -------------------------------------------------------------- */
const middlewares = [logger]

/* create store ------------------------------------------------------------- */

const store = createStore(
  // 루트 리듀서 (리듀서 병합)
  rootReducer,
  // 미들웨어 적용
  applyMiddleware(...middlewares)
)

/* store provider wrapper component ----------------------------------------- */

export const StoreProvider = (props) => {
  return <Provider store={store}>{props.children}</Provider>
}
