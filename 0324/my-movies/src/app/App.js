import { HeaderBar } from 'containers'
import { Switch, Route, Redirect } from 'react-router-dom'
import {
  HomePage,
  PageNotFound,
  MovieListPage,
  MovieDetailPage,
  BookmarkPage,
} from 'pages'

/* -------------------------------------------------------------------------- */

function App() {
  return (
    <div className="App">
      <HeaderBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies" component={MovieListPage} />
        <Route path="/movie/:id" component={MovieDetailPage} />
        <Route path="/bookmark" component={BookmarkPage} />
        <Route path="/page-not-found" component={PageNotFound} />
        <Redirect to="/page-not-found" />
      </Switch>
    </div>
  )
}

export default App
