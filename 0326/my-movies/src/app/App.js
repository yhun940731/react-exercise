import { HeaderBar } from 'containers'
import { Switch, Route, Redirect } from 'react-router-dom'
import {
  HomePage,
  PageNotFound,
  MovieListPage,
  MovieDetailPage,
  BookmarkPage,
  DemoPage,
} from 'pages'
import { HelmetProvider } from 'react-helmet-async'
import React from 'react'
import { AuthContext } from 'contexts'

/* -------------------------------------------------------------------------- */

const initialAuth = null

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return action.authUser
    case 'signout':
      return null
    default:
      throw new Error('요구되는 액션 타입이 존재하지 않습니다.')
  }
}

/* -------------------------------------------------------------------------- */

function App() {
  const [state, dispatch] = React.useReducer(authReducer, initialAuth)
  const [isSignined, setIsSigned] = React.useState(false)

  React.useEffect(() => {
    console.log(state)
  }, [state])

  const signIn = () => {
    setIsSigned(true)
    dispatch({
      type: 'signin',
      authUser: {
        uid: 'fjkdsfjwjijfmw',
        displayName: '야무',
        photoURL: 'https://test.com/test.jpg',
        email: 'yamoo9@euid.dev',
      },
    })
  }
  const signOut = () => {
    setIsSigned(false)
    dispatch({
      type: 'signout',
    })
  }

  return (
    <HelmetProvider>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <div className="App">
          <HeaderBar />
          <button type="button" onClick={isSignined ? signOut : signIn}>
            {isSignined ? '로그아웃' : '로그인'}
          </button>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies" component={MovieListPage} />
            <Route path="/movie/:id" component={MovieDetailPage} />
            <Route path="/bookmark" component={BookmarkPage} />
            <Route path="/demo" component={DemoPage} />
            <Route path="/page-not-found" component={PageNotFound} />
            <Redirect to="/page-not-found" />
          </Switch>
        </div>
      </AuthContext.Provider>
    </HelmetProvider>
  )
}

export default App
