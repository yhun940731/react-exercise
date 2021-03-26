import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/index.scss'

import App from './app/App'

render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root')
)
