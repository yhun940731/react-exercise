import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/index.scss'

// Redux에서 공급하는 Store의 State, Dispatchf를 컴포넌트에 전달하는 래퍼 컴포넌트
import { StoreProvider } from 'redux/store'
import App from './app/App'

render(
  <StrictMode>
    <Router>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
)
