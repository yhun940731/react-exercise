import { app, appHeader, appLogo, appLink } from './App.module.scss'
import logo from 'assets/logo.svg'

console.log(app, appHeader, appLogo, appLink)

function App() {
  return (
    <div className={app}>
      <header className={appHeader}>
        <img src={logo} className={appLogo} alt="logo" />
        <p>
          <code>src/App.js</code> 문서를 수정하면 실시간 업데이트 됩니다
        </p>
        <a
          className={appLink}
          href="https://ko.reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          React를 배워보세요
        </a>
      </header>
    </div>
  )
}

export default App
