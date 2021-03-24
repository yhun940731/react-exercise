import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import { StrictMode } from 'react'
import { render } from 'react-dom'
import './styles/index.scss'
import Parent from './components/Parent/Parent'

render(
  <StrictMode>
    <Parent />
  </StrictMode>,
  document.getElementById('root')
)
