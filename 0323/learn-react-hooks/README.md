# 학습 주제

지난 주에 이어 React 훅에 대한 개념/응용을 학습합니다.

<br>

## 틱택토 (상태 관리)

[틱택토](https://ko.wikipedia.org/wiki/%ED%8B%B1%ED%83%9D%ED%86%A0) 게임은 두 명이 번갈아가며 `O`와 `X`를 보드 판(3×3)에 써서 같은 글자를 가로, 세로, 혹은 대각선 상에 놓이도록 하는 놀이입니다. 

![](https://upload.wikimedia.org/wikipedia/commons/a/ae/Tic_Tac_Toe.gif)

<br>

### 보드 판 (상태)

Board 함수 컴포넌트의 `squares` 상태(배열)는 게임 보드 판을 의미합니다.

```jsx
const squares = Array(9).fill(null)

squares[0] = SQUARE_VALUES.x
squares[1] = SQUARE_VALUES.o
squares[4] = SQUARE_VALUES.x
squares[3] = SQUARE_VALUES.o
squares[8] = SQUARE_VALUES.x
```

함수 컴포넌트에서 보드 판을 상태 관리하도록 다음과 같이 설정합니다.

```jsx
const INITIAL_SQUARES = Array(9).fill(null)

const [squares, setSquares] = React.useState(INITIAL_SQUARES)
```

<br>

### 파생 된(derived) 상태

파생 된 상태를 계산하는 함수는 다음과 같습니다.

함수 | 설명
--- | ---
`calcNextValue` | 다음 값(`o` 또는 `x`)을 계산해서 반환합니다.
`calcStatus` | 게임 상태(다음 플레이어 안내, 무승부 판정, 승자 선언)를 계산해서 반환합니다.
`calcWinner` | 게임 승자(게임 승리 알고리즘)를 계산해서 반환합니다.

<br>

함수 컴포넌트 안에서는 다음과 같이 작성할 경우 파생된 상태를 구현할 수 있습니다.

```jsx
const nextValue = calcNextValue(squares)
const winner = calcWinner(squares)
const status = calcStatus(winner, squares, nextValue)
```

<br>

클래스 컴포넌트에서 다뤘던 `getDerivedStateFromProps` 라이프 사이클 메서드는 이런 경우 사용됩니다.

```jsx
// 라이프 사이클 메서드
static getDerivedStateFromProps(props, state) {
  // Board 컴포넌트의 squares 상태 추출
  const { squares } = state

  // 틱택토 게임은 다음의 "파생된 상태"가 필요합니다.
  // - nextValue → ○ 또는 ✕
  const nextValue = calcNextValue(squares)
  // - winner    → ○ 또는 ✕ 또는 null
  const winner = calcWinner(squares)
  // - status    → `${winner} 승리!` 또는 `무승부!` 또는 `다음 플레이어는 ${nextValue}`)
  const status = calcStatus(winner, squares, nextValue)

  // 파생 된 상태를 반환합니다. (this.state에 병합)
  return {
    nextValue,
    winner,
    status,
  }
}
```

<br>

### 셀렉트 스퀘어 렌더링

사용자가 보드 판의 스퀘어를 클릭하면 선택된 스퀘어가 결과를 렌더링 해야 합니다.

> `renderSquare` 클릭(CLICK) → `selectSquare(squareIndex)` 실행

<br>

`selectSquare` 함수에 로직을 작성합니다.

```jsx
// React 프로그래밍에서 컴포넌트의 상태를 직접 변경하는 것은 문제를 유발합니다.
// 그러므로 squares 상태를 복사한 후, 변경하는 것이 좋습니다.
//
// 1. squares 상태를 복사합니다. (배열 복제)
const squaresCopy = [...squares]
```

```jsx
// 2. 선택된 스퀘어의 값을 복사한 squaresCopy의 squareIndex에 설정합니다. (배열[인덱스] = 값)
squaresCopy[squareIndex] = nextValue
```

```jsx
// 3. 복사, 변경된 squaresCopy를 squares 상태로 업데이트 합니다. (setState(업데이트 된 값))
setSquares(squaresCopy)
```

```jsx
// 0. 게임 종료 또는 클릭한 게임 보드의 스퀘어 값이 채워진 경우, 상태 변경을 중단해야 합니다.
if (winner || squares[squareIndex]) {
  return
}
```

<br>

### 게임 다시 시작

게임이 종료된 후, 사용자에 의해 게임을 다시 시작하려면 보드 판을 초기화 해야 합니다.

```jsx
// 게임 보드의 squares 상태를 초기화 합니다.
setSquares(INITIAL_SQUARES)
```

<br>

### 로컬 스토리지 활용

게임 중 브라우저 창이 닫혀도 다시 창을 열어 게임을 할 수 있도록 "실시간 저장 기능"을 추가해봅니다.

#### 실습 준비

`solution/04.js` → `solution/04.extra1.js` 복사 이름 변경

<br>

로컬 스토리지를 활용하기 위해 `window` 객체로부터 `localStorage`, `JSON`을 추출한 후, 다음과 같이 별칭을 설정합니다.

```jsx
const { 
  localStorage: storage, 
  JSON: {
    stringify: serialize,
    parse: deserialize
  } 
} = window
```

Board 컴포넌트의 이펙트 훅에서 로컬 스토리지에 데이터를 쓰고, 상태 훅에서 읽을 수 있도록 코드를 작성합니다.

```jsx
const [squares, setSquares] = React.useState(
  () => deserialize(storage.getItem('squares')) || INITIAL_SQUARES
)

React.useEffect(() => {
  storage.setItem('squares', serialize(squares))
})
```

<br>

### useLocalStorageState 커스텀 훅 활용


이전 실습에서 다룬 내용을 `useLocalStorageState` 커스텀 훅을 활용해 처리해봅니다.


#### 실습 준비

`solution/04.extra1.js` → `solution/04.extra2.js` 복사 이름 변경

<br>

`useLocalStorageState` 커스텀 훅을 불러온 후, 상태 & 이펙트 훅 코드를 대체합니다.

```jsx
const [squares, setSquares] = useLocalStorageState('squares', INITIAL_SQUARES)
```

<br>

### 게임 기록 기능 추가

게임 진행을 기록하는 기능을 추가해봅니다. 게임이 진행 될 때 마다 변경되는 상태를 저장한다면 추후 원하는 시점에 저장된 상태로 복구가 가능해집니다. 그에 따라 진행 중인 현재 스퀘어 상태를 저장 할 히스토리 상태와 진행 단계 상태 추가가 필요합니다. 

상태 | 설명
-- | --
`history` | 보드 게인 진행 기록 리스트 (`[[], [], [], ...]`)
`currentSquares` | 현재 보드 판 기록 아이템 (`[]`)
`currentStep` | 현재 진행 단계 순서(number)

예를 들면 다음과 같이 `history`, `currentSquares`, `currentStep`을 구성하는 것입니다.

```jsx
const history = [
  [/* 스탭 0: squares */], 
  [/* 스탭 1: squares */],
  [/* 스탭 2: squares */], 
  ...
]

const currentStep = 2
```

#### 실습 준비

`solution/04.extra2.js` → `solution/04.extra3.js` 복사 이름 변경

TicTacToe 함수 컴포넌트의 렌더링(JSX 반환) 코드를 다음과 같이 변경한 후 실습을 진행합니다.

```jsx
return (
  <div className="game">
    <div className="board">
      <Board onSelect={selectSquare} squares={currentSquares} />
      <button type="button" className="button--restart" onClick={restart}>
        게임 다시 시작
      </button>
    </div>
    <div className="info">
      <div className="info__status">{status}</div>
      <ol className="info__history">{renderHistoryItems}</ol>
    </div>
  </div>
)
```

#### 상태 끌어올리기

TicTacToe 컴포넌트에서 상태를 하위 컴포넌트로 전달해야 하므로, Board 컴포넌트에서 기존에 관리하던 상태(파생 된 상태 포함) 및 함수(`selectSquare`, `restart`)를 TicTacToe 상위 컴포넌트로 끌어올립니다.

```jsx
const [squares, setSquares] = useLocalStorageState('squares', INITIAL_SQUARES)

const nextValue = calcNextValue(squares)
const winner = calcWinner(squares)
const status = calcStatus(winner, squares, nextValue)

const selectSquare = (squareIndex) => {
  if (winner || squares[squareIndex]) {
    return
  }

  const squaresCopy = [...squares]
  squaresCopy[squareIndex] = nextValue
  setSquares(squaresCopy)
}

const restart = () => {
  setSquares(INITIAL_SQUARES)
}
```

#### Board 컴폰너트

상위 컴포넌트에서 `onSelect`, `squares` props를 전달 받도록 설정하고, 
renderSquare 함수의 클릭 이벤트 부분을 변경합니다. 변경에 따라 더 이상 필요없는 게임 다시 시작(restart) 버튼, 상황(status) 표시 부분을 제거합니다.

```jsx
function Board({ onSelect, squares }) {
  const renderSquare = (index) => (
    <button
      type="button"
      className="button--square"
      onClick={() => onSelect(index)}
    >
      {squares[index]}
    </button>
  )

  return (
    <>
      <div className="board__row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board__row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board__row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  )
}
```

#### TicTacToe 컴포넌트

게임을 기록할 상태 및 업데이트 함수를 다음과 같이 설정합니다.

```jsx
const [history, setHistory] = React.useState([squares])
```

게임 기록을 렌더링 할 함수를 다음과 같이 작성합니다.

```jsx
const currentStep = 0

const renderHistoryItems = history.map((squaresStep, step) => {
  const message =
    step === 0 ? `게임 첫번째 기록` : `게임 ${step + 1}번째 기록`
  const isCurrentStep = currentStep === step

  return (
    <li key={`history-${step}`}>
      <button
        type="button"
        disabled={isCurrentStep}
        onClick={() => setCurrentStep(step)}
      >
        {message} {isCurrentStep ? `(현재)` : null}
      </button>
    </li>
  )
})
```

현재 스텝에 따른 UI 변경 여부를 확인하기 위해 코드를 다음과 같이 작성한 후 테스트해봅니다.

```jsx
const [currentStep, setCurrentStep] = React.useState(0)
const [history, setHistory] = React.useState([[], squares, []])
```

히스토리를 초기 상태로 설정한 후, 현재 스텝(숫자)에 맞는 현재 스퀘어를 추출합니다.
그리고 파생 된 상태를 업데이트 하는 코드를 작성합니다.

```jsx
// 히스토리 초기 상태 설정
const [history, setHistory] = React.useState([INITIAL_SQUARES])

// 현재 스퀘어
const currentSquares = history[currentStep]

// 파생 된 상태 업데이트
const nextValue = calcNextValue(currentSquares)
const winner = calcWinner(currentSquares)
const status = calcStatus(winner, currentSquares, nextValue)
```

Board 컴포너트에 전달되는 `squares` props를 `currentSquares` 값으로 변경합니다.

```jsx
<Board onSelect={selectSquare} squares={currentSquares} />
```

selectSquare 함수 코드를 로직을 다음과 같이 변경합니다.

```jsx
const selectSquare = (squareIndex) => {

  if (winner || currentSquares[squareIndex]) {
    return
  }

  // 새로운 히스토리 객체 생성
  const newHistory = history.slice(0, currentStep + 1)
  // 현재 스퀘어 복사 
  const squaresCopy = [...currentSquares]

  // 히스토리, 스텝 업데이트
  setHistory([...newHistory, squaresCopy])
  setCurrentStep(newHistory.length)
}
```

게임 재시작 버튼 코드 또한 다음과 같이 변경합니다.

```jsx
const restart = () => {
  // 히스토리, 스텝 초기화
  setHistory([INITIAL_SQUARES])
  setCurrentStep(0)
}
```

`useLocalStorageState` 커스텀 훅을 사용해 게임 중 브라우저를 닫아도 기록이 기억되도록 설정할 수 있습니다.

```jsx
const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
  INITIAL_SQUARES,
])

const [currentStep, setCurrentStep] = useLocalStorageState(
  'tic-tac-toe:step',
  0
)
```