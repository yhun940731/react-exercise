import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './storage'

import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

/* middlewares -------------------------------------------------------------- */

const middlewares = [logger]

/* persist store ------------------------------------------------------------ */

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'bookmarks', 
    // 인증 정보 → Firebase 에서 관리하도록 설정
    // 'auth'
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

/* store -------------------------------------------------------------------- */

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

const persistor = persistStore(store)

/* store provider wrapper component ----------------------------------------- */

export const StoreProvider = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  )
}
