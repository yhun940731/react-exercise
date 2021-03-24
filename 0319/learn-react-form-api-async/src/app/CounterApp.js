import { useState } from 'react'
import Counter from '../components/Counter/Counter.function'

/* -------------------------------------------------------------------------- */

// 함수 컴포넌트에서 count 상태 관리
// 제어에 필요한 업데이트 함수 또한 관리
function App() {
  // count, setCount
  const [count, setCount] = useState(9)
  const [count2, setCount2] = useState(2)

  const updateCount = (step) => {
    setCount(count + step)
  }

  const updateCount2 = (step) => {
    setCount2(count2 + step)
  }

  return (
    <div className="App">
      {/* 상태 끌어올리기 */}
      <Counter className="using-compound-components">
        <Counter.Control
          label="카운트 감소"
          onUpdate={updateCount}
          step={0.5} // step 기본 값은 1이므로 생략 가능
        >
          -
        </Counter.Control>
        <Counter.Display>{count}</Counter.Display>
        <Counter.Control label="카운트 증가" onUpdate={updateCount} step={1.5}>
          +
        </Counter.Control>
      </Counter>

      <hr />

      <Counter className="using-compound-components">
        <Counter.Control
          label="감소"
          title="감소"
          onUpdate={updateCount2}
          // step={0.5} // step 기본 값은 1이므로 생략 가능
        >
          감소(-)
        </Counter.Control>
        <Counter.Display>{count2}</Counter.Display>
        <Counter.Control
          label="증가"
          title="증가"
          onUpdate={updateCount2}
          step={3}
        >
          증가(+)
        </Counter.Control>
      </Counter>
    </div>
  )
}

export default App
