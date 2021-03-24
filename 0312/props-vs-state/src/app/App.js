import { AppHeader } from 'containers/AppHeader'
import React from 'react'
import './App.scss'

// 클래스형 컴포넌트
class App extends React.Component {
  // 클래스(정적) 맴버
  // static defaultProps = {

  // }

  // static propTypes = {

  // }
  
  // 클래스 필드 선언 활용
  // 인스턴스 맴버
  // data = {
  //   logo: {
  //     label: 'React',
  //   },
  //   message: `${<code>src/App.js</code>} 문서를 수정하면 실시간 업데이트 됩니다`,
  // }

  // 맴버는 JSX에 사용되는 데이터 보관

  render() {
    const { logo, renderMessage, link } = this.props
    return (
    <div className="App">
      <AppHeader logo={logo} renderMessage={renderMessage} link={link}/>
    </div>
    )
  }
}

// 함수형 컴포넌트
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <Logo title="React" />
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           <code>src/App.js</code> 문서를 수정하면 실시간 업데이트 됩니다
//         </p>
//         <a
//           className="App-link"
//           href="https://ko.reactjs.org"
//           rel="noopener noreferrer"
//           target="_blank"
//         >
//           React를 배워보세요
//         </a>
//       </header>
//     </div>
//   )
// }

export default App
