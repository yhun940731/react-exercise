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
import { AuthProvider } from 'contexts'

/* -------------------------------------------------------------------------- */

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <div className="App">
          <HeaderBar />
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
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
