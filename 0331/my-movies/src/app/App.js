import { HeaderBar } from 'containers'
import { Switch, Route, Redirect } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import {
  HomePage,
  MovieListPage,
  MovieDetailPage,
  BookmarkPage,
  PageNotFound,
} from 'pages'

/* -------------------------------------------------------------------------- */

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <HeaderBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies" component={MovieListPage} />
          <Route path="/movie/:id" component={MovieDetailPage} />
          <Route path="/bookmark" component={BookmarkPage} />
          <Route path="/page-not-found" component={PageNotFound} />
          <Redirect to="/page-not-found" />
        </Switch>
      </HelmetProvider>
    </div>
  )
}

export default App
