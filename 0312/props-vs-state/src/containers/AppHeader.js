/* eslint-disable react/jsx-no-target-blank */
import {ReactComponent as Logo} from 'assets/logo.svg'

export const AppHeader = ({ logo, renderMessage, link }) => {
  return (
    <header className="App-header">
      <Logo title={logo.label} alt="logo" />
      <p>{renderMessage()} 문서를 수정하면 실시간 업데이트 됩니다</p>
      <a
        className="App-link"
        href={link.path}
        rel={link.external ? "noopener noreferrer" : null}
        target={link.external ? '_blank' : null}
      >
        React를 배워보세요
      </a>
    </header>
  )
}
