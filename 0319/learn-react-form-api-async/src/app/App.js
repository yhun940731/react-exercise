import React from 'react'
import { ReactComponent as Atom } from '../assets/atom.svg'

const { REACT_APP_NEWS_KEY: API_KEY } = process.env

/* -------------------------------------------------------------------------- */
function App() {
  // 뉴스 API로부터 비동기 요청으로 응답 받을 데이터를 보관할 상태
  // 상태 업데이트 함수 추출
  const [news, setNews] = React.useState([])
  // 오류 상태 관리
  const [hasError, setHasError] = React.useState(null)
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = React.useState(false)

  // 사이드 이펙트
  // 명령형, 구독(취소), 비동기(네트워크) 데이터 패치, ...
  React.useEffect(
    () => {
      setIsLoading(true)
      // 비동기 요청
      fetch(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}&category=entertainment&q=브레이브&pageSize=99/`
      )
        // resolved
        .then((response) => response.json())
        .then(({ articles }) => {
          setNews(articles)
          setIsLoading(false)
        })
        // rejected
        .catch((error) => {
          setHasError(error)
          setIsLoading(false)
        })
    },
    // 1회만 API에 요청(응답) → 상태 업데이트
    []
  )

  // 로딩 중인 상태이면 로딩 중 임을 사용자에게 표시
  if (isLoading) {
    return (
      <Atom
        title="로딩 중..."
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    )
  }

  // 오류가 발생한 상황에서 렌더링
  if (hasError) {
    return <div role="alert">{hasError.message}</div>
  }

  // 정상적으로 요청이 처리되어 응답이 온 경우 렌더링
  return (
    <div className="App" lang="en">
      <h1>World Wide News Headlines</h1>
      <div className="newsArea" lang="ko">
        <ul>
          {news.map((item, index) => {
            return (
              <li key={item.url}>
                {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                <h2>{item.title}</h2>
                <img src={item.urlToImage} alt="" height={80} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
